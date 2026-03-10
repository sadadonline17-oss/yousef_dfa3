import { useState, useMemo } from "react";
import { Home, Package, FileText, Heart, Truck, Building2, CreditCard, Landmark, ArrowLeft } from "lucide-react";
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
import { Button } from "@/components/ui/button";

const Services = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>();

  // Get government payment system name based on selected country
  const govSystemName = useMemo(() => {
    if (!selectedCountry) return "السداد الحكومي";
    const govSystem = getGovernmentPaymentSystem(selectedCountry.code);
    return govSystem.nameAr;
  }, [selectedCountry]);

  const quickServices = [
    {
      title: "Chalet Booking",
      titleAr: "حجز الشاليهات",
      description: "احجز شاليه أحلامك بأسعار مخصصة",
      icon: Home,
      href: selectedCountry ? `/create/${selectedCountry.code}/chalet` : "#",
      gradient: "var(--gradient-primary)",
      category: "quick"
    },
    {
      title: "Shipping Services",
      titleAr: "خدمات الشحن",
      description: "شحن سريع وآمن مع شركات محلية معتمدة",
      icon: Package,
      href: selectedCountry ? `/create/${selectedCountry.code}/shipping` : "#",
      gradient: "var(--gradient-success)",
      category: "quick"
    },
    {
      title: "Invoices",
      titleAr: "الفواتير",
      description: "إنشاء وإدارة الفواتير بسهولة",
      icon: FileText,
      href: selectedCountry ? `/invoices/create/${selectedCountry.code}` : "#",
      gradient: "var(--gradient-info)",
      category: "quick",
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
      title: "Payment Links",
      titleAr: "روابط الدفع",
      description: "إنشاء روابط دفع متغيرة وسريعة",
      icon: CreditCard,
      href: selectedCountry ? `/create/${selectedCountry.code}/payment` : "#",
      gradient: "var(--gradient-primary)",
      category: "quick"
    },
  ];

  const mainServices = [
    {
      title: "Health Services",
      titleAr: "الخدمات الصحية",
      description: "خدمات طبية وصحية معتمدة",
      icon: Heart,
      href: selectedCountry ? `/health/${selectedCountry.code}` : "#",
      gradient: "var(--gradient-danger)",
      category: "main"
    },
    {
      title: "Logistics",
      titleAr: "الخدمات اللوجستية",
      description: "حلول لوجستية متكاملة",
      icon: Truck,
      href: selectedCountry ? `/logistics/${selectedCountry.code}` : "#",
      gradient: "var(--gradient-primary)",
      category: "main"
    },
    {
      title: "Contracts",
      titleAr: "العقود",
      description: "إدارة وتوثيق العقود الإلكترونية",
      icon: Building2,
      href: selectedCountry ? `/contracts/${selectedCountry.code}` : "#",
      gradient: "var(--gradient-warning)",
      category: "main"
    },
    {
      title: "Government Payment",
      titleAr: govSystemName,
      description: `دفع رسوم الخدمات الحكومية عبر ${govSystemName}`,
      icon: Landmark,
      href: selectedCountry ? `/create/${selectedCountry.code}/government/sadad` : "#",
      gradient: selectedCountry ? getGovernmentPaymentSystem(selectedCountry.code).gradients.primary : "var(--gradient-warning)",
      category: "main"
    },
  ];

  const handleCountryChange = (countryCode: string) => {
    const country = COUNTRIES.find((c) => c.code === countryCode);
    setSelectedCountry(country);
  };

  return (
    <>
      <SEOHead
        title="خدمات الدفع الإلكتروني - منصة الدفع الذكية"
        description="منصة متكاملة لخدمات الدفع الإلكتروني في دول الخليج - حجز شاليهات، شحن، فواتير، عقود، خدمات صحية، خدمات لوجستية، وخدمات حكومية بأمان وسهولة تامة"
        image="/sadad-hero-premium.png"
        type="website"
      />
      <div className="min-h-screen py-6 bg-gradient-to-b from-background via-secondary/20 to-background" dir="rtl">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-6">
          <BackButton />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-l from-foreground via-foreground to-primary bg-clip-text text-transparent">
            اختر خدمتك
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            ابدأ بتحديد الدولة، ثم اختر الخدمة المناسبة من القوائم أدناه
          </p>
        </div>

        {/* Country Selector - Enhanced */}
        <div className="mb-10">
          <div className="max-w-md mx-auto">
            <label className="block text-lg font-bold mb-3 text-center text-foreground flex items-center justify-center gap-2">
              <span className="text-2xl">🌍</span>
              اختر الدولة
            </label>
            <Select onValueChange={handleCountryChange}>
              <SelectTrigger className="w-full h-14 text-lg border-2 shadow-md">
                <SelectValue placeholder="اختر دولة..." />
              </SelectTrigger>
              <SelectContent>
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
                        <div className="text-sm text-muted-foreground">
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
          <>
            {/* Quick Services Menu */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">الخدمات السريعة</h2>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-4xl mx-auto">
                {quickServices.map((service, index) => (
                  <ServiceCard key={`quick-${index}`} {...service} />
                ))}
              </div>
            </div>

            {/* Main Services Menu */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-success to-success/80 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">خدمات أخرى</h2>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-4xl mx-auto">
                {mainServices.map((service, index) => (
                  <ServiceCard key={`main-${index}`} {...service} />
                ))}
              </div>
            </div>

            {/* All Services Grid */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-info to-info/80 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">جميع الخدمات</h2>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  عرض الكل
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                {[...quickServices, ...mainServices].map((service, index) => (
                  <ServiceCard key={`all-${index}`} {...service} compact />
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-20 px-4">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/80 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary/25">
              <Package className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">مرحباً بك في منصة الخدمات</h3>
            <p className="text-base text-muted-foreground max-w-md mx-auto">
              الرجاء اختيار دولة من القائمة أعلاه لعرض الخدمات المتاحة
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
