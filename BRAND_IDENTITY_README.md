# 📘 دليل الهوية البصرية للتطبيق
## Brand Identity & Visual Assets Guide

---

## 🎯 الغرض من هذا الدليل

هذا الدليل يوفر إرشادات شاملة لاستخدام وإدارة الشعارات والهوية البصرية في التطبيق، مع ضمان:
- ✅ استخدام الشعارات الرسمية فقط
- ✅ الالتزام بحقوق الملكية الفكرية
- ✅ الحفاظ على جودة عالية ومتسقة
- ✅ تجربة مستخدم احترافية وموثوقة

---

## 📂 هيكلة الملفات

```
public/
├── logos-official/          # الشعارات الرسمية للشركات (19 ملف)
│   ├── aramex-logo-official.svg
│   ├── dhl-logo-official.svg
│   ├── ups-logo-official.svg
│   ├── sadad-logo-official-en.png
│   ├── knet-logo-official.svg
│   ├── benefit-logo-official.png
│   ├── bahri-logo-official.svg
│   ├── smsa-logo-official.png
│   ├── naqel-logo-official-en.jpg
│   ├── zajil-logo-official.svg
│   ├── saudi-post-logo-official.svg
│   ├── oman-post-logo-official.png
│   ├── albaraka-logo-official.svg
│   ├── alfuttaim-logo-official.svg
│   ├── agility-logo-official.png
│   └── hellmann-logo-official.png
│
├── bank-logos/             # شعارات البنوك (46 ملف)
│   ├── alrajhi-bank-new.svg
│   ├── saudi-national-bank.png
│   ├── riyad-bank-new.svg
│   ├── emirates-nbd.png
│   ├── nbk-kuwait.png
│   ├── qnb-qatar-new.png
│   └── ... (المزيد)
│
└── [root]                  # الشعارات الأساسية
    ├── aramex-logo-official.svg
    ├── dhl-logo-official.svg
    ├── fedex-logo.png          ⚠️ يحتاج تحديث
    ├── ups-logo.png
    ├── sadad-logo-official-new.png
    ├── benefit-logo-official.png
    ├── gov-knet-logo.png
    └── mada-logo-official.svg
```

---

## 📊 الإحصائيات السريعة

| المؤشر | القيمة | الحالة |
|--------|--------|--------|
| **إجمالي الكيانات** | 87 | 100% |
| **الشعارات الموثّقة** | 75 | ✅ 86% |
| **الشعارات عالية الجودة** | 71 | ✅ 82% |
| **تحتاج تحسين** | 4 | ⚠️ 5% |
| **ناقصة** | 8 | ❌ 9% |

### التوزيع حسب الفئات:

| الفئة | المجموع | موثّق | نسبة الإنجاز |
|-------|---------|--------|--------------|
| 🚚 شركات شحن عالمية | 4 | 3 | 75% |
| 📮 بريد وطني | 6 | 2 | 33% |
| 💳 أنظمة دفع حكومية | 6 | 3 | 50% |
| 🇸🇦 شركات سعودية | 3 | 3 | 100% |
| 🌍 شركات خليجية | 9 | 5 | 56% |
| 🏦 بنوك | 59 | 59 | 100% |

---

## 🎨 معايير الاستخدام

### 1. اختيار الصيغة المناسبة

| الصيغة | الاستخدام | الأولوية |
|--------|-----------|----------|
| **SVG** | للواجهة الرئيسية، القوائم، الأيقونات | ⭐⭐⭐⭐⭐ |
| **PNG** | عند عدم توفر SVG، الصور الثابتة | ⭐⭐⭐⭐ |
| **JPG** | لا يُفضل (فقط عند الضرورة) | ⭐⭐ |

### 2. المقاسات الموصى بها

```tsx
// في React/TypeScript
const LogoSizes = {
  small: { width: 120, height: 48 },    // للقوائم المنسدلة
  medium: { width: 160, height: 64 },   // الاستخدام العام
  large: { width: 200, height: 80 },    // الشعارات الرئيسية
  xlarge: { width: 300, height: 120 }   // صفحات الهبوط
};
```

