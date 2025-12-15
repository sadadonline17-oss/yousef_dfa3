import React, { useRef, useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { shippingCompanyBranding } from '@/lib/brandingSystem';
import { getEntityHeaderImages, detectEntityFromURL } from '@/lib/dynamicIdentity';
import Autoplay from 'embla-carousel-autoplay';

import heroAramex from '@/assets/hero-aramex.svg';
import heroAramex2 from '@/assets/hero-aramex-2.jpg';
import heroAramex3 from '@/assets/hero-aramex-3.jpg';
import heroAramex4 from '@/assets/hero-aramex-4.jpg';
import heroAramex5 from '@/assets/hero-aramex-5.jpg';
import heroAramex6 from '@/assets/hero-aramex-6.jpg';
import heroAramex7 from '@/assets/hero-aramex-7.jpg';
import heroDhl from '@/assets/hero-dhl.jpg';
import heroDhl1 from '@/assets/hero-dhl-1.jpg';
import heroDhl2 from '@/assets/hero-dhl-2.jpg';
import heroDhl3 from '@/assets/hero-dhl-3.jpg';
import heroFedex from '@/assets/hero-fedex.svg';
import heroFedex1 from '@/assets/hero-fedex-1.jpg';
import heroFedex2 from '@/assets/hero-fedex-2.jpg';
import heroFedex3 from '@/assets/hero-fedex-3.jpg';
import heroUps from '@/assets/hero-ups.svg';
import heroUps1 from '@/assets/hero-ups-1.jpg';
import heroUps2 from '@/assets/hero-ups-2.jpg';
import heroUps3 from '@/assets/hero-ups-3.jpg';
import heroSmsa from '@/assets/hero-smsa.jpg';
import heroSmsa1 from '@/assets/hero-smsa-1.jpg';
import heroSmsa2 from '@/assets/hero-smsa-2.jpg';
import heroSmsa3 from '@/assets/hero-smsa-3.jpg';
import heroNaqel from '@/assets/hero-naqel.jpg';
import heroNaqel1 from '@/assets/hero-naqel-1.jpg';
import heroNaqel2 from '@/assets/hero-naqel-2.jpg';
import heroNaqel3 from '@/assets/hero-naqel-3.jpg';
import heroZajil from '@/assets/hero-zajil.jpg';
import heroZajil1 from '@/assets/hero-zajil-1.jpg';
import heroZajil2 from '@/assets/hero-zajil-2.jpg';
import heroZajil3 from '@/assets/hero-zajil-3.jpg';
import heroSaudipost from '@/assets/hero-saudipost.jpg';
import heroSaudipost1 from '@/assets/hero-saudipost-1.jpg';
import heroEmpost from '@/assets/hero-empost.jpg';
import heroEmpost2 from '@/assets/hero-empost-2.jpg';
import heroQpost from '@/assets/hero-qpost.jpg';
import heroKwpost from '@/assets/hero-kwpost.jpg';
import heroOmanpost from '@/assets/hero-omanpost.jpg';
import heroBahpost from '@/assets/hero-bahpost.jpg';
import heroAlbaraka from '@/assets/hero-albaraka.jpg';
import heroAlfuttaim from '@/assets/hero-alfuttaim.jpg';
import heroAlshaya from '@/assets/hero-alshaya.jpg';
import heroShipco from '@/assets/hero-shipco.jpg';
import heroBahri from '@/assets/hero-bahri.jpg';
import heroHellmann from '@/assets/hero-hellmann.jpg';
import heroDsv from '@/assets/hero-dsv.jpg';
import heroGenacom from '@/assets/hero-genacom.jpg';
import heroJinaken from '@/assets/hero-jinaken.jpg';
import heroJinakum from '@/assets/hero-jinakum.jpg';
import { isGovernmentService } from '@/lib/governmentPaymentServices';

interface BrandedCarouselProps {
  serviceKey: string;
  className?: string;
  countryCode?: string;
  govServiceKey?: string;
}

const isGovernmentServiceKey = (key: string): boolean => {
  return isGovernmentService(key) || key === 'government_payment';
};

const getCompanyImages = (serviceKey: string, countryCode?: string, govServiceKey?: string): string[] => {
  const key = serviceKey.toLowerCase();
  
  console.log('🔍 getCompanyImages called:', { serviceKey, key, countryCode, govServiceKey });
  
  // للخدمات الحكومية: استخدم الدولة لتحديد الصور (وليس الخدمة)
  // مثال: service=sadad + country=AE → صور جيوان الإماراتي
  if (isGovernmentServiceKey(key) && countryCode) {
    const country = countryCode.toUpperCase();
    const govImages: Record<string, string[]> = {
      SA: [
        '/og-government_payment.jpg',
        '/gov-sadad-hero-large.svg',
        '/gov-sadad-hero-3.png',
        '/gov-sadad-hero-1.jpg',
        '/gov-sadad-hero-2.jpg',
        '/gov-sadad-official.png',
        '/assets/dynamic-identity/gov_image1.svg',
        '/assets/dynamic-identity/gov_image2.svg',
        '/assets/dynamic-identity/gov_image3.svg'
      ],
      BH: [
        '/og-government_payment.jpg',
        '/gov-benefit-hero-large.svg',
        '/gov-benefit-hero-1.svg',
        '/gov-benefit-hero-2.svg',
        '/gov-benefit-logo-official.png',
        '/assets/dynamic-identity/gov_image1.svg'
      ],
      KW: [
        '/og-government_payment.jpg',
        '/gov-knet-hero-large.svg',
        '/gov-knet-hero-1.svg',
        '/gov-knet-hero-2.svg',
        '/gov-knet-hero-real.svg',
        '/gov-knet-logo.png',
        '/assets/dynamic-identity/gov_image2.svg'
      ],
      AE: [
        '/og-government_payment.jpg',
        '/gov-jaywan-hero-large.svg',
        '/gov-jaywan-hero-1.svg',
        '/gov-uae-logo.jpg',
        '/assets/dynamic-identity/gov_image3.svg'
      ],
      OM: [
        '/og-government_payment.jpg',
        '/gov-maal-hero-large.svg',
        '/gov-maal-hero-1.svg',
        '/gov-maal-logo.jpg',
        '/assets/dynamic-identity/gov_image1.svg'
      ],
      QA: [
        '/og-government_payment.jpg',
        '/gov-qatar-hero-large.svg',
        '/gov-qatar-hero-1.svg',
        '/gov-qatar-logo.png',
        '/assets/dynamic-identity/gov_image2.svg'
      ],
    };
    console.log('✅ Using country-based images for gov service:', country, govImages[country]);
    return govImages[country] || govImages['SA'];
  }
  
  // Handle government_payment with country-specific images
  if (key === 'government_payment' && countryCode) {
    const country = countryCode.toUpperCase();
    const govImages: Record<string, string[]> = {
      SA: [
        '/gov-sadad-hero-large.svg',
        '/gov-sadad-hero-3.png',
        '/gov-sadad-hero-1.jpg',
        '/gov-sadad-hero-2.jpg',
        '/gov-sadad-official.png'
      ],
      BH: [
        '/gov-benefit-hero-large.svg',
        '/gov-benefit-hero-1.svg',
        '/gov-benefit-hero-2.svg',
        '/gov-benefit-logo-official.png'
      ],
      KW: [
        '/gov-knet-hero-large.svg',
        '/gov-knet-hero-1.svg',
        '/gov-knet-hero-2.svg',
        '/gov-knet-hero-real.svg',
        '/gov-knet-logo.png'
      ],
      AE: [
        '/gov-jaywan-hero-large.svg',
        '/gov-jaywan-hero-1.svg',
        '/gov-uae-logo.jpg'
      ],
      OM: [
        '/gov-maal-hero-large.svg',
        '/gov-maal-hero-1.svg',
        '/gov-maal-logo.jpg'
      ],
      QA: [
        '/gov-qatar-hero-large.svg',
        '/gov-qatar-hero-1.svg',
        '/gov-qatar-logo.png'
      ],
    };
    return govImages[country] || govImages['SA'];
  }
  
  // Handle bank_* keys by returning bank_pages images
  if (key.startsWith('bank_')) {
    return [
      '/og-bank_pages.jpg',
      '/assets/dynamic-identity/bank_image1.svg',
      '/assets/dynamic-identity/bank_image2.svg',
      '/assets/dynamic-identity/bank_image3.svg',
      '/assets/dynamic-identity/bank_payment.svg'
    ];
  }
  
  // Handle specific government services by key
  if (key.includes('sadad') || key.includes('benefit') || key.includes('knet') || 
      key.includes('jaywan') || key.includes('omannet') || key.includes('qatar')) {
    const govServiceImages: Record<string, string[]> = {
      sadad: [
        '/og-government_payment.jpg',
        '/gov-sadad-hero-large.svg',
        '/gov-sadad-official.png',
        '/gov-sadad-hero-3.png',
        '/assets/dynamic-identity/gov_image1.svg'
      ],
      benefit: [
        '/og-government_payment.jpg',
        '/gov-benefit-hero-large.svg',
        '/gov-benefit-logo-official.png',
        '/assets/dynamic-identity/gov_image2.svg'
      ],
      knet: [
        '/og-government_payment.jpg',
        '/gov-knet-hero-large.svg',
        '/gov-knet-logo.png',
        '/assets/dynamic-identity/gov_image3.svg'
      ],
      jaywan: [
        '/og-government_payment.jpg',
        '/gov-jaywan-hero-large.svg',
        '/gov-uae-logo.jpg',
        '/assets/dynamic-identity/gov_image1.svg'
      ],
      omannet: [
        '/og-government_payment.jpg',
        '/gov-maal-hero-large.svg',
        '/gov-maal-logo.jpg',
        '/assets/dynamic-identity/gov_image2.svg'
      ],
      qatar: [
        '/og-government_payment.jpg',
        '/gov-qatar-hero-large.svg',
        '/gov-qatar-logo.png',
        '/assets/dynamic-identity/gov_image3.svg'
      ],
    };
    
    for (const [servicePrefix, images] of Object.entries(govServiceImages)) {
      if (key.includes(servicePrefix)) {
        console.log('✅ Using service-specific government images:', servicePrefix, images.slice(0, 2));
        return images;
      }
    }
  }
  
  const allImages: Record<string, string[]> = {
    // Shipping companies with new OG images
    aramex: ['/aramex-hero-official.png', '/og-aramex.jpg', heroAramex5, heroAramex6, heroAramex7, heroAramex],
    dhl: ['/dhl-hero-official.png', '/og-dhl.jpg', heroDhl, heroDhl1, heroDhl2, heroDhl3],
    dhlkw: ['/dhl-hero-official.png', '/og-dhl.jpg', heroDhl, heroDhl1],
    dhlqa: ['/dhl-hero-official.png', '/og-dhl.jpg', heroDhl],
    dhlom: ['/dhl-hero-official.png', '/og-dhl.jpg', heroDhl],
    dhlbh: ['/dhl-hero-official.png', '/og-dhl.jpg', heroDhl],
    fedex: ['/fedex-hero-official.png', '/og-fedex.jpg', heroFedex, heroFedex1, heroFedex2, heroFedex3],
    ups: ['/ups-hero-official.png', '/og-ups.jpg', heroUps, heroUps1, heroUps2, heroUps3],
    smsa: ['/smsa-hero-official.png', '/og-smsa.jpg', heroSmsa, heroSmsa1, heroSmsa2, heroSmsa3],
    naqel: ['/naqel-hero-official.png', '/og-naqel.jpg', heroNaqel, heroNaqel1, heroNaqel2, heroNaqel3],
    zajil: ['/zajil-hero-official.png', '/og-zajil.jpg', heroZajil, heroZajil1, heroZajil2, heroZajil3],
    // Post offices with new OG images
    saudipost: ['/saudipost-hero-official.png', '/og-saudipost.jpg', heroSaudipost, heroSaudipost1],
    empost: ['/og-empost.jpg', heroEmpost, heroEmpost2],
    qpost: ['/og-qpost.jpg', heroQpost],
    kwpost: ['/og-kwpost.jpg', heroKwpost],
    omanpost: ['/og-omanpost.jpg', heroOmanpost],
    bahpost: ['/og-bahpost.jpg', heroBahpost],
    // Other companies
    albaraka: ['/og-albaraka.jpg', heroAlbaraka],
    alfuttaim: ['/og-alfuttaim.jpg', heroAlfuttaim],
    alshaya: ['/og-alshaya.jpg', heroAlshaya],
    shipco: ['/og-shipco.jpg', heroShipco],
    bahri: ['/og-bahri.jpg', heroBahri],
    national: ['/og-bahri.jpg', heroBahri],
    hellmann: ['/og-hellmann.jpg', heroHellmann],
    dsv: ['/og-dsv.jpg', heroDsv],
    genacom: ['/og-genacom.jpg', heroGenacom],
    agility: ['/og-agility-temp.jpg', heroGenacom],
    jinaken: ['/og-jinaken.jpg', heroJinaken],
    jinakum: ['/og-jinakum.jpg', heroJinakum],
    // Services with OG images first - خدمات مع صور المشاركة
    chalets: [
      '/og-chalets.jpg',
      '/assets/dynamic-identity/chalets_image1.svg',
      '/assets/dynamic-identity/chalets_image2.svg',
      '/assets/dynamic-identity/chalets_image3.svg',
      '/assets/dynamic-identity/chalets_payment.svg'
    ],
    government_payment: [
      '/og-government_payment.jpg',
      '/assets/dynamic-identity/gov_image1.svg',
      '/assets/dynamic-identity/gov_image2.svg',
      '/assets/dynamic-identity/gov_image3.svg',
      '/assets/dynamic-identity/gov_payment.svg'
    ],
    local_payment: [
      '/og-local_payment.jpg',
      '/assets/dynamic-identity/local_image1.svg',
      '/assets/dynamic-identity/local_image2.svg',
      '/assets/dynamic-identity/local_image3.svg',
      '/assets/dynamic-identity/local_payment.svg'
    ],
    invoices: [
      '/og-invoices.jpg',
      '/assets/dynamic-identity/invoice_image1.svg',
      '/assets/dynamic-identity/invoice_image2.svg',
      '/assets/dynamic-identity/invoice_image3.svg',
      '/assets/dynamic-identity/invoice_payment.svg'
    ],
    contracts: [
      '/og-contracts.jpg',
      '/assets/dynamic-identity/contract_image1.svg',
      '/assets/dynamic-identity/contract_image2.svg',
      '/assets/dynamic-identity/contract_image3.svg',
      '/assets/dynamic-identity/contract_payment.svg'
    ],
    health_links: [
      '/og-health_links.jpg',
      '/assets/dynamic-identity/health_image1.svg',
      '/assets/dynamic-identity/health_image2.svg',
      '/assets/dynamic-identity/health_image3.svg',
      '/assets/dynamic-identity/health_payment.svg'
    ],
    bank_pages: [
      '/og-bank_pages.jpg',
      '/assets/dynamic-identity/bank_image1.svg',
      '/assets/dynamic-identity/bank_image2.svg',
      '/assets/dynamic-identity/bank_image3.svg',
      '/assets/dynamic-identity/bank_payment.svg'
    ],
  };

  return allImages[key] || [];
};

const BrandedCarousel: React.FC<BrandedCarouselProps> = ({ serviceKey, className = '', countryCode, govServiceKey }) => {
  const branding = shippingCompanyBranding[serviceKey.toLowerCase()] || {
    colors: { primary: '#0066B2', secondary: '#004B87', textOnPrimary: '#ffffff' },
    borderRadius: { lg: '12px' },
    shadows: { lg: '0 10px 25px rgba(0,0,0,0.1)' },
    nameAr: 'مقدم الخدمة'
  };
  
  let images: string[] = [];
  
  if (serviceKey) {
    const localImages = getCompanyImages(serviceKey, countryCode, govServiceKey);
    if (localImages.length > 0) {
      images = localImages;
    }
  }
  
  if (images.length === 0) {
    const detectedEntity = detectEntityFromURL();
    if (detectedEntity) {
      const entityImages = getEntityHeaderImages(detectedEntity);
      if (entityImages.length > 0) {
        images = entityImages;
      }
    }
  }
  
  if (images.length === 0 && serviceKey) {
    const entityImagesFromKey = getEntityHeaderImages(serviceKey);
    if (entityImagesFromKey.length > 0) {
      images = entityImagesFromKey;
    }
  }
  
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  useEffect(() => {
    console.log('🖼️ Carousel - serviceKey:', serviceKey, '| countryCode:', countryCode);
    console.log('🖼️ Carousel - images:', images.slice(0, 2));
    
    if (images.length === 0) {
      setImagesLoaded(true);
      return;
    }
    
    const preloadImages = async () => {
      const imagePromises = images.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
        });
      });
      
      try {
        await Promise.allSettled(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error('Error preloading images:', error);
        setImagesLoaded(true);
      }
    };
    
    preloadImages();
  }, [images, serviceKey, countryCode]);
  
  const autoplayRef = useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    })
  );

  if (images.length === 0) {
    return (
      <div className={`w-full ${className}`}>
        <div 
          className="w-full max-w-6xl mx-auto aspect-[21/9] rounded-xl flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${branding.colors.primary}20, ${branding.colors.secondary}20)`,
            borderRadius: branding.borderRadius.lg,
            boxShadow: branding.shadows.lg,
            border: `2px solid ${branding.colors.primary}30`
          }}
        >
          <div className="text-center p-8">
            <div 
              className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${branding.colors.primary}20` }}
            >
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: branding.colors.primary }}
              >
                <span className="text-2xl text-white font-bold">{branding.nameAr?.[0] || 'م'}</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-2" style={{ color: branding.colors.primary }}>{branding.nameAr}</h3>
            <p className="text-sm" style={{ color: branding.colors.textLight || branding.colors.text }}>
              خدمة موثوقة ومعتمدة
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  if (!imagesLoaded) {
    return (
      <div className={`w-full ${className}`}>
        <div 
          className="w-full max-w-6xl mx-auto aspect-[21/9] rounded-xl flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${branding.colors.primary}15, ${branding.colors.secondary}15)`,
            borderRadius: branding.borderRadius.lg,
            boxShadow: branding.shadows.lg,
            border: `1px solid ${branding.colors.primary}20`
          }}
        >
          <div className="animate-pulse text-center">
            <div 
              className="w-16 h-16 mx-auto mb-2 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${branding.colors.primary}20` }}
            >
              <div 
                className="w-8 h-8 rounded-full"
                style={{ backgroundColor: branding.colors.primary }}
              />
            </div>
            <p className="text-sm font-bold" style={{ color: branding.colors.primary }}>جاري التحميل...</p>
            <p className="text-xs mt-1" style={{ color: branding.colors.textLight || branding.colors.text }}>{branding.nameAr}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <Carousel
        opts={{
          align: 'center',
          loop: true,
        }}
        plugins={[autoplayRef.current]}
        className="w-full max-w-6xl mx-auto"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {images.map((image, index) => (
            <CarouselItem key={`${serviceKey}-${index}`} className="pl-2 md:pl-4 basis-full">
              <div className="relative overflow-hidden rounded-xl group">
                <div 
                  className="aspect-[21/9] w-full overflow-hidden relative"
                  style={{
                    borderRadius: branding.borderRadius.lg,
                    boxShadow: branding.shadows.lg,
                  }}
                >
                  <img
                    src={image}
                    alt={`${branding.nameAr} - ${index + 1}`}
                    className="w-full h-full transition-all duration-700 group-hover:scale-105"
                    style={{
                      objectFit: image.endsWith('.svg') ? 'contain' : 'cover',
                      objectPosition: 'center',
                      backgroundColor: branding.colors.surface || '#f5f5f5',
                      padding: image.endsWith('.svg') ? '1rem' : '0'
                    }}
                    loading={index === 0 ? "eager" : "lazy"}
                    onError={(e) => {
                      console.error(`❌ Failed to load image: ${image}`);
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.style.background = `linear-gradient(135deg, ${branding.colors.primary}20, ${branding.colors.secondary}20)`;
                        parent.innerHTML = `<div class="flex flex-col items-center justify-center h-full p-8">
                          <div class="w-24 h-24 mb-4 rounded-full flex items-center justify-center" style="background-color: ${branding.colors.primary}20">
                            <div class="w-16 h-16 rounded-full flex items-center justify-center" style="background-color: ${branding.colors.primary}">
                              <span class="text-3xl text-white font-bold">${branding.nameAr?.[0] || 'م'}</span>
                            </div>
                          </div>
                          <p class="text-2xl font-bold mb-2" style="color: ${branding.colors.primary}">${branding.nameAr}</p>
                          <p class="text-sm" style="color: ${branding.colors.textLight || branding.colors.text}">خدمة موثوقة ومعتمدة</p>
                        </div>`;
                      }
                    }}
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 && (
          <>
            <CarouselPrevious 
              className="hidden md:flex left-4"
              style={{
                backgroundColor: branding.colors.primary,
                borderColor: branding.colors.primary,
                color: branding.colors.textOnPrimary,
              }}
            />
            <CarouselNext 
              className="hidden md:flex right-4"
              style={{
                backgroundColor: branding.colors.primary,
                borderColor: branding.colors.primary,
                color: branding.colors.textOnPrimary,
              }}
            />
          </>
        )}
      </Carousel>
    </div>
  );
};

export default BrandedCarousel;
