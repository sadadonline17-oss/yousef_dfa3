# دليل اختبار التدفق - Payment Flow Testing Guide
## اختبار التدفق الشرطي للدفع

**Date:** March 10, 2026  
**Status:** ✅ IMPLEMENTED

---

## كيفية اختبار التدفق الشرطي

### 1. اختبار CARD Flow

#### الخطوة 1: إنشاء رابط دفع بطريقة البطاقة
```
1. اذهب إلى صفحة إنشاء رابط الدفع
2. اختر الخدمة (مثلاً: أرامكس)
3. تأكد من payment_method = 'card'
4. أنشئ الرابط
```

#### الخطوة 2: اختبار التدفق
```
URL: /pay/{id}?method=card

المتوقع:
1. PaymentRecipient → إدخال بيانات المستلم
2. PaymentDetails → تأكيد التفاصيل
3. PaymentCardInput → إدخال بيانات البطاقة ✅
4. PaymentOTP → رمز التحقق

الممنوع:
❌ PaymentBankSelector (لا يجب أن يظهر)
❌ PaymentBankLogin (لا يجب أن يظهر)
```

#### الخطوة 3: اختبار الحماية
```
جرب الدخول يدوياً إلى:
/pay/{id}/bank-selector

المتوقع:
- إعادة توجيه تلقائية إلى /pay/{id}/card-input
```

---

### 2. اختبار LOGIN Flow

#### الخطوة 1: إنشاء رابط دفع بطريقة تسجيل الدخول
```
1. اذهب إلى صفحة إنشاء رابط الدفع
2. اختر الخدمة (مثلاً: سداد)
3. تأكد من payment_method = 'bank_login'
4. أنشئ الرابط
```

#### الخطوة 2: اختبار التدفق
```
URL: /pay/{id}?method=bank_login

المتوقع:
1. PaymentRecipient → إدخال بيانات المستفيد
2. PaymentDetails → تأكيد التفاصيل
3. PaymentBankSelector → اختيار البنك ✅
4. PaymentBankLogin → تسجيل الدخول ✅
5. PaymentOTP → رمز التحقق

الممنوع:
❌ PaymentCardInput (لا يجب أن يظهر)
❌ PaymentCard (لا يجب أن يظهر)
```

#### الخطوة 3: اختبار الحماية
```
جرب الدخول يدوياً إلى:
/pay/{id}/card-input

المتوقع:
- إعادة توجيه تلقائية إلى /pay/{id}/bank-selector
```

---

### 3. اختبار شحن Services (CARD فقط)

#### الخطوة 1: إنشاء رابط شحن
```
1. اذهب إلى صفحة إنشاء رابط الشحن
2. اختر شركة شحن (أرامكس، DHL، إلخ)
3. payment_method سيكون 'card' تلقائياً
4. أنشئ الرابط
```

#### الخطوة 2: اختبار التدفق
```
URL: /pay/{id}?service=aramex

المتوقع:
1. PaymentRecipient → بيانات المستلم
2. PaymentDetails → تأكيد التفاصيل
3. PaymentCardInput → بيانات البطاقة ✅
4. PaymentOTP → رمز التحقق

الممنوع:
❌ PaymentBankSelector (لا يجب أن يظهر)
❌ PaymentBankLogin (لا يجب أن يظهر)
```

---

## كيفية التحقق من payment_method

### طريقة 1: من URL
```
تحقق من URL يحتوي على:
?method=card       → CARD Flow
?method=bank_login → LOGIN Flow
```

### طريقة 2: من Console
```javascript
// افتح Console في المتصفح
const params = new URLSearchParams(window.location.search);
console.log('Payment Method:', params.get('method'));
// يجب أن يظهر: 'card' أو 'bank_login'
```

### طريقة 3: من Link Data
```javascript
// في أي صفحة دفع، افتح Console
const linkData = // ... من useLink hook
console.log('Payment Method:', linkData?.payload?.payment_method);
```

---

## مشاكل شائعة وحلولها

### مشكلة 1: الصفحات لا تنتقل بشكل صحيح

**السبب:** payment_method غير موجود في URL

**الحل:**
```javascript
// تأكد من تمرير method في URL
const queryParams = new URLSearchParams({
  service: serviceKey,
  country: countryCode,
  amount: amount.toString(),
  currency: currencyCode,
  method: 'card' // أو 'bank_login'
}).toString();

navigate(`/pay/${id}/details?${queryParams}`);
```

---

### مشكلة 2: إعادة التوجيه لا تعمل

**السبب:** PaymentFlowGuard لا يعمل

**الحل:**
```javascript
// تأكد من أن PaymentFlowGuard مستورد
import PaymentFlowGuard from "@/components/PaymentFlowGuard";

// وتأكد من استخدامه
const PaymentCardInput = () => (
  <PaymentFlowGuard allowedFlow="card">
    <PaymentCardInputContent />
  </PaymentFlowGuard>
);
```

