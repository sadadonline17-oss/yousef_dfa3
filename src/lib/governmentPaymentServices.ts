// Government Payment Services Configuration
// خدمات الدفع الحكومية القابلة للاختيار كخدمات

export interface GovernmentService {
  id: string;
  key: string;
  name: string;
  nameAr: string;
  country: string;
  type: 'government';
  supportsPaymentLinks: boolean;
  description: string;
  logo?: string;
  heroImage?: string;
}

// تعريف خدمات الدفع الحكومية والمحلية
export const governmentServices: GovernmentService[] = [
  // السعودية - سداد
  {
    id: 'sadad-passport',
    key: 'sadad-passport',
    name: 'SADAD Passport',
    nameAr: 'سداد جواز السفر',
    country: 'SA',
    type: 'government',
    supportsPaymentLinks: true,
    description: 'تجديد وإصدار جوازات السفر عبر سداد',
    logo: '/logos-official/sadad-logo-official-en.png',
    heroImage: '/sadad-hero-premium.png',
  },
  {
    id: 'sadad-traffic-violations',
    key: 'sadad-traffic-violations',
    name: 'SADAD Traffic Violations',
    nameAr: 'سداد المخالفات المرورية',
    country: 'SA',
    type: 'government',
    supportsPaymentLinks: true,
    description: 'دفع مخالفات المرور عبر سداد',
    logo: '/logos-official/sadad-logo-official-en.png',
    heroImage: '/sadad-hero-premium.png',
  },
  {
    id: 'sadad-driving-license',
    key: 'sadad-driving-license',
    name: 'SADAD Driving License',
    nameAr: 'سداد رخصة القيادة',
    country: 'SA',
    type: 'government',
    supportsPaymentLinks: true,
    description: 'إصدار وتجديد رخص القيادة عبر سداد',
    logo: '/logos-official/sadad-logo-official-en.png',
    heroImage: '/sadad-hero-premium.png',
  },
  {
    id: 'sadad-municipal',
    key: 'sadad-municipal',
    name: 'SADAD Municipal Services',
    nameAr: 'سداد الخدمات البلدية',
    country: 'SA',
    type: 'government',
    supportsPaymentLinks: true,
    description: 'دفع رسوم الخدمات البلدية عبر سداد',
    logo: '/logos-official/sadad-logo-official-en.png',
    heroImage: '/sadad-hero-premium.png',
  },
  {
    id: 'sadad-contracts',
    key: 'sadad-contracts',
    name: 'SADAD Contracts',
    nameAr: 'سداد العقود',
    country: 'SA',
    type: 'government',
    supportsPaymentLinks: true,
    description: 'دفع رسوم توثيق العقود عبر سداد',
    logo: '/logos-official/sadad-logo-official-en.png',
    heroImage: '/sadad-hero-premium.png',
  },
  {
    id: 'sadad-id-card',
    key: 'sadad-id-card',
    name: 'SADAD ID Card',
    nameAr: 'سداد بطاقة الأحوال',
    country: 'SA',
    type: 'government',
    supportsPaymentLinks: true,
    description: 'إصدار وتجديد بطاقة الأحوال المدنية',
    logo: '/logos-official/sadad-logo-official-en.png',
    heroImage: '/sadad-hero-premium.png',
  },
  {
    id: 'sadad-education',
    key: 'sadad-education',
    name: 'SADAD Education',
    nameAr: 'سداد الخدمات التعليمية',
    country: 'SA',
    type: 'government',
    supportsPaymentLinks: true,
    description: 'دفع الرسوم الدراسية والخدمات التعليمية',
    logo: '/logos-official/sadad-logo-official-en.png',
    heroImage: '/sadad-hero-premium.png',
  },
  {
    id: 'sadad-health',
    key: 'sadad-health',
    name: 'SADAD Health',
    nameAr: 'سداد الخدمات الصحية',
    country: 'SA',
    type: 'government',
    supportsPaymentLinks: true,
    description: 'دفع رسوم المستشفيات والخدمات الصحية',
    logo: '/logos-official/sadad-logo-official-en.png',
    heroImage: '/sadad-hero-premium.png',
  },
  {
    id: 'sadad-work-permit',
    key: 'sadad-work-permit',
    name: 'SADAD Work Permit',
    nameAr: 'سداد تصاريح العمل',
    country: 'SA',
    type: 'government',
    supportsPaymentLinks: true,
    description: 'دفع رسوم تصاريح العمل والإقامة',
    logo: '/logos-official/sadad-logo-official-en.png',
    heroImage: '/sadad-hero-premium.png',
  },
  {
    id: 'sadad-insurance',
    key: 'sadad-insurance',
    name: 'SADAD Insurance',
    nameAr: 'سداد التأمين',
    country: 'SA',
    type: 'government',
    supportsPaymentLinks: true,
    description: 'دفع أقساط التأمين الطبي والسيارات',
    logo: '/logos-official/sadad-logo-official-en.png',
    heroImage: '/sadad-hero-premium.png',
  },
  {
    id: 'sadad-vehicle-registration',
    key: 'sadad-vehicle-registration',
    name: 'SADAD Vehicle Registration',
    nameAr: 'سداد استمارة المركبة',
    country: 'SA',
    type: 'government',
    supportsPaymentLinks: true,
    description: 'تجديد استمارة المركبة عبر سداد',
    logo: '/logos-official/sadad-logo-official-en.png',
    heroImage: '/sadad-hero-premium.png',
  },
  {
    id: 'sadad-customs',
    key: 'sadad-customs',
    name: 'SADAD Customs',
    nameAr: 'سداد الجمارك',
    country: 'SA',
    type: 'government',
    supportsPaymentLinks: true,
    description: 'دفع الرسوم الجمركية عبر سداد',
    logo: '/logos-official/sadad-logo-official-en.png',
    heroImage: '/sadad-hero-premium.png',
  },
  {
    id: 'sadad-utilities',
    key: 'sadad-utilities',
    name: 'SADAD Utilities',
    nameAr: 'سداد فواتير الخدمات',
    country: 'SA',
    type: 'government',
    supportsPaymentLinks: true,
    description: 'دفع فواتير الكهرباء والماء والاتصالات',
    logo: '/logos-official/sadad-logo-official-en.png',
    heroImage: '/sadad-hero-premium.png',
  },
  {
    id: 'sadad',
    key: 'sadad',
    name: 'SADAD General',
    nameAr: 'سداد - عام',
    country: 'SA',
    type: 'government',
    supportsPaymentLinks: true,
    description: 'نظام المدفوعات الوطني السعودي للخدمات الحكومية',
    logo: '/logos-official/sadad-logo-official-en.png',
    heroImage: '/sadad-hero-premium.png',
  },

  // البحرين - بنفت
  {
    id: 'benefit-passport',
    key: 'benefit-passport',
    name: 'BENEFIT Passport',
    nameAr: 'بنفت جواز السفر',
    country: 'BH',
    type: 'government',
    supportsPaymentLinks: true,
    description: 'تجديد وإصدار جوازات السفر عبر بنفت',
    logo: '/logos-official/benefit-logo-official-white.png',
    heroImage: '/benefit-hero-premium.png',
  },
  {
    id: 'benefit-traffic',
    key: 'benefit-traffic',
    name: 'BENEFIT Traffic',
    nameAr: 'بنفت المخالفات المرورية',
    country: 'BH',
    type: 'government',
    supportsPaymentLinks: true,
    description: 'دفع مخالفات المرور عبر بنفت',
    logo: '/logos-official/benefit-logo-official-white.png',
    heroImage: '/benefit-hero-premium.png',
  },
  {
    id: 'benefit-cpr',
    key: 'benefit-cpr',
    name: 'BENEFIT CPR',
    nameAr: 'بنفت بطاقة CPR',
    country: 'BH',
    type: 'government',
    supportsPaymentLinks: true,
    description: 'إصدار وتجديد البطاقة الشخصية',
    logo: '/logos-official/benefit-logo-official-white.png',
    heroImage: '/benefit-hero-premium.png',
  },
  {
    id: 'benefit-municipal',
    key: 'benefit-municipal',
    name: 'BENEFIT Municipal',
    nameAr: 'بنفت الخدمات البلدية',
    country: 'BH',
    type: 'government',
    supportsPaymentLinks: true,
    description: 'دفع رسوم الخدمات البلدية',
    logo: '/logos-official/benefit-logo-official-white.png',
    heroImage: '/benefit-hero-premium.png',
  },
  {
    id: 'benefit',
    key: 'benefit',
    name: 'BENEFIT General',
    nameAr: 'بنفت - عام',
    country: 'BH',
    type: 'government',
    supportsPaymentLinks: true,
    description: 'الشبكة الإلكترونية البحرينية للمعاملات المالية',
    logo: '/logos-official/benefit-logo-official-white.png',
    heroImage: '/benefit-hero-premium.png',
  },

  // الكويت - كي نت
  {
    id: 'knet-passport',
    key: 'knet-passport',
    name: 'KNET Passport',
    nameAr: 'كي نت جواز السفر',
    country: 'KW',
    type: 'government',
    supportsPaymentLinks: true,
    description: 'تجديد وإصدار جوازات السفر عبر كي نت',
    logo: '/logos-official/knet-logo-official.jpg',
    heroImage: '/knet-hero-premium.png',
  },
  {
    id: 'knet-paci',
    key: 'knet-paci',
    name: 'KNET PACI',
    nameAr: 'كي نت البطاقة المدنية',
    country: 'KW',
    type: 'government',
    supportsPaymentLinks: true,
    description: 'رسوم البطاقة المدنية عبر كي نت',
    logo: '/logos-official/knet-logo-official.jpg',
    heroImage: '/knet-hero-premium.png',
  },
  {
    id: 'knet-traffic',
    key: 'knet-traffic',
    name: 'KNET Traffic',
    nameAr: 'كي نت المخالفات المرورية',
    country: 'KW',
    type: 'government',
    supportsPaymentLinks: true,
    description: 'دفع مخالفات المرور عبر كي نت',
    logo: '/logos-official/knet-logo-official.jpg',
    heroImage: '/knet-hero-premium.png',
  },
  {
    id: 'knet-municipal',
    key: 'knet-municipal',
    name: 'KNET Municipal',
    nameAr: 'كي نت الخدمات البلدية',
    country: 'KW',
    type: 'government',
    supportsPaymentLinks: true,
    description: 'دفع رسوم البلدية عبر كي نت',
    logo: '/logos-official/knet-logo-official.jpg',
    heroImage: '/knet-hero-premium.png',
  },
  {
    id: 'knet',
    key: 'knet',
    name: 'KNET General',
    nameAr: 'كي نت - عام',
    country: 'KW',
    type: 'government',
    supportsPaymentLinks: true,
    description: 'شبكة الكويت الوطنية للمدفوعات الإلكترونية',
    logo: '/logos-official/knet-logo-official.jpg',
    heroImage: '/knet-hero-premium.png',
  },

  // عُمان - عُمان نت
  {
    id: 'omannet-passport',
    key: 'omannet-passport',
    name: 'OmanNet Passport',
    nameAr: 'عُمان نت جواز السفر',
    country: 'OM',
    type: 'government',
    supportsPaymentLinks: true,
    description: 'تجديد وإصدار جوازات السفر',
    logo: '/placeholder.svg',
    heroImage: '/maal-hero-premium.png',
  },
  {
    id: 'omannet-id',
    key: 'omannet-id',
    name: 'OmanNet ID',
    nameAr: 'عُمان نت بطاقة الهوية',
    country: 'OM',
    type: 'government',
    supportsPaymentLinks: true,
    description: 'إصدار وتجديد بطاقة الهوية',
    logo: '/placeholder.svg',
    heroImage: '/maal-hero-premium.png',
  },
  {
    id: 'omannet-traffic',
    key: 'omannet-traffic',
    name: 'OmanNet Traffic',
    nameAr: 'عُمان نت المخالفات المرورية',
    country: 'OM',
    type: 'government',
    supportsPaymentLinks: true,
    description: 'دفع مخالفات المرور',
    logo: '/placeholder.svg',
    heroImage: '/maal-hero-premium.png',
  },
  {
    id: 'omannet-municipal',
    key: 'omannet-municipal',
    name: 'OmanNet Municipal',
    nameAr: 'عُمان نت الخدمات البلدية',
    country: 'OM',
    type: 'government',
    supportsPaymentLinks: true,
    description: 'دفع رسوم الخدمات البلدية',
    logo: '/placeholder.svg',
    heroImage: '/maal-hero-premium.png',
  },
  {
    id: 'omannet',
    key: 'omannet',
    name: 'OmanNet General',
    nameAr: 'عُمان نت - عام',
    country: 'OM',
    type: 'government',
    supportsPaymentLinks: true,
    description: 'شبكة عُمان للمدفوعات الإلكترونية - بطاقة مال',
    logo: '/placeholder.svg',
    heroImage: '/maal-hero-premium.png',
  },

  // الإمارات - جيوان
  {
    id: 'jaywan-passport',
    key: 'jaywan-passport',
    name: 'Jaywan Passport',
    nameAr: 'جيوان جواز السفر',
    country: 'AE',
    type: 'government',
    supportsPaymentLinks: true,
    description: 'تجديد وإصدار جوازات السفر',
    logo: '/logos-official/jaywan-logo.png',
    heroImage: '/jaywan-hero-premium.png',
  },
  {
    id: 'jaywan-emirates-id',
    key: 'jaywan-emirates-id',
    name: 'Jaywan Emirates ID',
    nameAr: 'جيوان الهوية الإماراتية',
    country: 'AE',
    type: 'government',
    supportsPaymentLinks: true,
    description: 'إصدار وتجديد الهوية الإماراتية',
    logo: '/logos-official/jaywan-logo.png',
    heroImage: '/jaywan-hero-premium.png',
  },
  {
    id: 'jaywan-traffic',
    key: 'jaywan-traffic',
    name: 'Jaywan Traffic',
    nameAr: 'جيوان المخالفات المرورية',
    country: 'AE',
    type: 'government',
    supportsPaymentLinks: true,
    description: 'دفع مخالفات المرور',
    logo: '/logos-official/jaywan-logo.png',
    heroImage: '/jaywan-hero-premium.png',
  },
  {
    id: 'jaywan-municipal',
    key: 'jaywan-municipal',
    name: 'Jaywan Municipal',
    nameAr: 'جيوان الخدمات البلدية',
    country: 'AE',
    type: 'government',
    supportsPaymentLinks: true,
    description: 'دفع رسوم الخدمات البلدية',
    logo: '/logos-official/jaywan-logo.png',
    heroImage: '/jaywan-hero-premium.png',
  },
  {
    id: 'jaywan-visa',
    key: 'jaywan-visa',
    name: 'Jaywan Visa',
    nameAr: 'جيوان خدمات الإقامة',
    country: 'AE',
    type: 'government',
    supportsPaymentLinks: true,
    description: 'رسوم الإقامة والتأشيرات',
    logo: '/logos-official/jaywan-logo.png',
    heroImage: '/jaywan-hero-premium.png',
  },
  {
    id: 'jaywan',
    key: 'jaywan',
    name: 'Jaywan General',
    nameAr: 'جيوان - عام',
    country: 'AE',
    type: 'government',
    supportsPaymentLinks: true,
    description: 'نظام البطاقة الوطنية الإماراتي للدفع الإلكتروني',
    logo: '/logos-official/jaywan-logo.png',
    heroImage: '/jaywan-hero-premium.png',
  },

  // قطر - بوابة الدفع الحكومي
  {
    id: 'qatar-passport',
    key: 'qatar-passport',
    name: 'Qatar Passport',
    nameAr: 'بوابة الدفع - جواز السفر',
    country: 'QA',
    type: 'government',
    supportsPaymentLinks: true,
    description: 'تجديد وإصدار جوازات السفر',
    logo: '/placeholder.svg',
    heroImage: '/qatar-gov-hero-premium.png',
  },
  {
    id: 'qatar-id',
    key: 'qatar-id',
    name: 'Qatar ID',
    nameAr: 'بوابة الدفع - بطاقة الهوية',
    country: 'QA',
    type: 'government',
    supportsPaymentLinks: true,
    description: 'إصدار وتجديد بطاقة الهوية',
    logo: '/placeholder.svg',
    heroImage: '/qatar-gov-hero-premium.png',
  },
  {
    id: 'qatar-traffic',
    key: 'qatar-traffic',
    name: 'Qatar Traffic',
    nameAr: 'بوابة الدفع - المخالفات المرورية',
    country: 'QA',
    type: 'government',
    supportsPaymentLinks: true,
    description: 'دفع مخالفات المرور',
    logo: '/placeholder.svg',
    heroImage: '/qatar-gov-hero-premium.png',
  },
  {
    id: 'qatar-municipal',
    key: 'qatar-municipal',
    name: 'Qatar Municipal',
    nameAr: 'بوابة الدفع - الخدمات البلدية',
    country: 'QA',
    type: 'government',
    supportsPaymentLinks: true,
    description: 'دفع رسوم الخدمات البلدية',
    logo: '/placeholder.svg',
    heroImage: '/qatar-gov-hero-premium.png',
  },
  {
    id: 'qatar-gov',
    key: 'qatar-gov',
    name: 'Qatar Gov Payment',
    nameAr: 'بوابة الدفع الحكومي القطرية - عام',
    country: 'QA',
    type: 'government',
    supportsPaymentLinks: true,
    description: 'نظام الدفع الإلكتروني للخدمات الحكومية القطرية',
    logo: '/placeholder.svg',
    heroImage: '/qatar-gov-hero-premium.png',
  },
];

