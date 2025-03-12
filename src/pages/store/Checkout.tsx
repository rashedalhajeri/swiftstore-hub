
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag, CreditCard, ArrowLeft, Check } from 'lucide-react';
import StoreLayout from '@/layouts/StoreLayout';
import { useCart } from '@/contexts/CartContext';
import { ShippingInfo, PaymentInfo } from '@/types/store';

// شكل الـ schema للتحقق من صحة البيانات
const formSchema = z.object({
  name: z.string().min(3, { message: 'الاسم مطلوب ويجب أن يكون 3 أحرف على الأقل' }),
  email: z.string().email({ message: 'البريد الإلكتروني غير صالح' }),
  phone: z.string().min(8, { message: 'رقم الهاتف مطلوب' }),
  address: z.string().min(5, { message: 'العنوان مطلوب' }),
  city: z.string().min(2, { message: 'المدينة مطلوبة' }),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  paymentMethod: z.enum(['credit_card', 'debit_card', 'paypal', 'cod']),
});

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, subtotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // رسوم الشحن والمجموع الكلي
  const shippingFee = 2.000;
  const total = subtotal + shippingFee;
  
  // إعداد نموذج React Hook Form مع Zod كمتحقق
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: 'الكويت',
      zipCode: '',
      paymentMethod: 'credit_card',
    },
  });

  // معالجة تقديم النموذج
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (cartItems.length === 0) return;
    
    setIsProcessing(true);
    
    // إنشاء كائن معلومات الشحن
    const shippingInfo: ShippingInfo = {
      name: values.name,
      address: values.address,
      city: values.city,
      state: 'الكويت',
      zipCode: values.zipCode || '',
      email: values.email,
      phone: values.phone,
    };
    
    // إنشاء كائن معلومات الدفع
    const paymentInfo: PaymentInfo = {
      method: values.paymentMethod,
      // هنا يمكننا إضافة معلومات أخرى حسب طريقة الدفع المختارة
    };
    
    // محاكاة استجابة API
    setTimeout(() => {
      // يمكننا هنا إرسال الطلب إلى الخادم
      
      // تخزين معلومات الطلب في الـ session storage
      const order = {
        id: `ORD-${Date.now()}`,
        items: cartItems,
        total,
        shipping: shippingInfo,
        payment: paymentInfo,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      
      sessionStorage.setItem('lastOrder', JSON.stringify(order));
      
      // مسح السلة وإعادة التوجيه إلى صفحة تأكيد الطلب
      clearCart();
      navigate('/store/order-confirmation');
    }, 1500);
  };

  // التحقق من وجود منتجات في السلة
  if (cartItems.length === 0) {
    navigate('/store/cart');
    return null;
  }

  return (
    <StoreLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold flex items-center">
            <ShoppingBag className="ml-2" size={28} />
            إتمام الطلب
          </h1>
          <Button 
            variant="ghost" 
            className="flex items-center"
            onClick={() => navigate('/store/cart')}
          >
            <ArrowLeft size={16} className="ml-1" />
            العودة إلى السلة
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* نموذج الدفع */}
          <div className="lg:col-span-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* قسم معلومات الشحن */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-lg font-bold mb-4">معلومات الشحن</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>الاسم الكامل</FormLabel>
                            <FormControl>
                              <Input placeholder="أدخل الاسم الكامل" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>البريد الإلكتروني</FormLabel>
                            <FormControl>
                              <Input placeholder="example@example.com" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>رقم الهاتف</FormLabel>
                            <FormControl>
                              <Input placeholder="+965" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>العنوان</FormLabel>
                            <FormControl>
                              <Input placeholder="أدخل العنوان بالتفصيل" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>المدينة</FormLabel>
                            <FormControl>
                              <Input placeholder="المدينة" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>الدولة</FormLabel>
                              <FormControl>
                                <Input value="الكويت" disabled {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="zipCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>الرمز البريدي</FormLabel>
                              <FormControl>
                                <Input placeholder="الرمز البريدي" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* قسم طرق الدفع */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-lg font-bold mb-4">طريقة الدفع</h2>
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="space-y-3"
                            >
                              <div className="flex items-center space-x-2 space-x-reverse">
                                <RadioGroupItem value="credit_card" id="credit_card" />
                                <Label htmlFor="credit_card" className="flex items-center cursor-pointer">
                                  <CreditCard className="ml-2" size={18} />
                                  بطاقة ائتمان
                                </Label>
                              </div>
                              
                              <div className="flex items-center space-x-2 space-x-reverse">
                                <RadioGroupItem value="debit_card" id="debit_card" />
                                <Label htmlFor="debit_card" className="flex items-center cursor-pointer">
                                  <CreditCard className="ml-2" size={18} />
                                  بطاقة مدين
                                </Label>
                              </div>
                              
                              <div className="flex items-center space-x-2 space-x-reverse">
                                <RadioGroupItem value="paypal" id="paypal" />
                                <Label htmlFor="paypal" className="cursor-pointer">PayPal</Label>
                              </div>
                              
                              <div className="flex items-center space-x-2 space-x-reverse">
                                <RadioGroupItem value="cod" id="cod" />
                                <Label htmlFor="cod" className="cursor-pointer">الدفع عند الاستلام</Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {form.watch('paymentMethod') === 'credit_card' && (
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <Label htmlFor="card-number">رقم البطاقة</Label>
                          <Input id="card-number" placeholder="0000 0000 0000 0000" />
                        </div>
                        
                        <div>
                          <Label htmlFor="card-name">اسم حامل البطاقة</Label>
                          <Input id="card-name" placeholder="الاسم كما هو على البطاقة" />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label htmlFor="expiry">تاريخ الانتهاء</Label>
                            <Input id="expiry" placeholder="MM/YY" />
                          </div>
                          
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="123" />
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* زر تقديم الطلب */}
                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    className="w-full md:w-auto button-hover-effect" 
                    size="lg"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <span className="flex items-center">جاري معالجة الطلب...</span>
                    ) : (
                      <span className="flex items-center">
                        تأكيد الطلب
                        <Check size={16} className="mr-2" />
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>

          {/* ملخص الطلب */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">ملخص الطلب</h3>
                
                <div className="space-y-4 mb-4">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-12 flex-shrink-0 rounded-md overflow-hidden">
                          <img 
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="mr-3">
                          <div className="font-medium line-clamp-1">{item.product.name}</div>
                          <div className="text-sm text-muted-foreground">الكمية: {item.quantity}</div>
                        </div>
                      </div>
                      <div className="font-medium">{(item.product.price * item.quantity).toFixed(3)} KWD</div>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">المجموع الفرعي</span>
                    <span className="font-bold">{subtotal.toFixed(3)} KWD</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">رسوم الشحن</span>
                    <span className="font-bold">{shippingFee.toFixed(3)} KWD</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex items-center justify-between">
                  <span className="font-bold">المجموع الكلي</span>
                  <span className="text-xl font-bold text-primary">{total.toFixed(3)} KWD</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </StoreLayout>
  );
};

export default Checkout;
