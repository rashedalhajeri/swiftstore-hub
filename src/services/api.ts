
import { supabase } from '@/integrations/supabase/client';
import { Product, Order, CartItem } from '@/types/store';

// خدمات المنتجات
export const productService = {
  // الحصول على جميع المنتجات
  async getAllProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*, category:categories(name)');
    
    if (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
    
    return data;
  },

  // الحصول على المنتجات المميزة
  async getFeaturedProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*, category:categories(name)')
      .eq('featured', true);
    
    if (error) {
      console.error('Error fetching featured products:', error);
      throw error;
    }
    
    return data;
  },

  // الحصول على منتج بواسطة الرقم التعريفي
  async getProductById(id: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*, category:categories(name)')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching product with id ${id}:`, error);
      throw error;
    }
    
    return data;
  },

  // إضافة منتج جديد
  async addProduct(product: Omit<Product, 'id'>) {
    const { data, error } = await supabase
      .from('products')
      .insert(product)
      .select()
      .single();
    
    if (error) {
      console.error('Error adding product:', error);
      throw error;
    }
    
    return data;
  },

  // تحديث منتج
  async updateProduct(id: string, product: Partial<Product>) {
    const { data, error } = await supabase
      .from('products')
      .update(product)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Error updating product with id ${id}:`, error);
      throw error;
    }
    
    return data;
  },

  // حذف منتج
  async deleteProduct(id: string) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`Error deleting product with id ${id}:`, error);
      throw error;
    }
    
    return true;
  }
};

// خدمات الفئات
export const categoryService = {
  // الحصول على جميع الفئات
  async getAllCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*');
    
    if (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
    
    return data;
  },

  // إضافة فئة جديدة
  async addCategory(category: { name: string; description?: string; image_url?: string; parent_id?: string }) {
    const { data, error } = await supabase
      .from('categories')
      .insert(category)
      .select()
      .single();
    
    if (error) {
      console.error('Error adding category:', error);
      throw error;
    }
    
    return data;
  },

  // تحديث فئة
  async updateCategory(id: string, category: { name?: string; description?: string; image_url?: string; parent_id?: string }) {
    const { data, error } = await supabase
      .from('categories')
      .update(category)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Error updating category with id ${id}:`, error);
      throw error;
    }
    
    return data;
  },

  // حذف فئة
  async deleteCategory(id: string) {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`Error deleting category with id ${id}:`, error);
      throw error;
    }
    
    return true;
  }
};

// خدمات الطلبات
export const orderService = {
  // إنشاء طلب جديد
  async createOrder(order: {
    shipping_info: any;
    payment_info?: any;
    items: CartItem[];
    total: number;
  }) {
    // 1. إنشاء الطلب الرئيسي
    const { data: newOrder, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: (await supabase.auth.getUser()).data.user?.id,
        total: order.total,
        shipping_info: order.shipping_info,
        payment_info: order.payment_info || {},
      })
      .select()
      .single();
    
    if (orderError) {
      console.error('Error creating order:', orderError);
      throw orderError;
    }
    
    // 2. إضافة عناصر الطلب
    const orderItems = order.items.map(item => ({
      order_id: newOrder.id,
      product_id: item.product.id,
      quantity: item.quantity,
      price: item.product.price,
    }));
    
    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);
    
    if (itemsError) {
      console.error('Error adding order items:', itemsError);
      throw itemsError;
    }
    
    return newOrder;
  },

  // الحصول على طلبات المستخدم
  async getUserOrders() {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items:order_items(
          *,
          product:products(*)
        )
      `)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching user orders:', error);
      throw error;
    }
    
    return data;
  },

  // الحصول على طلب بواسطة الرقم التعريفي
  async getOrderById(id: string) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items:order_items(
          *,
          product:products(*)
        )
      `)
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching order with id ${id}:`, error);
      throw error;
    }
    
    return data;
  },

  // تحديث حالة الطلب
  async updateOrderStatus(id: string, status: string) {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Error updating order status for id ${id}:`, error);
      throw error;
    }
    
    return data;
  }
};

// خدمات الملف الشخصي
export const profileService = {
  // الحصول على الملف الشخصي للمستخدم الحالي
  async getCurrentUserProfile() {
    const userId = (await supabase.auth.getUser()).data.user?.id;
    
    if (!userId) {
      throw new Error('User not authenticated');
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
    
    return data;
  },

  // تحديث الملف الشخصي
  async updateProfile(profile: Partial<{
    first_name: string;
    last_name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
  }>) {
    const userId = (await supabase.auth.getUser()).data.user?.id;
    
    if (!userId) {
      throw new Error('User not authenticated');
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .update(profile)
      .eq('id', userId)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
    
    return data;
  }
};
