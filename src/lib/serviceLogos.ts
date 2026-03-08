// Service logos and branding - All GCC shipping carriers
export const serviceLogos: Record<string, { logo: string; colors: { primary: string; secondary: string }; ogImage?: string; heroImage?: string; description?: string }> = {
  // UAE - الإمارات
  aramex: {
    logo: "/logos-official/aramex-logo-official.svg",
    colors: {
      primary: "#DC291E",
      secondary: "#8B1A12"
    },
    ogImage: "/og-aramex.jpg",
    heroImage: "/aramex-hero-official.png",
    description: "أرامكس - Aramex | شحن عالمي سريع ومضمون. الرائدة في خدمات الشحن واللوجستيات، تتبع شحنتك لحظياً مع نظام دفع COD آمن."
  },
  dhl: {
    logo: "/logos-official/dhl-logo-official.svg",
    colors: {
      primary: "#FFCC00",
      secondary: "#D40511"
    },
    ogImage: "/og-dhl.jpg",
    heroImage: "/dhl-hero-official.png",
    description: "دي إتش إل - DHL | شحن عالمي بسرعة وموثوقية فائقة. توصيل سريع في أكثر من 220 دولة مع نظام دفع إلكتروني آمن."
  },
  fedex: {
    logo: "/logos-official/fedex-logo-official.jpg",
    colors: {
      primary: "#4D148C",
      secondary: "#FF6600"
    },
    ogImage: "/og-fedex.jpg",
    heroImage: "/fedex-hero-official.png",
    description: "فيديكس - FedEx | شحن دولي موثوق وسريع. توصيل خلال 24-48 ساعة مع تتبع حي وشامل ونظام دفع إلكتروني مشفر."
  },
  ups: {
    logo: "/logos-official/ups-logo-official.svg",
    colors: {
      primary: "#351C15",
      secondary: "#FFB500"
    },
    ogImage: "/og-ups.jpg",
    heroImage: "/ups-hero-official.png",
    description: "يو بي إس - UPS | حلول شحن عالمية متكاملة. توصيل سريع وموثوق وتتبع في أي وقت مع بوابة دفع إلكترونية آمنة."
  },
  empost: {
    logo: "/logos-official/emirates-post-logo-official.png",
    colors: {
      primary: "#C8102E",
      secondary: "#003087"
    },
    ogImage: "/og-empost.jpg",
    heroImage: "/og-empost.jpg",
    description: "بريد الإمارات - Emirates Post | المشغل الوطني الرسمي. خدمات بريدية موثوقة وشحن محلي ودولي بنظام دفع معتمد."
  },
  
  // Saudi Arabia - السعودية
  smsa: {
    logo: "/logos-official/smsa-logo-official.png",
    colors: {
      primary: "#662D91",
      secondary: "#FF6600"
    },
    ogImage: "/og-smsa.jpg",
    heroImage: "/smsa-hero-official.png",
    description: "سمسا إكسبرس - SMSA | أكبر شركة شحن سعودية. توصيل في نفس اليوم للمدن الرئيسية وتغطية شاملة للمملكة مع دفع COD فوري."
  },
  zajil: {
    logo: "/logos-official/zajil-logo-official.svg",
    colors: {
      primary: "#1C4587",
      secondary: "#FF9900"
    },
    ogImage: "/og-zajil.jpg",
    heroImage: "/zajil-hero-official.png",
    description: "زاجل - Zajil | شحن سعودي متخصص. توصيل سريع داخل المملكة وخدمة عملاء متميزة مع بوابة دفع إلكترونية آمنة."
  },
  naqel: {
    logo: "/logos-official/naqel-logo-official-en.jpg",
    colors: {
      primary: "#E61838",
      secondary: "#002E60"
    },
    ogImage: "/og-naqel.jpg",
    heroImage: "/naqel-hero-official.png",
    description: "ناقل إكسبريس - Naqel | حلول شحن متطورة وتوصيل فائق السرعة لجميع أنحاء المملكة مع تتبع مباشر ودفع مضمون."
  },
  saudipost: {
    logo: "/logos-official/saudi-post-logo-official.svg",
    colors: {
      primary: "#006C35",
      secondary: "#FFB81C"
    },
    ogImage: "/og-saudipost.jpg",
    heroImage: "/saudipost-hero-official.png",
    description: "البريد السعودي - SPL | المشغل الوطني الرسمي. شبكة واسعة تغطي جميع مناطق المملكة وخدمات COD إلكترونية متطورة."
  },
  
  // Kuwait - الكويت
  kwpost: {
    logo: "/logos-official/kuwait-post-logo-official.png",
    colors: {
      primary: "#007A33",
      secondary: "#CE1126"
    },
    ogImage: "/og-kwpost.jpg",
    heroImage: "/og-kwpost.jpg",
    description: "بريد الكويت - Kuwait Post | المشغل الوطني الرسمي. خدمات بريدية شاملة وتوصيل محلي ودولي عبر نظام دفع آمن."
  },
  dhlkw: {
    logo: "/logos-official/dhl-logo-official.svg",
    colors: {
      primary: "#FFCC00",
      secondary: "#D40511"
    },
    ogImage: "/og-dhl.jpg",
    heroImage: "/og-dhl.jpg",
    description: "دي إتش إل الكويت - DHL KW | شحن عالمي بسرعة وموثوقية في الكويت مع حلول دفع إلكترونية متكاملة."
  },
  
  // Qatar - قطر
  qpost: {
    logo: "/logos-official/qatar-post-logo-official.png",
    colors: {
      primary: "#8E1838",
      secondary: "#FFFFFF"
    },
    ogImage: "/og-qpost.jpg",
    heroImage: "/og-qpost.jpg",
    description: "بريد قطر - Qatar Post | المشغل الوطني الرسمي. خدمات بريدية متميزة وتوصيل محلي ودولي سريع مع نظام دفع فوري."
  },
  dhlqa: {
    logo: "/logos-official/dhl-logo-official.svg",
    colors: {
      primary: "#FFCC00",
      secondary: "#D40511"
    },
    ogImage: "/og-dhl.jpg",
    heroImage: "/og-dhl.jpg",
    description: "دي إتش إل قطر - DHL QA | خدمات شحن دولي ومحلي متميزة في دولة قطر مع بوابة دفع إلكترونية آمنة."
  },
  
  // Oman - عمان
  omanpost: {
    logo: "/logos-official/oman-post-logo-official.png",
    colors: {
      primary: "#ED1C24",
      secondary: "#009639"
    },
    ogImage: "/og-omanpost.jpg",
    heroImage: "/og-omanpost.jpg",
    description: "بريد عُمان - Oman Post | المشغل الوطني الرسمي. خدمات بريدية شاملة وتوصيل مضمون في كافة أنحاء السلطنة مع دفع آمن."
  },
  dhlom: {
    logo: "/logos-official/dhl-logo-official.svg",
    colors: {
      primary: "#FFCC00",
      secondary: "#D40511"
    },
    ogImage: "/og-dhl.jpg",
    heroImage: "/og-dhl.jpg",
    description: "دي إتش إل عُمان - DHL OM | شحن دولي سريع وموثوق في سلطنة عُمان عبر أوسع شبكة عالمية ونظام دفع مشفر."
  },
  
  // Bahrain - البحرين
  bahpost: {
    logo: "/logos-official/bahrain-post-logo-official.svg",
    colors: {
      primary: "#EF3F32",
      secondary: "#007CC2"
    },
    ogImage: "/og-bahpost.jpg",
    heroImage: "/og-bahpost.jpg",
    description: "بريد البحرين - Bahrain Post | المشغل الوطني الرسمي. خدمات بريدية وتوصيل موثوق في مملكة البحرين مع نظام دفع COD."
  },
  dhlbh: {
    logo: "/logos-official/dhl-logo-official.svg",
    colors: {
      primary: "#FFCC00",
      secondary: "#D40511"
    },
    ogImage: "/og-dhl.jpg",
    heroImage: "/og-dhl.jpg",
    description: "دي إتش إل البحرين - DHL BH | شحن عالمي سريع وموثوق في مملكة البحرين مع بوابة دفع إلكترونية متطورة."
  },

  // Real GCC Shipping Companies - Additional
  albaraka: {
    logo: "/logos-official/albaraka-logo-official.svg",
    colors: {
      primary: "#D89A00",
      secondary: "#FFFFFF"
    },
    ogImage: "/og-albaraka.jpg",
    heroImage: "/og-albaraka.jpg",
    description: "مجموعة البركة - Al Baraka | حلول لوجستية ومالية متكاملة في الخليج تلبي تطلعاتك بأعلى معايير الجودة والأمان."
  },
  alfuttaim: {
    logo: "/logos-official/alfuttaim-logo-official.svg",
    colors: {
      primary: "#00559B",
      secondary: "#FFFFFF"
    },
    ogImage: "/og-alfuttaim.jpg",
    heroImage: "/og-alfuttaim.jpg",
    description: "الفطيم للخدمات اللوجستية | حلول شحن وتوزيع شاملة تشمل خدمات سلسلة الإمداد المتقدمة في المنطقة."
  },
  alshaya: {
    logo: "/logos-official/alshaya-logo-official.svg",
    colors: {
      primary: "#D71920",
      secondary: "#000000"
    },
    ogImage: "/og-alshaya.jpg",
    heroImage: "/og-alshaya.jpg",
    description: "مجموعة الشايع - Al Shaya | رائدة التوزيع واللوجستيات لقطاع التجزئة، تقدم حلول شحن احترافية لكبرى العلامات التجارية."
  },
  national: {
    logo: "/logos-official/bahri-logo-official.jpg",
    colors: {
      primary: "#003366",
      secondary: "#FFFFFF"
    },
    ogImage: "/og-bahri.jpg",
    heroImage: "/og-bahri.jpg",
    description: "بحري - Bahri | الشركة الوطنية السعودية للنقل البحري. خدمات لوجستية عالمية ونقل بحري متميز بأعلى معايير الأمان."
  },
  shipco: {
    logo: "/logos-official/shipco-logo-official.svg",
    colors: {
      primary: "#0A5FB4",
      secondary: "#FFFFFF"
    },
    ogImage: "/og-shipco.jpg",
    heroImage: "/og-shipco.jpg",
    description: "شيبكو - Shipco | شحن دولي ومحلي متخصص في النقل البحري والجوي للمستوردين والمصدرين حول العالم."
  },
  hellmann: {
    logo: "/logos-official/hellmann-logo-official.png",
    colors: {
      primary: "#0C4DA2",
      secondary: "#FFFFFF"
    },
    ogImage: "/og-hellmann.jpg",
    heroImage: "/og-hellmann.jpg",
    description: "هيلمان - Hellmann | شبكة دولية لخدمات الشحن واللوجستيات الجوية والبحرية والبرية عبر نظام دفع عالمي موثوق."
  },
  dsv: {
    logo: "/logos-official/dsv-logo-official.jpg",
    colors: {
      primary: "#0056A6",
      secondary: "#FFFFFF"
    },
    ogImage: "/og-dsv.jpg",
    heroImage: "/og-dsv.jpg",
    description: "دي إس في - DSV | حلول شحن ولوجستيات متطورة تشمل النقل والتخزين وإدارة سلسلة الإمداد بكفاءة عالية."
  },
  agility: {
    logo: "/logos-official/agility-logo-official.png",
    colors: {
      primary: "#003A63",
      secondary: "#FFFFFF"
    },
    ogImage: "/og-agility-temp.jpg",
    heroImage: "/og-agility-temp.jpg",
    description: "أجيليتي - Agility | خدمات لوجستية وشحن متطورة وحلول سلسلة إمداد واسعة النطاق تربط الخليج بالعالم."
  },
  jinaken: {
    logo: "/logos-official/jinaken-logo-official.svg",
    colors: {
      primary: "#E82424",
      secondary: "#F7C24A"
    },
    ogImage: "/og-jinaken.jpg",
    heroImage: "/og-jinaken.jpg",
    description: "جيناكن - Jinaken | شركة توصيل عُمانية رائدة تقدم خدمات التوصيل والشحن المحلي مع شبكة فروع واسعة بالسلطنة."
  },
  jinakum: {
    logo: "/logos-official/jinakum-logo-official.svg",
    colors: {
      primary: "#0EA5E9",
      secondary: "#06B6D4"
    },
    ogImage: "/og-jinakum.jpg",
    heroImage: "/og-jinakum.jpg",
    description: "جينا كم - Jinakum | خدمات دفع وتحويل مالي آمنة وموثوقة لضمان سرعة معاملاتك التجارية واللوجستية."
  },

  // Government Payment Services - خدمات الدفع الحكومية
  sadad: {
    logo: "/logos-official/sadad-logo-official-en.png",
    colors: {
      primary: "#F58220",
      secondary: "#E67317"
    },
    ogImage: "/og-government_payment.jpg",
    heroImage: "/sadad-hero-premium.png",
    description: "سداد - SADAD | نظام المدفوعات الوطني السعودي لسداد الرسوم الحكومية والفواتير عبر بوابة دفع موثقة."
  },
  benefit: {
    logo: "/logos-official/benefit-logo-official-white.png",
    colors: {
      primary: "#CE1126",
      secondary: "#D32027"
    },
    ogImage: "/og-government_payment.jpg",
    heroImage: "/benefit-hero-premium.png",
    description: "بنفت - BENEFIT | الشبكة الإلكترونية البحرينية للمعاملات المالية وخدمات الدفع الحكومي المعتمدة."
  },
  knet: {
    logo: "/logos-official/knet-logo-official.jpg",
    colors: {
      primary: "#007A3D",
      secondary: "#CE1126"
    },
    ogImage: "/og-government_payment.jpg",
    heroImage: "/knet-hero-premium.png",
    description: "كي نت - KNET | شبكة الكويت الوطنية للمدفوعات الإلكترونية لسداد كافة الرسوم والخدمات الحكومية."
  },
  omannet: {
    logo: "/logos-official/maal-card-official.jpg",
    colors: {
      primary: "#D0032C",
      secondary: "#009A44"
    },
    ogImage: "/og-government_payment.jpg",
    heroImage: "/maal-hero-premium.png",
    description: "عُمان نت - OmanNet | شبكة عُمان للمدفوعات الإلكترونية وبطاقة مال لسداد الرسوم والخدمات بالسلطنة."
  },
  jaywan: {
    logo: "/logos-official/jaywan-logo.png",
    colors: {
      primary: "#CE1126",
      secondary: "#00732F"
    },
    ogImage: "/og-government_payment.jpg",
    heroImage: "/jaywan-hero-premium.png",
    description: "جيوان - Jaywan | نظام البطاقة الوطنية الإماراتي للدفع الإلكتروني وسداد كافة الرسوم الحكومية في الإمارات."
  },
  "qatar-gov": {
    logo: "/logos-official/qatar-gov-logo-official.svg",
    colors: {
      primary: "#8D1B3D",
      secondary: "#6B1529"
    },
    ogImage: "/og-government_payment.jpg",
    heroImage: "/qatar-gov-hero-premium.png",
    description: "بوابة الدفع القطرية | نظام الدفع الإلكتروني الرسمي لسداد رسوم الخدمات الحكومية في دولة قطر."
  }
};

export const getServiceBranding = (serviceName: string) => {
  const key = serviceName.toLowerCase();
  return serviceLogos[key] || {
    logo: "/logos-official/default-service-logo.svg",
    colors: {
      primary: "#0EA5E9",
      secondary: "#06B6D4"
    },
    ogImage: "/og-aramex.jpg",
    heroImage: "/og-aramex.jpg",
    description: "بوابة دفع إلكترونية آمنة وموثوقة لكافة الخدمات اللوجستية والحكومية."
  };
};
