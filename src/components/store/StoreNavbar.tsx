
import React, { useState } from 'react';
import { Link, useLocation, useSearchParams, useParams } from 'react-router-dom';
import { 
  ShoppingCart, 
  Search, 
  Menu, 
  X, 
  Heart, 
  ChevronDown, 
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Logo from '@/components/Logo';
import { useCart } from '@/contexts/CartContext';
import { categories } from '@/data/products';
import { useStore } from '@/contexts/StoreContext';

interface StoreNavbarProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  isScrolled: boolean;
}

const StoreNavbar = ({
  mobileMenuOpen,
  setMobileMenuOpen,
  searchQuery,
  setSearchQuery,
  isScrolled
}: StoreNavbarProps) => {
  const location = useLocation();
  const { totalItems } = useCart();
  const { store } = useStore();
  const [searchParams] = useSearchParams();
  const params = useParams();
  const storeParam = searchParams.get('store');
  const storeSlug = params.storeSlug || storeParam;
  
  const storeInfo = {
    name: store?.name || 'متجر.أنا',
    url: store?.slug || localStorage.getItem('storeUrl') || 'store',
    logo: store?.logo || '',
  };

  // بناء الروابط مع الحفاظ على الشكل المناسب للرابط
  const buildStoreLink = (path: string) => {
    // If we're using the direct slug approach
    if (params.storeSlug) {
      // For the home page (remove the trailing slash if any)
      if (path === '/store') {
        return `/${params.storeSlug}`;
      }
      // For other paths, replace /store/ with /{storeSlug}/
      return path.replace('/store', `/${params.storeSlug}`);
    }
    
    // Legacy approach with query parameter
    return storeParam ? `${path}?store=${storeParam}` : path;
  };

  return (
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
  );
};

export default StoreNavbar;
