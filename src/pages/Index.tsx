import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Zap, Sparkles } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import BottomNav from "@/components/BottomNav";

const Index = () => {
  return (
    <>
      <SEOHead 
        title="نظام الدفع الآمن - روابط دفع ذكية للشاليهات والشحن"
        description="أنشئ روابط دفع آمنة ومحمية للشاليهات وخدمات الشحن في دول الخليج. دعم جميع شركات الشحن الكبرى مثل أرامكس، دي إتش إل، فيديكس، سمسا والمزيد"
        image="/og-aramex.jpg"
        type="website"
      />
      <div className="min-h-screen bg-background" dir="rtl">
      <section className="relative">
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-secondary border border-border rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">منصة موحدة لدول الخليج</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              منصة الشحن الذكية
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              حلول شحن متطورة وموثوقة مع دعم جميع شركات الشحن الكبرى في المنطقة
            </p>
            
            <Link to="/services">
              <Button size="lg" className="px-8">
                <span className="ml-2">ابدأ الآن</span>
                <ArrowLeft className="w-5 h-5 mr-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-bold mb-2">سريع وآمن</h3>
              <p className="text-sm text-muted-foreground">
                معاملات فورية مع أعلى معايير الأمان
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-success rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-success-foreground" />
              </div>
              <h3 className="text-lg font-bold mb-2">موثوق ومعتمد</h3>
              <p className="text-sm text-muted-foreground">
                جميع الخدمات معتمدة ومطابقة للمعايير المحلية
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-info rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-info-foreground" />
              </div>
              <h3 className="text-lg font-bold mb-2">سهل الاستخدام</h3>
              <p className="text-sm text-muted-foreground">
                واجهة بسيطة وسهلة تدعم جميع دول الخليج
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              جاهز للبدء؟
            </h2>
            <p className="text-base text-muted-foreground mb-8">
              انضم إلى آلاف المستخدمين الذين يثقون بمنصتنا
            </p>
            <Link to="/services">
              <Button size="lg" className="px-8">
                <span className="ml-2">استكشف الخدمات</span>
                <ArrowLeft className="w-5 h-5 mr-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <div className="h-20" />
    </div>
    <BottomNav />
    </>
  );
};

export default Index;
