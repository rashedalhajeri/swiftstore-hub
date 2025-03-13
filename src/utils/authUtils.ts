
import { supabase } from '@/integrations/supabase/client';

export const signInWithPassword = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

export const signUpWithPassword = async (email: string, password: string, metadata?: any) => {
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
    },
  });
};

export const signOutUser = async () => {
  // حذف localStorage و sessionStorage للتأكد من إزالة أي بيانات تخزين محلية
  localStorage.clear();
  sessionStorage.clear();
  
  // استدعاء واجهة تسجيل الخروج من supabase
  return await supabase.auth.signOut({
    scope: 'global'  // تسجيل خروج من جميع الأجهزة
  });
};
