
import React from 'react';
import { Link, useSearchParams, useParams } from 'react-router-dom';
import { Home, Heart, ShoppingCart, Search, User } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const StoreMobileNav = () => {
  const { totalItems } = useCart();
  const [searchParams] = useSearchParams();
  const params = useParams();
  const storeParam = searchParams.get('store');
  
  // بناء الروابط مع الحفاظ على معلمة المتجر
  const buildStoreLink = (path: string) => {
    // If we're using the direct slug approach
    if (params.storeSlug) {
      // For the home page (remove the trailing slash if any)
      if (path === '/store') {
        return `/${params.storeSlug}`;
      }
      // For other paths, replace /store/ with /{storeSlug}/
      return path.replace('/store', `/${params.storeSlug}`);
    }
    
    // Legacy approach with query parameter
    return storeParam ? `${path}?store=${storeParam}` : path;
  };

  return (
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
  );
};

export default StoreMobileNav;
