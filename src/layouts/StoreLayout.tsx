
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  MapPin 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Logo from '@/components/Logo';
import { useCart } from '@/contexts/CartContext';
import { categories } from '@/data/products';

interface StoreLayoutProps {
  children: React.ReactNode;
}

const StoreLayout = ({ children }: StoreLayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const { totalItems } = useCart();
  const [storeInfo, setStoreInfo] = useState({
    name: 'متجر.أنا',
    url: localStorage.getItem('storeUrl') || 'store',
    logo: '',
    currency: 'KWD'
  });

  // إغلاق القائمة عند تغيير المسار
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col" style={{ direction: 'rtl' }}>
      {/* الـ Header */}
      <header className="sticky top-0 bg-background/95 backdrop-blur-md border-b z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <Link to="/store" className="flex items-center">
                {storeInfo.logo ? (
                  <img src={storeInfo.logo} alt={storeInfo.name} className="h-8" />
                ) : (
                  <div className="font-bold text-xl">{storeInfo.name}</div>
                )}
              </Link>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <Link to="/store" className="font-medium hover:text-primary transition-colors">
                الرئيسية
              </Link>
              <div className="relative group">
                <button className="flex items-center gap-1 font-medium hover:text-primary transition-colors">
                  <span>التصنيفات</span>
                  <ChevronDown size={16} />
                </button>
                <div className="absolute top-full right-0 mt-2 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 min-w-48">
                  <div className="py-2">
                    {categories.map(category => (
                      <Link 
                        key={category}
                        to={`/store?category=${category}`}
                        className="block w-full text-right px-4 py-2 text-sm hover:bg-muted transition-colors"
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <Link to="/store" className="font-medium hover:text-primary transition-colors">
                المنتجات
              </Link>
              <Link to="/store/about" className="font-medium hover:text-primary transition-colors">
                من نحن
              </Link>
              <Link to="/store/contact" className="font-medium hover:text-primary transition-colors">
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
                    className="w-32 md:w-auto pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                </form>
              </div>
              
              <Link to="/login" className="hidden md:block">
                <Button variant="ghost" size="icon">
                  <User size={20} />
                </Button>
              </Link>
              
              <Link to="/store/favorites" className="hidden md:block">
                <Button variant="ghost" size="icon">
                  <Heart size={20} />
                </Button>
              </Link>
              
              <Link to="/store/cart" className="relative">
                <Button variant="ghost" size="icon">
                  <ShoppingCart size={20} />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* القائمة في الجوال */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 px-4 border-t">
            <nav className="flex flex-col gap-3">
              <Link to="/store" className="font-medium py-2">
                الرئيسية
              </Link>
              <button 
                className="flex items-center justify-between font-medium py-2 w-full"
                onClick={() => {}}
              >
                <span>التصنيفات</span>
                <ChevronDown size={16} />
              </button>
              <div className="pr-4 space-y-2">
                {categories.map(category => (
                  <Link 
                    key={category}
                    to={`/store?category=${category}`}
                    className="block w-full text-right py-1 text-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {category}
                  </Link>
                ))}
              </div>
              <Link to="/store" className="font-medium py-2">
                المنتجات
              </Link>
              <Link to="/store/about" className="font-medium py-2">
                من نحن
              </Link>
              <Link to="/store/contact" className="font-medium py-2">
                اتصل بنا
              </Link>
              <div className="flex items-center gap-3 py-2">
                <Link to="/login" className="font-medium flex items-center gap-2">
                  <User size={16} />
                  <span>تسجيل الدخول</span>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">عن المتجر</h3>
              <p className="text-muted-foreground">
                نقدم لكم أفضل المنتجات بأفضل الأسعار مع خدمة عملاء متميزة
              </p>
              <div className="flex items-center gap-4 mt-4">
                <a href="#" className="text-foreground hover:text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a href="#" className="text-foreground hover:text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </a>
                <a href="#" className="text-foreground hover:text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">روابط مهمة</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/store/about" className="text-muted-foreground hover:text-primary transition-colors">
                    من نحن
                  </Link>
                </li>
                <li>
                  <Link to="/store/contact" className="text-muted-foreground hover:text-primary transition-colors">
                    اتصل بنا
                  </Link>
                </li>
                <li>
                  <Link to="/store/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                    سياسة الخصوصية
                  </Link>
                </li>
                <li>
                  <Link to="/store/terms" className="text-muted-foreground hover:text-primary transition-colors">
                    الشروط والأحكام
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">فئات المنتجات</h3>
              <ul className="space-y-2">
                {categories.map(category => (
                  <li key={category}>
                    <Link
                      to={`/store?category=${category}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">تواصل معنا</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Phone size={16} />
                  <span>+965 1234 5678</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={16} />
                  <span>info@{storeInfo.url}.linok.me</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin size={16} />
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
