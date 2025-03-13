
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
        .eq('store_id', storeId)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching store products:', error);
        return [];
      }
      
      if (!data || !Array.isArray(data)) return [];
      
      // Convert the data to Product[] type with explicit casting to avoid deep type instantiation
      return data.map(item => {
        // Handle category with safe type assertion
        let categoryName = '';
        if (item.category && typeof item.category === 'object' && 'name' in item.category) {
          categoryName = String(item.category.name || '');
        } else if (typeof item.category === 'string') {
          categoryName = item.category;
        }
        
        // Safe conversion for images
        const images = Array.isArray(item.images) 
          ? item.images.filter(Boolean).map(String) 
          : [];
          
        // Safe conversion for attributes
        const attributes: Record<string, string> = {};
        if (item.attributes && typeof item.attributes === 'object' && item.attributes !== null) {
          Object.entries(item.attributes).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
              attributes[key] = String(value);
            }
          });
        }
        
        // Create a new product with explicit type conversion
        return {
          id: String(item.id || ''),
          name: String(item.name || ''),
          price: typeof item.price === 'number' ? item.price : Number(item.price) || 0,
          image: String(item.image || ''),
          featured: Boolean(item.featured || false),
          category: categoryName,
          description: item.description ? String(item.description) : '',
          sku: item.sku ? String(item.sku) : '',
          stock: item.stock !== undefined ? Number(item.stock) : undefined,
          rating: item.rating !== undefined ? Number(item.rating) : undefined,
          images,
          attributes,
          store_id: String(storeId)
        } as Product; // Use type assertion to avoid deep type instantiation
      });
    } catch (error) {
      console.error('Error in getStoreProducts:', error);
      return [];
    }
  }
};
