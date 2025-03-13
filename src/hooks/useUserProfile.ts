
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
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', userId)
        .maybeSingle();
      
      if (profileError) {
        console.error('Error fetching profile:', profileError);
        setIsAdmin(false);
        return false;
      } 
      
      if (profileData) {
        setIsAdmin(!!profileData.is_admin);
        return true;
      } 
      
      const { error: insertError } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          is_admin: false
        });
      
      if (insertError) {
        console.error('Error creating profile:', insertError);
      } else {
        console.log('Profile created successfully');
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