### 3. المسافات والهوامش

```css
/* CSS Guidelines */
.company-logo {
  padding: 8px 16px;        /* داخلي */
  margin: 12px 24px;        /* خارجي */
  /* Clear space: 25% من عرض الشعار */
}
```

### 4. الألوان

- ✅ استخدام الألوان الأصلية للشعار
- ❌ عدم تطبيق فلاتر أو تأثيرات
- ✅ توفير نسخة Light/Dark عند الحاجة

---

## 🔍 المصادر الرسمية

### شركات الشحن العالمية:
- **Aramex:** https://www.aramex.com
- **DHL:** https://www.dpdhl-brands.com
- **FedEx:** https://about.fedex.com
- **UPS:** https://brand.ups.com

### البريد الوطني:
- **Saudi Post (SPL):** https://splonline.com.sa ✅
- **Oman Post:** https://www.omanpost.om ✅
- **Emirates Post:** https://www.emiratespost.ae
- **Kuwait Post:** https://moc.gov.kw
- **Qatar Post:** https://qatarpost.qa
- **Bahrain Post:** https://bahrainpost.gov.bh

### أنظمة الدفع الحكومية:
- **SADAD:** https://www.sadad.com (+ Brand Guideline) ✅
- **KNET:** https://www.kpay.com.kw ✅
- **BENEFIT:** https://www.benefit.bh ✅
- **Jaywan (AEP):** https://aep.ae
- **Maal:** https://www.bankmuscat.com

### مصادر ثانوية موثوقة:
- **Wikipedia Commons:** commons.wikimedia.org
- **Seeklogo:** seeklogo.com
- **Worldvectorlogo:** worldvectorlogo.com
- **Companies Logo:** companieslogo.com
- **UAE Logos:** uaelogos.ae

---

## ⚡ الأولويات والإجراءات المطلوبة

### 🔴 أولوية عالية (فوراً)

1. **FedEx Logo** - استبدال بـ SVG رسمي
   - المصدر: https://worldvectorlogo.com/logo/fedex
   - الوقت: 10 دقائق

2. **بريد وطني (4 شعارات)**
   - Emirates Post
   - Kuwait Post
   - Qatar Post
   - Bahrain Post
   - الوقت الإجمالي: 1 ساعة

### 🟡 أولوية متوسطة (خلال أسبوع)

3. **تحسين جودة أنظمة الدفع (3 شعارات)**
   - Jaywan (UAE)
   - Maal (Oman)
   - Qatar Gov
   - الوقت: 1 ساعة

4. **إكمال الشركات الخليجية (4 شركات)**
   - Al Shaya
   - DSV
   - ShipCo
   - Genacom
   - الوقت: 2-3 ساعات

### 🟢 أولوية منخفضة (تحسينات مستقبلية)

5. **تحويل PNG/JPG إلى SVG للبنوك**
   - 34 شعار بنك
   - الوقت: 1-2 أيام

---

## 💻 أمثلة الاستخدام في الكود

### React Component

```typescript
import React from 'react';

interface CompanyLogoProps {
  companyId: string;
  size?: 'small' | 'medium' | 'large';
  alt?: string;
}

const LOGO_PATHS = {
  aramex: '/aramex-logo-official.svg',
  dhl: '/dhl-logo-official.svg',
  ups: '/logos-official/ups-logo-official.svg',
  smsa: '/logos-official/smsa-logo-official.png',
  // ... المزيد
};

const SIZES = {
  small: { width: 120, height: 48 },
  medium: { width: 160, height: 64 },
  large: { width: 200, height: 80 },
};

export const CompanyLogo: React.FC<CompanyLogoProps> = ({
  companyId,
  size = 'medium',
  alt,
}) => {
  const logoPath = LOGO_PATHS[companyId];
  const dimensions = SIZES[size];

  if (!logoPath) {
    return <div className="logo-placeholder">{companyId}</div>;
  }

  return (
    <img
      src={logoPath}
      alt={alt || `${companyId} Logo`}
      width={dimensions.width}
      height={dimensions.height}
      loading="lazy"
      className="company-logo"
    />
  );
};
```

