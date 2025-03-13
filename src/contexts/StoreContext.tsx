
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Store } from '@/types/store';
import { storeService } from '@/services/storeService';
import { useAuthSession } from '@/hooks/useAuthSession';

interface StoreContextType {
  store: Store | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const StoreContext = createContext<StoreContextType>({
  store: null,
  isLoading: false,
  error: null,
  refetch: async () => {}
});

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [store, setStore] = useState<Store | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { session } = useAuthSession();
  
  // Get store slug from URL path or query parameter without using useLocation or useParams
  const getStoreSlug = () => {
    // Check if window is available (client-side)
    if (typeof window !== 'undefined') {
      // First check for direct path parameter (/:storeSlug)
      const pathSegments = window.location.pathname.split('/');
      if (pathSegments.length > 1 && pathSegments[1] && !['store', 'login', 'register', 'dashboard', 'reset-password', 'update-password'].includes(pathSegments[1])) {
        return pathSegments[1];
      }
      
      // Next check for query parameter (legacy support)
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('store');
    }
    
    return null;
  };
  
  const fetchStore = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const storeSlug = getStoreSlug();
      
      // If we have a store slug, fetch store by slug
      if (storeSlug) {
        console.log('Fetching store by slug:', storeSlug);
        const storeData = await storeService.getStoreBySlug(storeSlug);
        if (storeData) {
          setStore(storeData);
        } else {
          setError('لم يتم العثور على المتجر');
        }
      } 
      // If we're logged in but don't have a store slug, fetch the user's store
      else if (session?.user?.id) {
        console.log('Fetching store for user:', session.user.id);
        const storeData = await storeService.getStoreByUserId(session.user.id);
        if (storeData) {
          setStore(storeData);
        }
      }
    } catch (err) {
      console.error('Error fetching store:', err);
      setError('حدث خطأ أثناء تحميل المتجر');
    } finally {
      setIsLoading(false);
    }
  };

  // Add a function to check if the URL has changed
  const handleURLChange = () => {
    fetchStore();
  };

  // Fetch store when component mounts or when user session changes
  useEffect(() => {
    fetchStore();
    
    // Listen for URL changes
    window.addEventListener('popstate', handleURLChange);
    
    return () => {
      window.removeEventListener('popstate', handleURLChange);
    };
  }, [session?.user?.id]);

  return (
    <StoreContext.Provider value={{ store, isLoading, error, refetch: fetchStore }}>
      {children}
    </StoreContext.Provider>
  );
};
