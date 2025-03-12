
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, CheckCircle, Clock, Package, ShoppingBag } from 'lucide-react';
import { Order } from '@/types/store';
import StoreLayout from '@/layouts/StoreLayout';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // محاولة استرداد تفاصيل الطلب الأخير من sessionStorage
    const lastOrderJson = sessionStorage.getItem('lastOrder');
    
    if (lastOrderJson) {
      try {
        const parsedOrder = JSON.parse(lastOrderJson) as Order;
        setOrder(parsedOrder);
      } catch (error) {
        console.error('Error parsing order data:', error);
      }
    }
    
    setLoading(false);
  }, []);

  // إذا لم يتم العثور على طلب، قم بإعادة التوجيه إلى الصفحة الرئيسية
  useEffect(() => {
    if (!loading && !order) {
      navigate('/store');
    }
  }, [loading, order, navigate]);

  if (loading || !order) {
    return null;
  }

  // تنسيق التاريخ بالصيغة الإنجليزية
  const formattedDate = new Date(order.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <StoreLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* رسالة التأكيد */}
          <div className="text-center mb-8">
            <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
            <h1 className="text-2xl md:text-3xl font-bold mb-2">تم تأكيد الطلب!</h1>
            <p className="text-muted-foreground">
              شكراً لك. تم استلام طلبك وسيتم معالجته في أقرب وقت ممكن.
            </p>
            <div className="mt-4 text-lg">
              <span className="font-bold">رقم الطلب: </span>
              <span className="text-primary">{order.id}</span>
            </div>
          </div>

          {/* تفاصيل الطلب */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h2 className="text-xl font-bold">تفاصيل الطلب</h2>
                <div className="text-sm text-muted-foreground">{formattedDate}</div>
              </div>

              {/* حالة الطلب */}
              <div className="bg-secondary/30 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <Clock className="text-primary ml-2" size={20} />
                  <div>
                    <div className="font-bold">حالة الطلب: {order.status === 'pending' ? 'قيد الانتظار' : order.status}</div>
                    <p className="text-sm text-muted-foreground">
                      سيتم تحديث حالة طلبك وإرسال تأكيد عبر البريد الإلكتروني إليك.
                    </p>
                  </div>
                </div>
              </div>

              {/* قائمة المنتجات */}
              <div className="space-y-4 mb-6">
                <h3 className="font-medium text-lg">المنتجات</h3>
                {order.items.map((item) => (
                  <div key={item.product.id} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div className="flex items-center">
                      <div className="w-16 h-16 rounded-md overflow-hidden">
                        <img 
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="mr-4">
                        <div className="font-medium">{item.product.name}</div>
                        <div className="text-sm text-muted-foreground">الكمية: {item.quantity}</div>
                      </div>
                    </div>
                    <div className="font-medium">{(item.product.price * item.quantity).toFixed(3)} KWD</div>
                  </div>
                ))}
              </div>

              {/* ملخص الدفع */}
              <div>
                <h3 className="font-medium text-lg mb-3">ملخص الدفع</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">المجموع الفرعي</span>
                    <span>{(order.total - 2.000).toFixed(3)} KWD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">رسوم الشحن</span>
                    <span>2.000 KWD</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>المجموع</span>
                    <span>{order.total.toFixed(3)} KWD</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* معلومات الشحن والدفع */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Package className="ml-2 text-primary" size={20} />
                  <h3 className="font-bold text-lg">معلومات الشحن</h3>
                </div>
                <div className="space-y-1">
                  <p className="font-medium">{order.shipping.name}</p>
                  <p>{order.shipping.address}</p>
                  <p>{order.shipping.city}, {order.shipping.state} {order.shipping.zipCode}</p>
                  <p>{order.shipping.email}</p>
                  <p>{order.shipping.phone}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <ShoppingBag className="ml-2 text-primary" size={20} />
                  <h3 className="font-bold text-lg">معلومات الدفع</h3>
                </div>
                <div>
                  <p className="font-medium">
                    {order.payment.method === 'credit_card' && 'بطاقة ائتمان'}
                    {order.payment.method === 'debit_card' && 'بطاقة مدين'}
                    {order.payment.method === 'paypal' && 'PayPal'}
                    {order.payment.method === 'cod' && 'الدفع عند الاستلام'}
                  </p>
                  {order.payment.method === 'cod' && (
                    <p className="text-sm text-muted-foreground mt-2">
                      يرجى تجهيز المبلغ المطلوب للدفع عند استلام الطلب.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* أزرار التنقل */}
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 md:space-x-reverse">
            <Button 
              className="button-hover-effect" 
              size="lg"
              onClick={() => navigate('/store')}
            >
              <ArrowRight size={16} className="ml-2" />
              العودة للتسوق
            </Button>
          </div>
        </div>
      </div>
    </StoreLayout>
  );
};

export default OrderConfirmation;
