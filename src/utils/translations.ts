import { Language } from '../types/localization';

export interface Translations {
  appTitle: string;
  appSubtitle: string;
  underSupervision: string;
  copyrightLink: string;
  navInputs: string;
  navProfits: string;
  navBreakdown: string;
  navAdvice: string;
  navSimulator: string;
  reset: string;
  exportPdf: string;
  subscribeBtn: string;
  subscribeFullBtn: string;
  adminPanelBtn: string;
  adminShort: string;
  loginRegister: string;
  logout: string;
  quickPresetsTitle: string;
  quickPresetsSubtitle: string;
  field1Label: string;
  field1Sub: string;
  field2Label: string;
  field2Sub: string;
  field3Label: string;
  field3Sub: string;
  freeShippingBtn: string;
  field4Label: string;
  field4Sub: string;
  field5Label: string;
  field5Sub: string;
  field6Label: string;
  field6Sub: string;
  cpaExceedsWarning: string;
  field7Label: string;
  field7Sub: string;
  calculateNow: string;
  realtimeNote: string;
  productProfitable: string;
  productLosing: string;
  fullDeductionNote: string;
  realNetProfitTitle: string;
  perUnit: string;
  realMarginRate: string;
  deliveredProfitBeforeReturn: string;
  returnLossPerOrder: string;
  cpaLimitTitle: string;
  cpaLimitSub: string;
  breakEvenRoasTitle: string;
  breakEvenRoasSub: string;
  costBreakdownTitle: string;
  costBreakdownSub: string;
  copyReport: string;
  copiedSuccess: string;
  productAndAds: string;
  productAndAdsSub: string;
  shippingReturnBalance: string;
  shippingSubsidized: string;
  shippingCovered: string;
  itemizedTableTitle: string;
  tableColItem: string;
  tableColType: string;
  tableColAmount: string;
  tableColShare: string;
  smartAdviceTitle: string;
  smartAdviceSub: string;
  monthlySimulatorTitle: string;
  monthlySimulatorSub: string;
  targetPriceCalcTitle: string;
  targetPriceCalcSub: string;
  returnSafetyThresholdTitle: string;
  returnSafetyThresholdSub: string;
  ordersCount: string;
  grossRevenue: string;
  deliveredOrdersCount: string;
  returnedOrdersCount: string;
  totalAdSpend: string;
  monthlyNetProfitCash: string;
  targetMarginInputLabel: string;
  targetPriceResult: string;
  marketFactsTitle: string;
  marketFact1: string;
  marketFact2: string;
  marketFact3: string;
  country: string;
  currency: string;
  language: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  ar: {
    appTitle: 'حاسبة تسعير وأرباح التجارة الإلكترونية',
    appSubtitle: 'الأداة المالية المخصصة للبائعين لحساب الأرباح الحقيقية الصافية بعد خصم تكاليف الشحن الفعلي، هالك المرتجعات، وتكلفة الإعلانات (CPA).',
    underSupervision: 'بإشراف وتطوير: عمر ضاحي',
    copyrightLink: 'حقوق الملكية الفكرية',
    navInputs: 'البيانات والتسعير',
    navProfits: 'صافي الأرباح',
    navBreakdown: 'تحليل التكاليف',
    navAdvice: 'نصائح الخبير',
    navSimulator: 'محاكي المبيعات',
    reset: 'إعادة تعيين',
    exportPdf: 'تصدير التقرير PDF / طباعة',
    subscribeBtn: 'الاشتراك',
    subscribeFullBtn: 'خطة الاشتراك (أول شهر مجاناً)',
    adminPanelBtn: 'لوحة تحكم المشرف (عمر ضاحي)',
    adminShort: 'المشرف',
    loginRegister: 'دخول / اشتراك',
    logout: 'تسجيل خروج',
    quickPresetsTitle: 'نماذج تسعير سريعة للسوق',
    quickPresetsSubtitle: 'اختر مجالك لتعبئة متوسطات التكاليف ونسب المرتجع الشائعة تلقائياً',
    field1Label: '1. تكلفة شراء المنتج (شاملة الجمارك أو الشحن للمخزن)',
    field1Sub: 'سعر الشراء من المصنع/المستورد + النقل لمخزنك',
    field2Label: '2. سعر البيع المقترح للعميل',
    field2Sub: 'السعر المعروض على متجرك أو صفحة الهبوط بدون الشحن',
    field3Label: '3. تكلفة الشحن المعلنة للعميل',
    field3Sub: 'المبلغ المكتوب في البوليصة على العميل (0 لو شحن مجاني)',
    freeShippingBtn: 'شحن مجاني',
    field4Label: '4. التكلفة الفعلية للشركة الناقلة/مكتب الشحن',
    field4Sub: 'متوسط فاتورة شركة الشحن لكل شحنة ناجحة',
    field5Label: '5. نسبة المرتجعات المتوقعة',
    field5Sub: 'الافتراضي 15% (النسبة الطبيعية بين 10% إلى 25%)',
    field6Label: '6. تكلفة الإعلانات لكل طلب كسبته - CPA',
    field6Sub: 'إجمالي الصرف الإعلاني مقسوماً على الأوردرات المؤكدة',
    cpaExceedsWarning: '⚠️ يتخطى 40% (خطر)',
    field7Label: '7. مصاريف إضافية أو عمولات التغليف والمنصة',
    field7Sub: 'أكياس شحن، كرتونة، لاصق، بوليصة مطبوعة، عمولة المنصة وبوابة الدفع',
    calculateNow: 'احسب الأرباح الآن',
    realtimeNote: 'يتم تحديث الحسابات تلقائياً في الوقت الفعلي مع كل تغيير بالمدخلات',
    productProfitable: 'المنتج رابح',
    productLosing: 'المنتج خاسر',
    fullDeductionNote: 'الحساب شامل الشحن، التغليف، الإعلانات، وهالك المرتجعات بالكامل',
    realNetProfitTitle: 'صافي الربح الحقيقي لكل قطعة بعد المرتجعات (Real Net Profit)',
    perUnit: 'لكل قطعة',
    realMarginRate: 'نسبة هامش الربح الحقيقي:',
    deliveredProfitBeforeReturn: 'صافي ربح الطلب الناجح (قبل المرتجع):',
    returnLossPerOrder: 'تكلفة هالك المرتجع لكل طلب:',
    cpaLimitTitle: 'أقصى ميزانية إعلانات مسموحة (CPA Limit)',
    cpaLimitSub: 'قبل التحول للخسارة',
    breakEvenRoasTitle: 'نقطة التعادل للإعلانات (Break-even ROAS)',
    breakEvenRoasSub: 'معدل العائد المطلوب',
    costBreakdownTitle: 'تحليل التكاليف التفصيلي وهيكل التسعير',
    costBreakdownSub: 'تشريح دقيق لكل مبلغ يدفعه العميل وأين يذهب بين البضاعة، الإعلانات، والشحن والمرتجعات',
    copyReport: 'نسخ التقرير',
    copiedSuccess: 'تم النسخ للواتساب',
    productAndAds: 'تكلفة المنتج والإعلانات',
    productAndAdsSub: 'بضاعة + ميزانية الإعلانات',
    shippingReturnBalance: 'صافي ربح/خسارة الشحن والمرتجعات',
    shippingSubsidized: 'عجز تتحمله من هامش ربحك',
    shippingCovered: 'شحن العميل يغطي تكلفة التوصيل والمرتجع',
    itemizedTableTitle: 'جدول تفاصيل البنود والنسب المئوية',
    tableColItem: 'البند المالي',
    tableColType: 'النوع',
    tableColAmount: 'المبلغ',
    tableColShare: 'النسبة من سعر البيع',
    smartAdviceTitle: '💡 نصيحة الخبير الذكية لتزويد أرباحك',
    smartAdviceSub: 'توصيات عملية مبنية على واقع التجارة الإلكترونية، شركات الشحن، وسلوك المستهلك',
    monthlySimulatorTitle: 'محاكي الأرباح والتدفقات النقدية الشهرية',
    monthlySimulatorSub: 'اختر عدد الطلبات الشهرية المتوقع شحنها لحساب صافي المبلغ الذي سيدخل جيبك شهرياً',
    targetPriceCalcTitle: 'حاسبة السعر المقترح لتحقيق هامش مستهدف',
    targetPriceCalcSub: 'حدد هامش الربح الصافي الذي تريده وسنحسب لك سعر البيع الدقيق',
    returnSafetyThresholdTitle: 'مؤشر أمان المرتجعات (Break-even Return Rate)',
    returnSafetyThresholdSub: 'أقصى نسبة مرتجع يتحملها منتجك قبل أن يبدأ في الخسارة',
    ordersCount: 'طلب / شهر',
    grossRevenue: 'إجمالي المبيعات المحصلة (Gross Revenue):',
    deliveredOrdersCount: 'شحنات ناجحة تم تسليمها:',
    returnedOrdersCount: 'شحنات مرتجعة هالك:',
    totalAdSpend: 'إجمالي الصرف الإعلاني الشهري:',
    monthlyNetProfitCash: 'صافي الربح الشهري في جيبك:',
    targetMarginInputLabel: 'نسبة الهامش المستهدف:',
    targetPriceResult: 'سعر البيع المقترح لتحقيق الربح المستهدف:',
    marketFactsTitle: 'حقائق تهم كل تاجر إلكتروني:',
    marketFact1: 'المرتجع هو القاتل الصامت للأرباح: متابعة الشحنات وتأكيد الطلبات قبل الشحن يوفر مبالغ طائلة.',
    marketFact2: 'فرق الشحن: انتبه إذا كان الشحن الفعلي لشركة التوصيل أكبر من المعلن للعميل.',
    marketFact3: 'الـ CPA الذهبي: احرص ألا تتجاوز تكلفة الإعلانات 25%-30% من سعر القطعة لضمان الاستمرارية.',
    country: 'البلد',
    currency: 'العملة',
    language: 'اللغة',
  },
  en: {
    appTitle: 'E-Commerce Pricing & Profit Calculator',
    appSubtitle: 'Financial analytics tool for sellers to compute exact net profits after actual shipping costs, return loss impact, and CPA advertising spend.',
    underSupervision: 'Developed by: Omar Dahy',
    copyrightLink: 'Intellectual Property & IP Rights',
    navInputs: 'Inputs & Pricing',
    navProfits: 'Net Profit',
    navBreakdown: 'Cost Breakdown',
    navAdvice: 'Expert Advice',
    navSimulator: 'Sales Simulator',
    reset: 'Reset',
    exportPdf: 'Export PDF / Print',
    subscribeBtn: 'Subscribe',
    subscribeFullBtn: 'Subscription Plan (1st Month Free)',
    adminPanelBtn: 'Admin Dashboard (Omar Dahy)',
    adminShort: 'Admin',
    loginRegister: 'Login / Sign Up',
    logout: 'Logout',
    quickPresetsTitle: 'Quick Market Presets',
    quickPresetsSubtitle: 'Select your niche to auto-fill realistic costs and return benchmarks',
    field1Label: '1. Product Cost (including customs & warehouse inbound)',
    field1Sub: 'Factory/supplier wholesale cost + inbound shipping to your stock',
    field2Label: '2. Target Selling Price to Customer',
    field2Sub: 'Listed price on your store or landing page before shipping',
    field3Label: '3. Shipping Fee Charged to Customer',
    field3Sub: 'Shipping amount charged to customer on delivery (0 for Free Shipping)',
    freeShippingBtn: 'Free Shipping',
    field4Label: '4. Actual Shipping Courier Cost',
    field4Sub: 'Average courier company invoice per delivered parcel',
    field5Label: '5. Estimated Return Rate (%)',
    field5Sub: 'Default 15% (Typical range in COD is 10% to 25%)',
    field6Label: '6. Cost Per Acquisition - CPA (Ad spend per order)',
    field6Sub: 'Total ad spend divided by delivered/confirmed orders',
    cpaExceedsWarning: '⚠️ Exceeds 40% (High Risk)',
    field7Label: '7. Packaging & Platform Additional Fees',
    field7Sub: 'Polybag, cartons, labels, stickers, payment gateway & store fees',
    calculateNow: 'Calculate Profit Now',
    realtimeNote: 'Calculations update automatically in real-time with any input change',
    productProfitable: 'Profitable Product',
    productLosing: 'Unprofitable Product',
    fullDeductionNote: 'Calculations include shipping, packaging, ads, and all return damages',
    realNetProfitTitle: 'Real Net Profit Per Unit (After Returns)',
    perUnit: 'per unit',
    realMarginRate: 'Real Net Profit Margin:',
    deliveredProfitBeforeReturn: 'Delivered Order Net Profit (Pre-Returns):',
    returnLossPerOrder: 'Return Loss Impact per Order:',
    cpaLimitTitle: 'Maximum Allowed CPA Limit',
    cpaLimitSub: 'Before turning unprofitable',
    breakEvenRoasTitle: 'Break-even ROAS for Ads',
    breakEvenRoasSub: 'Required return on ad spend',
    costBreakdownTitle: 'Detailed Cost Breakdown & Price Anatomy',
    costBreakdownSub: 'Comprehensive anatomy of customer revenue allocation across goods, ads, and logistics',
    copyReport: 'Copy Report',
    copiedSuccess: 'Copied to Clipboard / WhatsApp',
    productAndAds: 'Product & Ad Cost',
    productAndAdsSub: 'Goods wholesale + Ad CPA',
    shippingReturnBalance: 'Shipping & Return Balance',
    shippingSubsidized: 'Logistics deficit absorbed by your margin',
    shippingCovered: 'Customer shipping fully covers couriers & returns',
    itemizedTableTitle: 'Itemized Breakdown Table & Revenue Percentages',
    tableColItem: 'Financial Item',
    tableColType: 'Category',
    tableColAmount: 'Amount',
    tableColShare: '% of Selling Price',
    smartAdviceTitle: '💡 Smart Expert E-Commerce Advice',
    smartAdviceSub: 'Actionable business recommendations based on e-commerce logistics and consumer behavior',
    monthlySimulatorTitle: 'Monthly Profit & Cash Flow Simulator',
    monthlySimulatorSub: 'Select monthly order volume to project actual take-home cash profit',
    targetPriceCalcTitle: 'Reverse Target Margin Price Calculator',
    targetPriceCalcSub: 'Set your desired profit margin to calculate the exact required selling price',
    returnSafetyThresholdTitle: 'Return Safety Threshold (Break-even Rate)',
    returnSafetyThresholdSub: 'Maximum sustainable return percentage before entering net loss',
    ordersCount: 'orders / month',
    grossRevenue: 'Gross Customer Revenue:',
    deliveredOrdersCount: 'Delivered orders successfully collected:',
    returnedOrdersCount: 'Returned parcels (waste/loss):',
    totalAdSpend: 'Monthly advertising budget (Ad Spend):',
    monthlyNetProfitCash: 'Net Monthly Take-Home Cash Profit:',
    targetMarginInputLabel: 'Target Margin Goal:',
    targetPriceResult: 'Recommended selling price to achieve target margin:',
    marketFactsTitle: 'Key E-Commerce Fundamentals:',
    marketFact1: 'Returns are the silent profit killer: Phone confirmation and fast dispatch save huge cash.',
    marketFact2: 'Shipping deficit: Beware if courier costs exceed what customers pay for delivery.',
    marketFact3: 'Golden CPA Rule: Keep your CPA under 25%-30% of product price for resilient scaling.',
    country: 'Country',
    currency: 'Currency',
    language: 'Language',
  },
};
