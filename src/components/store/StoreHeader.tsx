
import React from 'react';
import { Store } from '@/types/store';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, Facebook, Instagram, Twitter, ShoppingCart, Heart } from 'lucide-react';
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
      <div className="w-full h-56 md:h-80 relative mb-0 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-primary/30 z-10"></div>
        {store.banner ? (
          <img 
            src={store.banner} 
            alt="" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10 bg-repeat"></div>
        )}
        
        {/* Overlay for content */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent h-1/2 z-20"></div>
      </div>
      
      {/* Store Header Info */}
      <div className="container mx-auto px-4 relative z-30 -mt-16">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-4 mb-6">
          {/* Store Logo */}
          {store.logo && (
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-background shadow-lg bg-white">
              <img 
                src={store.logo} 
                alt={`${store.name} logo`}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          {/* Store Info */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold">{store.name}</h1>
            {store.description && (
              <p className="text-muted-foreground mt-2 md:max-w-2xl line-clamp-2">{store.description}</p>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-3 md:self-end">
            {/* Cart Button */}
            <Link to="/store/cart">
              <Button variant="outline" size="icon" className="rounded-full relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            
            {/* Favorites Button */}
            <Link to="/store/favorites">
              <Button variant="outline" size="icon" className="rounded-full">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>
            
            {/* Social Media Links */}
            <div className="hidden md:flex gap-2">
              {store.facebook && (
                <Button variant="outline" size="icon" asChild className="rounded-full">
                  <a href={store.facebook} target="_blank" rel="noopener noreferrer" aria-label="فيسبوك">
                    <Facebook size={18} />
                  </a>
                </Button>
              )}
              {store.twitter && (
                <Button variant="outline" size="icon" asChild className="rounded-full">
                  <a href={store.twitter} target="_blank" rel="noopener noreferrer" aria-label="تويتر">
                    <Twitter size={18} />
                  </a>
                </Button>
              )}
              {store.instagram && (
                <Button variant="outline" size="icon" asChild className="rounded-full">
                  <a href={store.instagram} target="_blank" rel="noopener noreferrer" aria-label="انستجرام">
                    <Instagram size={18} />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Separator className="my-6" />
    </div>
  );
};

export default StoreHeader;
