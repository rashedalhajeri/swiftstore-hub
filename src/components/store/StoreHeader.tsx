
import React from 'react';
import { Store } from '@/types/store';
import { Heart, ShoppingCart, User } from 'lucide-react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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

  if (!store) {
    return null;
  }

  return (
    <div className="relative w-full mb-16">
      {/* البنر */}
      <div className="w-full h-56 md:h-40 sm:h-32 relative">
        {store.banner ? (
          <img 
            src={store.banner} 
            alt="Store Banner" 
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-green-700 to-green-500 rounded-lg"></div>
        )}
      </div>

      {/* الشعار واسم المتجر */}
      <div className="absolute bottom-0 left-6 transform translate-y-1/2 flex items-center space-x-4">
        {/* الشعار */}
        {store.logo ? (
          <img 
            src={store.logo} 
            alt={`${store.name} Logo`} 
            className="w-24 h-24 sm:w-20 sm:h-20 rounded-full border-4 border-white shadow-lg"
          />
        ) : (
          <div className="w-24 h-24 sm:w-20 sm:h-20 rounded-full border-4 border-white shadow-lg bg-gradient-to-r from-green-700 to-green-500"></div>
        )}

        {/* معلومات المتجر */}
        <div className="rtl:mr-4 ltr:ml-4">
          <h1 className="text-3xl sm:text-2xl font-bold">{store.name}</h1>
          <p className="text-gray-600 text-sm">{store.description || 'وصف المتجر'}</p>
        </div>
      </div>

      {/* الأزرار */}
      <div className="absolute bottom-0 right-6 transform translate-y-1/2 flex space-x-4">
        <Link to="/store/favorites">
          <button className="p-2 bg-white text-black rounded-full shadow-md hover:bg-gray-200">
            <Heart className="w-5 h-5" />
          </button>
        </Link>
        <Link to="/store/cart">
          <button className="p-2 bg-white text-black rounded-full shadow-md hover:bg-gray-200 relative">
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </Link>
        <Link to="/login">
          <button className="p-2 bg-white text-black rounded-full shadow-md hover:bg-gray-200">
            <User className="w-5 h-5" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default StoreHeader;
