
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
  ShoppingBag 
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
import Logo from '@/components/Logo';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Sample product data for the store
const sampleProducts = [
  {
    id: 1,
    name: 'سماعات لاسلكية بلوتوث',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'إلكترونيات',
    featured: true,
  },
  {
    id: 2,
    name: 'حقيبة ظهر عصرية',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'حقائب',
    featured: true,
  },
  {
    id: 3,
    name: 'ساعة ذكية متطورة',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'إلكترونيات',
    featured: true,
  },
  {
    id: 4,
    name: 'نظارة شمسية أنيقة',
    price: 35.50,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'اكسسوارات',
    featured: false,
  },
  {
    id: 5,
    name: 'آيفون 15 برو ماكس',
    price: 999.99,
    image: 'https://images.unsplash.com/photo-1696446701632-4a873b922b80?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'هواتف ذكية',
    featured: true,
  },
  {
    id: 6,
    name: 'لوح تزلج خشبي',
    price: 65.00,
    image: 'https://images.unsplash.com/photo-1547447134-cd3f5c716030?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'رياضة',
    featured: false,
  },
  {
    id: 7,
    name: 'سلسلة مفاتيح معدنية',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1542826384-ef195733747c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'اكسسوارات',
    featured: false,
  },
  {
    id: 8,
    name: 'لابتوب ماك بوك برو',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'إلكترونيات',
    featured: true,
  },
];

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
  const storeSlug = searchParams.get('store') || localStorage.getItem('storeSlug') || 'store';
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [cart, setCart] = useState<number[]>([]);
  const [storeInfo, setStoreInfo] = useState({
    name: 'متجر.أنا',
    slug: storeSlug,
    logo: '',
    description: '',
    currency: 'KWD',
    primaryColor: '#8B5CF6'
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch store information
  useEffect(() => {
    const fetchStoreInfo = async () => {
      try {
        setIsLoading(true);
        
        const { data: storeData, error } = await supabase
          .from('stores')
          .select('*')
          .eq('slug', storeSlug)
          .maybeSingle();
          
        if (error) {
          console.error('Error fetching store:', error);
          toast.error('حدث خطأ أثناء تحميل بيانات المتجر');
          return;
        }
        
        if (storeData) {
          setStoreInfo({
            name: storeData.name || 'متجر.أنا',
            slug: storeData.slug || storeSlug,
            logo: storeData.logo || '',
            description: storeData.description || '',
            currency: 'KWD',
            primaryColor: storeData.primary_color || '#8B5CF6'
          });
          
          // Apply store's primary color if available
          if (storeData.primary_color) {
            document.documentElement.style.setProperty('--primary', storeData.primary_color);
          }
        } else {
          console.warn('No store found with slug:', storeSlug);
        }
      } catch (err) {
        console.error('Error in fetchStoreInfo:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStoreInfo();
  }, [storeSlug]);

  // Filter products based on search and category
  const filteredProducts = sampleProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'الكل' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Featured products
  const featuredProducts = sampleProducts.filter(product => product.featured);

  const handleAddToCart = (productId: number) => {
    setCart([...cart, productId]);
  };

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
              <Link to="/" className="flex items-center">
                {storeInfo.logo ? (
                  <img src={storeInfo.logo} alt={storeInfo.name} className="h-8" />
                ) : (
                  <div className="font-bold text-xl">{storeInfo.name}</div>
                )}
              </Link>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <Link to="/" className="font-medium hover:text-primary transition-colors">
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
              <Link to="/products" className="font-medium hover:text-primary transition-colors">
                المنتجات
              </Link>
              <Link to="/about" className="font-medium hover:text-primary transition-colors">
                من نحن
              </Link>
              <Link to="/contact" className="font-medium hover:text-primary transition-colors">
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
              
              <Link to="/login" className="hidden md:block">
                <Button variant="ghost" size="icon">
                  <User size={20} />
                </Button>
              </Link>
              
              <Link to="/favorites" className="hidden md:block">
                <Button variant="ghost" size="icon">
                  <Heart size={20} />
                </Button>
              </Link>
              
              <Link to="/cart" className="relative">
                <Button variant="ghost" size="icon">
                  <ShoppingCart size={20} />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 px-4 border-t">
            <nav className="flex flex-col gap-3">
              <Link to="/" className="font-medium py-2">
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
              <Link to="/products" className="font-medium py-2">
                المنتجات
              </Link>
              <Link to="/about" className="font-medium py-2">
                من نحن
              </Link>
              <Link to="/contact" className="font-medium py-2">
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
        {/* Hero Section */}
        <section className="py-12 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4">مرحبًا بك في {storeInfo.name}</h1>
              <p className="text-lg text-muted-foreground mb-8">
                {storeInfo.description || "متجرك المفضل للمنتجات الأصلية عالية الجودة بأسعار تنافسية"}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild size="lg" className="button-hover-effect">
                  <Link to="/products">تسوق الآن</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/about">تعرف علينا</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">منتجات مميزة</h2>
              <Link to="/products" className="text-primary font-medium flex items-center gap-1 hover:underline">
                <span>عرض الكل</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <Card key={product.id}  className="group">
                  <CardHeader className="p-0">
                    <div className="aspect-square relative overflow-hidden rounded-t-lg">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {product.featured && (
                        <Badge 
                          className="absolute top-2 right-2 bg-primary/90 hover:bg-primary"
                        >
                          مميز
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-base mb-2 line-clamp-1">
                      {product.name}
                    </CardTitle>
                    <div className="text-sm text-muted-foreground mb-3">
                      {product.category}
                    </div>
                    <div className="font-bold text-lg">
                      {product.price.toFixed(3)} {storeInfo.currency}
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button 
                      className="w-full button-hover-effect"
                      onClick={() => handleAddToCart(product.id)}
                    >
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      إضافة للسلة
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

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

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <Card key={product.id} className="group">
                  <CardHeader className="p-0">
                    <div className="aspect-square relative overflow-hidden rounded-t-lg">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {product.featured && (
                        <Badge 
                          className="absolute top-2 right-2 bg-primary/90 hover:bg-primary"
                        >
                          مميز
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-base mb-2 line-clamp-1">
                      {product.name}
                    </CardTitle>
                    <div className="text-sm text-muted-foreground mb-3">
                      {product.category}
                    </div>
                    <div className="font-bold text-lg">
                      {product.price.toFixed(3)} {storeInfo.currency}
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button 
                      className="w-full button-hover-effect"
                      onClick={() => handleAddToCart(product.id)}
                    >
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      إضافة للسلة
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
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
                  <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                    من نحن
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                    اتصل بنا
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                    سياسة الخصوصية
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
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
                <li>البريد الإلكتروني: info@{storeInfo.slug}</li>
                <li>الهاتف: +965 1234 5678</li>
                <li>العنوان: الكويت</li>
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

export default StoreFront;
