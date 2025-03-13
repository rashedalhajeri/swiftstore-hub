
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User, AuthChangeEvent } from '@supabase/supabase-js';

type UseAuthSessionResult = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  fetchSession: () => Promise<void>;
};

export const useAuthSession = (): UseAuthSessionResult => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let loadingTimeout: number;
    
    if (loading) {
      loadingTimeout = window.setTimeout(() => {
        console.log("Auth loading timeout reached - forcing loading state to false");
        setLoading(false);
      }, 3000);
    }
    
    return () => {
      if (loadingTimeout) window.clearTimeout(loadingTimeout);
    };
  }, [loading]);

  const fetchSession = async () => {
    setLoading(true);
    try {
      console.log('Fetching session...');
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error getting session:', error);
        setSession(null);
        setUser(null);
        setLoading(false);
        return;
      }

      if (!data.session) {
        console.log('No active session found');
        setSession(null);
        setUser(null);
        setLoading(false);
        return;
      }

      console.log('Active session found:', data.session.user.id);
      setSession(data.session);
      setUser(data.session.user);
      setLoading(false);
    } catch (error) {
      console.error('Unexpected error during session fetch:', error);
      setSession(null);
      setUser(null);
      setLoading(false);
    }
  };

  // Set up auth listener
  useEffect(() => {
    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event: AuthChangeEvent, newSession) => {
      console.log('Auth state changed:', event, newSession ? 'with session' : 'no session');
      
      if (event === 'SIGNED_OUT') {
        console.log('User signed out, clearing state');
        setSession(null);
        setUser(null);
        setLoading(false);
        return;
      }
      
      if (newSession) {
        console.log('Session updated:', newSession.user.id);
        setSession(newSession);
        setUser(newSession.user);
        setLoading(false);
      } else {
        // التعامل مع جميع الأحداث الأخرى التي بدون جلسة
        console.log('No session in auth change event');
        setSession(null);
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      console.log('Cleaning up auth listener');
      authListener.subscription.unsubscribe();
    };
  }, []);

  return {
    session,
    user,
    loading,
    fetchSession,
  };
};
