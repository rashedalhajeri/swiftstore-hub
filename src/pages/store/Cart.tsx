import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trash2, 
  Minus, 
  Plus, 
  ArrowLeft, 
  ShoppingCart,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import StoreLayout from '@/layouts/StoreLayout';
import { useCart } from '@/contexts/CartContext';
import ProductCard from '@/components/store/ProductCard';
import { products } from '@/data/products';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, subtotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const shippingFee = 2.000;
  const total = subtotal + shippingFee;
  
  const suggestedProducts = products
    .filter(p => !cartItems.some(item => item.product.id === p.id))
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/store/checkout');
    }, 800);
  };

  return (
    <StoreLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold flex items-center">
            <ShoppingCart className="ml-2" size={28} />
            سلة التسوق
          </h1>
          <Button 
            variant="ghost" 
            className="flex items-center w-full sm:w-auto justify-center"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={16} className="ml-1" />
            متابعة التسوق
          </Button>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <div className="hidden md:grid grid-cols-12 gap-4 pb-2 text-sm text-muted-foreground">
                  <div className="col-span-6">المنتج</div>
                  <div className="col-span-2 text-center">السعر</div>
                  <div className="col-span-2 text-center">الكمية</div>
                  <div className="col-span-2 text-center">المجموع</div>
                </div>
                <Separator className="mb-4 hidden md:block" />

                <div className="space-y-4 md:space-y-0 divide-y md:divide-y-0">
                  {cartItems.map((item) => {
                    const categoryName = typeof item.product.category === 'string' 
                      ? item.product.category 
                      : item.product.category?.name || '';
                      
                    return (
                    <div key={item.product.id} className="py-4 md:py-2 md:mb-4 md:border-b md:last:border-b-0">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        <div className="col-span-1 md:col-span-6 flex items-center">
                          <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
                            <img 
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="mr-4 flex-grow overflow-hidden">
                            <Link 
                              to={`/store/product/${item.product.id}`} 
                              className="font-medium hover:text-primary transition-colors line-clamp-2"
                            >
                              {item.product.name}
                            </Link>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-sm text-muted-foreground">
                                {categoryName}
                              </span>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 p-0 text-sm text-red-500 hover:text-red-700 hover:bg-transparent md:hidden"
                                onClick={() => handleRemoveItem(item.product.id)}
                              >
                                <Trash2 size={16} className="ml-1" />
                                إزالة
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="md:col-span-2 text-center flex justify-between md:block">
                          <div className="md:hidden text-sm text-muted-foreground">السعر:</div>
                          <div className="font-bold">{item.product.price.toFixed(3)} KWD</div>
                        </div>

                        <div className="md:col-span-2 flex items-center justify-between md:justify-center">
                          <div className="md:hidden text-sm text-muted-foreground">الكمية:</div>
                          <div className="flex items-center">
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-8 w-8 rounded-r-none"
                              onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={14} />
                            </Button>
                            <div className="h-8 px-3 flex items-center justify-center border-y text-sm">
                              {item.quantity}
                            </div>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-8 w-8 rounded-l-none"
                              onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                              disabled={item.product.stock ? item.quantity >= item.product.stock : false}
                            >
                              <Plus size={14} />
                            </Button>
                          </div>
                        </div>

                        <div className="md:col-span-2 flex items-center justify-between md:justify-center">
                          <div className="md:hidden text-sm text-muted-foreground">المجموع:</div>
                          <div className="font-bold">{(item.product.price * item.quantity).toFixed(3)} KWD</div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-transparent hidden md:flex"
                            onClick={() => handleRemoveItem(item.product.id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )})}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Button 
                  variant="outline" 
                  onClick={clearCart}
                  className="text-sm"
                >
                  <Trash2 size={16} className="ml-1" />
                  مسح السلة
                </Button>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
                <h3 className="font-bold text-lg mb-4">ملخص الطلب</h3>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">مجموع المنتجات ({cartItems.length})</span>
                    <span className="font-bold">{subtotal.toFixed(3)} KWD</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">رسوم الشحن</span>
                    <span className="font-bold">{shippingFee.toFixed(3)} KWD</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex items-center justify-between my-4">
                  <span className="font-bold">المجموع الكلي</span>
                  <span className="text-xl font-bold text-primary">{total.toFixed(3)} KWD</span>
                </div>
                
                <Button 
                  className="w-full button-hover-effect mb-3" 
                  size="lg"
                  onClick={handleCheckout}
                  disabled={cartItems.length === 0 || isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">جاري التحميل...</span>
                  ) : (
                    <span className="flex items-center">
                      إتمام الطلب
                      <ArrowLeft size={16} className="mr-2" />
                    </span>
                  )}
                </Button>
                
                <div className="text-center text-sm text-muted-foreground mt-4">
                  بالضغط على إتمام الطلب فإنك توافق على
                  <Link to="/store/terms" className="text-primary mx-1 hover:underline">
                    الشروط والأحكام
                  </Link>
                  و
                  <Link to="/store/privacy" className="text-primary mr-1 hover:underline">
                    سياسة الخصوصية
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-secondary/20 rounded-lg">
            <ShoppingCart size={64} className="mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">سلة التسوق فارغة</h2>
            <p className="text-muted-foreground mb-6">لم تقم بإضافة أي منتجات إلى سلة التسوق بعد.</p>
            <Button 
              className="button-hover-effect" 
              size="lg"
              onClick={() => navigate('/store')}
            >
              <ArrowRight size={16} className="ml-2" />
              تصفح المنتجات
            </Button>
          </div>
        )}

        {cartItems.length > 0 && suggestedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">قد يعجبك أيضاً</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {suggestedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </StoreLayout>
  );
};

export default Cart;
