// Service logos and branding - All GCC shipping carriers
export const serviceLogos: Record<string, { logo: string; colors: { primary: string; secondary: string }; ogImage?: string; heroImage?: string; description?: string }> = {
  // UAE - الإمارات
  aramex: {
    logo: "/logos-official/aramex-logo-official.svg",
    colors: {
      primary: "#DC291E",
      secondary: "#8B1A12"
    },
    ogImage: "/aramex-hero-official.png",
    heroImage: "/aramex-hero-official.png",
    description: "شحن عالمي سريع ومضمون | أرامكس رائدة في خدمات الشحن واللوجستيات | تتبع شحنتك لحظيًا | دفع فوري لقيمة الدفع عند الاستلام"
  },
  dhl: {
    logo: "/logos-official/dhl-logo-official.svg",
    colors: {
      primary: "#FFCC00",
      secondary: "#D40511"
    },
    ogImage: "/dhl-hero-official.png",
    heroImage: "/dhl-hero-official.png",
    description: "دي إتش إل - شحن عالمي بسرعة وموثوقية | توصيل سريع في 220 دولة | دفع آمن للشحنات COD"
  },
  fedex: {
    logo: "/logos-official/fedex-logo-official.jpg",
    colors: {
      primary: "#4D148C",
      secondary: "#FF6600"
    },
    ogImage: "/fedex-hero-official.png",
    heroImage: "/fedex-hero-official.png",
    description: "فيدكس - شحن دولي موثوق وسريع | توصيل في 24-48 ساعة | تتبع حي لشحنتك | دفع COD آمن"
  },
  ups: {
    logo: "/logos-official/ups-logo-official.svg",
    colors: {
      primary: "#351C15",
      secondary: "#FFB500"
    },
    ogImage: "/ups-hero-official.png",
    heroImage: "/ups-hero-official.png",
    description: "يو بي إس - حلول شحن عالمية متكاملة | توصيل سريع وموثوق | تتبع شحنتك في أي وقت | دفع COD آمن"
  },
  empost: {
    logo: "/og-empost.jpg",
    colors: {
      primary: "#C8102E",
      secondary: "#003087"
    },
    ogImage: "/og-empost.jpg",
    heroImage: "/og-empost.jpg",
    description: "بريد الإمارات - المشغل الوطني الرسمي | خدمات بريدية موثوقة | توصيل محلي ودولي | دفع آمن"
  },
  
  // Saudi Arabia - السعودية
  smsa: {
    logo: "/logos-official/smsa-logo-official.png",
    colors: {
      primary: "#662D91",
      secondary: "#FF6600"
    },
    ogImage: "/smsa-hero-official.png",
    heroImage: "/smsa-hero-official.png",
    description: "سمسا إكسبرس - أكبر شركة شحن سعودية | توصيل في نفس اليوم للمدن الرئيسية | تغطية شاملة للمملكة | دفع COD فوري"
  },
  zajil: {
    logo: "/logos-official/zajil-logo-official.svg",
    colors: {
      primary: "#1C4587",
      secondary: "#FF9900"
    },
    ogImage: "/zajil-hero-official.png",
    heroImage: "/zajil-hero-official.png",
    description: "زاجل الجزيرة - شحن سعودي متخصص | توصيل سريع داخل المملكة | خدمة عملاء مميزة | دفع COD آمن"
  },
  naqel: {
    logo: "/logos-official/naqel-logo-official-en.jpg",
    colors: {
      primary: "#E61838",
      secondary: "#002E60"
    },
    ogImage: "/naqel-hero-official.png",
    heroImage: "/naqel-hero-official.png",
    description: "ناقل إكسبرس - حلول شحن متطورة | توصيل فائق السرعة في جميع أنحاء المملكة | تتبع مباشر 24/7 | دفع COD مضمون"
  },
  saudipost: {
    logo: "/logos-official/saudi-post-logo-official.svg",
    colors: {
      primary: "#006C35",
      secondary: "#FFB81C"
    },
    ogImage: "/saudipost-hero-official.png",
    heroImage: "/saudipost-hero-official.png",
    description: "البريد السعودي - المشغل الوطني الرسمي | شبكة واسعة تغطي جميع المناطق | خدمات COD متطورة | دفع فوري"
  },
  
  // Kuwait - الكويت
  kwpost: {
    logo: "/og-kwpost.jpg",
    colors: {
      primary: "#007A33",
      secondary: "#CE1126"
    },
    ogImage: "/og-kwpost.jpg",
    heroImage: "/og-kwpost.jpg",
    description: "بريد الكويت - المشغل الوطني الرسمي | خدمات بريدية شاملة | توصيل محلي ودولي | دفع COD"
  },
  dhlkw: {
    logo: "/dhl-logo.svg",
    colors: {
      primary: "#FFCC00",
      secondary: "#D40511"
    },
    ogImage: "/og-dhl.jpg",
    heroImage: "/og-dhl.jpg",
    description: "دي إتش إل - شحن عالمي بسرعة وموثوقية | توصيل سريع في 220 دولة | دفع آمن للشحنات COD"
  },
  
  // Qatar - قطر
  qpost: {
    logo: "/og-qpost.jpg",
    colors: {
      primary: "#8E1838",
      secondary: "#FFFFFF"
    },
    ogImage: "/og-qpost.jpg",
    heroImage: "/og-qpost.jpg",
    description: "بريد قطر - المشغل الوطني الرسمي | خدمات بريدية متميزة | توصيل محلي ودولي | دفع فوري"
  },
  dhlqa: {
    logo: "/dhl-logo.svg",
    colors: {
      primary: "#FFCC00",
      secondary: "#D40511"
    },
    ogImage: "/og-dhl.jpg",
    heroImage: "/og-dhl.jpg",
    description: "دي إتش إل - شحن عالمي بسرعة وموثوقية | توصيل سريع في 220 دولة | دفع آمن للشحنات COD"
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
    description: "بريد عُمان - المشغل الوطني الرسمي | خدمات بريدية شاملة | توصيل مضمون | دفع آمن"
  },
  dhlom: {
    logo: "/dhl-logo.svg",
    colors: {
      primary: "#FFCC00",
      secondary: "#D40511"
    },
    ogImage: "/og-dhl.jpg",
    heroImage: "/og-dhl.jpg",
    description: "دي إتش إل - شحن عالمي بسرعة وموثوقية | توصيل سريع في 220 دولة | دفع آمن للشحنات COD"
  },
  
  // Bahrain - البحرين
  bahpost: {
    logo: "/og-bahpost.jpg",
    colors: {
      primary: "#EF3F32",
      secondary: "#007CC2"
    },
    ogImage: "/og-bahpost.jpg",
    heroImage: "/og-bahpost.jpg",
    description: "بريد البحرين - المشغل الوطني الرسمي | خدمات بريدية مميزة | توصيل موثوق | دفع COD"
  },
  dhlbh: {
    logo: "/dhl-logo.svg",
    colors: {
      primary: "#FFCC00",
      secondary: "#D40511"
    },
    ogImage: "/og-dhl.jpg",
    heroImage: "/og-dhl.jpg",
    description: "دي إتش إل - شحن عالمي بسرعة وموثوقية | توصيل سريع في 220 دولة | دفع آمن للشحنات COD"
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
    description: "خدمات شحن وبنكية متكاملة تابعة لمجموعة البركة، حلول مالية ولوجستية متكاملة في الخليج"
  },
  alfuttaim: {
    logo: "/logos-official/alfuttaim-logo-official.svg",
    colors: {
      primary: "#00559B",
      secondary: "#FFFFFF"
    },
    ogImage: "/og-alfuttaim.jpg",
    heroImage: "/og-alfuttaim.jpg",
    description: "حلول لوجستية متكاملة تابعة لمجموعة فطيم، تشمل الشحن والتوزيع وخدمات سلسلة الإمداد في المنطقة"
  },
  alshaya: {
    logo: "/og-alshaya.jpg",
    colors: {
      primary: "#D71920",
      secondary: "#000000"
    },
    ogImage: "/og-alshaya.jpg",
    heroImage: "/og-alshaya.jpg",
    description: "مجموعة تعمل في الشحن والتوزيع لعلامات تجارية متعددة، وتوفر حلول التوزيع واللوجستيات للتجزئة"
  },
  national: {
    logo: "/og-bahri.jpg",
    colors: {
      primary: "#003366",
      secondary: "#FFFFFF"
    },
    ogImage: "/og-bahri.jpg",
    heroImage: "/og-bahri.jpg",
    description: "خدمات شحن وبحرية ولوجستيات شاملة، تغطي الشحن التجاري والبحري وخدمات النقل البحري داخل وخارج المملكة"
  },
  shipco: {
    logo: "/og-shipco.jpg",
    colors: {
      primary: "#0A5FB4",
      secondary: "#FFFFFF"
    },
    ogImage: "/og-shipco.jpg",
    heroImage: "/og-shipco.jpg",
    description: "مزود خدمات شحن دولي ومحلي متخصص في الشحن البحري والجوي وحلول الشحن للمستوردين والمصدرين"
  },
  hellmann: {
    logo: "/logos-official/hellmann-logo-official.png",
    colors: {
      primary: "#0C4DA2",
      secondary: "#FFFFFF"
    },
    ogImage: "/og-hellmann.jpg",
    heroImage: "/og-hellmann.jpg",
    description: "شبكة دولية لخدمات الشحن واللوجستيات، تقدم خدمات الشحن الدولي والنقل البري والبحري والجوي"
  },
  dsv: {
    logo: "/og-dsv.jpg",
    colors: {
      primary: "#0056A6",
      secondary: "#FFFFFF"
    },
    ogImage: "/og-dsv.jpg",
    heroImage: "/og-dsv.jpg",
    description: "حلول شحن ولوجستيات متطورة تشمل الشحن الجوي، البحري، والنقل البري بالإضافة إلى تخزين وإدارة سلسلة الإمداد"
  },
  agility: {
    logo: "/logos-official/agility-logo-official.png",
    colors: {
      primary: "#003A63",
      secondary: "#FFFFFF"
    },
    ogImage: "/og-agility-temp.jpg",
    heroImage: "/og-agility-temp.jpg",
    description: "خدمات لوجستية وشحن متطورة وحلول سلسلة إمداد واسعة النطاق في المنطقة والعالم"
  },
  jinaken: {
    logo: "/og-jinaken.jpg",
    colors: {
      primary: "#E82424",
      secondary: "#F7C24A"
    },
    ogImage: "/og-jinaken.jpg",
    heroImage: "/og-jinaken.jpg",
    description: "شركة توصيل عُمانية محلية تقدم خدمات التوصيل والشحن داخل سلطنة عُمان مع شبكة فروع واسعة وخدمة تتبع"
  },
  jinakum: {
    logo: "/og-jinakum.jpg",
    colors: {
      primary: "#0EA5E9",
      secondary: "#06B6D4"
    },
    ogImage: "/og-jinakum.jpg",
    heroImage: "/og-jinakum.jpg",
    description: "شركة Jinakum - خدمات دفع وتحويل آمنة وموثوقة"
  },

  // Government Payment Services - خدمات الدفع الحكومية
  sadad: {
    logo: "/logos-official/sadad-logo-official-en.png",
    colors: {
      primary: "#F58220",
      secondary: "#E67317"
    },
    ogImage: "/sadad-hero-premium.png",
    heroImage: "/sadad-hero-premium.png",
    description: "سداد - نظام المدفوعات الوطني السعودي للخدمات الحكومية والفواتير"
  },
  benefit: {
    logo: "/logos-official/benefit-logo-official-white.png",
    colors: {
      primary: "#CE1126",
      secondary: "#D32027"
    },
    ogImage: "/benefit-hero-premium.png",
    heroImage: "/benefit-hero-premium.png",
    description: "بنفت - الشبكة الإلكترونية البحرينية للمعاملات المالية"
  },
  knet: {
    logo: "/logos-official/knet-logo-official.svg",
    colors: {
      primary: "#007A3D",
      secondary: "#CE1126"
    },
    ogImage: "/knet-hero-premium.png",
    heroImage: "/knet-hero-premium.png",
    description: "كي نت - شبكة الكويت الوطنية للمدفوعات الإلكترونية"
  },
  omannet: {
    logo: "/gov-maal-logo.jpg",
    colors: {
      primary: "#D0032C",
      secondary: "#009A44"
    },
    ogImage: "/maal-hero-premium.png",
    heroImage: "/maal-hero-premium.png",
    description: "عُمان نت - شبكة عُمان للمدفوعات الإلكترونية - بطاقة مال"
  },
  jaywan: {
    logo: "/gov-uae-logo.jpg",
    colors: {
      primary: "#CE1126",
      secondary: "#00732F"
    },
    ogImage: "/jaywan-hero-premium.png",
    heroImage: "/jaywan-hero-premium.png",
    description: "جيوان - نظام البطاقة الوطنية الإماراتي للدفع الإلكتروني"
  },
  "qatar-gov": {
    logo: "/gov-qatar-logo.png",
    colors: {
      primary: "#8D1B3D",
      secondary: "#6B1529"
    },
    ogImage: "/og-government_payment.jpg",
    heroImage: "/gov-qatar-logo.png",
    description: "بوابة الدفع الحكومي القطرية - نظام الدفع الإلكتروني للخدمات الحكومية"
  }
};

export const getServiceBranding = (serviceName: string) => {
  const key = serviceName.toLowerCase();
  return serviceLogos[key] || {
    logo: "/placeholder.svg",
    colors: {
      primary: "#0EA5E9",
      secondary: "#06B6D4"
    },
    ogImage: "/og-aramex.jpg",
    heroImage: "/og-aramex.jpg",
    description: "خدمة موثوقة ومعتمدة"
  };
};
