
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
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t py-2 md:hidden z-50 drop-shadow-sm">
      <div className="flex justify-around items-center max-w-md mx-auto">
        <Link to={buildStoreLink('/store')} className="flex flex-col items-center text-gray-500 hover:text-purple-600 transition-colors">
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-1">الرئيسية</span>
        </Link>
        
        <Link to={buildStoreLink('/store/favorites')} className="flex flex-col items-center text-gray-500 hover:text-purple-600 transition-colors">
          <Heart className="w-5 h-5" />
          <span className="text-[10px] mt-1">المفضلة</span>
        </Link>
        
        <Link to={buildStoreLink('/store/cart')} className="flex flex-col items-center relative">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center -mt-5 shadow-md">
            <ShoppingCart className="w-5 h-5 text-white" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-1">السلة</span>
        </Link>
        
        <Link to={buildStoreLink('/store/search')} className="flex flex-col items-center text-gray-500 hover:text-purple-600 transition-colors">
          <Search className="w-5 h-5" />
          <span className="text-[10px] mt-1">البحث</span>
        </Link>
        
        <Link to={buildStoreLink('/store/account')} className="flex flex-col items-center text-gray-500 hover:text-purple-600 transition-colors">
          <User className="w-5 h-5" />
          <span className="text-[10px] mt-1">حسابي</span>
        </Link>
      </div>
    </div>
  );
};

export default StoreMobileNav;
