
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
      
      // Special case for index route with a single segment after the domain
      if (pathSegments.length === 2 && pathSegments[1] !== '') {
        // If we're on a route like example.com/my-store (not a reserved route)
        const reservedRoutes = ['store', 'login', 'register', 'reset-password', 'update-password', 'dashboard'];
        if (!reservedRoutes.includes(pathSegments[1])) {
          console.log('Found potential store slug in direct path:', pathSegments[1]);
          return pathSegments[1];
        }
      }
      
      // Regular store route check: /store/:slug
      if (pathSegments[1] === 'store' && pathSegments[2]) {
        console.log('Found store slug in /store/ path:', pathSegments[2]);
        return pathSegments[2];
      }
      
      // Check for query parameter (legacy support)
      const urlParams = new URLSearchParams(window.location.search);
      const storeParam = urlParams.get('store');
      if (storeParam) {
        console.log('Found store slug in query parameter:', storeParam);
        return storeParam;
      }
    }
    
    return null;
  };
  
  const fetchStore = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const storeSlug = getStoreSlug();
      const isDashboard = window.location.pathname.startsWith('/dashboard');
      const isHomePage = window.location.pathname === '/' || window.location.pathname === '';
      
      console.log('Current route info:', {
        path: window.location.pathname,
        isDashboard,
        isHomePage,
        storeSlug
      });
      
      // If we're logged in and we're in dashboard, prioritize fetching by user ID
      if (session?.user?.id && isDashboard) {
        console.log('Fetching store for user in dashboard:', session.user.id);
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
          setIsLoading(false);
          return;
        } else {
          console.error('Store not found with slug:', storeSlug);
          setError('لم يتم العثور على المتجر');
          setStore(null);
          setIsLoading(false);
          return;
        }
      } 
      
      // If we're logged in but don't have a store slug, try to fetch the user's store
      if (session?.user?.id) {
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
      } else if (window.location.pathname === '/store' || isHomePage) {
        // We're explicitly in store route or home page but no slug and no session
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
    console.log('URL changed, refetching store...');
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
