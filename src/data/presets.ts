import { PresetCategory } from '../types/pricing';

export const EGYPTIAN_MARKET_PRESETS: PresetCategory[] = [
  {
    id: 'fashion',
    name: 'ملابس وأزياء (كاجوال / عبايات)',
    icon: 'Shirt',
    description: 'سوق تنافسي وهوامش جيدة لكن نسبة المرتجع مرتفعة نسبياً بسبب مقاسات وألوان.',
    inputs: {
      productCost: 180,
      sellingPrice: 450,
      customerShippingFee: 50,
      actualShippingCost: 65,
      returnRate: 20, // 20% typical in clothing COD
      cpa: 85,
      extraFees: 20, // packaging polybag + ribbon + receipt
    },
  },
  {
    id: 'electronics',
    name: 'إلكترونيات وإكسسوارات هواتف',
    icon: 'Smartphone',
    description: 'معدل مرتجع منخفض وهوامش معتدلة، تحتاج لحجم طلبات عالي وروتيشن سريع.',
    inputs: {
      productCost: 120,
      sellingPrice: 290,
      customerShippingFee: 40,
      actualShippingCost: 55,
      returnRate: 10,
      cpa: 60,
      extraFees: 15,
    },
  },
  {
    id: 'cosmetics',
    name: 'مستحضرات تجميل وعناية',
    icon: 'Sparkles',
    description: 'هوامش ربح ممتازة، مرتجع منخفض جداً، تكلفة شحن آمنة (حجم خفيف).',
    inputs: {
      productCost: 95,
      sellingPrice: 340,
      customerShippingFee: 45,
      actualShippingCost: 55,
      returnRate: 8,
      cpa: 75,
      extraFees: 18,
    },
  },
  {
    id: 'shoes',
    name: 'أحذية وشنط كلاسيك/رياضية',
    icon: 'Footprints',
    description: 'وزن شحن أعلى ومقاسات تؤدي لمرتجعات تتطلب سياسة استبدال محكمة.',
    inputs: {
      productCost: 220,
      sellingPrice: 590,
      customerShippingFee: 60,
      actualShippingCost: 80,
      returnRate: 22,
      cpa: 110,
      extraFees: 25,
    },
  },
  {
    id: 'home_gadgets',
    name: 'أدوات منزلية وتريندات تيك توك',
    icon: 'Home',
    description: 'منتجات حلول مشاكل (Problem-solving) تعتمد على فيديوهات جذابة وسعر متوسط.',
    inputs: {
      productCost: 140,
      sellingPrice: 380,
      customerShippingFee: 45,
      actualShippingCost: 60,
      returnRate: 15,
      cpa: 80,
      extraFees: 20,
    },
  },
];
