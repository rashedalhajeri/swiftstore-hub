
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User, AuthChangeEvent } from '@supabase/supabase-js';
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
          setSession(null);
          setUser(null);
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        if (!data.session) {
          console.log('No active session found');
          setSession(null);
          setUser(null);
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        console.log('Active session found:', data.session.user.id);
        setSession(data.session);
        setUser(data.session.user);

        try {
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('is_admin')
            .eq('id', data.session.user.id)
            .single();
          
          if (profileError) {
            console.error('Error fetching profile:', profileError);
            setIsAdmin(false);
          } else {
            console.log('Profile data:', profileData);
            setIsAdmin(!!profileData?.is_admin);
          }
        } catch (profileErr) {
          console.error('Unexpected error checking admin status:', profileErr);
          setIsAdmin(false);
        } finally {
          setLoading(false);
        }
      } catch (error) {
        console.error('Unexpected error during session fetch:', error);
        setSession(null);
        setUser(null);
        setIsAdmin(false);
        setLoading(false);
      } 
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event: AuthChangeEvent, newSession) => {
      console.log('Auth state changed:', event, newSession ? 'with session' : 'no session');
      
      setLoading(true); // Ensure loading is set to true when auth state changes
      
      if (event === 'SIGNED_OUT' as AuthChangeEvent) {
        console.log('User signed out, clearing state');
        setSession(null);
        setUser(null);
        setIsAdmin(false);
        setLoading(false);
        return;
      }
      
      if (event === 'SIGNED_IN' as AuthChangeEvent && newSession) {
        console.log('User signed in, setting session:', newSession.user.id);
        setSession(newSession);
        setUser(newSession.user);
        
        try {
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('is_admin')
            .eq('id', newSession.user.id)
            .single();
          
          if (profileError) {
            console.error('Error fetching profile on auth change:', profileError);
            setIsAdmin(false);
          } else {
            setIsAdmin(!!profileData?.is_admin);
          }
        } catch (err) {
          console.error('Error checking admin status on auth change:', err);
          setIsAdmin(false);
        } finally {
          setLoading(false); // Ensure loading is set to false after fetching profile
        }
      } else if (newSession) {
        console.log('Session updated:', newSession.user.id);
        setSession(newSession);
        setUser(newSession.user);
        
        try {
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('is_admin')
            .eq('id', newSession.user.id)
            .single();
          
          if (profileError) {
            console.error('Error fetching profile on auth change:', profileError);
            setIsAdmin(false);
          } else {
            setIsAdmin(!!profileData?.is_admin);
          }
        } catch (err) {
          console.error('Error checking admin status on auth change:', err);
          setIsAdmin(false);
        } finally {
          setLoading(false); // Ensure loading is set to false after fetching profile
        }
      } else if (event !== 'SIGNED_OUT' as AuthChangeEvent) {
        console.log('No session in auth change event');
        setSession(null);
        setUser(null);
        setIsAdmin(false);
        setLoading(false);
      }
    });

    return () => {
      console.log('Cleaning up auth listener');
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
        setLoading(false); // Ensure loading is set to false on error
        return { error };
      }

      // نعيّن المستخدم والجلسة مباشرة بعد تسجيل الدخول لضمان التوجيه السريع
      setSession(data.session);
      setUser(data.user);

      // Success is handled by the auth listener, but we'll still show a toast
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحباً بك مرة أخرى!",
      });
      
      // نقوم بتحديث حالة isAdmin بعد تسجيل الدخول مباشرة
      if (data.user) {
        try {
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('is_admin')
            .eq('id', data.user.id)
            .single();
          
          if (!profileError && profileData) {
            setIsAdmin(!!profileData.is_admin);
          }
        } catch (err) {
          console.error('Error checking admin status after sign in:', err);
        }
      }
      
      setLoading(false);
      return undefined;
    } catch (error) {
      console.error('Unexpected error during sign in:', error);
      toast({
        title: "حدث خطأ غير متوقع",
        description: "يرجى المحاولة مرة أخرى لاحقاً",
        variant: "destructive",
      });
      setLoading(false);
      return { error };
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
