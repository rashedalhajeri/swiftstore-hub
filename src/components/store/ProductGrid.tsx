
import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types/store';
import { useDeviceType } from '@/hooks/use-device-type';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, Grid, Grid2X2, Grid3X3 } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  title?: string;
  showViewAll?: boolean;
  viewAllLink?: string;
  loading?: boolean;
  emptyMessage?: string;
}

type GridView = 'small' | 'medium' | 'large';

const ProductGrid = ({
  products,
  title,
  showViewAll = false,
  viewAllLink = '',
  loading = false,
  emptyMessage = 'لا توجد منتجات متاحة'
}: ProductGridProps) => {
  const deviceType = useDeviceType();
  const [view, setView] = useState<GridView>('medium');
  
  // Adjust grid view based on device type
  useEffect(() => {
    if (deviceType === 'mobile') {
      setView('large');
    } else if (deviceType === 'tablet') {
      setView('medium');
    } else {
      setView('medium');
    }
  }, [deviceType]);

  // Define column count based on view and device
  const getColumns = () => {
    if (deviceType === 'mobile') {
      return 'grid-cols-1 sm:grid-cols-2';
    } else if (deviceType === 'tablet') {
      if (view === 'small') return 'grid-cols-2 md:grid-cols-3';
      if (view === 'medium') return 'grid-cols-2 md:grid-cols-3';
      return 'grid-cols-2';
    } else {
      if (view === 'small') return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5';
      if (view === 'medium') return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
      return 'grid-cols-2 md:grid-cols-3';
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className={`grid ${getColumns()} gap-4 md:gap-6`}>
          {Array(8).fill(0).map((_, index) => (
            <div key={index} className="bg-muted rounded-lg h-80"></div>
          ))}
        </div>
      </div>
    );
  }

  // When no products
  if (products.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {title && (
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
          
          <div className="flex items-center gap-2">
            {deviceType !== 'mobile' && (
              <div className="flex items-center bg-muted rounded-md mr-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`h-8 w-8 ${view === 'small' ? 'bg-background shadow-sm' : ''}`}
                  onClick={() => setView('small')}
                >
                  <Grid3X3 size={16} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`h-8 w-8 ${view === 'medium' ? 'bg-background shadow-sm' : ''}`}
                  onClick={() => setView('medium')}
                >
                  <Grid2X2 size={16} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`h-8 w-8 ${view === 'large' ? 'bg-background shadow-sm' : ''}`}
                  onClick={() => setView('large')}
                >
                  <Grid size={16} />
                </Button>
              </div>
            )}
            
            {showViewAll && (
              <Button variant="ghost" size="sm" asChild className="gap-1">
                <a href={viewAllLink}>
                  <span>عرض الكل</span>
                  <ChevronLeft size={16} />
                </a>
              </Button>
            )}
          </div>
        </div>
      )}

      <div className={`grid ${getColumns()} gap-4 md:gap-6`}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
