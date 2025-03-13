
import { useState, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { 
  ShoppingCart, 
  Search, 
  Menu, 
  X, 
  Heart, 
  ChevronDown, 
  User, 
  ShoppingBag, 
  Phone, 
  Mail, 
  MapPin,
  Instagram,
  Facebook,
  Twitter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Logo from '@/components/Logo';
import { useCart } from '@/contexts/CartContext';
import { categories } from '@/data/products';
import { useStore } from '@/contexts/StoreContext';

interface StoreLayoutProps {
  children: React.ReactNode;
}

const StoreLayout = ({ children }: StoreLayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();
  const { store } = useStore();
  const [searchParams] = useSearchParams();
  const storeParam = searchParams.get('store');
  
  const storeInfo = {
    name: store?.name || 'متجر.أنا',
    url: store?.slug || localStorage.getItem('storeUrl') || 'store',
    logo: store?.logo || '',
    primary_color: store?.primary_color || '#8B5CF6',
    currency: 'KWD'
  };

  // بناء الروابط مع الحفاظ على معلمة المتجر
  const buildStoreLink = (path: string) => {
    return storeParam ? `${path}?store=${storeParam}` : path;
  };

  // إغلاق القائمة عند تغيير المسار
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // التحقق من تمرير الصفحة لإضافة تأثير على الهيدر
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // تطبيق اللون الأساسي من المتجر
  useEffect(() => {
    if (storeInfo.primary_color) {
      document.documentElement.style.setProperty('--primary', storeInfo.primary_color);
    }
  }, [storeInfo.primary_color]);

  return (
    <div className="min-h-screen bg-background flex flex-col" style={{ direction: 'rtl' }}>
      {/* الـ Header */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-background/95 backdrop-blur-md shadow-sm' 
            : 'bg-background'
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                className="md:hidden focus:outline-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <Link to={buildStoreLink('/store')} className="flex items-center">
                {storeInfo.logo ? (
                  <img src={storeInfo.logo} alt={storeInfo.name} className="h-10 object-contain" />
                ) : (
                  <div className="font-bold text-xl transition-all hover:text-primary">{storeInfo.name}</div>
                )}
              </Link>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <Link to={buildStoreLink('/store')} className="font-medium hover:text-primary transition-colors py-2 border-b-2 border-transparent hover:border-primary">
                الرئيسية
              </Link>
              <div className="relative group">
                <button className="flex items-center gap-1 font-medium hover:text-primary transition-colors py-2 border-b-2 border-transparent group-hover:border-primary">
                  <span>التصنيفات</span>
                  <ChevronDown size={16} />
                </button>
                <div className="absolute top-full right-0 mt-2 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 min-w-48 animate-fade-in">
                  <div className="py-2">
                    {categories.map(category => (
                      <Link 
                        key={category}
                        to={buildStoreLink(`/store?category=${category}`)}
                        className="block w-full text-right px-4 py-2 text-sm hover:bg-muted transition-colors"
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <Link to={buildStoreLink('/store')} className="font-medium hover:text-primary transition-colors py-2 border-b-2 border-transparent hover:border-primary">
                المنتجات
              </Link>
              <Link to={buildStoreLink('/store/about')} className="font-medium hover:text-primary transition-colors py-2 border-b-2 border-transparent hover:border-primary">
                من نحن
              </Link>
              <Link to={buildStoreLink('/store/contact')} className="font-medium hover:text-primary transition-colors py-2 border-b-2 border-transparent hover:border-primary">
                اتصل بنا
              </Link>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  // Handle search submit
                }}>
                  <Input
                    type="text"
                    placeholder="البحث..."
                    className="w-32 md:w-auto pl-8 focus:ring-primary transition-all rounded-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                </form>
              </div>
              
              <Link to={buildStoreLink('/login')} className="hidden md:block">
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
                  <User size={20} />
                </Button>
              </Link>
              
              <Link to={buildStoreLink('/store/favorites')} className="hidden md:block">
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
                  <Heart size={20} />
                </Button>
              </Link>
              
              <Link to={buildStoreLink('/store/cart')} className="relative group">
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors relative">
                  <ShoppingCart size={20} />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center transition-all group-hover:scale-110">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* القائمة في الجوال */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? 'max-h-[500px] opacity-100 border-t' : 'max-h-0 opacity-0'
        }`}>
          <nav className="py-4 px-4">
            <div className="flex flex-col gap-3">
              <Link to={buildStoreLink('/store')} className="font-medium py-2 hover:text-primary transition-colors">
                الرئيسية
              </Link>
              <button 
                className="flex items-center justify-between font-medium py-2 w-full hover:text-primary transition-colors"
                onClick={() => {}}
              >
                <span>التصنيفات</span>
                <ChevronDown size={16} />
              </button>
              <div className="pr-4 space-y-2">
                {categories.map(category => (
                  <Link 
                    key={category}
                    to={buildStoreLink(`/store?category=${category}`)}
                    className="block w-full text-right py-1 text-sm hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {category}
                  </Link>
                ))}
              </div>
              <Link to={buildStoreLink('/store')} className="font-medium py-2 hover:text-primary transition-colors">
                المنتجات
              </Link>
              <Link to={buildStoreLink('/store/about')} className="font-medium py-2 hover:text-primary transition-colors">
                من نحن
              </Link>
              <Link to={buildStoreLink('/store/contact')} className="font-medium py-2 hover:text-primary transition-colors">
                اتصل بنا
              </Link>
              <div className="flex items-center gap-3 py-2">
                <Link to={buildStoreLink('/login')} className="font-medium flex items-center gap-2 hover:text-primary transition-colors">
                  <User size={16} />
                  <span>تسجيل الدخول</span>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-background border-t mt-12">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-primary">عن المتجر</h3>
              <p className="text-muted-foreground">
                {store?.description || 'نقدم لكم أفضل المنتجات بأفضل الأسعار مع خدمة عملاء متميزة'}
              </p>
              <div className="flex items-center gap-4 mt-6">
                {store?.instagram && (
                  <a href={store.instagram} className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                    <Instagram strokeWidth={1.5} size={22} />
                  </a>
                )}
                {store?.facebook && (
                  <a href={store.facebook} className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                    <Facebook strokeWidth={1.5} size={22} />
                  </a>
                )}
                {store?.twitter && (
                  <a href={store.twitter} className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                    <Twitter strokeWidth={1.5} size={22} />
                  </a>
                )}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-primary">روابط مهمة</h3>
              <ul className="space-y-3">
                <li>
                  <Link to={buildStoreLink('/store/about')} className="text-muted-foreground hover:text-primary transition-colors">
                    من نحن
                  </Link>
                </li>
                <li>
                  <Link to={buildStoreLink('/store/contact')} className="text-muted-foreground hover:text-primary transition-colors">
                    اتصل بنا
                  </Link>
                </li>
                <li>
                  <Link to={buildStoreLink('/store/privacy')} className="text-muted-foreground hover:text-primary transition-colors">
                    سياسة الخصوصية
                  </Link>
                </li>
                <li>
                  <Link to={buildStoreLink('/store/terms')} className="text-muted-foreground hover:text-primary transition-colors">
                    الشروط والأحكام
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-primary">فئات المنتجات</h3>
              <ul className="space-y-3">
                {categories.slice(0, 6).map(category => (
                  <li key={category}>
                    <Link
                      to={buildStoreLink(`/store?category=${category}`)}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-primary">تواصل معنا</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Phone size={16} className="text-primary" />
                  <span>+965 1234 5678</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={16} className="text-primary" />
                  <span>info@{storeInfo.url}.linok.me</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin size={16} className="text-primary" />
                  <span>الكويت</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>© {new Date().getFullYear()} {storeInfo.name}. جميع الحقوق محفوظة</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StoreLayout;