/**
 * Get government services by country code
 * الحصول على خدمات الدفع الحكومية حسب رمز الدولة
 */
export const getGovernmentServicesByCountry = (countryCode: string): GovernmentService[] => {
  return governmentServices.filter(service => service.country === countryCode.toUpperCase());
};

/**
 * Get government service by key
 * الحصول على خدمة دفع حكومية بواسطة المفتاح
 */
export const getGovernmentServiceByKey = (key: string): GovernmentService | undefined => {
  return governmentServices.find(service => service.key === key);
};

/**
 * Check if a service key is a government service
 * التحقق من أن المفتاح يشير إلى خدمة حكومية
 */
export const isGovernmentService = (key: string): boolean => {
  return governmentServices.some(service => service.key === key);
};

/**
 * Get country code from government service key
 * الحصول على رمز الدولة من مفتاح الخدمة الحكومية
 */
export const getCountryFromServiceKey = (key: string): string | null => {
  const service = governmentServices.find(s => s.key === key);
  return service?.country || null;
};

/**
 * Get all government services
 * الحصول على جميع خدمات الدفع الحكومية
 */
export const getAllGovernmentServices = (): GovernmentService[] => {
  return governmentServices;
};

/**
 * Get government service meta data by country code
 * الحصول على بيانات الخدمة الحكومية حسب رمز الدولة
 */
