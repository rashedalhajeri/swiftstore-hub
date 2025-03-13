
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

type UseUserProfileResult = {
  isAdmin: boolean;
  fetchUserProfile: (userId: string) => Promise<boolean>;
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
      
      // Use RLS bypass for this operation 
      const { error: insertError } = await supabase.rpc('create_user_profile', {
        user_id: userId,
        is_admin_val: false,
        first_name_val: userMetadata?.first_name || null,
        last_name_val: userMetadata?.last_name || null,
        email_val: userData?.user?.email || null
      });
      
      if (insertError) {
        console.error('Error creating profile:', insertError);
      } else {
        console.log('Profile created successfully with metadata');
      }
      
      setIsAdmin(false);
      return false;
    } catch (err) {
      console.error('Error checking admin status:', err);
      setIsAdmin(false);
      return false;
    }
  };

  return {
    isAdmin,
    fetchUserProfile
  };
};
