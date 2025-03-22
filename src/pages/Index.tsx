
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Globe, Zap, ShieldCheck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Logo from '@/components/Logo';

const Index = () => {
  const [domainName, setDomainName] = useState('');
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const hero = heroRef.current;
      
      if (hero) {
        // Parallax effect
        hero.style.transform = `translateY(${scrollPosition * 0.2}px)`;
        // Fade effect
        hero.style.opacity = `${1 - scrollPosition / 700}`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden"
        style={{ direction: 'rtl' }}
      >
        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <span className="bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full mb-6 inline-block">
                منصة متاجر إلكترونية في ثوانٍ
              </span>
            </div>
            
            <h1 
              className="text-4xl md:text-6xl font-bold tracking-tight mb-6 animate-fade-in"
              style={{ animationDelay: '0.4s' }}
            >
              أنشئ متجرك الإلكتروني 
              <span className="relative">
                <span className="whitespace-nowrap relative">
                  <span className="relative z-10"> بسرعة البرق</span>
                  <svg 
                    className="absolute -bottom-2 left-0 w-full h-3 text-primary/30" 
                    viewBox="0 0 200 9"
                    preserveAspectRatio="none"
                  >
                    <path 
                      d="M0,8 C50,0 150,0 200,8" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="3"
                    />
                  </svg>
                </span>
              </span>
            </h1>
            
            <p 
              className="text-xl text-muted-foreground mb-8 animate-fade-in" 
              style={{ animationDelay: '0.6s' }}
            >
              منصة متكاملة لإنشاء وإدارة متجرك الإلكتروني بدون أي خبرة تقنية. احصل على متجر احترافي بهويتك الخاصة خلال دقائق.
            </p>
            
            <div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" 
              style={{ animationDelay: '0.8s' }}
            >
              <div className="w-full sm:w-auto relative flex-1 sm:flex-none max-w-md">
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pl-3 pointer-events-none">
                    <Globe size={20} className="text-muted-foreground" />
                  </div>
                  <input
                    type="text"
                    value={domainName}
                    onChange={(e) => setDomainName(e.target.value)}
                    placeholder="اختر اسم متجرك"
                    className="block w-full p-4 pl-10 text-foreground bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-sm text-muted-foreground">linok.me/</span>
                  </div>
                </div>
              </div>
              
              <Button size="lg" className="w-full sm:w-auto button-hover-effect" asChild>
                <Link to="/register">
                  <span>إنشاء متجرك الآن</span>
                  <ArrowRight className="mr-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Background Elements */}
        <div 
          ref={heroRef}
          className="absolute inset-0 -z-10 pointer-events-none"
        >
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 animate-pulse-light"></div>
          <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-primary/10 rounded-full filter blur-xl animate-morph"></div>
          <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-primary/10 rounded-full filter blur-xl animate-spin-slow"></div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24 bg-secondary/30" style={{ direction: 'rtl' }}>
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">لماذا تختار منصتنا؟</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              نجمع بين البساطة والقوة لمنحك تجربة متجر إلكتروني لا تُنسى
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-background rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover-lift">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Zap size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">سرعة فائقة</h3>
              <p className="text-muted-foreground">
                أنشئ متجرك وابدأ البيع خلال دقائق. واجهة سهلة ولا تحتاج إلى خبرة تقنية.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-background rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover-lift">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Globe size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">رابط مخصص</h3>
              <p className="text-muted-foreground">
                احصل على رابط مخصص لمتجرك يعكس هويتك التجارية ويسهل على عملائك الوصول إليك.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-background rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover-lift">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <ShieldCheck size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">آمن وموثوق</h3>
              <p className="text-muted-foreground">
                استفد من أعلى معايير الأمان لحماية متجرك وعملائك، مع توفر الدعم على مدار الساعة.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24" style={{ direction: 'rtl' }}>
        <div className="container px-4 md:px-6">
          <div className="bg-primary rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                ابدأ رحلة نجاح متجرك الإلكتروني اليوم
              </h2>
              <p className="text-lg text-primary-foreground/90 mb-8">
                انضم إلى آلاف التجار الناجحين على منصتنا وقم بتوسيع نطاق عملك عبر الإنترنت
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="button-hover-effect" 
                  asChild
                >
                  <Link to="/register">
                    <span>إنشاء حساب مجاني</span>
                    <ArrowRight className="mr-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                  asChild
                >
                  <Link to="/features">
                    <span>استكشف المميزات</span>
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Background decoration */}
            <div className="absolute top-0 left-0 right-0 bottom-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full">
                <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="b" gradientTransform="rotate(45 0.5 0.5)">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0,1000 C200,800 400,600 800,800 C900,850 1000,900 1000,1000" fill="url(#b)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-background py-12 mt-auto" style={{ direction: 'rtl' }}>
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Logo size="md" />
              <p className="text-muted-foreground mt-2">
                منصة متكاملة لإنشاء وإدارة المتاجر الإلكترونية
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              <div className="text-center md:text-right">
                <h3 className="text-sm font-semibold mb-4">المنصة</h3>
                <ul className="space-y-3 text-sm">
                  <li><Link to="/features" className="text-muted-foreground hover:text-foreground">المميزات</Link></li>
                  <li><Link to="/pricing" className="text-muted-foreground hover:text-foreground">الأسعار</Link></li>
                  <li><Link to="/blog" className="text-muted-foreground hover:text-foreground">المدونة</Link></li>
                </ul>
              </div>
              <div className="text-center md:text-right">
                <h3 className="text-sm font-semibold mb-4">الشركة</h3>
                <ul className="space-y-3 text-sm">
                  <li><Link to="/about" className="text-muted-foreground hover:text-foreground">عن المنصة</Link></li>
                  <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">اتصل بنا</Link></li>
                  <li><Link to="/careers" className="text-muted-foreground hover:text-foreground">التوظيف</Link></li>
                </ul>
              </div>
              <div className="text-center md:text-right">
                <h3 className="text-sm font-semibold mb-4">القانونية</h3>
                <ul className="space-y-3 text-sm">
                  <li><Link to="/terms" className="text-muted-foreground hover:text-foreground">الشروط والأحكام</Link></li>
                  <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground">سياسة الخصوصية</Link></li>
                </ul>
              </div>
              <div className="text-center md:text-right">
                <h3 className="text-sm font-semibold mb-4">الدعم</h3>
                <ul className="space-y-3 text-sm">
                  <li><Link to="/help" className="text-muted-foreground hover:text-foreground">مركز المساعدة</Link></li>
                  <li><Link to="/support" className="text-muted-foreground hover:text-foreground">الدعم الفني</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              © {new Date().getFullYear()} Linok.me. جميع الحقوق محفوظة.
            </p>
            <div className="flex space-x-6 rtl:space-x-reverse">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
