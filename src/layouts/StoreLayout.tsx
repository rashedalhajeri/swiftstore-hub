
import { useState, useEffect } from 'react';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import StoreHeader from '@/components/store/StoreHeader';
import StoreFooter from '@/components/store/StoreFooter';
import { useCart } from '@/contexts/CartContext';
import { categories } from '@/data/products';
import { toast } from 'sonner';
import { storeService } from '@/services/storeService';

interface StoreLayoutProps {
  children: React.ReactNode;
}

const StoreLayout = ({ children }: StoreLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { totalItems } = useCart();
  
  // Get store slug from URL first, then localStorage as fallback
  const storeParam = searchParams.get('store');
  const storeSlug = storeParam || localStorage.getItem('storeSlug') || '';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [storeLoading, setStoreLoading] = useState(true);
  const [storeInfo, setStoreInfo] = useState({
    id: '',
    name: '',
    slug: storeSlug,
    logo: '',
    description: '',
    instagram: '',
    facebook: '',
    twitter: '',
    primaryColor: '#8B5CF6'
  });

  // Fetch store information
  useEffect(() => {
    const fetchStoreInfo = async () => {
      try {
        if (!storeSlug) {
          console.error('No store slug provided');
          setStoreLoading(false);
          toast.error('لم يتم تحديد متجر');
          navigate('/');
          return;
        }
        
        console.log('Fetching store with slug:', storeSlug);
        const storeData = await storeService.getStoreBySlug(storeSlug);
        
        if (storeData) {
          console.log('Store data fetched successfully:', storeData);
          setStoreInfo({
            id: storeData.id,
            name: storeData.name,
            slug: storeData.slug || storeSlug,
            logo: storeData.logo || '',
            description: storeData.description || '',
            instagram: storeData.instagram || '',
            facebook: storeData.facebook || '',
            twitter: storeData.twitter || '',
            primaryColor: storeData.primary_color || '#8B5CF6'
          });
          
          // Apply store's primary color to theme
          storeService.applyStoreTheme(storeData.primary_color);
          
          // Store the store slug in localStorage
          localStorage.setItem('storeSlug', storeData.slug);
        } else {
          console.warn('No store data found for slug:', storeSlug);
          toast.error('المتجر غير موجود أو غير منشور');
          
          // Navigate to dashboard if in dashboard
          if (location.pathname.includes('/dashboard')) {
            navigate('/dashboard/settings/store');
          } else {
            navigate('/');
          }
        }
      } catch (err) {
        console.error('Error in fetchStoreInfo:', err);
        toast.error('حدث خطأ أثناء تحميل بيانات المتجر');
      } finally {
        setStoreLoading(false);
      }
    };
    
    fetchStoreInfo();
    
    // Cleanup function to reset theme when component unmounts
    return () => {
      document.documentElement.style.removeProperty('--primary');
      document.documentElement.style.removeProperty('--primary-hover');
    };
  }, [storeSlug, navigate, location.pathname]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // The actual search logic will be handled by the individual pages
  };

  return (
    <div className="min-h-screen bg-background flex flex-col" style={{ direction: 'rtl' }}>
      <StoreHeader 
        storeInfo={storeInfo}
        categories={categories}
        totalCartItems={totalItems}
        onSearch={handleSearch}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      <main className="flex-1">
        {children}
      </main>

      <StoreFooter 
        storeInfo={storeInfo}
        categories={categories}
      />
    </div>
  );
};

export default StoreLayout;
