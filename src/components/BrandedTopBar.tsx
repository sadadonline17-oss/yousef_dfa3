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
      {/* Top Bar - Transparent Background */}
      <div
        className="sticky top-0 z-50 w-full"
        style={{
          background: 'transparent',
          borderBottom: `1px solid ${primaryColor}30`,
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14 sm:h-16 py-2">
            <div className="flex items-center gap-3 sm:gap-4 flex-1">
              {/* Logo - No Background, Transparent */}
              {displayLogo && (
                <div className="rounded-lg px-0 py-0">
                  <img
                    src={displayLogo}
                    alt={displayName}
                    className="h-8 sm:h-10 w-auto object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
              <div className="text-foreground">
                <h2
                  className="text-base sm:text-lg font-bold leading-tight"
                  style={{ fontFamily: activeBranding?.fonts?.arabic || 'Cairo, Tajawal, sans-serif' }}
                >
                  {displayName}
                </h2>
                <p className="text-xs text-muted-foreground">
                  الدفع الآمن
                </p>
              </div>
            </div>

            {showBackButton && (
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-foreground hover:bg-secondary/50 px-3 sm:px-4 py-2 rounded-lg transition-all"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base font-medium">رجوع</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {showHero && companyBranding && (
        <div className="w-full bg-transparent py-4">
          <div className="container mx-auto px-4">
            <CompanyHero serviceKey={serviceKey} countryCode={countryCode} />
          </div>
        </div>
      )}
    </>
  );
};

export default BrandedTopBar;
