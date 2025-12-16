import { useState, useMemo } from "react";
import { Home, Package, FileText, Heart, Truck, Building2, CreditCard, Landmark } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import { Country, COUNTRIES } from "@/lib/countries";
import SEOHead from "@/components/SEOHead";
import BottomNav from "@/components/BottomNav";
import BackButton from "@/components/BackButton";
import { getGovernmentPaymentSystem } from "@/lib/governmentPaymentSystems";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Services = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>();

  // Get government payment system name based on selected country
  const govSystemName = useMemo(() => {
    if (!selectedCountry) return "السداد الحكومي";
    const govSystem = getGovernmentPaymentSystem(selectedCountry.code);
    return govSystem.nameAr;
  }, [selectedCountry]);

  const services = [
    {
      title: "Chalet Booking",
      titleAr: "حجز الشاليهات",
      description: "احجز شاليه أحلامك بأسعار مخصصة",
      icon: Home,
      href: selectedCountry ? `/create/${selectedCountry.code}/chalet` : "#",
      gradient: "var(--gradient-primary)",
    },
    {
      title: "Shipping Services",
      titleAr: "خدمات الشحن",
      description: "شحن سريع وآمن مع شركات محلية معتمدة",
      icon: Package,
      href: selectedCountry ? `/create/${selectedCountry.code}/shipping` : "#",
      gradient: "var(--gradient-success)",
    },
    {
      title: "Invoices",
      titleAr: "الفواتير",
      description: "إنشاء وإدارة الفواتير بسهولة",
      icon: FileText,
      href: selectedCountry ? `/invoices/create/${selectedCountry.code}` : "#",
      gradient: "var(--gradient-info)",
      sublinks: [
        {
          title: "إنشاء فاتورة جديدة",
          href: selectedCountry ? `/invoices/create/${selectedCountry.code}` : "#",
        },
        {
          title: "عرض جميع الفواتير",
          href: selectedCountry ? `/invoices/list/${selectedCountry.code}` : "#",
        },
      ],
    },
    {
      title: "Health Services",
      titleAr: "الخدمات الصحية",
      description: "خدمات طبية وصحية معتمدة",
      icon: Heart,
      href: selectedCountry ? `/health/${selectedCountry.code}` : "#",
      gradient: "var(--gradient-danger)",
    },
    {
      title: "Logistics",
      titleAr: "الخدمات اللوجستية",
      description: "حلول لوجستية متكاملة",
      icon: Truck,
      href: selectedCountry ? `/logistics/${selectedCountry.code}` : "#",
      gradient: "var(--gradient-primary)",
    },
    {
      title: "Contracts",
      titleAr: "العقود",
      description: "إدارة وتوثيق العقود الإلكترونية",
      icon: Building2,
      href: selectedCountry ? `/contracts/${selectedCountry.code}` : "#",
      gradient: "var(--gradient-warning)",
    },
    {
      title: "Payment Links",
      titleAr: "روابط الدفع",
      description: "إنشاء روابط دفع متغيرة وسريعة",
      icon: CreditCard,
      href: selectedCountry ? `/create/${selectedCountry.code}/payment` : "#",
      gradient: "var(--gradient-primary)",
    },
    {
      title: "Government Payment",
      titleAr: govSystemName,
      description: `دفع رسوم الخدمات الحكومية عبر ${govSystemName} - جواز السفر، المخالفات، رخصة القيادة والمزيد`,
      icon: Landmark,
      href: selectedCountry ? `/create/${selectedCountry.code}/government/sadad` : "#",
      gradient: selectedCountry ? getGovernmentPaymentSystem(selectedCountry.code).gradients.primary : "var(--gradient-warning)",
    },
  ];



  const handleCountryChange = (countryCode: string) => {
    const country = COUNTRIES.find((c) => c.code === countryCode);
    setSelectedCountry(country);
  };

  return (
    <>
      <SEOHead 
        title="خدمات الشحن في دول الخليج"
        description="اختر شركة الشحن المفضلة لديك من بين جميع شركات الشحن الكبرى في دول الخليج: أرامكس، دي إتش إل، فيديكس، يو بي إس، سمسا، زاجل، ناقل، والبريد الوطني"
        image="/og-aramex.jpg"
        type="website"
      />
      <div className="min-h-screen py-6" style={{ background: 'linear-gradient(to bottom right, hsl(var(--background)), hsl(var(--muted) / 0.15))' }} dir="rtl">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-4">
          <BackButton />
        </div>
        
        <div className="text-center mb-8">
          <h1 
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{
              background: 'linear-gradient(to right, hsl(var(--primary)), hsl(var(--accent)))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            اختر خدمتك
          </h1>
          <p className="text-base" style={{ color: 'hsl(var(--muted-foreground))' }}>
            ابدأ بتحديد الدولة، ثم اختر الخدمة المناسبة
          </p>
        </div>

        <div className="mb-8">
          <div className="max-w-md mx-auto">
            <label className="block text-lg font-bold mb-3 text-center" style={{ color: 'hsl(var(--foreground))' }}>
              اختر الدولة
            </label>
            <Select onValueChange={handleCountryChange}>
              <SelectTrigger 
                className="w-full h-14 text-lg backdrop-blur-sm border-2 transition-all"
                style={{
                  backgroundColor: 'hsl(var(--card) / 0.8)',
                  borderColor: 'hsl(var(--border))',
                  boxShadow: '0 4px 12px -2px rgba(0, 0, 0, 0.08)'
                }}
              >
                <SelectValue placeholder="اختر دولة..." />
              </SelectTrigger>
              <SelectContent style={{ backgroundColor: 'hsl(var(--popover))', borderColor: 'hsl(var(--border))' }}>
                {COUNTRIES.map((country) => (
                  <SelectItem
                    key={country.code}
                    value={country.code}
                    className="text-base py-3 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{country.flag}</span>
                      <div className="text-right">
                        <div className="font-bold text-base">{country.nameAr}</div>
                        <div className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                          {country.name}
                        </div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {selectedCountry ? (
          <div className="animate-fade-in">
            <h2 
              className="text-xl font-bold mb-6 text-center"
              style={{
                background: 'linear-gradient(to right, hsl(var(--primary)), hsl(var(--accent)))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              الخدمات المتاحة في {selectedCountry.nameAr}
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-4xl mx-auto">
              {services.map((service, index) => (
                <ServiceCard key={`${service.title}-${index}`} {...service} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div 
              className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse"
              style={{
                background: 'linear-gradient(to bottom right, hsl(var(--primary)), hsl(var(--accent)))',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
              }}
            >
              <Package className="w-10 h-10" style={{ color: 'hsl(var(--primary-foreground))' }} />
            </div>
            <p className="text-base" style={{ color: 'hsl(var(--muted-foreground))' }}>
              الرجاء اختيار دولة لعرض الخدمات المتاحة
            </p>
          </div>
        )}
      </div>
      <div className="h-20" />
    </div>
    <BottomNav />
    </>
  );
};

export default Services;
