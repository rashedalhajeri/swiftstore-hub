
import React from 'react';
import { Store } from '@/types/store';
import { AlertCircle, ShoppingCart, Heart } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';

interface StoreHeaderProps {
  store: Store | null;
  error: string | null;
  isLoading: boolean;
}

const StoreHeader = ({ store, error, isLoading }: StoreHeaderProps) => {
  const { totalItems } = useCart();

  if (isLoading) {
    return (
      <div className="w-full flex flex-col gap-4">
        <div className="w-full h-48 md:h-64 bg-gray-100 animate-pulse rounded-md"></div>
        <div className="flex gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-100 animate-pulse"></div>
          <div className="flex-1 space-y-2">
            <div className="h-6 bg-gray-100 animate-pulse rounded w-1/3"></div>
            <div className="h-4 bg-gray-100 animate-pulse rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>خطأ</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!store) {
    return null;
  }

  return (
    <div className="relative w-full mb-20">
      {/* البنر */}
      <div className="w-full h-56 md:h-64 relative">
        {store.banner ? (
          <img 
            src={store.banner} 
            alt="Store Banner" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-green-700 to-green-500"></div>
        )}
        {/* Overlay for better visibility */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* الشعار واسم المتجر */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 flex flex-col items-center">
        {/* الشعار */}
        {store.logo && (
          <img 
            src={store.logo} 
            alt={`${store.name} logo`} 
            className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg bg-white"
          />
        )}

        {/* معلومات المتجر */}
        <h1 className="text-2xl md:text-3xl font-bold mt-4">{store.name}</h1>
        
        {/* أزرار السلة والمفضلة */}
        <div className="flex items-center gap-4 mt-4">
          <Link to="/store/cart">
            <Button variant="default" size="sm" className="group bg-primary hover:bg-primary/90 rounded-full px-4">
              <ShoppingCart className="h-4 w-4 mr-2" />
              <span>السلة</span>
              {totalItems > 0 && (
                <span className="ml-2 bg-white text-primary text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
          
          <Link to="/store/favorites">
            <Button variant="outline" size="sm" className="bg-transparent border-primary text-primary hover:bg-primary/10 rounded-full px-4">
              <Heart className="h-4 w-4 mr-2" />
              <span>المفضلة</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StoreHeader;
