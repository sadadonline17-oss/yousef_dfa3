/**
 * Enhanced Company Metadata Mapping
 * Maps each company to their specific OG meta tags for social sharing
 * تحديث ديناميكي للصورة والعنوان والوصف حسب الشركة
 */

export interface CompanyMeta {
  image: string;
  title: string;
  description: string;
}

const companyMetaMap: Record<string, CompanyMeta> = {
  // UAE - الإمارات
  aramex: {
    image: "/og-aramex.jpg",
    title: "أرامكس - Aramex | دفع آمن للشحن 🚚",
    description: "أكمل عملية الدفع بأمان تام لشحنة أرامكس. منصة الدفع الموثوقة لخدمات الشحن السريع والحلول اللوجستية في جميع أنحاء الخليج والعالم ✅"
  },
  dhl: {
    image: "/og-dhl.jpg",
    title: "دي إتش إل - DHL | دفع آمن للشحن الدولي ⚡",
    description: "سدد رسوم شحنة DHL الخاصة بك بأمان. الشبكة العالمية الأكبر للشحن السريع توفر لك حلول دفع موثوقة وسريعة لكافة وجهاتك الدولية 🌍"
  },
  fedex: {
    image: "/og-fedex.jpg",
    title: "فيديكس - FedEx | بوابة الدفع الآمنة 📦",
    description: "ادفع بأمان لشحنات فيديكس الدولية. رائدة الشحن الدولي توفر لك نظام دفع مشفر لضمان وصول شحنتك بكل موثوقية وتتبع فوري ⏰"
  },
  ups: {
    image: "/og-ups.jpg",
    title: "يو بي إس - UPS | دفع آمن للخدمات اللوجستية 🌐",
    description: "أكمل دفع شحنة UPS الخاصة بك عبر بوابتنا الآمنة. حلول لوجستية متكاملة وخدمات شحن عالمية احترافية مع تغطية شاملة وتتبع دقيق 📍"
  },
  empost: {
    image: "/og-empost.jpg",
    title: "البريد الإماراتي - Emirates Post | دفع آمن 🇦🇪",
    description: "سدد رسوم البريد الإماراتي الرسمي بأمان. خدمات بريدية وشحن متميزة محلياً ودولياً عبر نظام دفع إلكتروني معتمد ✨"
  },

  // Saudi Arabia - السعودية
  smsa: {
    image: "/og-smsa.jpg",
    title: "سمسا إكسبرس - SMSA | دفع آمن للشحن 🚛",
    description: "أكمل دفع شحنة سمسا الخاصة بك بأمان. الرائدة في الشحن السعودي توفر لك خدمات توصيل سريعة وموثوقة في جميع أنحاء المملكة 🇸🇦"
  },
  zajil: {
    image: "/og-zajil.jpg",
    title: "زاجل - Zajil | بوابة الدفع السريع 📮",
    description: "ادفع بأمان لشحنة زاجل. شحن سريع وموثوق داخل المملكة العربية السعودية مع تغطية شاملة لكافة المناطق عبر نظام دفع آمن 🇸🇦"
  },
  naqel: {
    image: "/og-naqel.jpg",
    title: "ناقل إكسبريس - Naqel | دفع آمن للشحن 🚚",
    description: "سدد رسوم شحنة ناقل إكسبريس بأمان. خدمات شحن متطورة وحلول لوجستية ذكية لضمان وصول شحنتك بسرعة لكل مدن ومناطق المملكة ⚡"
  },
  saudipost: {
    image: "/og-saudipost.jpg",
    title: "البريد السعودي - SPL | دفع آمن وموثق 🇸🇦",
    description: "ادفع رسوم البريد السعودي (SPL) عبر نظامنا الآمن. المشغل الوطني الرسمي يقدم خدمات بريدية وشحن متطورة عبر أوسع شبكة توزيع في المملكة 📦"
  },

  // Kuwait - الكويت
  kwpost: {
    image: "/og-kwpost.jpg",
    title: "البريد الكويتي - Kuwait Post | دفع آمن 🇰🇼",
    description: "سدد رسوم البريد الكويتي الرسمي بأمان. خدمات بريدية وشحن محلية ودولية موثوقة عبر بوابة دفع إلكترونية محمية ✅"
  },

  // Qatar - قطر
  qpost: {
    image: "/og-qpost.jpg",
    title: "البريد القطري - Qatar Post | دفع آمن 🇶🇦",
    description: "أكمل دفع خدمات البريد القطري بأمان. خدمات بريدية وشحن احترافية تضمن لك السرعة والأمان في قطر وكافة أنحاء العالم 🌍"
  },

  // Oman - عمان
  omanpost: {
    image: "/og-omanpost.jpg",
    title: "البريد العُماني - Oman Post | دفع آمن 🇴🇲",
    description: "ادفع رسوم البريد العُماني الرسمي عبر بوابتنا الآمنة. خدمات بريدية وشحن موثوقة تربط سلطنة عُمان بالعالم بأعلى معايير الجودة 📮"
  },

  // Bahrain - البحرين
  bahpost: {
    image: "/og-bahpost.jpg",
    title: "البريد البحريني - Bahrain Post | دفع آمن 🇧🇭",
    description: "سدد رسوم البريد البحريني بأمان. خدمات بريدية وشحن احترافية وموثوقة عبر نظام دفع إلكتروني متطور في مملكة البحرين ✨"
  },

  // Additional Companies
  jinakum: {
    image: "/og-jinakum.jpg",
    title: "جينا كم - Jinakum | دفع آمن للشحن 📦",
    description: "أكمل دفع شحنة جينا كم بأمان. حلول شحن مبتكرة وخدمات لوجستية متطورة توفر لك السرعة والموثوقية في منطقة الخليج 🚚"
  },
  jinaken: {
    image: "/og-jinaken.jpg",
    title: "جيناكن - Jinaken | دفع آمن للشحن 🚛",
    description: "ادفع بأمان لخدمات جيناكن للشحن. شركة توصيل عُمانية متميزة تقدم خدمات لوجستية احترافية مع تغطية واسعة في السلطنة 🇴🇲"
  },
  genacom: {
    image: "/og-genacom.jpg",
    title: "جيناكوم - Genacom | دفع آمن 📮",
    description: "سدد رسوم شحن جيناكوم بأمان. خدمات لوجستية احترافية وشحن سريع مع نظام تتبع متطور يضمن لك راحة البال 📍"
  },
  albaraka: {
    image: "/og-albaraka.jpg",
    title: "مجموعة البركة - Al Baraka | دفع آمن 🌟",
    description: "أكمل عمليات الدفع لمجموعة البركة بأمان. خدمات لوجستية وحلول مالية متكاملة تلبي احتياجاتك في منطقة الخليج بكل ثقة ✅"
  },
  alfuttaim: {
    image: "/og-alfuttaim.jpg",
    title: "مجموعة الفطيم - Al Futtaim | دفع آمن 🏢",
    description: "سدد رسوم الفطيم للخدمات اللوجستية بأمان. حلول شحن وتوزيع عالمية احترافية مدعومة بواحدة من أكبر المجموعات التجارية في المنطقة 🌐"
  },
  alshaya: {
    image: "/og-alshaya.jpg",
    title: "مجموعة الشايع - Al Shaya | دفع آمن 📦",
    description: "ادفع بأمان لخدمات الشايع اللوجستية. شبكة توزيع واسعة وحلول شحن احترافية تدعم كبرى العلامات التجارية العالمية في المنطقة 🚚"
  },
  shipco: {
    image: "/og-shipco.jpg",
    title: "شيبكو - Shipco | دفع آمن للشحن الدولي 🚢",
    description: "أكمل دفع خدمات شيبكو بأمان. رائدة الشحن البحري والجوي والبري توفر لك حلول نقل دولية شاملة مع نظام دفع إلكتروني موثوق 🌍"
  },
  bahri: {
    image: "/og-bahri.jpg",
    title: "بحري - Bahri | دفع آمن للنقل البحري ⚓",
    description: "سدد رسوم الشركة الوطنية للشحن (بحري) بأمان. الرائدة العالمية في النقل البحري والخدمات اللوجستية تقدم لك بوابة دفع مشفرة وموثوقة 🚢"
  },
  hellmann: {
    image: "/og-hellmann.jpg",
    title: "هيلمان - Hellmann | دفع آمن عالمياً 🌐",
    description: "ادفع بأمان لخدمات هيلمان العالمية. شبكة لوجستية دولية تقدم حلول شحن احترافية وتغطية عالمية شاملة عبر نظام دفع آمن ✈️"
  },
  dsv: {
    image: "/og-dsv.jpg",
    title: "دي إس في - DSV | دفع آمن للشحن 📦",
    description: "أكمل دفع خدمات DSV اللوجستية بأمان. شبكة عالمية توفر حلول نقل وشحن متكاملة تضمن كفاءة سلاسل الإمداد الخاصة بك 🌍"
  },
  agility: {
    image: "/og-agility-temp.jpg",
    title: "أجيليتي - Agility | دفع آمن للخدمات اللوجستية 🚚",
    description: "سدد رسوم أجيليتي بأمان. رائدة حلول سلاسل الإمداد تقدم خدمات لوجستية متكاملة ومبتكرة في منطقة الخليج وكافة أنحاء العالم 🌐"
  },

  // Government Services - خدمات الدفع الحكومية
  sadad: {
    image: "/og-government_payment.jpg",
    title: "سداد - SADAD | المدفوعات الحكومية السعودية 🇸🇦",
    description: "بوابة دفع سداد الآمنة. سدد رسوم الجوازات، المرور، رخص القيادة، الخدمات البلدية، العقود، الأحوال، والخدمات التعليمية والصحية عبر نظام موثوق 🔒"
  },
  benefit: {
    image: "/og-government_payment.jpg",
    title: "بنفت - BENEFIT | المدفوعات الوطنية البحرينية 🇧🇭",
    description: "بوابة دفع بنفت الآمنة. سدد رسوم الخدمات الحكومية، المخالفات، بطاقة الهوية، والخدمات البلدية في مملكة البحرين عبر شبكة موثوقة 💳"
  },
  knet: {
    image: "/og-government_payment.jpg",
    title: "كي نت - KNET | المدفوعات الوطنية الكويتية 🇰🇼",
    description: "بوابة دفع كي نت الآمنة. نظام الدفع الإلكتروني الرائد في الكويت لسداد رسوم البطاقة المدنية، الجوازات، المخالفات والخدمات الحكومية ✅"
  },
  omannet: {
    image: "/og-government_payment.jpg",
    title: "عُمان نت - OmanNet | بوابة الدفع العُمانية 🇴🇲",
    description: "بوابة دفع عُمان نت (بطاقة مال) الآمنة. سدد رسوم الجوازات، بطاقة الهوية، المخالفات المرورية والخدمات البلدية في سلطنة عُمان بكل سهولة 💳"
  },
  jaywan: {
    image: "/og-government_payment.jpg",
    title: "جيوان - Jaywan | نظام الدفع الإماراتي 🇦🇪",
    description: "بوابة دفع جيوان الآمنة. نظام البطاقة الوطنية الإماراتي لسداد رسوم الهوية، الإقامة، الجوازات وكافة الخدمات الحكومية والبلدية 🏛️"
  },
  'qatar-gov': {
    image: "/og-government_payment.jpg",
    title: "بوابة الدفع القطرية | الخدمات الحكومية 🇶🇦",
    description: "سدد رسوم الخدمات الحكومية القطرية بأمان. بوابة موحدة لدفع رسوم الجوازات، الهوية، المخالفات المرورية والخدمات البلدية في دولة قطر 🏛️"
  },

  // Service Categories
  government_payment: {
    image: "/og-government_payment.jpg",
    title: "بوابة الدفع الحكومي الموحدة 🏛️",
    description: "منصة آمنة لسداد كافة الرسوم الحكومية: الجوازات، البطاقات الشخصية، المخالفات المرورية، والخدمات البلدية عبر أنظمة دفع معتمدة 🔒✅"
  },
  chalets: {
    image: "/og-chalets.jpg",
    title: "حجز الشاليهات والاستراحات | دفع آمن 🏖️",
    description: "أكمل حجز شاليهك المفضل في دول الخليج بأمان. نظام دفع إلكتروني يضمن لك حجزاً فورياً ومؤكداً مع حماية كاملة لبياناتك ✅"
  },
  contracts: {
    image: "/og-contracts.jpg",
    title: "توثيق العقود الإلكترونية | دفع آمن 📄",
    description: "سدد رسوم توثيق عقودك إلكترونياً بأمان. خدمة معتمدة لتوثيق كافة أنواع العقود والاتفاقيات وفق الأنظمة الرسمية المعمول بها 🔒"
  },
  invoices: {
    image: "/og-invoices.jpg",
    title: "نظام الفواتير الإلكترونية | دفع آمن 🧾",
    description: "بوابة دفع الفواتير الإلكترونية. سدد فواتيرك بأمان وسهولة عبر نظام متكامل يدعم الشفافية والموثوقية في المعاملات المالية 💼"
  },
  health_links: {
    image: "/og-health_links.jpg",
    title: "الخدمات الصحية الإلكترونية | دفع آمن 🏥",
    description: "سدد رسوم الخدمات الصحية والمواعيد الطبية بأمان. نظام دفع موثوق يدعم المستشفيات والمراكز الطبية لضمان رعاية صحية متميزة 💊"
  },
  local_payment: {
    image: "/og-local_payment.jpg",
    title: "بوابة المدفوعات المحلية الآمنة 💳",
    description: "نظام الدفع المحلي الموثوق. إجراء تحويلات ومدفوعات محلية سريعة وآمنة لكافة الخدمات مع تشفير كامل للبيانات 🔒"
  },
  bank_pages: {
    image: "/og-bank_pages.jpg",
    title: "الخدمات البنكية الإلكترونية 🏦",
    description: "منصة شاملة وآمنة للخدمات البنكية. أدر حساباتك، سدد مدفوعاتك، وأجرِ حوالاتك المالية بكل ثقة وسهولة عبر نظامنا المتطور 💰"
  },

  // Default fallback
  default: {
    image: "/og-aramex.jpg",
    title: "بوابة الدفع الإلكتروني الآمنة 💳",
    description: "نظام دفع عالمي مشفر بمعايير SSL. أكمل كافة معاملاتك المالية واللوجستية بكل ثقة وأمان مع ضمان حماية خصوصيتك وبياناتك 🔒✅"
  }
};

/**
 * Get absolute URL for image
 */
function getAbsoluteImageUrl(imagePath: string): string {
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  const productionDomain = typeof window !== 'undefined'
    ? window.location.origin
    : (import.meta.env.VITE_PRODUCTION_DOMAIN || 'https://sensational-fenglisu-ebbbfb.netlify.app');
  
  return `${productionDomain}${imagePath}`;
}

/**
 * Get company metadata with fallback and absolute URLs
 * @param companyKey - Company identifier (e.g., 'dhl', 'aramex')
 * @returns Company metadata object with absolute image URL
 */
export const getCompanyMeta = (companyKey: string): CompanyMeta => {
  if (!companyKey) {
    const defaultMeta = companyMetaMap.default;
    return {
      ...defaultMeta,
      image: getAbsoluteImageUrl(defaultMeta.image)
    };
  }

  const key = companyKey.toLowerCase();
  const meta = companyMetaMap[key] || companyMetaMap.default;
  
  return {
    ...meta,
    image: getAbsoluteImageUrl(meta.image)
  };
};
