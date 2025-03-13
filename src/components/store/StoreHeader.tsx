
import React from 'react';
import { Store } from '@/types/store';
import { Heart, ShoppingCart, User, Search } from 'lucide-react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
        <div className="w-full h-48 md:h-64 bg-gray-100 animate-pulse rounded-lg"></div>
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

  // Mobile header inspired by the image
  return (
    <div className="w-full mb-8">
      <div className="container mx-auto px-4">
        {/* Top navigation bar */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <h1 className="text-lg font-bold md:text-xl">Explore</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Banner with promotion */}
        <div className="w-full bg-gray-900 text-white rounded-2xl overflow-hidden mb-8">
          <div className="flex items-center p-4 md:p-6">
            <div className="flex-1">
              <h3 className="font-bold text-lg md:text-xl">خصم 50% على طلبك الأول</h3>
              <p className="text-sm text-gray-300 mb-3">استمتع بأفضل المنتجات بأفضل الأسعار</p>
              <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-full text-white">تسوق الآن</Button>
            </div>
            <div className="hidden md:block w-1/3">
              <img 
                src="/lovable-uploads/e3416c54-8cd7-4e20-9137-8996253aaf72.png" 
                alt="Promotion" 
                className="w-40 h-40 object-contain" 
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom navigation - Fixed at bottom on mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t py-2 px-4 md:hidden z-50">
        <div className="flex justify-around items-center">
          <Link to="/store" className="flex flex-col items-center text-primary">
            <div className="p-1 rounded-full">
              <Heart className="w-5 h-5" />
            </div>
            <span className="text-xs">الرئيسية</span>
          </Link>
          
          <Link to="/store/favorites" className="flex flex-col items-center text-gray-500">
            <div className="p-1 rounded-full">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <span className="text-xs">التسوق</span>
          </Link>
          
          <Link to="/store/cart" className="flex flex-col items-center text-gray-500 relative">
            <div className="p-1 rounded-full">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="text-xs">السلة</span>
          </Link>
          
          <Link to="/login" className="flex flex-col items-center text-gray-500">
            <div className="p-1 rounded-full">
              <User className="w-5 h-5" />
            </div>
            <span className="text-xs">حسابي</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StoreHeader;
