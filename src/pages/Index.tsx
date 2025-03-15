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
  MapPin,
  Truck,
  Clock,
  CheckCircle2,
  Star,
  ChevronRight,
  ChevronUp
} from 'lucide-react';
import Logo from '@/components/Logo';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const { t, language } = useLanguage();
  const [storeName, setStoreName] = useState('');
  const [activeFeature, setActiveFeature] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Custom cursor
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    
    window.addEventListener('mousemove', moveCursor);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  const features = [
    {
      icon: <Rocket className="w-6 h-6" />,
      title: t('quickSetup'),
      description: t('quickSetupDesc')
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: t('professionalDesign'),
      description: t('professionalDesignDesc')
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: t('globalReach'),
      description: t('globalReachDesc')
    }
  ];

  const plans = [
    {
      name: t('freePlan'),
      price: "0",
      description: t('freePlanDesc'),
      features: [
        t('basicStore'),
        t('limitedProducts'),
        t('standardDesign'),
        t('emailSupport')
      ],
      image: "/images/free-plan.jpg"
    },
    {
      name: t('basicPlan'),
      price: "29",
      description: t('basicPlanDesc'),
      features: [
        t('advancedStore'),
        t('unlimitedProducts'),
        t('customDesign'),
        t('technicalSupport'),
        t('advancedAnalytics')
      ],
      image: "/images/basic-plan.jpg"
    },
    {
      name: t('advancedPlan'),
      price: "99",
      description: t('advancedPlanDesc'),
      features: [
        t('allBasicFeatures'),
        t('externalIntegration'),
        t('customReports'),
        t('dedicatedManager'),
        t('comprehensiveTraining')
      ],
      image: "/images/advanced-plan.jpg"
    }
  ];

  // Delivery services
  const deliveryFeatures = [
    {
      icon: <Clock className="w-5 h-5" />,
      title: t('fastDelivery'),
      description: t('fastDeliveryDesc')
    },
    {
      icon: <CheckCircle2 className="w-5 h-5" />,
      title: t('orderTracking'),
      description: t('orderTrackingDesc')
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: t('comprehensiveCoverage'),
      description: t('comprehensiveCoverageDesc')
    },
    {
      icon: <Star className="w-5 h-5" />,
      title: t('premiumService'),
      description: t('premiumServiceDesc')
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
      
      // Update active section based on scroll position
      const sections = ['home', 'features', 'pricing', 'contact'];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 200) {
          setActiveSection(section);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const navItems = [
    { id: 'home', label: t('home') },
    { id: 'features', label: t('features') },
    { id: 'pricing', label: t('pricing') },
    { id: 'contact', label: t('contact') }
  ];

  return (
    <div className="min-h-screen bg-slate-50 relative">
      {/* Custom cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-indigo-500 pointer-events-none z-50 mix-blend-difference"
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
          scale: 1
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-fuchsia-500 pointer-events-none z-50"
        style={{
          translateX: cursorX,
          translateY: cursorY
        }}
      />

      {/* Header */}
      <header className="fixed top-0 right-0 left-0 bg-white/80 backdrop-blur-xl z-30 border-b border-slate-200/80">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Logo onClick={() => scrollToSection('home')} />
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors relative ${
                  activeSection === item.id 
                    ? 'text-indigo-600' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                onClick={() => scrollToSection(item.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-full"
                    layoutId="activeNavIndicator"
                  />
                )}
              </motion.button>
            ))}
          </nav>
          
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Button 
              variant="ghost" 
              className="text-slate-600 hover:text-slate-900"
              onClick={() => window.location.href = '/login'}
            >
              {t('login')}
            </Button>
            <Button 
              className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white hover:opacity-90"
              onClick={() => window.location.href = '/register'}
            >
              {t('getStarted')}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden overflow-x-auto scrollbar-hide">
          <div className="flex space-x-1 px-4 py-2">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                  activeSection === item.id 
                    ? 'bg-indigo-50 text-indigo-600' 
                    : 'text-slate-600'
                }`}
                onClick={() => scrollToSection(item.id)}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section id="home" className="pt-32 pb-20 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-b from-purple-500/10 via-blue-500/5 to-transparent rotate-12 transform-gpu"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-grid-slate-200/50"></div>
          </div>

          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16 space-y-6">
                <motion.div 
                  className="inline-flex items-center gap-2 bg-slate-900/5 px-4 py-2 rounded-full"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                  <span className="text-sm font-medium text-slate-900">{t('platformDescription')}</span>
                </motion.div>
                
                <motion.h1 
                  className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {t('createYourStore')}
                  <br />
                  <span className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 bg-clip-text text-transparent">
                    {t('withProfessionalDesign')}
                  </span>
                </motion.h1>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className={`group p-6 rounded-2xl transition-all duration-300 ${
                      activeFeature === index
                        ? 'bg-gradient-to-br from-indigo-500/10 via-fuchsia-500/10 to-fuchsia-500/10 scale-105'
                        : 'bg-white hover:bg-slate-50'
                    }`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    whileHover={{ y: -5 }}
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
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <motion.div 
                className="max-w-md mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="relative">
                  <input
                    type="text"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    placeholder={t('storeNamePlaceholder')}
                    className="w-full px-6 py-4 rounded-xl text-lg bg-white shadow-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <Button 
                    size="lg"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white hover:opacity-90"
                  >
                    {t('createStore')}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <motion.div
                  className="inline-block"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <Badge className="mb-4 px-4 py-1 bg-indigo-100 text-indigo-800 rounded-full">{t('features')}</Badge>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                    {t('featuresTitle')}
                  </h2>
                  <p className="text-lg text-slate-600">
                    {t('featuresSubtitle')}
                  </p>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div 
                  className="p-6 bg-gradient-to-br from-indigo-50 to-fuchsia-50 rounded-2xl overflow-hidden relative group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <ShoppingCart className="w-10 h-10 text-indigo-500 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{t('productManagement')}</h3>
                    <p className="text-slate-600">{t('productManagementDesc')}</p>
                    <img 
                      src="/images/product-management.jpg" 
                      alt={t('productManagement')} 
                      className="mt-4 rounded-lg shadow-md w-full h-40 object-cover"
                    />
                  </div>
                </motion.div>
                
                <motion.div 
                  className="p-6 bg-gradient-to-br from-indigo-50 to-fuchsia-50 rounded-2xl overflow-hidden relative group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <CreditCard className="w-10 h-10 text-indigo-500 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{t('paymentMethods')}</h3>
                    <p className="text-slate-600">{t('paymentMethodsDesc')}</p>
                    <img 
                      src="/images/payment-methods.jpg" 
                      alt={t('paymentMethods')} 
                      className="mt-4 rounded-lg shadow-md w-full h-40 object-cover"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <motion.div
                  className="inline-block"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <Badge className="mb-4 px-4 py-1 bg-indigo-100 text-indigo-800 rounded-full">{t('pricing')}</Badge>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                    {t('pricingTitle')}
                  </h2>
                  <p className="text-lg text-slate-600">
                    {t('pricingSubtitle')}
                  </p>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan, index) => (
                  <motion.div
                    key={index}
                    className={`p-6 rounded-2xl bg-white shadow-lg border-2 overflow-hidden relative ${
                      index === 1 ? 'border-indigo-500' : 'border-transparent'
                    }`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                    viewport={{ once: true, margin: "-100px" }}
                    whileHover={{ 
                      y: -10,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                    }}
                  >
                    {index === 1 && (
                      <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-3 py-1 transform translate-x-8 translate-y-4 rotate-45">
                        {t('popular')}
                      </div>
                    )}
                    <div className="h-40 -mx-6 -mt-6 mb-6 overflow-hidden">
                      <img 
                        src={plan.image || `/images/plan-${index + 1}.jpg`}
                        alt={plan.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold">${plan.price}</span>
                      <span className="text-slate-600">/{t('month')}</span>
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
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {t('choosePlan')}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <motion.div
                  className="inline-block"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <Badge className="mb-4 px-4 py-1 bg-indigo-100 text-indigo-800 rounded-full">{t('contact')}</Badge>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                    {t('contactTitle')}
                  </h2>
                  <p className="text-lg text-slate-600">
                    {t('contactSubtitle')}
                  </p>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <motion.div 
                  className="space-y-8"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                      <Phone className="w-6 h-6 text-indigo-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t('callUs')}</h3>
                      <p className="text-slate-600">{t('phoneNumber')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-indigo-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t('email')}</h3>
                      <p className="text-slate-600">support@linok.me</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-indigo-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t('address')}</h3>
                      <p className="text-slate-600">{t('addressValue')}</p>
                    </div>
                  </div>
                  
                  <div className="rounded-2xl overflow-hidden h-64 shadow-lg">
                    <img 
                      src="/images/map.jpg" 
                      alt={t('officeLocation')} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>

                <motion.form 
                  className="space-y-6 bg-white p-8 rounded-2xl shadow-lg"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <h3 className="text-xl font-semibold mb-4">{t('sendMessage')}</h3>
                  <div>
                    <input
                      type="text"
                      placeholder={t('namePlaceholder')}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder={t('emailPlaceholder')}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <textarea
                      rows={4}
                      placeholder={t('messagePlaceholder')}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t('sendMessageButton')}
                  </Button>
                </motion.form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-slate-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <Logo />
                <div className="flex items-center mt-6 md:mt-0">
                  <LanguageSwitcher />
                  <div className="flex gap-6 ml-4">
                    <Button variant="ghost" className="text-white hover:text-indigo-300">
                      {t('termsConditions')}
                    </Button>
                    <Button variant="ghost" className="text-white hover:text-indigo-300">
                      {t('privacyPolicy')}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="border-t border-slate-800 pt-8 text-center text-slate-400 text-sm">
                &copy; {new Date().getFullYear()} Linok.me. {t('allRightsReserved')}
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white flex items-center justify-center shadow-lg z-40"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
