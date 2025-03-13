
import { supabase } from '@/integrations/supabase/client';
import { Product, Store } from '@/types/store';
import { toast } from 'sonner';

// Create an interface for raw product data from database to avoid deep type instantiation
interface RawProductData {
  id: string;
  name: string;
  price: number | string;
  image: string;
  featured?: boolean;
  category?: { name: string } | string;
  description?: string;
  sku?: string;
  stock?: number;
  rating?: number;
  images?: any[];
  attributes?: Record<string, any>;
  store_id?: string;
  created_at?: string;
  updated_at?: string;
  category_id?: string;
}

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
      
      // Then get products related to that store using the new store_id column
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
      
      // Use explicit typing to avoid deep type instantiation
      const rawProducts = data as unknown as RawProductData[];
      const products: Product[] = [];
      
      for (const item of rawProducts) {
        let categoryValue: string | { name: string } = '';
        
        // Handle category safely
        if (item.category && typeof item.category === 'object' && 'name' in item.category) {
          categoryValue = { name: String(item.category.name || '') };
        } else if (typeof item.category === 'string') {
          categoryValue = item.category;
        }
        
        // Create a product object with explicit type casting
        const product: Product = {
          id: String(item.id || ''),
          name: String(item.name || ''),
          price: typeof item.price === 'number' ? item.price : Number(item.price) || 0,
          image: String(item.image || ''),
          featured: Boolean(item.featured || false),
          category: categoryValue,
          store_id: String(storeId)
        };
        
        // Add optional fields only if they exist
        if (item.description) product.description = String(item.description);
        if (item.sku) product.sku = String(item.sku);
        if (item.stock !== undefined) product.stock = Number(item.stock);
        if (item.rating !== undefined) product.rating = Number(item.rating);
        
        // Handle images array
        if (Array.isArray(item.images)) {
          product.images = item.images.filter(Boolean).map(String);
        }
        
        // Handle attributes object
        if (typeof item.attributes === 'object' && item.attributes) {
          product.attributes = {};
          for (const [key, value] of Object.entries(item.attributes)) {
            if (value !== null && value !== undefined) {
              product.attributes[key] = String(value);
            }
          }
        }
        
        products.push(product);
      }
      
      return products;
    } catch (error) {
      console.error('Error in getStoreProducts:', error);
      return [];
    }
  }
};
