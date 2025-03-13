
import React from 'react';
import { Store } from '@/types/store';
import { Separator } from '@/components/ui/separator';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface StoreHeaderProps {
  store: Store | null;
  error: string | null;
  isLoading: boolean;
}

const StoreHeader = ({ store, error, isLoading }: StoreHeaderProps) => {
  if (isLoading) {
    return (
      <div className="w-full h-40 bg-gray-100 animate-pulse rounded-md"></div>
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
        <div className="w-full h-48 md:h-64 overflow-hidden rounded-md mb-4">
          <img 
            src={store.banner} 
            alt={store.name} 
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="w-full h-24 bg-primary/10 flex items-center justify-center rounded-md mb-4">
          <h1 className="text-2xl font-bold text-center">{store.name}</h1>
        </div>
      )}
      
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
        {store.logo && (
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary">
            <img 
              src={store.logo} 
              alt={`${store.name} logo`}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div>
          <h2 className="text-2xl font-bold">{store.name}</h2>
          {store.description && (
            <p className="text-muted-foreground mt-1">{store.description}</p>
          )}
        </div>
      </div>
      
      <Separator className="my-4" />
      
      {(store.facebook || store.twitter || store.instagram) && (
        <div className="flex gap-4 mb-4">
          {store.facebook && (
            <a href={store.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Facebook
            </a>
          )}
          {store.twitter && (
            <a href={store.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              Twitter
            </a>
          )}
          {store.instagram && (
            <a href={store.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline">
              Instagram
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default StoreHeader;
