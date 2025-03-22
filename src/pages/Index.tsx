import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Sparkles,
  Rocket,
  ArrowRight,
  Palette,
  Globe,
  Check,
  ShoppingCart,
  CreditCard,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import Logo from '@/components/Logo';
import Sidebar from '@/components/Sidebar';

const Index = () => {
  const [storeName, setStoreName] = useState('');
  const [activeFeature, setActiveFeature] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  const features = [
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "سهولة الإنشاء",
      description: "أنشئ متجرك في دقائق معدودة"
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "تصميم مميز",
      description: "قوالب احترافية جاهزة للاستخدام"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "وصول عالمي",
      description: "اعرض منتجاتك للعالم"
    }
  ];

  const plans = [
    {
      name: "المجاني",
      price: "0",
      description: "ابدأ رحلتك مع التجارة الإلكترونية",
      features: [
        "متجر أساسي",
        "منتجات محدودة",
        "تصميم قياسي",
        "دعم بالبريد الإلكتروني"
      ]
    },
    {
      name: "الأساسي",
      price: "29",
      description: "لأصحاب المشاريع الصغيرة",
      features: [
        "متجر متقدم",
        "منتجات غير محدودة",
        "تصميم مخصص",
        "دعم فني على مدار الساعة",
        "تحليلات متقدمة"
      ]
    },
    {
      name: "المتقدم",
      price: "99",
      description: "للشركات المتوسطة والكبيرة",
      features: [
        "جميع مميزات الباقة الأساسية",
        "تكامل مع الأنظمة الخارجية",
        "تقارير مخصصة",
        "مدير حساب مخصص",
        "تدريب شامل"
      ]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar activeSection={activeSection} onSectionClick={handleSectionClick} />

      {/* Header */}
      <header className="fixed top-0 right-0 left-0 bg-white/80 backdrop-blur-xl z-30 border-b border-slate-200/80">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-slate-600 hover:text-slate-900">
              تسجيل دخول
            </Button>
            <Button className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white hover:opacity-90">
              ابدأ الآن
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pl-16">
        {/* Hero Section */}
        <section id="home" className="pt-32 pb-20 relative overflow-hidden" style={{ direction: 'rtl' }}>
          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-b from-purple-500/10 via-blue-500/5 to-transparent rotate-12 transform-gpu"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-grid-slate-200/50"></div>
          </div>

          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16 space-y-6">
                <div className="inline-flex items-center gap-2 bg-slate-900/5 px-4 py-2 rounded-full">
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                  <span className="text-sm font-medium text-slate-900">منصة متطورة لإنشاء المتاجر الإلكترونية</span>
                </div>
                
                <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
                  أنشئ متجرك الإلكتروني
                  <br />
                  <span className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 bg-clip-text text-transparent">
                    بتصميم احترافي
                  </span>
                </h1>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`group p-6 rounded-2xl transition-all duration-300 ${
                      activeFeature === index
                        ? 'bg-gradient-to-br from-indigo-500/10 via-fuchsia-500/10 to-fuchsia-500/10 scale-105'
                        : 'bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300 ${
                      activeFeature === index
                        ? 'bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white'
                        : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                    }`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="max-w-md mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    placeholder="اسم متجرك"
                    className="w-full px-6 py-4 rounded-xl text-lg bg-white shadow-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <Button 
                    size="lg"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white hover:opacity-90"
                  >
                    إنشاء المتجر
                    <ArrowRight className="mr-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white" style={{ direction: 'rtl' }}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  مميزات تجعلنا الخيار الأفضل
                </h2>
                <p className="text-lg text-slate-600">
                  كل ما تحتاجه لإدارة متجرك بكفاءة عالية
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 bg-gradient-to-br from-indigo-50 to-fuchsia-50 rounded-2xl">
                  <ShoppingCart className="w-10 h-10 text-indigo-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">إدارة المنتجات</h3>
                  <p className="text-slate-600">أضف وعدل منتجاتك بسهولة مع خيارات متعددة للعرض والتصنيف</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-indigo-50 to-fuchsia-50 rounded-2xl">
                  <CreditCard className="w-10 h-10 text-indigo-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">طرق دفع متعددة</h3>
                  <p className="text-slate-600">ادعم جميع طرق الدفع المحلية والعالمية</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-slate-50" style={{ direction: 'rtl' }}>
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  اختر الباقة المناسبة لك
                </h2>
                <p className="text-lg text-slate-600">
                  باقات مرنة تناسب جميع الاحتياجات
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-2xl bg-white shadow-lg border-2 ${
                      index === 1 ? 'border-indigo-500' : 'border-transparent'
                    }`}
                  >
                    <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold">${plan.price}</span>
                      <span className="text-slate-600">/شهرياً</span>
                    </div>
                    <p className="text-slate-600 mb-6">{plan.description}</p>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="w-5 h-5 text-indigo-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full ${
                        index === 1
                          ? 'bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white'
                          : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                      }`}
                    >
                      اختر الباقة
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-white" style={{ direction: 'rtl' }}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  تواصل معنا
                </h2>
                <p className="text-lg text-slate-600">
                  نحن هنا لمساعدتك في كل خطوة
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                      <Phone className="w-6 h-6 text-indigo-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">اتصل بنا</h3>
                      <p className="text-slate-600">+965 1234 5678</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-indigo-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">البريد الإلكتروني</h3>
                      <p className="text-slate-600">support@linok.me</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-indigo-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">العنوان</h3>
                      <p className="text-slate-600">الكويت، شارع الخليج العربي</p>
                    </div>
                  </div>
                </div>

                <form className="space-y-6">
                  <div>
                    <input
                      type="text"
                      placeholder="الاسم"
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="البريد الإلكتروني"
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <textarea
                      rows={4}
                      placeholder="رسالتك"
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white">
                    إرسال الرسالة
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
