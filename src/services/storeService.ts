
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

      // Simplified approach to avoid excessive type instantiation
      return data.map(item => {
        // Create a base product with required fields
        const product: Product = {
          id: item.id || '',
          name: item.name || '',
          price: Number(item.price) || 0,
          image: item.image || '',
          featured: Boolean(item.featured) || false,
        };
        
        // Add optional fields if they exist
        if (item.description) product.description = item.description;
        if (item.sku) product.sku = item.sku;
        if (item.stock !== undefined) product.stock = Number(item.stock);
        if (item.rating !== undefined) product.rating = Number(item.rating);
        
        // Handle category with simple type checking
        if (item.category) {
          if (typeof item.category === 'object' && 'name' in item.category) {
            product.category = { name: item.category.name || '' };
          } else {
            product.category = item.category_id || '';
          }
        } else {
          product.category = '';
        }
        
        // Handle images array if it exists
        if (Array.isArray(item.images)) {
          product.images = item.images.filter(img => typeof img === 'string');
        }
        
        // Handle attributes object if it exists
        if (item.attributes && typeof item.attributes === 'object' && !Array.isArray(item.attributes)) {
          product.attributes = {};
          for (const [key, value] of Object.entries(item.attributes)) {
            if (product.attributes) {
              product.attributes[key] = String(value);
            }
          }
        }
        
        return product;
      });
    } catch (error) {
      console.error('Error in getStoreProducts:', error);
      return [];
    }
  }
};
