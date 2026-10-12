import { PricingInputs, CalculationResults, SmartAdviceItem } from '../types/pricing';

export function calculatePricing(inputs: PricingInputs): CalculationResults {
  const {
    productCost = 0,
    sellingPrice = 0,
    customerShippingFee = 0,
    actualShippingCost = 0,
    returnRate = 0,
    cpa = 0,
    extraFees = 0,
  } = inputs;

  // 1. إجمالي الإيراد المقبوض من العميل: (سعر البيع + تكلفة الشحن المعلنة للعميل)
  const totalRevenue = sellingPrice + customerShippingFee;

  // 2. تكلفة الطلب الناجح: (تكلفة شراء المنتج + التكلفة الفعلية للشحن + تكلفة الإعلانات CPA + المصاريف الإضافية)
  const deliveredOrderCost = productCost + actualShippingCost + cpa + extraFees;

  // 3. صافي ربح الطلب الناجح (EGP): إجمالي الإيراد - تكلفة الطلب الناجح
  const deliveredProfit = totalRevenue - deliveredOrderCost;

  // 4. هامش الربح للطلب الناجح (%): (صافي الربح ÷ سعر البيع) * 100
  const deliveredMargin = sellingPrice > 0 ? (deliveredProfit / sellingPrice) * 100 : 0;

  // 5. تأثير المرتجعات (تكلفة الهالك والارتجاع لكل طلب): (نسبة المرتجعات % * التكلفة الفعلية للشحن)
  const returnImpact = (returnRate / 100) * actualShippingCost;

  // 6. صافي الربح النهائي الحقيقي بعد المرتجعات (Real Net Profit): صافي ربح الطلب الناجح - تأثير المرتجعات
  const realNetProfit = deliveredProfit - returnImpact;

  // 7. نسبة هامش الربح الحقيقي (%): (صافي الربح الحقيقي ÷ سعر البيع) * 100
  const realMargin = sellingPrice > 0 ? (realNetProfit / sellingPrice) * 100 : 0;

  // 8. المصاريف الكلية بدون إعلانات
  // صافي تكلفة التشغيل للشحنة بدون إعلان = (تكلفة المنتج + التكلفة الفعلية للشحن + المصاريف الإضافية + تأثير المرتجع - شحن العميل)
  const expensesWithoutAds = productCost + actualShippingCost + extraFees + returnImpact - customerShippingFee;
  const contributionMarginBeforeAds = sellingPrice - expensesWithoutAds;

  // نقطة التعادل للإعلانات (Break-even ROAS): سعر البيع ÷ (سعر البيع - المصاريف الكلية بدون إعلانات)
  let breakEvenRoas = 0;
  if (contributionMarginBeforeAds > 0) {
    breakEvenRoas = sellingPrice / contributionMarginBeforeAds;
  } else {
    // إذا كانت المصاريف بدون إعلانات أكبر من سعر البيع، فالمنتج يخسر حتى بدون ميزانية إعلانات
    breakEvenRoas = 0;
  }

  // 9. أقصى ميزانية إعلانية مسموحة للطلب (CPA Limit) قبل التحول للخسارة
  // الربح الحقيقي مع CPA الحالي هو realNetProfit، إذن أقصى CPA يمكن تحمله = CPA الحالي + realNetProfit
  const maxCpa = Math.max(0, cpa + realNetProfit);

  // 10. صافي ربح/خسارة الشحن والمرتجعات: شحن العميل - الشحن الفعلي - تكلفة المرتجع
  const shippingAndReturnBalance = customerShippingFee - actualShippingCost - returnImpact;

  // 11. تكلفة المنتج والإعلانات
  const productAndAdsCost = productCost + cpa;

  // 12. أقصى نسبة مرتجع يتحملها المنتج قبل الخسارة (Break-even Return Rate)
  // deliveredProfit - (Rate / 100 * actualShippingCost) = 0 => Rate = (deliveredProfit / actualShippingCost) * 100
  let maxSustainableReturnRate = 0;
  if (actualShippingCost > 0) {
    maxSustainableReturnRate = Math.max(0, (deliveredProfit / actualShippingCost) * 100);
  }

  const isProfitable = realNetProfit > 0;

  // تصنيف الأرباح
  let profitTier: CalculationResults['profitTier'] = 'loss';
  if (realNetProfit <= 0) {
    profitTier = 'loss';
  } else if (realMargin < 12) {
    profitTier = 'tight';
  } else if (realMargin < 25) {
    profitTier = 'good';
  } else {
    profitTier = 'excellent';
  }

  return {
    totalRevenue: round(totalRevenue),
    deliveredOrderCost: round(deliveredOrderCost),
    deliveredProfit: round(deliveredProfit),
    deliveredMargin: round(deliveredMargin),
    returnImpact: round(returnImpact),
    realNetProfit: round(realNetProfit),
    realMargin: round(realMargin),
    breakEvenRoas: round(breakEvenRoas, 2),
    maxCpa: round(maxCpa),
    shippingAndReturnBalance: round(shippingAndReturnBalance),
    productAndAdsCost: round(productAndAdsCost),
    isProfitable,
    maxSustainableReturnRate: round(maxSustainableReturnRate, 1),
    profitTier,
  };
}

