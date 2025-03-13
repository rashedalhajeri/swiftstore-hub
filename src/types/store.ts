
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  featured: boolean;
  description?: string;
  images?: string[];
  sku?: string;
  stock?: number;
  attributes?: Record<string, string>;
  rating?: number;
  reviews?: Review[];
  // Add fields to help with API responses
  category_id?: string;
  created_at?: string;
  updated_at?: string;
  store_id?: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shipping: ShippingInfo;
  payment: PaymentInfo;
  createdAt: string;
}

export interface ShippingInfo {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  email: string;
  phone: string;
}

export interface PaymentInfo {
  method: 'credit_card' | 'debit_card' | 'paypal' | 'cod';
  cardNumber?: string;
  cardHolder?: string;
  expiryMonth?: string;
  expiryYear?: string;
  cvv?: string;
  transactionId?: string;
}

// Add a Store interface to match our database
export interface Store {
  id: string;
  name: string;
  description?: string;
  logo?: string;
  banner?: string;
  primary_color?: string;
  is_published: boolean;
  user_id: string;
  slug?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  created_at?: string;
  updated_at?: string;
}
