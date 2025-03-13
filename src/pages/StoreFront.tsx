import React, { useEffect, useState } from 'react';
import { useSearchParams, Navigate, useParams } from 'react-router-dom';
import { Product } from '@/types/store';
import { useStore } from '@/contexts/StoreContext';
import { storeService } from '@/services/storeService';
import ProductCard from '@/components/store/ProductCard';
import StoreHeader from '@/components/store/StoreHeader';
import { Button } from '@/components/ui/button';
import { AlertCircle, Package } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import LoadingScreen from '@/components/LoadingScreen';

const StoreFront = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { store, isLoading: storeLoading, error: storeError } = useStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const params = useParams();
  const storeSlug = params.storeSlug || searchParams.get('store');
  const categoryFilter = searchParams.get('category');
  
  useEffect(() => {
    const loadProducts = async () => {
      if (!store) return;
      
      setIsLoading(true);
      try {
        const storeProducts = await storeService.getStoreProducts(store.id);
        
        // Filter products by category if a filter is applied
        let filteredProducts = storeProducts;
        if (categoryFilter) {
          filteredProducts = storeProducts.filter(product => {
            const productCategory = typeof product.category === 'string' ? product.category : product.category?.name || '';
            return productCategory.toLowerCase() === categoryFilter.toLowerCase();
          });
        }
        
        setProducts(filteredProducts);
        setError(null);
      } catch (err) {
        console.error("Error loading products:", err);
        setError('حدث خطأ أثناء تحميل المنتجات');
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (store) {
      loadProducts();
    }
  }, [store, categoryFilter]);
  
  // Redirect to home if no store slug provided
  if (!storeSlug && !storeLoading) {
    console.log('No store slug found, redirecting to home');
    return <Navigate to="/" replace />;
  }
  
  // Show loading while store is being fetched
  if (storeLoading) {
    return <LoadingScreen />;
  }
  
  // Show error if store couldn't be loaded
  if (storeError) {
    return (
      <div className="container py-12">
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>خطأ</AlertTitle>
          <AlertDescription>{storeError}</AlertDescription>
        </Alert>
        <Button onClick={() => window.history.back()}>العودة</Button>
      </div>
    );
  }

  // Handle category filter
  const handleCategoryFilter = (category: string) => {
    setActiveCategory(category);
    
    // Use the current route structure (either direct slug or query parameter)
    if (category === 'all') {
      if (params.storeSlug) {
        // Direct path route
        const newParams = new URLSearchParams(searchParams);
        newParams.delete('category');
        setSearchParams(newParams);
      } else {
        // Legacy query param route
        const newParams = new URLSearchParams(searchParams);
        newParams.delete('category');
        setSearchParams(newParams);
      }
    } else {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('category', category);
      setSearchParams(newParams);
    }
  };
  
  return (
    <div className="pb-24 md:pb-8 bg-background">
      <StoreHeader 
        store={store} 
        error={storeError} 
        isLoading={storeLoading} 
      />
      
      {/* Products Grid */}
      <div className="px-4">
        {isLoading ? (
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-64 bg-gray-100 animate-pulse rounded-xl"></div>
            ))}
          </div>
        ) : error ? (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>خطأ</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : products.length === 0 ? (
          <div className="text-center py-16 bg-muted/30 rounded-lg">
            <Package className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl text-muted-foreground mb-2">لا توجد منتجات متاحة حالياً</p>
            {categoryFilter && (
              <p className="text-muted-foreground mb-4">لا توجد منتجات في هذه الفئة، جرب فئة أخرى</p>
            )}
            <Button onClick={() => handleCategoryFilter('all')}>عرض جميع المنتجات</Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreFront;
