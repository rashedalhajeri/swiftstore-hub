
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
      
      // We need to check if we're in the store route or if the first segment is not a reserved route
      const reservedRoutes = ['store', 'login', 'register', 'reset-password', 'update-password'];
      const isDashboard = pathSegments[1] === 'dashboard';
      
      // Don't try to get store by slug if we're in the dashboard
      if (!isDashboard && pathSegments[1] && !reservedRoutes.includes(pathSegments[1])) {
        return pathSegments[1];
      }
      
      // If we're in the store route, check for the second segment
      if (pathSegments[1] === 'store' && pathSegments[2]) {
        return pathSegments[2];
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
      const isDashboard = window.location.pathname.startsWith('/dashboard');
      
      // If we're logged in and we're in dashboard, prioritize fetching by user ID
      if (session?.user?.id && isDashboard) {
        console.log('Fetching store for user:', session.user.id);
        const storeData = await storeService.getStoreByUserId(session.user.id);
        if (storeData) {
          setStore(storeData);
          setError(null);
          setIsLoading(false);
          return;
        } else if (!storeSlug) {
          // Only set error if we're in dashboard and couldn't find a store by user ID
          // and there's no slug to try
          setError('لم يتم العثور على المتجر');
          setStore(null);
          setIsLoading(false);
          return;
        }
      }
      
      // If we have a store slug, fetch store by slug
      if (storeSlug) {
        console.log('Fetching store by slug:', storeSlug);
        const storeData = await storeService.getStoreBySlug(storeSlug);
        
        if (storeData) {
          setStore(storeData);
          setError(null);
        } else {
          console.error('Store not found with slug:', storeSlug);
          setError('لم يتم العثور على المتجر');
          setStore(null);
        }
      } 
      // If we're logged in but don't have a store slug and we're not in dashboard,
      // try to fetch the user's store as a fallback
      else if (session?.user?.id && !isDashboard) {
        console.log('Fetching store for user (fallback):', session.user.id);
        const storeData = await storeService.getStoreByUserId(session.user.id);
        
        if (storeData) {
          setStore(storeData);
          setError(null);
        } else {
          // Only set error if we're explicitly in a store route
          if (window.location.pathname === '/store' || window.location.pathname === '/') {
            setError('لم يتم العثور على المتجر');
          }
          setStore(null);
        }
      } else if (window.location.pathname === '/store') {
        // We're explicitly in store route but no slug and no session
        setError('لم يتم العثور على المتجر');
        setStore(null);
      }
    } catch (err) {
      console.error('Error fetching store:', err);
      setError('حدث خطأ أثناء تحميل المتجر');
      setStore(null);
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
