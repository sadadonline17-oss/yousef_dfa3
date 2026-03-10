export interface Bank {
  id: string;
  name: string;
  nameAr: string;
  logo?: string;
  color: string;
}

export interface BanksByCountry {
  [countryCode: string]: Bank[];
}

export const BANKS_BY_COUNTRY: BanksByCountry = {
  SA: [
    {
      id: "alrajhi_bank",
      name: "Al Rajhi Bank",
      nameAr: "مصرف الراجحي",
      logo: "/bank-logos/alrajhi-bank-new.svg",
      color: "#006C35",
    },
    {
      id: "alahli_bank",
      name: "Saudi National Bank",
      nameAr: "البنك الأهلي السعودي",
      logo: "/bank-logos/saudi-national-bank.png",
      color: "#00843D",
    },
    {
      id: "riyad_bank",
      name: "Riyad Bank",
      nameAr: "بنك الرياض",
      logo: "/bank-logos/riyad-bank-new.svg",
      color: "#0066B2",
    },
    {
      id: "samba_bank",
      name: "Samba Financial Group",
      nameAr: "مجموعة سامبا المالية",
      logo: "/bank-logos/saudi-national-bank.png",
      color: "#E31E24",
    },
    {
      id: "saudi_investment_bank",
      name: "Saudi Investment Bank",
      nameAr: "البنك السعودي للاستثمار",
      logo: "/bank-logos/saudi-national-bank.png",
      color: "#004B87",
    },
    {
      id: "arab_national_bank",
      name: "Arab National Bank",
      nameAr: "البنك العربي الوطني",
      logo: "/bank-logos/arab-national-bank.svg",
      color: "#00A551",
    },
    {
      id: "saudi_fransi_bank",
      name: "Banque Saudi Fransi",
      nameAr: "البنك السعودي الفرنسي",
      logo: "/bank-logos/saudi-fransi.svg",
      color: "#ED1C24",
    },
    {
      id: "alinma_bank",
      name: "Alinma Bank",
      nameAr: "بنك الإنماء",
      logo: "/bank-logos/alinma-bank-new.png",
      color: "#00A650",
    },
    {
      id: "albilad_bank",
      name: "Bank AlBilad",
      nameAr: "بنك البلاد",
      logo: "/bank-logos/albilad-bank.png",
      color: "#1C4587",
    },
    {
      id: "aljazira_bank",
      name: "Bank AlJazira",
      nameAr: "بنك الجزيرة",
      logo: "/bank-logos/aljazira-bank.png",
      color: "#005EB8",
    },
    {
      id: "stc_bank",
      name: "stc bank",
      nameAr: "بنك stc",
      logo: "/bank-logos/stc-bank.png",
      color: "#00529F",
    },
  ],
  AE: [
    {
      id: "fab",
      name: "First Abu Dhabi Bank",
      nameAr: "بنك أبوظبي الأول",
      logo: "/bank-logos/fab-uae-new.svg",
      color: "#000000",
    },
    {
      id: "adcb",
      name: "Abu Dhabi Commercial Bank",
      nameAr: "بنك أبوظبي التجاري",
      logo: "/bank-logos/adcb-bank.svg",
      color: "#004B87",
    },
    {
      id: "emirates_nbd",
      name: "Emirates NBD",
      nameAr: "بنك الإمارات دبي الوطني",
      logo: "/bank-logos/emirates-nbd.png",
      color: "#D50032",
    },
    {
      id: "dib",
      name: "Dubai Islamic Bank",
      nameAr: "بنك دبي الإسلامي",
      logo: "/bank-logos/dib-bank.svg",
      color: "#00923F",
    },
    {
      id: "mashreq_bank",
      name: "Mashreq Bank",
      nameAr: "بنك المشرق",
      logo: "/bank-logos/mashreq-bank.svg",
      color: "#E31E24",
    },
  ],
  KW: [
    {
      id: "kfh",
      name: "Kuwait Finance House",
      nameAr: "بيت التمويل الكويتي",
      logo: "/bank-logos/kfh-kuwait.png",
      color: "#00923F",
    },
    {
      id: "nbk",
      name: "National Bank of Kuwait",
      nameAr: "بنك الكويت الوطني",
      logo: "/bank-logos/nbk-kuwait.png",
      color: "#005EB8",
    },
    {
      id: "boubyan_bank",
      name: "Boubyan Bank",
      nameAr: "بنك بوبيان",
      logo: "/bank-logos/boubyan-bank.jpg",
      color: "#0066B2",
    },
    {
      id: "gulf_bank",
      name: "Gulf Bank",
      nameAr: "بنك الخليج",
      logo: "/bank-logos/gulf-bank.png",
      color: "#004B87",
    },
  ],
  QA: [
    {
      id: "qnb",
      name: "Qatar National Bank",
      nameAr: "بنك قطر الوطني",
      logo: "/bank-logos/qnb-qatar-new.png",
      color: "#6E1D3E",
    },
    {
      id: "cbq",
      name: "Commercial Bank of Qatar",
      nameAr: "البنك التجاري القطري",
      logo: "/bank-logos/cbq-qatar.png",
      color: "#004B87",
    },
    {
      id: "doha_bank",
      name: "Doha Bank",
      nameAr: "بنك الدوحة",
      logo: "/bank-logos/doha-bank.jpg",
      color: "#E31E24",
    },
  ],
  OM: [
    {
      id: "bank_muscat",
      name: "Bank Muscat",
      nameAr: "بنك مسقط",
      logo: "/bank-logos/bank-muscat-new.png",
      color: "#E31E24",
    },
    {
      id: "national_bank_oman",
      name: "National Bank of Oman",
      nameAr: "البنك الوطني العماني",
      logo: "/bank-logos/nbo-oman.png",
      color: "#00A651",
    },
    {
      id: "sohar_international",
      name: "Sohar International Bank",
      nameAr: "بنك صحار الدولي",
      logo: "/bank-logos/sohar-international.png",
      color: "#0066B2",
    },
  ],
  BH: [
    {
      id: "nbb",
      name: "National Bank of Bahrain",
      nameAr: "بنك البحرين الوطني",
      logo: "/bank-logos/nbb-bahrain.jpg",
      color: "#E31E24",
    },
    {
      id: "bisb",
      name: "Bahrain Islamic Bank",
      nameAr: "بنك البحرين الإسلامي",
      logo: "/bank-logos/bisb-bahrain.webp",
      color: "#00923F",
    },
    {
      id: "bbk",
      name: "Bank of Bahrain and Kuwait",
      nameAr: "بنك البحرين والكويت",
      logo: "/bank-logos/bbk-bahrain.png",
      color: "#004B87",
    },
  ],
};

export const getBanksByCountry = (countryCode: string): Bank[] => {
  return BANKS_BY_COUNTRY[countryCode] || [];
};

export const getBankById = (bankId: string): Bank | undefined => {
  for (const banks of Object.values(BANKS_BY_COUNTRY)) {
    const bank = banks.find((b) => b.id === bankId);
    if (bank) return bank;
  }
  return undefined;
};

// API simulation function (can be replaced with actual API call)
export const fetchBanksByCountry = async (countryCode: string): Promise<Bank[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return getBanksByCountry(countryCode);
};
