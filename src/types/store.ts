
export interface Product {
  id: number;
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
}

export interface Review {
  id: number;
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
