import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getBrandingByCompany } from '@/lib/brandingSystem';
import { getGovernmentPaymentSystem } from '@/lib/governmentPaymentSystems';
import { getEntityLogo } from '@/lib/dynamicIdentity';
import { isGovernmentService } from '@/lib/governmentPaymentServices';
import CompanyHero from '@/components/CompanyHero';

interface BrandedTopBarProps {
  serviceKey: string;
  serviceName: string;
  showBackButton?: boolean;
  backPath?: string;
  bankId?: string;
  countryCode?: string;
  showHero?: boolean;
}

const BrandedTopBar: React.FC<BrandedTopBarProps> = ({
  serviceKey,
  serviceName,
  showBackButton = true,
  backPath,
  bankId,
  countryCode,
  showHero = false
}) => {
  const navigate = useNavigate();
  
  const isGovService = isGovernmentService(serviceKey) || serviceKey === 'government_payment' || serviceKey === 'payment';
  const companyBranding = getBrandingByCompany(serviceKey.toLowerCase());
  const govSystem = isGovService && countryCode ? getGovernmentPaymentSystem(countryCode) : null;
  
  const activeBranding = companyBranding || (govSystem ? {
    colors: govSystem.colors,
    fonts: { 
      arabic: govSystem.fonts.primaryAr, 
      primary: govSystem.fonts.primary, 
      secondary: govSystem.fonts.secondary 
    },
    gradients: govSystem.gradients,
    nameAr: govSystem.nameAr,
    logoUrl: govSystem.logo,
  } : null);
  
  const primaryColor = activeBranding?.colors.primary || '#0066B2';
  const secondaryColor = activeBranding?.colors.secondary || '#004B87';
  const gradient = activeBranding?.gradients?.primary || `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`;
  
  const displayLogo = activeBranding?.logoUrl || getEntityLogo(serviceKey);
  const displayName = activeBranding?.nameAr || serviceName;

  const handleBack = () => {
    if (backPath) {
      navigate(backPath);
    } else {
      navigate(-1);
    }
  };

  return (
    <>
      <div 
        className="sticky top-0 z-50 w-full shadow-lg"
        style={{
          background: gradient,
          borderBottom: `2px solid ${primaryColor}`,
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center gap-3 sm:gap-4">
              {displayLogo && (
                <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/30">
                  <img
                    src={displayLogo}
                    alt={displayName}
                    className="h-7 sm:h-9 w-auto object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
              <div className="text-white">
                <h2 
                  className="text-lg sm:text-xl font-bold leading-tight"
                  style={{ fontFamily: activeBranding?.fonts?.arabic || 'Cairo, Tajawal, sans-serif' }}
                >
                  {displayName}
                </h2>
                <p className="text-xs opacity-90">
                  الدفع الآمن
                </p>
              </div>
            </div>

            {showBackButton && (
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-white hover:bg-white/10 px-3 sm:px-4 py-2 rounded-lg transition-all"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base font-medium">رجوع</span>
              </button>
            )}
          </div>
        </div>

        <div 
          className="h-1 w-full"
          style={{
            background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor}, ${primaryColor})`
          }}
        />
      </div>

      {showHero && companyBranding && (
        <div className="w-full bg-secondary/20 py-6">
          <div className="container mx-auto px-4">
            <CompanyHero serviceKey={serviceKey} countryCode={countryCode} />
          </div>
        </div>
      )}
    </>
  );
};
    </>
  );
};

export default BrandedTopBar;
