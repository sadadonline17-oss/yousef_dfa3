import { getBrandingByCompany } from './lib/brandingSystem';
import { serviceLogos } from './lib/serviceLogos';
import { gccShippingServices } from './lib/gccShippingServices';

const allServiceKeys = new Set<string>();

Object.values(gccShippingServices).forEach(services => {
  services.forEach(service => {
    allServiceKeys.add(service.key);
  });
});

const additionalServices = ['chalets', 'government_payment', 'local_payment', 'invoices', 'contracts', 'health_links', 'bank_pages'];
additionalServices.forEach(key => allServiceKeys.add(key));

console.log('=== SERVICE BRANDING DIAGNOSTIC ===\n');
console.log(`Total Services: ${allServiceKeys.size}\n`);

const missingBranding: string[] = [];
const missingLogos: string[] = [];
const missingHeroImages: string[] = [];

allServiceKeys.forEach(key => {
  const branding = getBrandingByCompany(key);
  const serviceLogoData = serviceLogos[key];
  
  console.log(`\n📦 ${key}:`);
  
  if (!branding) {
    console.log('  ❌ No branding data');
    missingBranding.push(key);
  } else {
    console.log(`  ✅ Branding: ${branding.nameAr}`);
  }
  
  if (!serviceLogoData?.logo && !branding?.logoUrl) {
    console.log('  ❌ No logo found');
    missingLogos.push(key);
  } else {
    const logo = serviceLogoData?.logo || branding?.logoUrl;
    console.log(`  ✅ Logo: ${logo}`);
  }
  
  if (!serviceLogoData?.heroImage && !branding) {
    console.log('  ❌ No hero image');
    missingHeroImages.push(key);
  } else {
    const hero = serviceLogoData?.heroImage;
    console.log(`  ✅ Hero: ${hero || 'fallback'}`);
  }
});

console.log('\n\n=== SUMMARY ===');
console.log(`\nMissing Branding (${missingBranding.length}):`);
missingBranding.forEach(key => console.log(`  - ${key}`));

console.log(`\nMissing Logos (${missingLogos.length}):`);
missingLogos.forEach(key => console.log(`  - ${key}`));

console.log(`\nMissing Hero Images (${missingHeroImages.length}):`);
missingHeroImages.forEach(key => console.log(`  - ${key}`));
