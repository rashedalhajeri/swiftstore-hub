
import React from 'react';
import { Store } from '@/types/store';
import { Bell, Heart, Home, Search, ShoppingCart, User } from 'lucide-react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface StoreHeaderProps {
  store: Store | null;
  error: string | null;
  isLoading: boolean;
}

const StoreHeader = ({
  store,
  error,
  isLoading
}: StoreHeaderProps) => {
  const { totalItems } = useCart();
  const isMobile = useIsMobile();
  const [searchParams] = useSearchParams();
  const storeParam = searchParams.get('store');
  
  // بناء الروابط مع الحفاظ على معلمة المتجر
  const buildStoreLink = (path: string) => {
    return storeParam ? `${path}?store=${storeParam}` : path;
  };

  if (isLoading) {
    return <div className="w-full flex flex-col gap-4">
        <div className="w-full h-48 md:h-64 bg-gray-100 animate-pulse rounded-lg"></div>
        <div className="flex gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-100 animate-pulse"></div>
          <div className="flex-1 space-y-2">
            <div className="h-6 bg-gray-100 animate-pulse rounded w-1/3"></div>
            <div className="h-4 bg-gray-100 animate-pulse rounded w-2/3"></div>
          </div>
        </div>
      </div>;
  }

  if (error) {
    return <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>خطأ</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>;
  }

  return <div className="w-full bg-background">
      {/* Top header with profile and notification */}
      <div className="flex items-center justify-between py-3 px-4">
        <div className="flex items-center gap-2">
          {/* Only show store logo if available, otherwise no avatar fallback */}
          {store?.logo ? (
            <img 
              src={store.logo} 
              alt={store.name || 'Store Logo'} 
              className="w-8 h-8 rounded-full object-cover border" 
            />
          ) : null}
          
          {/* Display store name if available */}
          {store?.name && (
            <span className="font-semibold text-sm">
              {store.name.toUpperCase()}
            </span>
          )}
        </div>
        
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Black promotional banner */}
      <div className="mx-4 mb-6">
        <div className="w-full rounded-xl overflow-hidden relative">
          <img 
            src="/lovable-uploads/3e000195-9fd0-4623-9f95-8e97c92179fc.png" 
            alt="Cyber Monday Super Sale" 
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
      
      {/* Category filter buttons */}
      <div className="px-4 mb-6">
        <div className="flex overflow-x-auto space-x-2 rtl:space-x-reverse no-scrollbar">
          <Button variant="outline" className="whitespace-nowrap rounded-full bg-black text-white border-none">
            ALL
          </Button>
          <Button variant="outline" className="whitespace-nowrap rounded-full text-black">
            NEW IN
          </Button>
          <Button variant="outline" className="whitespace-nowrap rounded-full text-black">
            PARTYCHIC
          </Button>
          <Button variant="outline" className="whitespace-nowrap rounded-full text-black">
            CASUAL
          </Button>
        </div>
      </div>
      
      {/* Popular Products Header */}
      <div className="flex justify-between items-center px-4 mb-3">
        <h2 className="text-base font-semibold">POPULAR PRODUCTS</h2>
        <Link to={buildStoreLink('/store')} className="text-xs text-gray-500">View All</Link>
      </div>
      
      {/* Bottom navigation - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t py-3 md:hidden z-50">
        <div className="flex justify-around items-center">
          <Link to={buildStoreLink('/store')} className="flex flex-col items-center text-black">
            <Home className="w-6 h-6" />
          </Link>
          
          <Link to={buildStoreLink('/store/favorites')} className="flex flex-col items-center text-gray-500">
            <Heart className="w-6 h-6" />
          </Link>
          
          <Link to={buildStoreLink('/store/cart')} className="flex flex-col items-center relative">
            <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center -mt-5">
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </span>}
            </div>
          </Link>
          
          <Link to={buildStoreLink('/store/search')} className="flex flex-col items-center text-gray-500">
            <Search className="w-6 h-6" />
          </Link>
          
          <Link to={buildStoreLink('/store/account')} className="flex flex-col items-center text-gray-500">
            <User className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </div>;
};

export default StoreHeader;
