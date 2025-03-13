
import React, { useEffect, useState } from 'react';
import { useSearchParams, Navigate } from 'react-router-dom';
import { Product } from '@/types/store';
import { useStore } from '@/contexts/StoreContext';
import { storeService } from '@/services/storeService';
import ProductCard from '@/components/store/ProductCard';
import StoreHeader from '@/components/store/StoreHeader';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import LoadingScreen from '@/components/LoadingScreen';

const StoreFront = () => {
  const [searchParams] = useSearchParams();
  const { store, isLoading: storeLoading, error: storeError } = useStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const storeSlug = searchParams.get('store');
  
  useEffect(() => {
    const loadProducts = async () => {
      if (!store) return;
      
      setIsLoading(true);
      try {
        const storeProducts = await storeService.getStoreProducts(store.id);
        setProducts(storeProducts);
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
  }, [store]);
  
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
  
  return (
    <div className="container py-8">
      <StoreHeader 
        store={store} 
        error={storeError} 
        isLoading={storeLoading} 
      />
      
      <h2 className="text-2xl font-bold mb-6">منتجاتنا</h2>
      
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="h-72 bg-gray-100 animate-pulse rounded-md"></div>
          ))}
        </div>
      ) : error ? (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>خطأ</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">لا توجد منتجات متاحة حالياً</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default StoreFront;
