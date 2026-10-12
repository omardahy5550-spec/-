export type Language = 'ar' | 'en';

export interface CountryConfig {
  id: string;
  nameAr: string;
  nameEn: string;
  flag: string;
  currencyCode: string;
  currencySymbolAr: string;
  currencySymbolEn: string;
  defaultInputs: {
    productCost: number;
    sellingPrice: number;
    customerShippingFee: number;
    actualShippingCost: number;
    returnRate: number;
    cpa: number;
    extraFees: number;
  };
  samplePresets: {
    fashion: { cost: number; price: number; shipCust: number; shipAct: number; returnR: number; cpa: number; fees: number };
    electronics: { cost: number; price: number; shipCust: number; shipAct: number; returnR: number; cpa: number; fees: number };
    cosmetics: { cost: number; price: number; shipCust: number; shipAct: number; returnR: number; cpa: number; fees: number };
  };
}

export const SUPPORTED_COUNTRIES: CountryConfig[] = [
  {
    id: 'eg',
    nameAr: 'مصر',
    nameEn: 'Egypt',
    flag: '🇪🇬',
    currencyCode: 'EGP',
    currencySymbolAr: 'ج.م',
    currencySymbolEn: 'EGP',
    defaultInputs: {
      productCost: 160,
      sellingPrice: 420,
      customerShippingFee: 50,
      actualShippingCost: 65,
      returnRate: 15,
      cpa: 80,
      extraFees: 20,
    },
    samplePresets: {
      fashion: { cost: 180, price: 450, shipCust: 50, shipAct: 65, returnR: 20, cpa: 85, fees: 20 },
      electronics: { cost: 120, price: 290, shipCust: 40, shipAct: 55, returnR: 10, cpa: 60, fees: 15 },
      cosmetics: { cost: 95, price: 340, shipCust: 45, shipAct: 55, returnR: 8, cpa: 75, fees: 18 },
    },
  },
  {
    id: 'sa',
    nameAr: 'السعودية',
    nameEn: 'Saudi Arabia',
    flag: '🇸🇦',
    currencyCode: 'SAR',
    currencySymbolAr: 'ر.س',
    currencySymbolEn: 'SAR',
    defaultInputs: {
      productCost: 45,
      sellingPrice: 140,
      customerShippingFee: 20,
      actualShippingCost: 28,
      returnRate: 12,
      cpa: 30,
      extraFees: 10,
    },
    samplePresets: {
      fashion: { cost: 50, price: 160, shipCust: 20, shipAct: 28, returnR: 18, cpa: 35, fees: 12 },
      electronics: { cost: 40, price: 110, shipCust: 15, shipAct: 25, returnR: 8, cpa: 25, fees: 8 },
      cosmetics: { cost: 30, price: 130, shipCust: 20, shipAct: 26, returnR: 7, cpa: 28, fees: 10 },
    },
  },
  {
    id: 'ae',
    nameAr: 'الإمارات',
    nameEn: 'UAE',
    flag: '🇦🇪',
    currencyCode: 'AED',
    currencySymbolAr: 'د.إ',
    currencySymbolEn: 'AED',
    defaultInputs: {
      productCost: 40,
      sellingPrice: 130,
      customerShippingFee: 15,
      actualShippingCost: 22,
      returnRate: 10,
      cpa: 28,
      extraFees: 8,
    },
    samplePresets: {
      fashion: { cost: 45, price: 150, shipCust: 15, shipAct: 24, returnR: 15, cpa: 32, fees: 10 },
      electronics: { cost: 35, price: 105, shipCust: 12, shipAct: 20, returnR: 7, cpa: 22, fees: 7 },
      cosmetics: { cost: 28, price: 120, shipCust: 15, shipAct: 22, returnR: 6, cpa: 25, fees: 8 },
    },
  },
  {
    id: 'kw',
    nameAr: 'الكويت',
    nameEn: 'Kuwait',
    flag: '🇰🇼',
    currencyCode: 'KWD',
    currencySymbolAr: 'د.ك',
    currencySymbolEn: 'KWD',
    defaultInputs: {
      productCost: 3.5,
      sellingPrice: 12.0,
      customerShippingFee: 1.5,
      actualShippingCost: 2.2,
      returnRate: 8,
      cpa: 2.5,
      extraFees: 0.8,
    },
    samplePresets: {
      fashion: { cost: 4.0, price: 14.0, shipCust: 1.5, shipAct: 2.5, returnR: 14, cpa: 3.0, fees: 1.0 },
      electronics: { cost: 3.0, price: 9.5, shipCust: 1.2, shipAct: 2.0, returnR: 6, cpa: 2.0, fees: 0.6 },
      cosmetics: { cost: 2.5, price: 11.0, shipCust: 1.5, shipAct: 2.2, returnR: 5, cpa: 2.2, fees: 0.7 },
    },
  },
  {
    id: 'qa',
    nameAr: 'قطر',
    nameEn: 'Qatar',
    flag: '🇶🇦',
    currencyCode: 'QAR',
    currencySymbolAr: 'ر.ق',
    currencySymbolEn: 'QAR',
    defaultInputs: {
      productCost: 42,
      sellingPrice: 135,
      customerShippingFee: 18,
      actualShippingCost: 26,
      returnRate: 9,
      cpa: 29,
      extraFees: 9,
    },
    samplePresets: {
      fashion: { cost: 48, price: 155, shipCust: 18, shipAct: 28, returnR: 16, cpa: 34, fees: 11 },
      electronics: { cost: 38, price: 110, shipCust: 15, shipAct: 24, returnR: 7, cpa: 24, fees: 8 },
      cosmetics: { cost: 30, price: 125, shipCust: 18, shipAct: 25, returnR: 6, cpa: 26, fees: 9 },
    },
  },
  {
    id: 'om',
    nameAr: 'عُمان',
    nameEn: 'Oman',
    flag: '🇴🇲',
    currencyCode: 'OMR',
    currencySymbolAr: 'ر.ع',
    currencySymbolEn: 'OMR',
    defaultInputs: {
      productCost: 4.5,
      sellingPrice: 15.0,
      customerShippingFee: 2.0,
      actualShippingCost: 2.8,
      returnRate: 11,
      cpa: 3.2,
      extraFees: 1.0,
    },
    samplePresets: {
      fashion: { cost: 5.0, price: 18.0, shipCust: 2.0, shipAct: 3.0, returnR: 16, cpa: 4.0, fees: 1.2 },
      electronics: { cost: 4.0, price: 12.0, shipCust: 1.5, shipAct: 2.5, returnR: 8, cpa: 2.8, fees: 0.8 },
      cosmetics: { cost: 3.2, price: 14.0, shipCust: 2.0, shipAct: 2.8, returnR: 7, cpa: 3.0, fees: 0.9 },
    },
  },
  {
    id: 'jo',
    nameAr: 'الأردن',
    nameEn: 'Jordan',
    flag: '🇯🇴',
    currencyCode: 'JOD',
    currencySymbolAr: 'د.أ',
    currencySymbolEn: 'JOD',
    defaultInputs: {
      productCost: 8,
      sellingPrice: 26,
      customerShippingFee: 3,
      actualShippingCost: 4.5,
      returnRate: 14,
      cpa: 5.5,
      extraFees: 1.5,
    },
    samplePresets: {
      fashion: { cost: 9, price: 30, shipCust: 3, shipAct: 4.8, returnR: 19, cpa: 6.5, fees: 1.8 },
      electronics: { cost: 7, price: 20, shipCust: 2.5, shipAct: 4.0, returnR: 9, cpa: 4.5, fees: 1.2 },
      cosmetics: { cost: 5.5, price: 23, shipCust: 3, shipAct: 4.2, returnR: 8, cpa: 5.0, fees: 1.4 },
    },
  },
  {
    id: 'global_usd',
    nameAr: 'دولي / دولار',
    nameEn: 'Global / USD',
    flag: '🌐',
    currencyCode: 'USD',
    currencySymbolAr: '$',
    currencySymbolEn: '$',
    defaultInputs: {
      productCost: 12,
      sellingPrice: 38,
      customerShippingFee: 4.99,
      actualShippingCost: 6.5,
      returnRate: 10,
      cpa: 8.5,
      extraFees: 2.5,
    },
    samplePresets: {
      fashion: { cost: 14, price: 45, shipCust: 4.99, shipAct: 7.0, returnR: 16, cpa: 10.0, fees: 3.0 },
      electronics: { cost: 10, price: 29.99, shipCust: 3.99, shipAct: 5.8, returnR: 7, cpa: 6.5, fees: 2.0 },
      cosmetics: { cost: 8, price: 32, shipCust: 4.99, shipAct: 6.0, returnR: 6, cpa: 7.5, fees: 2.2 },
    },
  },
];
