import { getBrandingByCompany } from '@/lib/brandingSystem';
import { getGovernmentPaymentSystem } from '@/lib/governmentPaymentSystems';
import { getEntityHeaderImages, detectEntityFromURL, getEntityLogo } from '@/lib/dynamicIdentity';
import { isGovernmentService } from '@/lib/governmentPaymentServices';

interface CompanyHeroProps {
  serviceKey: string;
  className?: string;
  countryCode?: string;
  staticMode?: boolean;
}

const isGovernmentServiceKey = (key: string): boolean => {
  return isGovernmentService(key) || key === 'government_payment';
};

const getCompanyPrimaryImage = (serviceKey: string, countryCode?: string): string => {
  const key = serviceKey.toLowerCase();
  
  if (isGovernmentServiceKey(key) && countryCode) {
    const country = countryCode.toUpperCase();
    const govImages: Record<string, string> = {
      SA: '/sadad-hero-premium.png',
      BH: '/benefit-hero-premium.png',
      KW: '/knet-hero-premium.png',
      AE: '/jaywan-hero-premium.png',
      OM: '/maal-hero-premium.png',
      QA: '/qatar-gov-hero-premium.png',
    };
    return govImages[country] || govImages['SA'];
  }
  
  if (key.startsWith('bank_')) {
    return '';
  }
  
  const primaryImages: Record<string, string> = {
    aramex: '/aramex-hero-official.png',
    dhl: '/dhl-hero-official.png',
    dhlkw: '/dhl-hero-official.png',
    dhlqa: '/dhl-hero-official.png',
    dhlom: '/dhl-hero-official.png',
    dhlbh: '/dhl-hero-official.png',
    fedex: '/fedex-hero-official.png',
    ups: '/ups-hero-official.png',
    smsa: '/smsa-hero-official.png',
    naqel: '/naqel-hero-official.png',
    zajil: '/zajil-hero-official.png',
    saudipost: '/saudipost-hero-official.png',
    empost: '/og-empost.jpg',
    qpost: '/og-qpost.jpg',
    kwpost: '/og-kwpost.jpg',
    omanpost: '/og-omanpost.jpg',
    bahpost: '/og-bahpost.jpg',
    albaraka: '/og-albaraka.jpg',
    alfuttaim: '/og-alfuttaim.jpg',
    alshaya: '/og-alshaya.jpg',
    shipco: '/og-shipco.jpg',
    bahri: '/og-bahri.jpg',
    national: '/og-bahri.jpg',
    hellmann: '/og-hellmann.jpg',
    dsv: '/og-dsv.jpg',
    genacom: '/og-genacom.jpg',
    agility: '/og-agility-temp.jpg',
    jinaken: '/og-jinaken.jpg',
    jinakum: '/og-jinakum.jpg',
  };

  return primaryImages[key] || '';
};

const CompanyHero = ({ serviceKey, className = '', countryCode }: CompanyHeroProps) => {
  const key = serviceKey.toLowerCase();
  const resolvedBranding = getBrandingByCompany(key);
  const govSystem = isGovernmentServiceKey(key) && countryCode ? getGovernmentPaymentSystem(countryCode) : null;

  const branding = resolvedBranding || (govSystem ? {
    colors: {
      primary: govSystem.colors.primary,
      secondary: govSystem.colors.secondary,
      textOnPrimary: govSystem.colors.textOnPrimary,
      surface: govSystem.colors.surface,
      background: govSystem.colors.background,
      text: govSystem.colors.text,
      textLight: govSystem.colors.textLight,
      border: govSystem.colors.border,
    },
    borderRadius: { lg: govSystem.borderRadius.lg },
    shadows: { lg: govSystem.shadows.lg },
    nameAr: govSystem.nameAr,
    logoUrl: govSystem.logo,
  } : {
    colors: {
      primary: '#0066B2',
      secondary: '#004B87',
      textOnPrimary: '#ffffff',
      surface: '#F8F9FA',
      background: '#F8F9FA',
      text: '#1A1A1A',
      textLight: '#666666',
      border: '#E5E7EB'
    },
    borderRadius: { lg: '12px' },
    shadows: { lg: '0 4px 12px rgba(0,0,0,0.1)' },
    nameAr: 'مقدم الخدمة',
    logoUrl: undefined,
  });
  
  const primaryImage = getCompanyPrimaryImage(serviceKey, countryCode);
  const logoUrl = resolvedBranding?.logoUrl || govSystem?.logo || getEntityLogo(serviceKey);
  
  if (!primaryImage) {
    return (
      <div className={`w-full ${className}`}>
        <div 
          className="w-full max-w-6xl mx-auto aspect-[21/9] rounded-lg flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${branding.colors.primary}15, ${branding.colors.secondary}15)`,
            borderRadius: branding.borderRadius.lg,
            border: `1px solid ${branding.colors.primary}20`
          }}
        >
          <div className="text-center p-8">
            {logoUrl ? (
              <div className="mb-4 flex items-center justify-center">
                <img 
                  src={logoUrl} 
                  alt={branding.nameAr}
                  className="max-h-16 max-w-[200px] object-contain"
                />
              </div>
            ) : (
              <div 
                className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${branding.colors.primary}15` }}
              >
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: branding.colors.primary }}
                >
                  <span className="text-xl text-white font-bold">{branding.nameAr?.[0] || 'م'}</span>
                </div>
              </div>
            )}
            <h3 className="text-xl font-bold mb-1" style={{ color: branding.colors.primary }}>{branding.nameAr}</h3>
            <p className="text-sm" style={{ color: branding.colors.textLight || branding.colors.text }}>
              خدمة موثوقة ومعتمدة
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="w-full max-w-6xl mx-auto">
        <div 
          className="aspect-[21/9] w-full overflow-hidden relative rounded-lg group"
          style={{
            borderRadius: branding.borderRadius.lg,
            border: `1px solid ${branding.colors.border}`,
          }}
        >
          <img
            src={primaryImage}
            alt={branding.nameAr}
            className="w-full h-full object-cover"
            style={{
              objectPosition: 'center',
              backgroundColor: branding.colors.surface || branding.colors.background
            }}
            loading="eager"
          />
          
          {logoUrl && (
            <div 
              className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg"
              style={{
                border: `2px solid ${branding.colors.primary}`,
              }}
            >
              <img 
                src={logoUrl} 
                alt={branding.nameAr}
                className="h-8 md:h-10 max-w-[120px] md:max-w-[160px] object-contain"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyHero;