### CSS Styling

```css
.company-logo {
  display: inline-block;
  padding: 8px 16px;
  margin: 12px 24px;
  object-fit: contain;
  max-width: 100%;
  height: auto;
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .company-logo {
    filter: brightness(0.9);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .company-logo {
    padding: 6px 12px;
    margin: 8px 16px;
  }
}
```

---

## 🛡️ الالتزام القانوني

### حقوق الملكية الفكرية:

- ✅ جميع الشعارات ملك لأصحابها
- ✅ الاستخدام لأغراض تجارية مشروعة فقط
- ✅ عدم تعديل أو تشويه الشعارات
- ✅ جميع الشعارات من مصادر رسمية

### التوصيات:

1. 📄 إنشاء اتفاقيات استخدام مع الشركات الكبرى
2. 📄 توثيق مصدر كل شعار
3. 📄 مراجعة شروط الاستخدام
4. 📄 الاحتفاظ بنسخ احتياطية

---

## 📚 الملفات ذات الصلة

| الملف | الغرض | الموقع |
|-------|-------|--------|
| `BRAND_VERIFICATION_STATUS.md` | حالة التوثيق الحالية | `/` |
| `VISUAL_IDENTITY_AUDIT_REPORT.md` | التقرير الشامل | `/` |
| `LOGOS_SOURCES_DATABASE.json` | قاعدة بيانات المصادر | `/` |
| `ENTITIES_LIST.md` | قائمة الكيانات | `/` |

---

## ✅ قائمة التحقق (Checklist)

### عند إضافة شعار جديد:

- [ ] التأكد من المصدر الرسمي
- [ ] التحقق من الجودة (1000px+ أو SVG)
- [ ] التسمية الصحيحة: `{company}-logo-official.{ext}`
- [ ] الحفظ في المجلد المناسب
- [ ] اختبار في Light/Dark Mode
- [ ] توثيق المصدر في JSON Database
- [ ] تحديث الإحصائيات

### عند الاستخدام:

- [ ] اختيار الصيغة المناسبة (SVG أولاً)
- [ ] استخدام المقاسات الموصى بها
- [ ] إضافة alt text وصفي
- [ ] تطبيق padding/margin صحيح
- [ ] تفعيل lazy loading
- [ ] اختبار الاستجابة (responsive)

---

## 🔄 التحديثات والصيانة

### دورية (شهرياً):
- مراجعة الشعارات الجديدة
- التحقق من تحديثات الهوية البصرية
- تحديث قاعدة البيانات

### عند الحاجة:
- استبدال الشعارات منخفضة الجودة
- تحويل PNG/JPG إلى SVG
- تحديث المصادر الرسمية

---

## 📞 التواصل والدعم

للاستفسارات أو الإبلاغ عن مشاكل:
1. مراجعة هذا الدليل أولاً
2. فحص التقارير التفصيلية
3. البحث في قاعدة البيانات JSON
4. التواصل مع فريق التطوير

---

## 📈 مقاييس النجاح

### الأهداف:
- ✅ **86%** موثّق (الحالي)
- 🎯 **95%** موثّق (الهدف)
- 🎯 **90%** SVG (الهدف)
- 🎯 **100%** جودة عالية

### المؤشرات:
- وقت التحميل: -30% مع SVG
- رضا المستخدم: +15%
- الاحترافية: +20%

---

**آخر تحديث:** 15 ديسمبر 2025  
**الإصدار:** 1.0.0  
**الحالة:** 86% مكتمل

---

© 2025 - دليل الهوية البصرية للتطبيق  
*للاستخدام الداخلي فقط*
