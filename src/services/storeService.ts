
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
      
      toast.success('تم تحديث المتجر بنجاح');
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
        .eq('store_id', storeId)  // Filter products by store_id
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching store products:', error);
        return [];
      }
      
      if (!data) return [];

      // Fixed processing with proper type handling
      return data.map(item => {
        let categoryData: string | { name: string } = { name: '' };
        if (item.category && typeof item.category === 'object' && 'name' in item.category) {
          categoryData = item.category;
        } else if (typeof item.category === 'string') {
          categoryData = item.category;
        }

        // Handle images properly
        let processedImages: string[] = [];
        if (Array.isArray(item.images)) {
          processedImages = item.images.filter((img): img is string => typeof img === 'string');
        }

        // Handle attributes properly
        let processedAttributes: Record<string, string> = {};
        if (item.attributes && typeof item.attributes === 'object' && !Array.isArray(item.attributes)) {
          processedAttributes = Object.keys(item.attributes).reduce((acc, key) => {
            const value = item.attributes[key];
            acc[key] = typeof value === 'string' ? value : String(value);
            return acc;
          }, {} as Record<string, string>);
        }

        return {
          id: item.id || '',
          name: item.name || '',
          price: Number(item.price) || 0,
          image: item.image || '',
          category: categoryData,
          featured: Boolean(item.featured) || false,
          description: item.description || '',
          images: processedImages,
          sku: item.sku || '',
          stock: Number(item.stock) || 0,
          attributes: processedAttributes,
          rating: Number(item.rating) || 0,
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
