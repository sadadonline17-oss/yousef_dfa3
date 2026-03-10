import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Zap, Sparkles, Package, CreditCard, Building2, Heart, Truck, FileText, Home, Landmark } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import BottomNav from "@/components/BottomNav";

const Index = () => {
  const quickServices = [
    { icon: Home, label: "الشاليهات", labelEn: "Chalets", href: "/services", color: "from-emerald-500 to-teal-600", bg: "bg-emerald-50" },
    { icon: Package, label: "الشحن", labelEn: "Shipping", href: "/services", color: "from-blue-500 to-indigo-600", bg: "bg-blue-50" },
    { icon: FileText, label: "الفواتير", labelEn: "Invoices", href: "/invoices/list/sa", color: "from-orange-500 to-amber-600", bg: "bg-orange-50" },
    { icon: CreditCard, label: "الدفع", labelEn: "Payment", href: "/services", color: "from-purple-500 to-pink-600", bg: "bg-purple-50" },
  ];

  const mainServices = [
    { icon: Building2, label: "العقود", labelEn: "Contracts", href: "/contracts/sa", gradient: "from-slate-600 to-slate-800" },
    { icon: Truck, label: "اللوجستية", labelEn: "Logistics", href: "/logistics/sa", gradient: "from-cyan-600 to-blue-700" },
    { icon: Heart, label: "الصحة", labelEn: "Health", href: "/health/sa", gradient: "from-rose-500 to-red-600" },
    { icon: Landmark, label: "الحكومية", labelEn: "Government", href: "/create/sa/government/sadad", gradient: "from-amber-500 to-orange-600" },
  ];

  return (
    <>
      <SEOHead
        title="نظام الدفع الآمن - منصة متكاملة للشاليهات والشحن والخدمات"
        description="أنشئ روابط دفع آمنة ومحمية للشاليهات وخدمات الشحن في دول الخليج. دعم جميع شركات الشحن الكبرى مثل أرامكس، دي إتش إل، فيديكس، سمسا والمزيد"
        image="/og-aramex.jpg"
        type="website"
      />
      <div className="min-h-screen bg-gradient-to-b from-background via-secondary/20 to-background" dir="rtl">
        
        {/* Hero Section - Enhanced */}
        <section className="relative overflow-hidden py-12 md:py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-full px-4 py-2 mb-6 shadow-sm">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">منصة موحدة لدول الخليج</span>
              </div>

              {/* Main Title */}
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-l from-foreground via-foreground to-primary bg-clip-text text-transparent leading-tight">
                منصة الدفع والشحن<br className="md:hidden" /> الذكية
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                حلول دفع وشحن متطورة مع دعم جميع شركات الشحن الكبرى والخدمات الحكومية في المنطقة
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/services">
                  <Button size="lg" className="px-8 h-12 text-base font-semibold shadow-lg shadow-primary/25">
                    <span className="ml-2">ابدأ الآن</span>
                    <ArrowLeft className="w-5 h-5 mr-2" />
                  </Button>
                </Link>
                <Link to="/services">
                  <Button variant="outline" size="lg" className="px-8 h-12 text-base font-semibold">
                    استكشف الخدمات
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Access Menu - 4 Cards */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">الخدمات السريعة</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {quickServices.map((service, index) => (
                  <Link
                    key={index}
                    to={service.href}
                    className="group relative overflow-hidden rounded-2xl border bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                    <div className="p-4 md:p-6 text-center">
                      <div className={`w-14 h-14 ${service.bg} rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                        <service.icon className={`w-7 h-7 ${service.color.replace('from-', 'text-').split(' ')[0]}`} />
                      </div>
                      <h3 className="text-sm md:text-base font-bold mb-1">{service.label}</h3>
                      <p className="text-xs text-muted-foreground">{service.labelEn}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Main Services Menu - 4 Cards */}
        <section className="py-8 md:py-12 bg-gradient-to-b from-secondary/30 to-transparent">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">خدمات أخرى</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {mainServices.map((service, index) => (
                  <Link
                    key={index}
                    to={service.href}
                    className="group relative overflow-hidden rounded-2xl border hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />
                    <div className="p-4 md:p-6 text-center">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 bg-gradient-to-br ${service.gradient} group-hover:scale-110 transition-transform`}>
                        <service.icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-sm md:text-base font-bold mb-1">{service.label}</h3>
                      <p className="text-xs text-muted-foreground">{service.labelEn}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - Enhanced */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">لماذا تختار منصتنا؟</h2>
              <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                <div className="group p-6 rounded-2xl border bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-primary/25">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">سريع وآمن</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    معاملات فورية مع أعلى معايير الأمان والتشفير لحماية بياناتك
                  </p>
                </div>

                <div className="group p-6 rounded-2xl border bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-16 h-16 bg-gradient-to-br from-success to-success/80 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-success/25">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">موثوق ومعتمد</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    جميع الخدمات معتمدة من البنوك المركزية ومطابقة للمعايير المحلية
                  </p>
                </div>

                <div className="group p-6 rounded-2xl border bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-16 h-16 bg-gradient-to-br from-info to-info/80 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-info/25">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">سهل الاستخدام</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    واجهة بسيطة وبديهية تدعم اللغة العربية والإنجليزية لجميع دول الخليج
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  جاهز للبدء؟
                </h2>
                <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed">
                  انضم إلى آلاف المستخدمين الذين يثقون بمنصتنا للخدمات المالية والشحن
                </p>
                <Link to="/services">
                  <Button size="lg" className="px-8 h-12 text-base font-semibold shadow-lg shadow-primary/25">
                    <span className="ml-2">استكشف الخدمات</span>
                    <ArrowLeft className="w-5 h-5 mr-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Spacer */}
        <div className="h-20" />
      </div>
      <BottomNav />
    </>
  );
};

export default Index;
