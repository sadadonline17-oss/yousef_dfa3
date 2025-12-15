// Payment Gateways Configuration for Each Country
// بوابات الدفع الحكومية لكل دولة (البوابة الرسمية فقط)

export interface PaymentGateway {
  id: string;
  name: string;
  nameAr: string;
  logo: string;
  countryCode: string;
  description: string;
}

export const paymentGateways: Record<string, PaymentGateway> = {
  SA: {
    id: 'sadad',
    name: 'SADAD',
    nameAr: 'سداد',
    logo: '/gov-sadad-logo-official.png',
    countryCode: 'SA',
    description: 'نظام المدفوعات الوطني السعودي'
  },
  KW: {
    id: 'knet',
    name: 'KNET',
    nameAr: 'كي نت',
    logo: '/gov-knet-logo.png',
    countryCode: 'KW',
    description: 'شبكة الكويت الوطنية للمدفوعات'
  },
  BH: {
    id: 'benefit',
    name: 'BENEFIT',
    nameAr: 'بنفت',
    logo: '/gov-benefit-logo-official.png',
    countryCode: 'BH',
    description: 'الشبكة الإلكترونية للمعاملات المالية'
  },
  AE: {
    id: 'jaywan',
    name: 'Jaywan',
    nameAr: 'جيوان',
    logo: '/gov-uae-logo.jpg',
    countryCode: 'AE',
    description: 'البطاقة الوطنية الإماراتية'
  },
  OM: {
    id: 'maal',
    name: 'Maal',
    nameAr: 'مال',
    logo: '/gov-maal-logo.jpg',
    countryCode: 'OM',
    description: 'البطاقة الوطنية العمانية'
  },
  QA: {
    id: 'qatar_gateway',
    name: 'Qatar Payment Gateway',
    nameAr: 'بوابة الدفع الحكومي',
    logo: '/gov-qatar-logo.png',
    countryCode: 'QA',
    description: 'بوابة الدفع الحكومي القطرية'
  }
};

/**
 * Get payment gateway for a specific country
 */
export const getPaymentGatewayByCountry = (countryCode: string): PaymentGateway | null => {
  const code = countryCode.toUpperCase();
  return paymentGateways[code] || null;
};
