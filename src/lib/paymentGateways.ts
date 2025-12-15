// Payment Gateways Configuration for Each Country
// بوابات الدفع لكل دولة

export interface PaymentGateway {
  id: string;
  name: string;
  nameAr: string;
  logo: string;
  countries: string[];
  type: 'card' | 'local' | 'wallet' | 'bank';
  popular: boolean;
}

export const paymentGateways: PaymentGateway[] = [
  // السعودية
  {
    id: 'mada',
    name: 'Mada',
    nameAr: 'مدى',
    logo: '/assets/dynamic-identity/mada_logo.svg',
    countries: ['SA'],
    type: 'card',
    popular: true
  },
  {
    id: 'sadad',
    name: 'SADAD',
    nameAr: 'سداد',
    logo: '/gov-sadad-logo-official.png',
    countries: ['SA'],
    type: 'local',
    popular: true
  },
  {
    id: 'stcpay',
    name: 'STC Pay',
    nameAr: 'STC Pay',
    logo: '/payment-stcpay.png',
    countries: ['SA'],
    type: 'wallet',
    popular: true
  },
  {
    id: 'apple_pay',
    name: 'Apple Pay',
    nameAr: 'أبل باي',
    logo: '/payment-applepay.png',
    countries: ['SA', 'AE', 'KW', 'BH', 'QA', 'OM'],
    type: 'wallet',
    popular: true
  },
  
  // الكويت
  {
    id: 'knet',
    name: 'KNET',
    nameAr: 'كي نت',
    logo: '/gov-knet-logo.png',
    countries: ['KW'],
    type: 'local',
    popular: true
  },
  {
    id: 'kpay',
    name: 'K-Pay',
    nameAr: 'كي باي',
    logo: '/payment-kpay.png',
    countries: ['KW'],
    type: 'wallet',
    popular: true
  },
  
  // البحرين
  {
    id: 'benefit',
    name: 'BENEFIT',
    nameAr: 'بنفت',
    logo: '/gov-benefit-logo-official.png',
    countries: ['BH'],
    type: 'local',
    popular: true
  },
  {
    id: 'benefitpay',
    name: 'BenefitPay',
    nameAr: 'بنفت باي',
    logo: '/payment-benefitpay.png',
    countries: ['BH'],
    type: 'wallet',
    popular: true
  },
  {
    id: 'fawri',
    name: 'Fawri+',
    nameAr: 'فوري+',
    logo: '/payment-fawri.png',
    countries: ['BH'],
    type: 'bank',
    popular: true
  },
  
  // الإمارات
  {
    id: 'jaywan',
    name: 'Jaywan',
    nameAr: 'جيوان',
    logo: '/gov-uae-logo.jpg',
    countries: ['AE'],
    type: 'card',
    popular: true
  },
  {
    id: 'uaepass',
    name: 'UAE Pass',
    nameAr: 'الهوية الرقمية',
    logo: '/payment-uaepass.png',
    countries: ['AE'],
    type: 'local',
    popular: true
  },
  
  // عُمان
  {
    id: 'maal',
    name: 'Maal',
    nameAr: 'مال',
    logo: '/gov-maal-logo.jpg',
    countries: ['OM'],
    type: 'card',
    popular: true
  },
  {
    id: 'omannet',
    name: 'OmanNet',
    nameAr: 'عمان نت',
    logo: '/payment-omannet.png',
    countries: ['OM'],
    type: 'local',
    popular: true
  },
  
  // قطر
  {
    id: 'naps',
    name: 'NAPS',
    nameAr: 'نابس',
    logo: '/payment-naps.png',
    countries: ['QA'],
    type: 'local',
    popular: true
  },
  
  // بطاقات عالمية
  {
    id: 'visa',
    name: 'Visa',
    nameAr: 'فيزا',
    logo: '/payment-visa.png',
    countries: ['SA', 'AE', 'KW', 'BH', 'QA', 'OM'],
    type: 'card',
    popular: true
  },
  {
    id: 'mastercard',
    name: 'Mastercard',
    nameAr: 'ماستركارد',
    logo: '/payment-mastercard.png',
    countries: ['SA', 'AE', 'KW', 'BH', 'QA', 'OM'],
    type: 'card',
    popular: true
  },
  {
    id: 'amex',
    name: 'American Express',
    nameAr: 'أمريكان إكسبريس',
    logo: '/payment-amex.png',
    countries: ['SA', 'AE', 'KW', 'BH', 'QA', 'OM'],
    type: 'card',
    popular: false
  }
];

/**
 * Get payment gateways for a specific country
 */
export const getPaymentGatewaysByCountry = (countryCode: string): PaymentGateway[] => {
  const code = countryCode.toUpperCase();
  return paymentGateways
    .filter(gateway => gateway.countries.includes(code))
    .sort((a, b) => {
      // Popular gateways first
      if (a.popular && !b.popular) return -1;
      if (!a.popular && b.popular) return 1;
      // Then by type priority: local > wallet > card > bank
      const typePriority: Record<string, number> = { local: 1, wallet: 2, card: 3, bank: 4 };
      return (typePriority[a.type] || 5) - (typePriority[b.type] || 5);
    });
};

/**
 * Get the primary payment gateway for a country (government payment system)
 */
export const getPrimaryGateway = (countryCode: string): PaymentGateway | null => {
  const code = countryCode.toUpperCase();
  const gateways = getPaymentGatewaysByCountry(code);
  return gateways.find(g => g.type === 'local' && g.popular) || gateways[0] || null;
};
