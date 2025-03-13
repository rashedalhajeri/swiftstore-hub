
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Store } from '@/types/store';
import { storeService } from '@/services/storeService';
import { toast } from 'sonner';
import { useAuth } from './AuthContext';

interface StoreContextType {
  store: Store | null;
  isLoading: boolean;
  error: string | null;
  fetchStoreBySlug: (slug: string) => Promise<Store | null>;
  fetchUserStore: () => Promise<Store | null>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [store, setStore] = useState<Store | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  const fetchStoreBySlug = async (slug: string): Promise<Store | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Fetching store by slug:', slug);
      const storeData = await storeService.getStoreBySlug(slug);
      
      if (!storeData) {
        setError('المتجر غير موجود');
        setStore(null);
        return null;
      }
      
      if (!storeData.is_published) {
        setError('المتجر غير منشور');
        setStore(null);
        return null;
      }
      
      console.log('Store found:', storeData);
      setStore(storeData);
      return storeData;
    } catch (err) {
      console.error('Error fetching store:', err);
      setError('حدث خطأ أثناء تحميل المتجر');
      setStore(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserStore = async (): Promise<Store | null> => {
    if (!user) return null;
    
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Fetching user store for ID:', user.id);
      const storeData = await storeService.getStoreByUserId(user.id);
      
      if (!storeData) {
        console.log('No store found for user');
        setStore(null);
        return null;
      }
      
      console.log('User store found:', storeData);
      setStore(storeData);
      return storeData;
    } catch (err) {
      console.error('Error fetching user store:', err);
      setStore(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Check for store slug in URL on location change
  useEffect(() => {
    const storeSlug = searchParams.get('store');
    
    if (storeSlug && location.pathname.includes('/store')) {
      console.log('Found store slug in URL:', storeSlug);
      fetchStoreBySlug(storeSlug);
    }
  }, [location.pathname, searchParams]);

  return (
    <StoreContext.Provider value={{ 
      store, 
      isLoading, 
      error, 
      fetchStoreBySlug,
      fetchUserStore
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
