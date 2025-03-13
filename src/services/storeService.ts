
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

      // Transform the data to match the Product type with careful type checking
      return data.map(item => {
        // Type-safe handling of category
        let categoryName = '';
        if (item.category && typeof item.category === 'object' && 'name' in item.category) {
          categoryName = item.category.name as string;
        } else {
          categoryName = item.category_id || '';
        }

        // Ensure images are properly typed as string[]
        let processedImages: string[] = [];
        if (item.images) {
          if (Array.isArray(item.images)) {
            processedImages = item.images.filter(img => typeof img === 'string') as string[];
          }
        }

        // Safely process attributes
        let processedAttributes: Record<string, string> = {};
        if (item.attributes && typeof item.attributes === 'object' && !Array.isArray(item.attributes)) {
          Object.entries(item.attributes).forEach(([key, value]) => {
            if (typeof value === 'string') {
              processedAttributes[key] = value;
            } else if (value !== null && value !== undefined) {
              processedAttributes[key] = String(value);
            }
          });
        }

        return {
          id: item.id || '',
          name: item.name || '',
          price: Number(item.price) || 0,
          image: item.image || '',
          featured: Boolean(item.featured) || false,
          category: categoryName,
          description: item.description || '',
          sku: item.sku || '',
          stock: item.stock !== undefined ? Number(item.stock) : undefined,
          rating: item.rating !== undefined ? Number(item.rating) : undefined,
          images: processedImages,
          attributes: processedAttributes,
          store_id: storeId // Use the storeId parameter directly instead of trying to access it from item
        };
      });
    } catch (error) {
      console.error('Error in getStoreProducts:', error);
      return [];
    }
  }
};
