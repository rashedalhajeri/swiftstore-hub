
import { supabase } from '@/integrations/supabase/client';
import { Product, Store } from '@/types/store';
import { toast } from 'sonner';

export const storeService = {
  // Get store by user ID
  async getStoreByUserId(userId: string): Promise<Store | null> {
    try {
      const { data, error } = await supabase
        .from('stores')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching store by user ID:', error);
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error('Error in getStoreByUserId:', error);
      return null;
    }
  },

  // Get store by slug
  async getStoreBySlug(slug: string): Promise<Store | null> {
    try {
      const { data, error } = await supabase
        .from('stores')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching store by slug:', error);
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error('Error in getStoreBySlug:', error);
      return null;
    }
  },

  // Create a new store
  async createStore(store: Omit<Store, 'id' | 'created_at' | 'updated_at'>): Promise<Store | null> {
    try {
      const { data, error } = await supabase
        .from('stores')
        .insert(store)
        .select()
        .single();
      
      if (error) {
        console.error('Error creating store:', error);
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error('Error in createStore:', error);
      toast.error('حدث خطأ أثناء إنشاء المتجر');
      return null;
    }
  },

  // Update store
  async updateStore(id: string, store: Partial<Omit<Store, 'id' | 'created_at' | 'updated_at'>>): Promise<Store | null> {
    try {
      const { data, error } = await supabase
        .from('stores')
        .update(store)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating store:', error);
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error('Error in updateStore:', error);
      toast.error('حدث خطأ أثناء تحديث المتجر');
      return null;
    }
  },

  // Get products for a store
  async getStoreProducts(storeId: string): Promise<Product[]> {
    try {
      // First check if the store exists
      const { data: storeData, error: storeError } = await supabase
        .from('stores')
        .select('*')
        .eq('id', storeId)
        .maybeSingle();
      
      if (storeError || !storeData) {
        console.error('Error fetching store:', storeError);
        return [];
      }
      
      // Then get products related to that store
      const { data, error } = await supabase
        .from('products')
        .select('*, category:categories(name)')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching store products:', error);
        return [];
      }
      
      if (!data) return [];

      // Process each product to ensure proper type conversion
      return data.map(item => {
        // Handle images - ensure it's always an array of strings
        let processedImages: string[] = [];
        if (item.images) {
          if (Array.isArray(item.images)) {
            processedImages = item.images.filter(img => typeof img === 'string') as string[];
          } else if (typeof item.images === 'string') {
            processedImages = [item.images];
          }
        }

        // Handle attributes - ensure it's always a Record<string, string>
        let processedAttributes: Record<string, string> = {};
        if (item.attributes) {
          if (typeof item.attributes === 'object' && !Array.isArray(item.attributes)) {
            // Extract keys and values, ensuring all values are strings
            Object.entries(item.attributes).forEach(([key, value]) => {
              processedAttributes[key] = String(value);
            });
          }
        }

        return {
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          category: item.category || { name: '' },
          featured: item.featured || false,
          description: item.description || '',
          images: processedImages,
          sku: item.sku || '',
          stock: item.stock || 0,
          attributes: processedAttributes,
          rating: item.rating || 0,
          category_id: item.category_id || '',
          created_at: item.created_at || '',
          updated_at: item.updated_at || ''
        };
      });
    } catch (error) {
      console.error('Error in getStoreProducts:', error);
      return [];
    }
  }
};