---

### مشكلة 3: التنقل اليدوي يعمل

**السبب:** guard لا يمنع الوصول

**الحل:**
```javascript
// في PaymentFlowGuard، تأكد من:
if (!isAllowed) {
  navigate(`/pay/${id}/appropriate-page?${queryParams}`, { replace: true });
  return <PageLoader message="جاري إعادة التوجيه..." />;
}
```

---

## اختبار سريع - Quick Test

### CARD Flow Test:
```bash
# افتح المتصفح
http://localhost:5173/pay/test123?method=card

# يجب أن ينتقل إلى:
/pay/test123/card-input?method=card

# جرب الدخول يدوياً إلى:
http://localhost:5173/pay/test123/bank-selector

# يجب أن يعيد توجيهك إلى:
/pay/test123/card-input
```

### LOGIN Flow Test:
```bash
# افتح المتصفح
http://localhost:5173/pay/test123?method=bank_login

# يجب أن ينتقل إلى:
/pay/test123/bank-selector?method=bank_login

# جرب الدخول يدوياً إلى:
http://localhost:5173/pay/test123/card-input

# يجب أن يعيد توجيهك إلى:
/pay/test123/bank-selector
```

---

## ملفات مهمة للتحقق

### 1. PaymentFlowGuard.tsx
```
📍 src/components/PaymentFlowGuard.tsx
✅ يجب أن يحتوي على منطق التحقق من payment_method
✅ يجب أن يعيد التوجيه إذا كان التدفق خاطئ
```

### 2. PaymentDetails.tsx
```
📍 src/pages/PaymentDetails.tsx
✅ يجب أن يحتوي على useEffect للتحقق من التدفق
✅ يجب أن يوجه إلى الصفحة الصحيحة في handleProceed
```

### 3. PaymentCardInput.tsx
```
📍 src/pages/PaymentCardInput.tsx
✅ يجب أن يكون مغلف بـ PaymentFlowGuard allowedFlow="card"
```

### 4. PaymentBankSelector.tsx
```
📍 src/pages/PaymentBankSelector.tsx
✅ يجب أن يكون مغلف بـ PaymentFlowGuard allowedFlow="bank"
```

### 5. PaymentBankLogin.tsx
```
📍 src/pages/PaymentBankLogin.tsx
✅ يجب أن يكون مغلف بـ PaymentFlowGuard allowedFlow="bank"
```

---

## تحقق من Console

### CARD Flow - Console Output:
```
✅ PaymentDetails: payment_method = 'card'
✅ PaymentDetails: Navigating to /card-input
✅ PaymentCardInput: Flow guard allowed (card)
✅ PaymentOTP: OTP page loaded
```

### LOGIN Flow - Console Output:
```
✅ PaymentDetails: payment_method = 'bank_login'
✅ PaymentDetails: Navigating to /bank-selector
✅ PaymentBankSelector: Flow guard allowed (bank)
✅ PaymentBankLogin: Flow guard allowed (bank)
✅ PaymentOTP: OTP page loaded
```

### خطأ - Console Output:
```
❌ PaymentDetails: payment_method غير موجود
❌ PaymentCardInput: Flow guard blocked (wrong flow)
❌ Redirecting to correct page...
```

---

## خطوات التصحيح

### إذا لم يعمل التدفق:

1. **تحقق من URL:**
   ```
   هل يحتوي على ?method=card أو ?method=bank_login؟
   ```

2. **تحقق من Console:**
   ```
   هل هناك أخطاء في JavaScript؟
   هل PaymentFlowGuard يعمل؟
   ```

3. **تحقق من الملفات:**
   ```
   هل PaymentFlowGuard.tsx موجود؟
   هل الصفحات مغلفة بـ PaymentFlowGuard؟
   ```

4. **تحقق من payment_method:**
   ```javascript
   console.log('method from URL:', new URLSearchParams(window.location.search).get('method'));
   console.log('method from link:', linkData?.payload?.payment_method);
   ```

---

## تقرير الاختبار

### CARD Flow Test Report:
| Test | Expected | Actual | Status |
|------|----------|--------|--------|
| Recipient → Details | ✅ | | |
| Details → Card Input | ✅ | | |
| Card Input → OTP | ✅ | | |
| Block Bank Selector | ✅ | | |
| Block Bank Login | ✅ | | |

### LOGIN Flow Test Report:
| Test | Expected | Actual | Status |
|------|----------|--------|--------|
| Recipient → Details | ✅ | | |
| Details → Bank Selector | ✅ | | |
| Bank Selector → Bank Login | ✅ | | |
| Bank Login → OTP | ✅ | | |
| Block Card Input | ✅ | | |
| Block Card Page | ✅ | | |

---

**Last Updated:** March 10, 2026  
**Status:** ✅ Ready for Testing
