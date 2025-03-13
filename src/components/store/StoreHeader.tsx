
import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  ShoppingCart, 
  Search, 
  Menu, 
  X, 
  Heart, 
  ChevronDown, 
  User, 
  Home,
  Grid3X3,
  Info,
  PhoneCall,
  Instagram,
  Facebook,
  Twitter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useDeviceType } from '@/hooks/use-device-type';

interface StoreHeaderProps {
  storeInfo: {
    name: string;
    slug: string;
    logo: string;
    instagram?: string | null;
    facebook?: string | null;
    twitter?: string | null;
  };
  categories: string[];
  totalCartItems: number;
  onSearch: (query: string) => void;
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const StoreHeader = ({ 
  storeInfo, 
  categories, 
  totalCartItems, 
  onSearch, 
  selectedCategory,
  onCategorySelect 
}: StoreHeaderProps) => {
  const [searchParams] = useSearchParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const deviceType = useDeviceType();
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleCategoryClick = (category: string) => {
    onCategorySelect(category);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 w-full bg-background/95 backdrop-blur-md border-b z-50">
      <div className="container mx-auto px-4 py-3 md:py-4">
        {/* Top bar with social media and contact (hidden on mobile) */}
        {deviceType !== 'mobile' && (
          <div className="flex items-center justify-between mb-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              {storeInfo.instagram && (
                <a href={storeInfo.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  <Instagram size={16} />
                </a>
              )}
              {storeInfo.facebook && (
                <a href={storeInfo.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  <Facebook size={16} />
                </a>
              )}
              {storeInfo.twitter && (
                <a href={storeInfo.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  <Twitter size={16} />
                </a>
              )}
            </div>
            <div className="flex items-center gap-6 text-xs">
              <span>info@{storeInfo.slug}.linok.me</span>
              <span>+965 1234 5678</span>
            </div>
          </div>
        )}
        
        {/* Main header */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <Link to={`/store?store=${storeInfo.slug}`} className="flex items-center gap-2">
              {storeInfo.logo ? (
                <Avatar className="h-8 w-8 md:h-10 md:w-10">
                  <AvatarImage src={storeInfo.logo} alt={storeInfo.name} />
                  <AvatarFallback>{storeInfo.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ) : (
                <div className="font-bold text-xl">{storeInfo.name}</div>
              )}
              {deviceType !== 'mobile' && (
                <span className="font-bold text-xl">{storeInfo.name}</span>
              )}
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to={`/store?store=${storeInfo.slug}`} className="font-medium hover:text-primary transition-colors flex items-center gap-1">
              <Home size={16} />
              <span>الرئيسية</span>
            </Link>
            
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex items-center gap-1 font-medium hover:text-primary transition-colors">
                  <Grid3X3 size={16} />
                  <span>التصنيفات</span>
                  <ChevronDown size={14} />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-0" align="center">
                <div className="grid gap-1 p-2">
                  {categories.map(category => (
                    <Button 
                      key={category}
                      variant={selectedCategory === category ? "secondary" : "ghost"}
                      className="w-full justify-start text-right"
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            
            <Link to={`/store?store=${storeInfo.slug}&page=products`} className="font-medium hover:text-primary transition-colors flex items-center gap-1">
              <ShoppingCart size={16} />
              <span>المنتجات</span>
            </Link>
            
            <Link to={`/store?store=${storeInfo.slug}&page=about`} className="font-medium hover:text-primary transition-colors flex items-center gap-1">
              <Info size={16} />
              <span>من نحن</span>
            </Link>
            
            <Link to={`/store?store=${storeInfo.slug}&page=contact`} className="font-medium hover:text-primary transition-colors flex items-center gap-1">
              <PhoneCall size={16} />
              <span>اتصل بنا</span>
            </Link>
          </div>
          
          {/* Search and cart */}
          <div className="flex items-center gap-3">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Input
                type="text"
                placeholder="البحث..."
                className={`w-32 lg:w-auto pl-8 ${deviceType === 'mobile' ? 'h-9 text-sm' : ''}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            </form>
            
            <Link to={`/store?store=${storeInfo.slug}&page=favorites`} className="hidden md:block">
              <Button variant="ghost" size="icon">
                <Heart size={20} />
              </Button>
            </Link>
            
            <Link to={`/store/cart?store=${storeInfo.slug}`} className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart size={20} />
                {totalCartItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs" variant="destructive">
                    {totalCartItems}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden py-4 px-4 border-t bg-background">
          <nav className="flex flex-col gap-3">
            <Link 
              to={`/store?store=${storeInfo.slug}`} 
              className="font-medium py-2 flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Home size={18} />
              <span>الرئيسية</span>
            </Link>
            
            <button 
              className="flex items-center justify-between font-medium py-2 w-full"
              onClick={() => {}}
            >
              <div className="flex items-center gap-2">
                <Grid3X3 size={18} />
                <span>التصنيفات</span>
              </div>
              <ChevronDown size={16} />
            </button>
            
            <div className="pr-4 space-y-2">
              {categories.map(category => (
                <Button 
                  key={category}
                  variant="ghost"
                  className="block w-full text-right py-1 h-auto text-sm justify-start"
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
            
            <Link 
              to={`/store?store=${storeInfo.slug}&page=products`}
              className="font-medium py-2 flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <ShoppingCart size={18} />
              <span>المنتجات</span>
            </Link>
            
            <Link 
              to={`/store?store=${storeInfo.slug}&page=about`}
              className="font-medium py-2 flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Info size={18} />
              <span>من نحن</span>
            </Link>
            
            <Link 
              to={`/store?store=${storeInfo.slug}&page=contact`}
              className="font-medium py-2 flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <PhoneCall size={18} />
              <span>اتصل بنا</span>
            </Link>
            
            <div className="flex items-center gap-3 py-2">
              <Link 
                to={`/store?store=${storeInfo.slug}&page=favorites`}
                className="font-medium flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Heart size={18} />
                <span>المفضلة</span>
              </Link>
            </div>
            
            {/* Social Media Icons for Mobile */}
            <div className="flex items-center gap-4 mt-4 border-t pt-4">
              {storeInfo.instagram && (
                <a href={storeInfo.instagram} target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Instagram size={18} />
                  </Button>
                </a>
              )}
              {storeInfo.facebook && (
                <a href={storeInfo.facebook} target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Facebook size={18} />
                  </Button>
                </a>
              )}
              {storeInfo.twitter && (
                <a href={storeInfo.twitter} target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Twitter size={18} />
                  </Button>
                </a>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default StoreHeader;
