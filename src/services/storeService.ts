
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types/store';
import { toast } from 'sonner';

interface StoreInfo {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  banner: string | null;
  description: string | null;
  primary_color: string | null;
  instagram: string | null;
  facebook: string | null;
  twitter: string | null;
  is_published: boolean;
  user_id: string;
}

export const storeService = {
  /**
   * Fetch store information by slug
   */
  async getStoreBySlug(slug: string): Promise<StoreInfo | null> {
    try {
      // Important: Don't use caching, always fetch fresh data
      const { data, error } = await supabase
        .from('stores')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .maybeSingle();
        
      if (error) {
        console.error('Error fetching store by slug:', error);
        return null;
      }
      
      return data;
    } catch (err) {
      console.error('Unexpected error fetching store:', err);
      return null;
    }
  },
  
  /**
   * Get all products for a store by store ID
   */
  async getStoreProducts(storeId: string): Promise<Product[]> {
    try {
      // Define the type of the raw data from Supabase
      interface RawProductData {
        id: string;
        name: string;
        price: number;
        image: string;
        category: { name: string } | null;
        featured: boolean | null;
        description: string | null;
        images: any[] | null;
        sku: string | null;
        stock: number | null;
        attributes: Record<string, any> | null;
        rating: number | null;
        category_id: string | null;
        store_id: string | null;
        created_at: string | null;
        updated_at: string | null;
      }
      
      const { data, error } = await supabase
        .from('products')
        .select('*, category:categories(name)')
        .eq('store_id', storeId);
      
      if (error) {
        console.error('Error fetching store products:', error);
        return [];
      }
      
      // Map the raw data to Product type explicitly, avoiding complex type inference 
      return (data || []).map((item: RawProductData) => {
        // Start with a well-defined Product object with explicit types
        const product: Product = {
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          category: typeof item.category === 'object' ? item.category?.name || '' : '',
          featured: Boolean(item.featured),
          description: item.description || '',
          images: Array.isArray(item.images) ? item.images : [],
          sku: item.sku || '',
          stock: typeof item.stock === 'number' ? item.stock : 0,
          attributes: item.attributes ? item.attributes : {},
          rating: typeof item.rating === 'number' ? item.rating : 0,
          category_id: item.category_id || '',
          created_at: item.created_at || '',
          updated_at: item.updated_at || ''
        };
        
        // Add store_id only if it exists in the source data
        if (item.store_id) {
          product.store_id = item.store_id;
        }
        
        return product;
      });
    } catch (err) {
      console.error('Unexpected error fetching store products:', err);
      return [];
    }
  },
  
  /**
   * Load store theme
   */
  applyStoreTheme(primaryColor: string | null) {
    if (primaryColor) {
      document.documentElement.style.setProperty('--primary', primaryColor);
      
      // Generate darker variant for hover states
      const darkerColor = this.adjustColorBrightness(primaryColor, -20);
      document.documentElement.style.setProperty('--primary-hover', darkerColor);
    } else {
      // Reset to default theme
      document.documentElement.style.removeProperty('--primary');
      document.documentElement.style.removeProperty('--primary-hover');
    }
  },
  
  /**
   * Utility to adjust color brightness
   */
  adjustColorBrightness(hexColor: string, percent: number): string {
    // Convert hex to RGB
    let r = parseInt(hexColor.substring(1, 3), 16);
    let g = parseInt(hexColor.substring(3, 5), 16);
    let b = parseInt(hexColor.substring(5, 7), 16);

    // Adjust brightness
    r = Math.max(0, Math.min(255, r + (r * percent / 100)));
    g = Math.max(0, Math.min(255, g + (g * percent / 100)));
    b = Math.max(0, Math.min(255, b + (b * percent / 100)));

    // Convert back to hex
    return `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`;
  }
};
