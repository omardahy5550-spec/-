export interface PricingInputs {
  productCost: number; // تكلفة شراء المنتج شاملة الشحن للمخزن
  sellingPrice: number; // سعر البيع المقترح للعميل
  customerShippingFee: number; // تكلفة الشحن المعلنة للعميل
  actualShippingCost: number; // التكلفة الفعلية للشركة الناقلة
  returnRate: number; // نسبة المرتجعات المتوقعة (%)
  cpa: number; // تكلفة الإعلانات لكل طلب كسبته
  extraFees: number; // مصاريف إضافية أو عمولات التغليف والمنصة
}

export interface CalculationResults {
  totalRevenue: number; // إجمالي الإيراد المقبوض من العميل
  deliveredOrderCost: number; // تكلفة الطلب الناجح
  deliveredProfit: number; // صافي ربح الطلب الناجح
  deliveredMargin: number; // هامش الربح للطلب الناجح (%)
  returnImpact: number; // تأثير المرتجعات (تكلفة الهالك والارتجاع لكل طلب)
  realNetProfit: number; // صافي الربح النهائي الحقيقي بعد المرتجعات
  realMargin: number; // نسبة هامش الربح الحقيقي (%)
  breakEvenRoas: number; // نقطة التعادل للإعلانات (Break-even ROAS)
  maxCpa: number; // أقصى ميزانية إعلانية مسموحة للطلب
  shippingAndReturnBalance: number; // صافي ربح/خسارة الشحن والمرتجعات
  productAndAdsCost: number; // تكلفة المنتج والإعلانات
  isProfitable: boolean;
  maxSustainableReturnRate: number; // أقصى نسبة مرتجع يتحملها المنتج قبل الخسارة
  profitTier: 'excellent' | 'good' | 'tight' | 'loss';
}

export interface PresetCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  inputs: PricingInputs;
}

export interface SmartAdviceItem {
  id: string;
  category: 'returns' | 'pricing' | 'ads' | 'shipping' | 'growth';
  title: string;
  description: string;
  severity: 'urgent' | 'warning' | 'tip' | 'success';
  metricHighlight?: string;
}
