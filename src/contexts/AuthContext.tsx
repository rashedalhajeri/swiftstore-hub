
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any } | undefined>;
  signUp: (email: string, password: string, metadata?: any) => Promise<{ error: any } | undefined>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const getSession = async () => {
      setLoading(true);
      try {
        console.log('Fetching session...');
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          setLoading(false);
          return;
        }

        setSession(data.session);
        setUser(data.session?.user || null);

        if (data.session?.user) {
          console.log('User found, checking admin status...');
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('is_admin')
            .eq('id', data.session.user.id)
            .single();
          
          if (profileError) {
            console.error('Error fetching profile:', profileError);
          } else {
            console.log('Profile data:', profileData);
            setIsAdmin(!!profileData?.is_admin);
          }
        }
      } catch (error) {
        console.error('Unexpected error during session fetch:', error);
      } finally {
        console.log('Session loading complete');
        setLoading(false);
      }
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      console.log('Auth state changed:', event);
      
      // Immediately clear state on sign out
      if (event === 'SIGNED_OUT') {
        console.log('User signed out, clearing state');
        setSession(null);
        setUser(null);
        setIsAdmin(false);
        setLoading(false);
        return;
      }
      
      setSession(newSession);
      setUser(newSession?.user || null);

      if (newSession?.user) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', newSession.user.id)
          .single();
        
        setIsAdmin(!!profileData?.is_admin);
      } else {
        setIsAdmin(false);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "فشل تسجيل الدخول",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحباً بك مرة أخرى!",
      });

      return undefined;
    } catch (error) {
      console.error('Unexpected error during sign in:', error);
      toast({
        title: "حدث خطأ غير متوقع",
        description: "يرجى المحاولة مرة أخرى لاحقاً",
        variant: "destructive",
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, metadata?: any) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });

      if (error) {
        toast({
          title: "فشل إنشاء الحساب",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      toast({
        title: "تم إنشاء الحساب بنجاح",
        description: "تم إنشاء حسابك بنجاح!",
      });

      return undefined;
    } catch (error) {
      console.error('Unexpected error during sign up:', error);
      toast({
        title: "حدث خطأ غير متوقع",
        description: "يرجى المحاولة مرة أخرى لاحقاً",
        variant: "destructive",
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      console.log('Attempting to sign out...');
      
      // Manually clear state BEFORE calling signOut to ensure immediate UI update
      setSession(null);
      setUser(null);
      setIsAdmin(false);
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Error during sign out:', error);
        toast({
          title: "حدث خطأ أثناء تسجيل الخروج",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      console.log('Sign out successful');
      
      toast({
        title: "تم تسجيل الخروج",
        description: "تم تسجيل خروجك بنجاح",
      });
    } catch (error) {
      console.error('Unexpected error during sign out:', error);
      toast({
        title: "حدث خطأ أثناء تسجيل الخروج",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const value = {
    session,
    user,
    isAdmin,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
