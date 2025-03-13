
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

type UseUserProfileResult = {
  isAdmin: boolean;
  fetchUserProfile: (userId: string) => Promise<boolean>;
  getUserStore: (userId: string) => Promise<any>;
};

export const useUserProfile = (): UseUserProfileResult => {
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      
      // First check if profile exists
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('is_admin, first_name, last_name')
        .eq('id', userId)
        .maybeSingle();
      
      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error fetching profile:', profileError);
        setIsAdmin(false);
        return false;
      } 
      
      if (profileData) {
        setIsAdmin(!!profileData.is_admin);
        return true;
      } 
      
      // If no profile exists, create one using user metadata if available
      const userMetadata = userData?.user?.user_metadata;
      
      try {
        // Call the RPC function with the correct parameter names
        const { error: insertError } = await supabase.rpc('create_user_profile', {
          user_id_val: userId,
          is_admin_val: false,
          first_name_val: userMetadata?.first_name || null,
          last_name_val: userMetadata?.last_name || null,
          email_val: userData?.user?.email || null
        });
        
        if (insertError) {
          console.error('Error creating profile (RPC):', insertError);
          
          // Fallback: Try direct insert if RPC fails
          const { error: directInsertError } = await supabase
            .from('profiles')
            .insert({
              id: userId,
              is_admin: false,
              first_name: userMetadata?.first_name || null,
              last_name: userMetadata?.last_name || null,
              email: userData?.user?.email || null
            })
            .single();
            
          if (directInsertError) {
            console.error('Error creating profile (direct insert):', directInsertError);
            toast.error('حدث خطأ أثناء إنشاء الملف الشخصي');
            return false;
          }
          
          console.log('Profile created successfully via direct insert');
        } else {
          console.log('Profile created successfully via RPC');
        }
        
        setIsAdmin(false);
        return true;
      } catch (createError) {
        console.error('Error in profile creation process:', createError);
        toast.error('حدث خطأ أثناء إنشاء الملف الشخصي');
        return false;
      }
    } catch (err) {
      console.error('Error checking admin status:', err);
      setIsAdmin(false);
      return false;
    }
  };

  // Function to check if a user has a store and get store information
  const getUserStore = async (userId: string) => {
    try {
      const { data: storeData, error: storeError } = await supabase
        .from('stores')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();
      
      if (storeError) {
        console.error('Error fetching store data:', storeError);
        return null;
      }
      
      return storeData; // Will be null if no store found
    } catch (err) {
      console.error('Error checking store:', err);
      return null;
    }
  };

  return {
    isAdmin,
    fetchUserProfile,
    getUserStore
  };
};