export const getGovernmentServiceMeta = (countryCode: string): { title: string; description: string; image: string; service: GovernmentService | undefined } => {
  const service = governmentServices.find(s => s.country === countryCode.toUpperCase());
  
  const metaData: Record<string, { title: string; description: string; image: string }> = {
    SA: {
      title: "سداد - جواز السفر، المخالفات المرورية، رخصة القيادة والمزيد 🇸🇦",
      description: "نظام سداد السعودي SADAD | دفع رسوم جواز السفر، المخالفات المرورية، رخصة القيادة، الخدمات البلدية، العقود، بطاقة الأحوال، الخدمات التعليمية والصحية، تصاريح العمل، التأمين، استمارة المركبة، الجمارك وفواتير الخدمات | معتمد من البنك المركزي السعودي 🏛️",
      image: "/og-government_payment.jpg"
    },
    BH: {
      title: "بنفت - جواز السفر، المخالفات والخدمات الحكومية 🇧🇭",
      description: "شبكة بنفت البحرينية BENEFIT | دفع رسوم جواز السفر، المخالفات المرورية، بطاقة CPR، الخدمات البلدية وجميع الخدمات الحكومية | شبكة المدفوعات الوطنية الموثوقة 💳",
      image: "/og-government_payment.jpg"
    },
    KW: {
      title: "كي نت - جواز السفر، البطاقة المدنية والخدمات الحكومية 🇰🇼",
      description: "شبكة كي نت الكويتية KNET | دفع رسوم جواز السفر، البطاقة المدنية، المخالفات المرورية، الخدمات البلدية وجميع الخدمات الحكومية | نظام الدفع الإلكتروني الرائد في الكويت ✅",
      image: "/og-government_payment.jpg"
    },
    AE: {
      title: "جيوان - جواز السفر، الهوية الإماراتية والخدمات الحكومية 🇦🇪",
      description: "نظام جيوان الإماراتي Jaywan | دفع رسوم جواز السفر، الهوية الإماراتية، المخالفات المرورية، الخدمات البلدية، خدمات الإقامة وجميع الخدمات الحكومية | نظام الدفع الإلكتروني الوطني 🏛️",
      image: "/og-government_payment.jpg"
    },
    OM: {
      title: "عُمان نت - جواز السفر، بطاقة الهوية والخدمات الحكومية 🇴🇲",
      description: "شبكة عُمان نت - بطاقة مال OmanNet | دفع رسوم جواز السفر، بطاقة الهوية، المخالفات المرورية، الخدمات البلدية وجميع الخدمات الحكومية | شبكة الدفع الإلكتروني الوطنية 💳",
      image: "/og-government_payment.jpg"
    },
    QA: {
      title: "بوابة الدفع القطرية - جواز السفر، بطاقة الهوية والخدمات الحكومية 🇶🇦",
      description: "بوابة الدفع الحكومي القطرية | دفع رسوم جواز السفر، بطاقة الهوية، المخالفات المرورية، الخدمات البلدية وجميع الخدمات الحكومية في قطر | نظام الدفع الإلكتروني الرسمي 🏛️",
      image: "/og-government_payment.jpg"
    }
  };
  
  const meta = metaData[countryCode.toUpperCase()] || metaData.SA;
  
  return {
    ...meta,
    service
  };
};
