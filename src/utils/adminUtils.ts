
import { supabase } from '@/integrations/supabase/client';
import { useUserProfile } from '@/hooks/useUserProfile';

export const findUserByEmail = async (email: string) => {
  try {
    // Find user by email
    const { data: userData, error: userError } = await supabase.auth.admin.listUsers();
    
    if (userError) {
      console.error('Error fetching users:', userError);
      return { error: 'Failed to fetch users' };
    }
    
    // Find the user with matching email
    const user = userData?.users?.find(u => u.email === email);
    
    if (!user) {
      return { error: 'User not found' };
    }
    
    // Get user's store information
    const { getUserStore } = useUserProfile();
    const storeData = await getUserStore(user.id);
    
    return {
      user,
      store: storeData,
      hasStore: !!storeData,
      subdomain: storeData?.slug || null
    };
  } catch (err) {
    console.error('Error finding user:', err);
    return { error: 'An unexpected error occurred' };
  }
};