export function round(value: number, decimals: number = 2): number {
  const factor = Math.pow(10, decimals);
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

// توليد نصائح الخبير الذكية بحسب العملة واللغة
export function generateEgyptianExpertAdvice(
  inputs: PricingInputs,
  results: CalculationResults,
  curr: string = 'ج.م',
  lang: 'ar' | 'en' = 'ar'
): SmartAdviceItem[] {
  const items: SmartAdviceItem[] = [];

  const {
    productCost,
    sellingPrice,
    customerShippingFee,
    actualShippingCost,
    returnRate,
    cpa,
  } = inputs;

  const {
    realNetProfit,
    realMargin,
    breakEvenRoas,
    maxCpa,
    shippingAndReturnBalance,
    returnImpact,
  } = results;

  const isAr = lang === 'ar';

  // 1. تحليل الخسارة الكلية أو الربح المتدني
  if (realNetProfit <= 0) {
    items.push({
      id: 'loss_alert',
      category: 'pricing',
      severity: 'urgent',
      title: isAr
        ? '⚠️ تنبيه عاجل: أنت تخسر في كل أوردر يخرج من مخزنك!'
        : '⚠️ Urgent Warning: You are losing money on every order!',
      description: isAr
        ? `كل طلب ناجح يسلب منك ${Math.abs(realNetProfit)} ${curr} كخسارة صافية. المشكلة الأساسية إما في تسعير البيع (${sellingPrice} ${curr}) أو ارتفاع الصرف الإعلاني (${cpa} ${curr}) مقارنة بتكلفة البضاعة. يجب فوراً رفع سعر البيع أو إيقاف الحملات غير المجدية.`
        : `Each order loses ${Math.abs(realNetProfit)} ${curr} in net loss. Core issue is low price (${sellingPrice} ${curr}) or high CPA (${cpa} ${curr}) relative to product cost. Raise prices immediately or pause underperforming ads.`,
      metricHighlight: isAr
        ? `خسارة: ${Math.abs(realNetProfit)} ${curr}`
        : `Loss: -${Math.abs(realNetProfit)} ${curr}`,
    });
  } else if (realMargin < 15) {
    items.push({
      id: 'tight_margin',
      category: 'pricing',
      severity: 'warning',
      title: isAr
        ? 'هامش ربحك ضعيف وخطير في التجارة الإلكترونية'
        : 'Low Profit Margin: High financial risk',
      description: isAr
        ? `هامشك الصافي ${realMargin}% فقط (${realNetProfit} ${curr} للقطعة). أي زيادة طارئة في تكلفة الشحن أو المرتجع قد تقلب أرباحك لخسارة. المستهدف الآمن لأي متجر ألا يقل الهامش عن 22% إلى 30%.`
        : `Your real margin is only ${realMargin}% (${realNetProfit} ${curr}/unit). Any unexpected logistics cost or return spike will trigger a net loss. Safe benchmark is 22%-30%.`,
      metricHighlight: isAr ? `الهامش: ${realMargin}%` : `Margin: ${realMargin}%`,
    });
  } else {
    items.push({
      id: 'healthy_margin',
      category: 'growth',
      severity: 'success',
      title: isAr
        ? 'هامش ربح ممتاز وصحي للنمو والتوسع'
        : 'Healthy Profit Margin: Ready for profitable scaling',
      description: isAr
        ? `تحافظ على هامش صافي ممتاز يبلغ ${realMargin}% وربح ${realNetProfit} ${curr} لكل قطعة بعد امتصاص تكاليف المرتجع. هذا الهامش يتيح لك ميزانية كافية للتوسع الإعلاني (Scale).`
        : `You maintain a resilient ${realMargin}% net margin (${realNetProfit} ${curr}/unit) after absorbing return losses. You have room for ad scaling.`,
      metricHighlight: isAr ? `الربح: +${realNetProfit} ${curr}` : `Profit: +${realNetProfit} ${curr}`,
    });
  }

  // 2. تحليل المرتجعات
  if (returnRate > 18) {
    items.push({
      id: 'high_returns',
      category: 'returns',
      severity: 'urgent',
      title: isAr
        ? `المرتجع (${returnRate}%) يستنزف أرباحك بشكل مباشر`
        : `High Returns (${returnRate}%): Draining profit margins`,
      description: isAr
        ? `المرتجع يبتلع منك ${returnImpact} ${curr} على كل شحنة! الحل الفوري: اتصل بالعميل للتأكيد أو أرسل رسالة واتساب برقم البوليصة، وتأكد من كتابة العنوان تفصيلياً مع أقرب علامة مميزة.`
        : `Returns cost you ${returnImpact} ${curr} per parcel. Action plan: Confirm orders via WhatsApp or phone call prior to dispatch, and verify precise shipping addresses.`,
      metricHighlight: isAr
        ? `هالك المرتجع: ${returnImpact} ${curr}`
        : `Return loss: ${returnImpact} ${curr}`,
    });
  } else if (returnRate <= 10) {
    items.push({
      id: 'low_returns',
      category: 'returns',
      severity: 'tip',
      title: isAr
        ? 'معدل تسليم مرتفع وإدارة مرتجعات منضبطة'
        : 'High Delivery Rate & Strict Return Control',
      description: isAr
        ? `معدل مرتجعك (${returnRate}%) ممتاز وأقل من متوسط السوق. حافظ على سرعة الشحن خلال 24-48 ساعة لضمان أعلى نسبة استلام.`
        : `Your return rate (${returnRate}%) is stellar. Maintain fast fulfillment within 24-48 hours to preserve peak delivery rates.`,
    });
  }

  // 3. تحليل الشحن وفرق التكلفة
  if (shippingAndReturnBalance < 0) {
    const diff = Math.abs(shippingAndReturnBalance);
    items.push({
      id: 'shipping_deficit',
      category: 'shipping',
      severity: 'warning',
      title: isAr
        ? 'عجز الشحن يستقطع من مكسب منتجك'
        : 'Shipping Deficit: Logistics fee absorbed by product profit',
      description: isAr
        ? `أنت تُحمّل نفسك عجز شحن وارتجاع قدره ${diff} ${curr} لكل أوردر. نصيحة تسعير: ارفع سعر المنتج قليلاً وقدم "شحن مخفض" أو "شحن مجاني عند طلب قطعتين".`
        : `You are absorbing a logistics deficit of ${diff} ${curr} per order. Strategy: Raise product price slightly and offer 'Free Shipping on 2+ items'.`,
      metricHighlight: isAr ? `عجز الشحن: -${diff} ${curr}` : `Deficit: -${diff} ${curr}`,
    });
  } else if (customerShippingFee >= actualShippingCost) {
    items.push({
      id: 'shipping_covered',
      category: 'shipping',
      severity: 'tip',
      title: isAr
        ? 'تغطية ذكية لمصاريف شركة الشحن'
        : 'Full Logistics Coverage: Delivery fees well structured',
      description: isAr
        ? `شحن العميل (${customerShippingFee} ${curr}) يغطي تكلفة التوصيل الفعلية بالكامل ويحميك من أي تقلبات في أسعار الوقود أو المناديب.`
        : `Customer shipping fee (${customerShippingFee} ${curr}) covers actual courier invoices, insulating your business from fuel and logistics spikes.`,
    });
  }

  // 4. تحليل الإعلانات و الـ CPA
  const cpaShare = sellingPrice > 0 ? (cpa / sellingPrice) * 100 : 0;
  if (cpaShare > 40) {
    items.push({
      id: 'critical_cpa',
      category: 'ads',
      severity: 'urgent',
      title: isAr
        ? `⚠️ خطر على الاستمرارية: الإعلانات تبتلع ${round(cpaShare)}% من سعر البيع!`
        : `⚠️ Critical Ad Spend: CPA consumes ${round(cpaShare)}% of selling price!`,
      description: isAr
        ? `تكلفة الإعلانات (${cpa} ${curr}) تتجاوز الحد الحرج (40%) من سعر المنتج (${sellingPrice} ${curr}). أوقف الحملات الضعيفة، اعتمد على فيديوهات UGC حقيقية، أو ارفع سعر البيع.`
        : `Your CPA (${cpa} ${curr}) exceeds the critical threshold of 40% of selling price. Pause underperforming ads, test creator UGC video formats, or raise the price.`,
      metricHighlight: isAr ? `نسبة الإعلانات: ${round(cpaShare)}%` : `CPA Share: ${round(cpaShare)}%`,
    });
  } else if (cpaShare > 30) {
    items.push({
      id: 'high_cpa',
      category: 'ads',
      severity: 'warning',
      title: isAr
        ? `الإعلانات تستحوذ على ${round(cpaShare)}% من سعر البيع`
        : `High CPA: Ad costs take ${round(cpaShare)}% of revenue`,
      description: isAr
        ? `تدفع ${cpa} ${curr} للطلب الواحد، وأقصى حد مسموح لك قبل الخسارة هو ${maxCpa} ${curr}. ركز على تحسين كرييتف الإعلان وتوضيح المشكلة والحل.`
        : `You pay ${cpa} ${curr} per order, while break-even CPA is ${maxCpa} ${curr}. Focus on creative hooks to decrease cost per click.`,
      metricHighlight: isAr ? `أقصى CPA: ${maxCpa} ${curr}` : `Max CPA: ${maxCpa} ${curr}`,
    });
  } else if (cpaShare <= 20 && realNetProfit > 0) {
    items.push({
      id: 'efficient_ads',
      category: 'ads',
      severity: 'success',
      title: isAr
        ? 'تكلفة استحواذ إعلانية ممتازة (CPA كفء جداً)'
        : 'Efficient CPA & Solid ROAS Performance',
      description: isAr
        ? `تكلفة إعلاناتك (${cpa} ${curr}) منخفضة وممتازة، ولديك نقطة تعادل ROAS قدرها ${breakEvenRoas}x. يمكنك زيادة الميزانية اليومية بثقة.`
        : `Your CPA (${cpa} ${curr}) is cost-efficient with break-even ROAS at ${breakEvenRoas}x. Scale ad budgets with confidence.`,
      metricHighlight: isAr ? `نقطة التعادل: ${breakEvenRoas}x` : `BE ROAS: ${breakEvenRoas}x`,
    });
  }

  // 5. استراتيجية الباندل
  items.push({
    id: 'bundle_strategy',
    category: 'growth',
    severity: 'tip',
    title: isAr
      ? 'فكرة ذهبية لمضاعفة الأرباح: عروض الباندل (1+1)'
      : 'Bundle Strategy: Double profits with Buy 1 Get 1 or Bundles',
    description: isAr
      ? `بما أن تكلفة الشحن والإعلانات تُدفع مرة واحدة على كل طرد، قدم عرض "اشتري قطعتين واحصل على خصم 15%" لرفع متوسط سلة الشراء (AOV) بدون تكلفة إعلانية جديدة.`
      : `Since shipping and ad acquisition are paid once per order, offer bundles or 2nd item discounts to expand AOV and maximize margin.`,
  });

  return items;
}

// حساب محاكاة حجم الطلبات الشهرية
export interface MonthlySimulation {
  orderCount: number;
  grossRevenue: number;
  deliveredOrders: number;
  returnedOrders: number;
  totalProductCost: number;
  totalShippingPaid: number;
  totalAdSpend: number;
  totalExtraFees: number;
  totalNetProfit: number;
}

export function simulateMonthlyVolume(
  inputs: PricingInputs,
  results: CalculationResults,
  orderCount: number
): MonthlySimulation {
  const returnFraction = (inputs.returnRate || 0) / 100;
  const returnedOrders = Math.round(orderCount * returnFraction);
  const deliveredOrders = Math.max(0, orderCount - returnedOrders);

  const grossRevenue = orderCount * (inputs.sellingPrice + inputs.customerShippingFee);
  const totalProductCost = orderCount * inputs.productCost; // Or delivered, but returned product is restocked; return shipping is lost
  const totalShippingPaid = orderCount * inputs.actualShippingCost;
  const totalAdSpend = orderCount * inputs.cpa;
  const totalExtraFees = orderCount * inputs.extraFees;
  const totalNetProfit = round(orderCount * results.realNetProfit);

  return {
    orderCount,
    grossRevenue: round(grossRevenue),
    deliveredOrders,
    returnedOrders,
    totalProductCost: round(totalProductCost),
    totalShippingPaid: round(totalShippingPaid),
    totalAdSpend: round(totalAdSpend),
    totalExtraFees: round(totalExtraFees),
    totalNetProfit,
  };
}

// حاسبة السعر العكسية: كم يجب أن يكون سعر البيع لتحقيق هامش ربح مستهدف؟
export function calculateTargetPriceForMargin(
  inputs: PricingInputs,
  targetMarginPercent: number
): number {
  // realNetProfit = sellingPrice + customerShipping - (productCost + actualShipping + cpa + extraFees) - (returnRate% * actualShipping)
  // realNetProfit = (targetMarginPercent / 100) * sellingPrice
  // Let expenses = productCost + actualShipping + cpa + extraFees + (returnRate% * actualShipping) - customerShipping
  // sellingPrice - expenses = (targetMargin / 100) * sellingPrice
  // sellingPrice * (1 - targetMargin / 100) = expenses
  // sellingPrice = expenses / (1 - targetMargin / 100)
  const returnImpact = ((inputs.returnRate || 0) / 100) * (inputs.actualShippingCost || 0);
  const totalExpensesMinusCustomerShipping =
    (inputs.productCost || 0) +
    (inputs.actualShippingCost || 0) +
    (inputs.cpa || 0) +
    (inputs.extraFees || 0) +
    returnImpact -
    (inputs.customerShippingFee || 0);

  const marginFraction = (targetMarginPercent || 0) / 100;
  if (marginFraction >= 1) return 0;

  const targetPrice = totalExpensesMinusCustomerShipping / (1 - marginFraction);
  return Math.max(0, round(targetPrice, 0));
}
