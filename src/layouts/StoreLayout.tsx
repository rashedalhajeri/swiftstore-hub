
import { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
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
  const [searchParams] = useSearchParams();
  const { totalItems } = useCart();
  
  // Get store slug from URL or localStorage
  const storeSlug = searchParams.get('store') || localStorage.getItem('storeSlug') || '';
  
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
          setStoreLoading(false);
          return;
        }
        
        const storeData = await storeService.getStoreBySlug(storeSlug);
        
        if (storeData) {
          console.log('Store data fetched:', storeData);
          setStoreInfo({
            id: storeData.id,
            name: storeData.name || 'متجر.أنا',
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
        } else {
          console.warn('No store data found for slug:', storeSlug);
          toast.error('المتجر غير موجود أو غير منشور');
        }
      } catch (err) {
        console.error('Error in fetchStoreInfo:', err);
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
  }, [storeSlug]);

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
