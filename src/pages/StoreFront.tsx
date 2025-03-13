
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { storeService } from '@/services/storeService';
import { Product } from '@/types/store';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import StoreLayout from '@/layouts/StoreLayout';
import HeroSection from '@/components/store/HeroSection';
import ProductGrid from '@/components/store/ProductGrid';
import StoreCategoryTabs from '@/components/store/StoreCategoryTabs';
import { useDeviceType } from '@/hooks/use-device-type';
import { categories } from '@/data/products';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag, Package, ShieldCheck, TruckIcon } from 'lucide-react';

const StoreFront = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const deviceType = useDeviceType();
  
  // Get store slug from URL or localStorage
  const storeSlug = searchParams.get('store') || localStorage.getItem('storeSlug') || '';

  if (!storeSlug) {
    // If no store slug is provided, redirect to home
    navigate('/');
    toast.error('لم يتم تحديد متجر');
  }
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [storeInfo, setStoreInfo] = useState({
    id: '',
    name: '',
    slug: storeSlug,
    logo: '',
    banner: '',
    description: '',
    currency: 'KWD',
    primaryColor: '#8B5CF6',
  });

  // Fetch store information
  useEffect(() => {
    const fetchStoreInfo = async () => {
      try {
        if (!storeSlug) {
          setIsLoading(false);
          return;
        }
        
        const storeData = await storeService.getStoreBySlug(storeSlug);
        
        if (storeData) {
          console.log('Store data for front page:', storeData);
          setStoreInfo({
            id: storeData.id,
            name: storeData.name,
            slug: storeData.slug || storeSlug,
            logo: storeData.logo || '',
            banner: storeData.banner || '',
            description: storeData.description || '',
            currency: 'KWD',
            primaryColor: storeData.primary_color || '#8B5CF6',
          });
          
          // Apply store's primary color to theme
          storeService.applyStoreTheme(storeData.primary_color);
          
          // Store the store slug in localStorage for future use
          localStorage.setItem('storeSlug', storeData.slug);
          
          // Fetch store products
          const storeProducts = await storeService.getStoreProducts(storeData.id);
          console.log('Products fetched:', storeProducts);
          setProducts(storeProducts);
          setIsLoading(false);
        } else {
          toast.error('المتجر غير موجود أو غير منشور');
          setIsLoading(false);
          
          // Redirect to home if store not found
          navigate('/');
        }
      } catch (err) {
        console.error('Error in fetchStoreInfo:', err);
        toast.error('حدث خطأ أثناء تحميل بيانات المتجر');
        setIsLoading(false);
      }
    };
    
    fetchStoreInfo();
    
    // Cleanup function to reset theme when component unmounts
    return () => {
      document.documentElement.style.removeProperty('--primary');
      document.documentElement.style.removeProperty('--primary-hover');
    };
  }, [storeSlug, navigate]);

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
    <StoreLayout>
      {/* Hero Section */}
      <HeroSection storeInfo={storeInfo} />
      
      {/* USP Section (Unique Selling Points) */}
      <section className="py-8 md:py-12 bg-secondary/5">
        <div className="container mx-auto px-4">
          <div className={`grid grid-cols-2 ${deviceType === 'mobile' ? '' : 'md:grid-cols-4'} gap-6 text-center`}>
            <div className="flex flex-col items-center">
              <div className="bg-primary/5 p-3 rounded-full mb-3">
                <ShoppingBag size={deviceType === 'mobile' ? 20 : 24} className="text-primary" />
              </div>
              <h3 className="font-medium text-sm md:text-base">تسوق آمن</h3>
              <p className="text-xs md:text-sm text-muted-foreground">حماية كاملة للمدفوعات</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-primary/5 p-3 rounded-full mb-3">
                <Package size={deviceType === 'mobile' ? 20 : 24} className="text-primary" />
              </div>
              <h3 className="font-medium text-sm md:text-base">منتجات أصلية</h3>
              <p className="text-xs md:text-sm text-muted-foreground">جودة مضمونة</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-primary/5 p-3 rounded-full mb-3">
                <TruckIcon size={deviceType === 'mobile' ? 20 : 24} className="text-primary" />
              </div>
              <h3 className="font-medium text-sm md:text-base">شحن سريع</h3>
              <p className="text-xs md:text-sm text-muted-foreground">توصيل في نفس اليوم</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-primary/5 p-3 rounded-full mb-3">
                <ShieldCheck size={deviceType === 'mobile' ? 20 : 24} className="text-primary" />
              </div>
              <h3 className="font-medium text-sm md:text-base">ضمان الجودة</h3>
              <p className="text-xs md:text-sm text-muted-foreground">استرجاع مجاني</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className="py-10 md:py-16">
          <div className="container mx-auto px-4">
            <ProductGrid 
              products={featuredProducts.slice(0, deviceType === 'mobile' ? 4 : 8)} 
              title="منتجات مميزة"
              showViewAll={true}
              viewAllLink={`/store?store=${storeInfo.slug}&page=products&featured=true`}
              loading={isLoading}
            />
          </div>
        </section>
      )}

      {/* Category Filter & All Products Section */}
      <section className="py-10 md:py-16 bg-secondary/10">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold mb-6">استكشف منتجاتنا</h2>
          
          <StoreCategoryTabs 
            categories={['الكل', ...categories]}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />
          
          <Separator className="my-6" />
          
          <ProductGrid 
            products={filteredProducts} 
            loading={isLoading}
            emptyMessage="لا توجد منتجات متطابقة مع المعايير المحددة"
          />
        </div>
      </section>
    </StoreLayout>
  );
};

export default StoreFront;
