
import React, { useEffect, useState } from 'react';
import { useSearchParams, Navigate } from 'react-router-dom';
import { Product } from '@/types/store';
import { useStore } from '@/contexts/StoreContext';
import { storeService } from '@/services/storeService';
import ProductCard from '@/components/store/ProductCard';
import StoreHeader from '@/components/store/StoreHeader';
import { Button } from '@/components/ui/button';
import { AlertCircle, Package, Filter, ShoppingBag, Grid3X3, List, ChevronRight } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import LoadingScreen from '@/components/LoadingScreen';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { categories } from '@/data/products';

const StoreFront = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { store, isLoading: storeLoading, error: storeError } = useStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid'); 
  
  const storeSlug = searchParams.get('store');
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
  const handleCategoryFilter = (category: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (category) {
      newParams.set('category', category);
    } else {
      newParams.delete('category');
    }
    
    setSearchParams(newParams);
  };
  
  return (
    <div className="container pb-20 md:pb-8">
      <StoreHeader 
        store={store} 
        error={storeError} 
        isLoading={storeLoading} 
      />
      
      {/* Categories Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">الفئات</h2>
          <Button variant="ghost" size="sm" className="text-primary text-sm flex items-center">
            عرض الكل
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex overflow-x-auto space-x-3 rtl:space-x-reverse pb-2 no-scrollbar">
          {categories.slice(0, 6).map((category) => (
            <Card 
              key={category}
              className={`flex-shrink-0 w-24 hover:shadow-md transition-all cursor-pointer ${
                categoryFilter === category 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => handleCategoryFilter(categoryFilter === category ? null : category)}
            >
              <CardContent className="p-3 text-center">
                <div className="w-12 h-12 mx-auto bg-gray-100 rounded-full mb-2 flex items-center justify-center">
                  <ShoppingBag size={20} className="text-primary" />
                </div>
                <div className="text-xs font-medium truncate">{category}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Products Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">
            {categoryFilter ? `${categoryFilter}` : 'جميع المنتجات'}
          </h2>
          
          <div className="flex items-center gap-2">
            <Tabs defaultValue={viewType} onValueChange={(value) => setViewType(value as 'grid' | 'list')}>
              <TabsList className="grid w-[80px] grid-cols-2">
                <TabsTrigger value="grid" className="p-1">
                  <Grid3X3 size={16} />
                </TabsTrigger>
                <TabsTrigger value="list" className="p-1">
                  <List size={16} />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="h-64 bg-gray-100 animate-pulse rounded-md"></div>
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
            <Button onClick={() => handleCategoryFilter(null)}>عرض جميع المنتجات</Button>
          </div>
        ) : (
          <div className={viewType === 'grid' 
            ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            : "grid grid-cols-1 gap-4"
          }>
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
