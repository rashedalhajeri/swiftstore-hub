
import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  Search, 
  Menu, 
  X, 
  Heart, 
  ChevronDown, 
  User, 
  ShoppingBag,
  ExternalLink
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { storeService } from '@/services/storeService';
import ProductCard from '@/components/store/ProductCard';
import { Product } from '@/types/store';
import { useCart } from '@/contexts/CartContext';

// Sample categories for the store
const categories = [
  'الكل',
  'إلكترونيات',
  'حقائب',
  'اكسسوارات',
  'هواتف ذكية',
  'رياضة',
];

const StoreFront = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  // Get store slug from URL or localStorage
  const storeSlug = searchParams.get('store') || localStorage.getItem('storeSlug') || '';

  if (!storeSlug) {
    // If no store slug is provided, redirect to home
    navigate('/');
    toast.error('لم يتم تحديد متجر');
  }
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [products, setProducts] = useState<Product[]>([]);
  const [storeInfo, setStoreInfo] = useState({
    id: '',
    name: 'متجر.أنا',
    slug: storeSlug,
    logo: '',
    description: '',
    currency: 'KWD',
    primaryColor: '#8B5CF6',
    isLoading: true
  });

  // Fetch store information
  useEffect(() => {
    const fetchStoreInfo = async () => {
      try {
        if (!storeSlug) return;
        
        const storeData = await storeService.getStoreBySlug(storeSlug);
        
        if (storeData) {
          setStoreInfo({
            id: storeData.id,
            name: storeData.name || 'متجر.أنا',
            slug: storeData.slug || storeSlug,
            logo: storeData.logo || '',
            description: storeData.description || '',
            currency: 'KWD',
            primaryColor: storeData.primary_color || '#8B5CF6',
            isLoading: false
          });
          
          // Apply store's primary color to theme
          storeService.applyStoreTheme(storeData.primary_color);
          
          // Fetch store products
          const storeProducts = await storeService.getStoreProducts(storeData.id);
          setProducts(storeProducts);
        } else {
          toast.error('المتجر غير موجود أو غير منشور');
          setStoreInfo(prev => ({ ...prev, isLoading: false }));
        }
      } catch (err) {
        console.error('Error in fetchStoreInfo:', err);
        toast.error('حدث خطأ أثناء تحميل بيانات المتجر');
        setStoreInfo(prev => ({ ...prev, isLoading: false }));
      }
    };
    
    fetchStoreInfo();
    
    // Cleanup function to reset theme when component unmounts
    return () => {
      document.documentElement.style.removeProperty('--primary');
      document.documentElement.style.removeProperty('--primary-hover');
    };
  }, [storeSlug]);

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'الكل' || 
      (typeof product.category === 'object' && product.category?.name === selectedCategory) ||
      (typeof product.category === 'string' && product.category === selectedCategory);
    return matchesSearch && matchesCategory;
  });

  // Featured products
  const featuredProducts = products.filter(product => product.featured);

  return (
    <div className="min-h-screen bg-background flex flex-col" style={{ direction: 'rtl' }}>
      {/* Header */}
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
              <Link to={`/store?store=${storeInfo.slug}`} className="flex items-center">
                {storeInfo.logo ? (
                  <img src={storeInfo.logo} alt={storeInfo.name} className="h-8" />
                ) : (
                  <div className="font-bold text-xl">{storeInfo.name}</div>
                )}
              </Link>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <Link to={`/store?store=${storeInfo.slug}`} className="font-medium hover:text-primary transition-colors">
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
                      <button 
                        key={category}
                        className="block w-full text-right px-4 py-2 text-sm hover:bg-muted transition-colors"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <Link to={`/store?store=${storeInfo.slug}&page=products`} className="font-medium hover:text-primary transition-colors">
                المنتجات
              </Link>
              <Link to={`/store?store=${storeInfo.slug}&page=about`} className="font-medium hover:text-primary transition-colors">
                من نحن
              </Link>
              <Link to={`/store?store=${storeInfo.slug}&page=contact`} className="font-medium hover:text-primary transition-colors">
                اتصل بنا
              </Link>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="البحث..."
                  className="w-32 md:w-auto pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              </div>
              
              <Link to={`/store?store=${storeInfo.slug}&page=favorites`} className="hidden md:block">
                <Button variant="ghost" size="icon">
                  <Heart size={20} />
                </Button>
              </Link>
              
              <Link to={`/store/cart?store=${storeInfo.slug}`} className="relative">
                <Button variant="ghost" size="icon">
                  <ShoppingCart size={20} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 px-4 border-t">
            <nav className="flex flex-col gap-3">
              <Link 
                to={`/store?store=${storeInfo.slug}`} 
                className="font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                الرئيسية
              </Link>
              <button 
                className="flex items-center justify-between font-medium py-2 w-full"
                onClick={() => {}}
              >
                <span>التصنيفات</span>
                <ChevronDown size={16} />
              </button>
              <div className="pl-4 space-y-2">
                {categories.map(category => (
                  <button 
                    key={category}
                    className="block w-full text-right py-1 text-sm"
                    onClick={() => {
                      setSelectedCategory(category);
                      setMobileMenuOpen(false);
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <Link 
                to={`/store?store=${storeInfo.slug}&page=products`}
                className="font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                المنتجات
              </Link>
              <Link 
                to={`/store?store=${storeInfo.slug}&page=about`}
                className="font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                من نحن
              </Link>
              <Link 
                to={`/store?store=${storeInfo.slug}&page=contact`}
                className="font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                اتصل بنا
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4">{storeInfo.name}</h1>
              <p className="text-lg text-muted-foreground mb-8">
                {storeInfo.description || "متجرك المفضل للمنتجات الأصلية عالية الجودة بأسعار تنافسية"}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild size="lg" className="button-hover-effect">
                  <Link to={`/store?store=${storeInfo.slug}&page=products`}>تسوق الآن</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to={`/store?store=${storeInfo.slug}&page=about`}>تعرف علينا</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">منتجات مميزة</h2>
                <Link to={`/store?store=${storeInfo.slug}&page=products`} className="text-primary font-medium flex items-center gap-1 hover:underline">
                  <span>عرض الكل</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {featuredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Products */}
        <section className="py-12 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">كل المنتجات</h2>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  تصفية حسب: {selectedCategory}
                </span>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">لا توجد منتجات متاحة</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">عن المتجر</h3>
              <p className="text-muted-foreground">
                {storeInfo.description || "نقدم لكم أفضل المنتجات بأفضل الأسعار مع خدمة عملاء متميزة"}
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">روابط مهمة</h3>
              <ul className="space-y-2">
                <li>
                  <Link to={`/store?store=${storeInfo.slug}&page=about`} className="text-muted-foreground hover:text-primary transition-colors">
                    من نحن
                  </Link>
                </li>
                <li>
                  <Link to={`/store?store=${storeInfo.slug}&page=contact`} className="text-muted-foreground hover:text-primary transition-colors">
                    اتصل بنا
                  </Link>
                </li>
                <li>
                  <Link to={`/store?store=${storeInfo.slug}&page=privacy`} className="text-muted-foreground hover:text-primary transition-colors">
                    سياسة الخصوصية
                  </Link>
                </li>
                <li>
                  <Link to={`/store?store=${storeInfo.slug}&page=terms`} className="text-muted-foreground hover:text-primary transition-colors">
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
                    <button 
                      className="text-muted-foreground hover:text-primary transition-colors"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">تواصل معنا</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>البريد الإلكتروني: info@{storeInfo.slug}.linok.me</li>
                <li>الهاتف: +965 1234 5678</li>
                <li>العنوان: الكويت</li>
              </ul>
              <div className="flex items-center gap-4 mt-4">
                <a href="#" className="text-foreground hover:text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a href="#" className="text-foreground hover:text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </a>
                <a href="#" className="text-foreground hover:text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
              </div>
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

export default StoreFront;
