
import { supabase } from '@/integrations/supabase/client';

export const findUserByEmail = async (email: string) => {
  try {
    // Find user by email using a different approach
    // The previous code was trying to use auth.admin which requires admin privileges
    const { data, error } = await supabase
      .from('profiles')
      .select('id, email, first_name, last_name')
      .eq('email', email)
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching user profile:', error);
      return { error: 'Failed to fetch user profile' };
    }
    
    if (!data) {
      return { error: 'User not found' };
    }
    
    // Get user's store information directly without using the hook
    const { data: storeData, error: storeError } = await supabase
      .from('stores')
      .select('*')
      .eq('user_id', data.id)
      .maybeSingle();
    
    if (storeError) {
      console.error('Error fetching store data:', storeError);
      return { 
        user: data,
        hasStore: false,
        error: 'Failed to fetch store data'
      };
    }
    
    return {
      user: data,
      store: storeData,
      hasStore: !!storeData,
      subdomain: storeData?.slug || null
    };
  } catch (err) {
    console.error('Error finding user:', err);
    return { error: 'An unexpected error occurred' };
  }
};
