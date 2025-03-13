
import React from 'react';
import { Store } from '@/types/store';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, ShoppingCart, Heart, MapPin } from 'lucide-react';
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
    <div className="w-full mb-8">
      {/* Hero Banner with Background Image */}
      <div className="w-full h-64 md:h-96 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        {store.banner ? (
          <img 
            src={store.banner} 
            alt="" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-600 opacity-80"></div>
        )}
        
        {/* Overlay Content - Centered */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center">
          <div className="px-6 py-8 rounded-lg max-w-4xl flex flex-col items-center">
            {/* Store Logo */}
            {store.logo && (
              <div className="w-32 h-32 mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white">
                <img 
                  src={store.logo} 
                  alt={`${store.name} logo`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            {/* Store Name & Description */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-shadow">{store.name}</h1>
            {store.description && (
              <p className="text-white text-lg md:text-xl max-w-2xl mb-6">{store.description}</p>
            )}
            
            {/* Action Buttons */}
            <div className="flex items-center gap-4 mt-4">
              <Link to="/store/cart">
                <Button variant="default" size="lg" className="group bg-white text-gray-900 hover:bg-gray-100 rounded-full px-6">
                  <ShoppingCart className="h-5 w-5 mr-2 text-primary" />
                  <span>السلة</span>
                  {totalItems > 0 && (
                    <span className="ml-2 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </Link>
              
              <Link to="/store/favorites">
                <Button variant="outline" size="lg" className="bg-transparent text-white border-white hover:bg-white/20 rounded-full px-6">
                  <Heart className="h-5 w-5 mr-2" />
                  <span>المفضلة</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Store Info Bar */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              {store.location && (
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{store.location}</span>
                </div>
              )}
            </div>
            
            {/* Social Media */}
            <div className="flex items-center gap-3">
              {store.facebook && (
                <a href={store.facebook} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
              )}
              {store.instagram && (
                <a href={store.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
              )}
              {store.twitter && (
                <a href={store.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreHeader;
