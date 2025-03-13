
import React from 'react';
import { Store } from '@/types/store';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, Facebook, Instagram, Twitter } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface StoreHeaderProps {
  store: Store | null;
  error: string | null;
  isLoading: boolean;
}

const StoreHeader = ({ store, error, isLoading }: StoreHeaderProps) => {
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
      {store.banner ? (
        <div className="w-full h-48 md:h-72 overflow-hidden rounded-lg mb-6 shadow-md relative group">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
          <img 
            src={store.banner} 
            alt={store.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute bottom-0 left-0 right-0 z-20 p-6 text-white">
            <h1 className="text-3xl md:text-4xl font-bold text-white/90 mb-2">{store.name}</h1>
            {store.description && (
              <p className="text-white/80 md:max-w-2xl line-clamp-2">{store.description}</p>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-32 md:h-40 bg-gradient-to-r from-primary/20 to-primary/10 flex items-center justify-center rounded-lg mb-6 relative overflow-hidden shadow-sm">
          <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10 bg-repeat"></div>
          <h1 className="text-3xl font-bold text-center relative z-10">{store.name}</h1>
        </div>
      )}
      
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
        {store.logo && (
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-primary shadow-md transform -translate-y-4 md:-translate-y-8 bg-white">
            <img 
              src={store.logo} 
              alt={`${store.name} logo`}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="md:mr-2">
          {!store.banner && (
            <>
              <h2 className="text-2xl font-bold">{store.name}</h2>
              {store.description && (
                <p className="text-muted-foreground mt-1">{store.description}</p>
              )}
            </>
          )}
        </div>
        
        <div className="md:ml-auto flex gap-2">
          {(store.facebook || store.twitter || store.instagram) && (
            <div className="flex gap-2">
              {store.facebook && (
                <Button variant="outline" size="icon" asChild className="rounded-full border-primary/20 hover:border-primary hover:bg-primary/10">
                  <a href={store.facebook} target="_blank" rel="noopener noreferrer" aria-label="فيسبوك">
                    <Facebook size={18} className="text-primary" />
                  </a>
                </Button>
              )}
              {store.twitter && (
                <Button variant="outline" size="icon" asChild className="rounded-full border-primary/20 hover:border-primary hover:bg-primary/10">
                  <a href={store.twitter} target="_blank" rel="noopener noreferrer" aria-label="تويتر">
                    <Twitter size={18} className="text-primary" />
                  </a>
                </Button>
              )}
              {store.instagram && (
                <Button variant="outline" size="icon" asChild className="rounded-full border-primary/20 hover:border-primary hover:bg-primary/10">
                  <a href={store.instagram} target="_blank" rel="noopener noreferrer" aria-label="انستجرام">
                    <Instagram size={18} className="text-primary" />
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
      
      <Separator className="my-6" />
    </div>
  );
};

export default StoreHeader;
