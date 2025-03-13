
import React from 'react';
import { Order } from '@/types/store';
import { 
  CreditCard, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  Tag,
  DollarSign,
  Package,
  FileText,
  Truck,
  User,
  Receipt
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface OrderDetailsProps {
  order: Order;
  isInvoice?: boolean;
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({ order, isInvoice = false }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-KW', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">قيد الانتظار</Badge>;
      case 'processing':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">قيد المعالجة</Badge>;
      case 'shipped':
        return <Badge className="bg-indigo-500 hover:bg-indigo-600">تم الشحن</Badge>;
      case 'delivered':
        return <Badge className="bg-green-500 hover:bg-green-600">تم التوصيل</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">ملغي</Badge>;
      default:
        return null;
    }
  };

  const getPaymentMethodName = (method: Order['payment']['method']) => {
    switch (method) {
      case 'credit_card': return 'بطاقة ائتمان';
      case 'debit_card': return 'بطاقة سحب';
      case 'paypal': return 'PayPal';
      case 'cod': return 'الدفع عند الاستلام';
      default: return '';
    }
  };

  const getSubtotal = () => {
    return order.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getShippingCost = () => {
    return 0; // يمكن تعديل هذا لاحقًا لحساب تكلفة الشحن الفعلية
  };

  const getTaxAmount = () => {
    return 0; // يمكن تعديل هذا لاحقًا لحساب الضريبة الفعلية
  };

  // تنسيق المبلغ مع العملة
  const formatCurrency = (amount: number) => {
    return `${amount.toFixed(2)} KWD`;
  };

  // عرض الفاتورة
  if (isInvoice) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto overflow-y-auto" style={{ direction: "rtl" }}>
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">فاتورة</h1>
            <p className="text-gray-500 mt-1">#{order.id}</p>
          </div>
          <div className="mt-4 md:mt-0 text-left md:text-right">
            <div className="flex items-center gap-2 justify-end">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-gray-700">{formatDate(order.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2 justify-end mt-2">
              <Tag className="h-4 w-4 text-gray-500" />
              <span>{getStatusBadge(order.status)}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-gray-800 font-semibold mb-3 flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>بيانات العميل</span>
            </h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="font-medium text-gray-700">{order.shipping.name}</p>
              <p className="text-gray-600 mt-2">{order.shipping.email}</p>
              <p className="text-gray-600">{order.shipping.phone}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-gray-800 font-semibold mb-3 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>عنوان الشحن</span>
            </h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-gray-600">{order.shipping.address}</p>
              <p className="text-gray-600">{order.shipping.city}، {order.shipping.state} {order.shipping.zipCode}</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-gray-800 font-semibold mb-3 flex items-center gap-2">
            <Package className="h-4 w-4" />
            <span>المنتجات</span>
          </h3>
          <div className="bg-gray-50 rounded-md overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead className="font-semibold">المنتج</TableHead>
                    <TableHead className="text-left font-semibold">السعر</TableHead>
                    <TableHead className="text-left font-semibold">الكمية</TableHead>
                    <TableHead className="text-left font-semibold">المجموع</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item, index) => (
                    <TableRow key={index} className="border-b border-gray-200">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-md overflow-hidden border border-gray-200">
                            <img 
                              src={item.product.image} 
                              alt={item.product.name} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <span>{item.product.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{formatCurrency(item.product.price)}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{formatCurrency(item.product.price * item.quantity)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-gray-800 font-semibold mb-3 flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span>معلومات الدفع</span>
            </h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="mb-2">
                <span className="text-gray-500">طريقة الدفع:</span>
                <span className="text-gray-700 mr-2">{getPaymentMethodName(order.payment.method)}</span>
              </div>
              
              {(order.payment.method === 'credit_card' || order.payment.method === 'debit_card') && (
                <>
                  <div className="mb-2">
                    <span className="text-gray-500">رقم البطاقة:</span>
                    <span className="text-gray-700 mr-2">{order.payment.cardNumber}</span>
                  </div>
                  {order.payment.cardHolder && (
                    <div className="mb-2">
                      <span className="text-gray-500">اسم حامل البطاقة:</span>
                      <span className="text-gray-700 mr-2">{order.payment.cardHolder}</span>
                    </div>
                  )}
                </>
              )}
              
              {order.payment.transactionId && (
                <div>
                  <span className="text-gray-500">رقم العملية:</span>
                  <span className="text-gray-700 mr-2">{order.payment.transactionId}</span>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-gray-800 font-semibold mb-3 flex items-center gap-2">
              <Receipt className="h-4 w-4" />
              <span>ملخص الطلب</span>
            </h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">المجموع الفرعي:</span>
                <span className="text-gray-800 font-medium">{formatCurrency(getSubtotal())}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">الشحن:</span>
                <span className="text-gray-800 font-medium">{formatCurrency(getShippingCost())}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">الضريبة:</span>
                <span className="text-gray-800 font-medium">{formatCurrency(getTaxAmount())}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between mt-2">
                <span className="text-gray-800 font-semibold">الإجمالي:</span>
                <span className="text-primary font-bold">{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center border-t border-gray-200 pt-6">
          <p className="text-gray-500 mb-4">شكرًا لتسوقك معنا!</p>
          <Button className="bg-primary hover:bg-primary/90" onClick={() => window.print()}>
            <FileText className="mr-2 h-4 w-4" />
            طباعة الفاتورة
          </Button>
        </div>
      </div>
    );
  }

  // عرض تفاصيل الطلب الاعتيادي
  return (
    <div className="space-y-6 max-h-[calc(100vh-12rem)] overflow-y-auto" style={{ direction: "rtl" }}>
      {/* ملخص الطلب */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">تاريخ الطلب</span>
              </div>
              <span className="text-sm">{formatDate(order.createdAt)}</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">حالة الطلب</span>
              </div>
              {getStatusBadge(order.status)}
            </div>
          </CardContent>
        </Card>
        <Card className="border shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">إجمالي الطلب</span>
              </div>
              <span className="text-sm font-bold">{formatCurrency(order.total)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* بطاقة المنتجات */}
      <Card className="border shadow-sm overflow-hidden">
        <CardHeader className="bg-gray-50 border-b pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            المنتجات
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/50">
                  <TableHead>المنتج</TableHead>
                  <TableHead className="text-left">السعر</TableHead>
                  <TableHead className="text-left">الكمية</TableHead>
                  <TableHead className="text-left">المجموع</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item, index) => (
                  <TableRow key={index} className="hover:bg-gray-50/50">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-md overflow-hidden border border-gray-100">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <span>{item.product.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(item.product.price)}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{formatCurrency(item.product.price * item.quantity)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50/50 border-t flex flex-col space-y-2 items-end p-4">
          <div className="w-full md:w-1/3 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">المجموع الفرعي:</span>
              <span>{formatCurrency(getSubtotal())}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">الشحن:</span>
              <span>{formatCurrency(getShippingCost())}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">الضريبة:</span>
              <span>{formatCurrency(getTaxAmount())}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold">
              <span>الإجمالي:</span>
              <span className="text-primary">{formatCurrency(order.total)}</span>
            </div>
          </div>
        </CardFooter>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* معلومات العميل */}
        <Card className="border shadow-sm">
          <CardHeader className="bg-gray-50 border-b pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              معلومات العميل
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">{order.shipping.name}</p>
                <p className="text-sm text-muted-foreground">{order.shipping.address}</p>
                <p className="text-sm text-muted-foreground">{order.shipping.city}، {order.shipping.state} {order.shipping.zipCode}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary" />
              <p>{order.shipping.phone}</p>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <p>{order.shipping.email}</p>
            </div>
          </CardContent>
        </Card>

        {/* معلومات الدفع */}
        <Card className="border shadow-sm">
          <CardHeader className="bg-gray-50 border-b pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              معلومات الدفع
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">طريقة الدفع</p>
                <p className="text-sm text-muted-foreground">{getPaymentMethodName(order.payment.method)}</p>
              </div>
            </div>
            
            {(order.payment.method === 'credit_card' || order.payment.method === 'debit_card') && (
              <>
                <div className="pr-8 space-y-1">
                  <p className="text-sm text-muted-foreground">رقم البطاقة</p>
                  <p>{order.payment.cardNumber}</p>
                </div>
                {order.payment.cardHolder && (
                  <div className="pr-8 space-y-1">
                    <p className="text-sm text-muted-foreground">اسم حامل البطاقة</p>
                    <p>{order.payment.cardHolder}</p>
                  </div>
                )}
              </>
            )}
            
            {order.payment.transactionId && (
              <div className="pr-8 space-y-1">
                <p className="text-sm text-muted-foreground">رقم العملية</p>
                <p>{order.payment.transactionId}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end mt-6">
        <Button variant="outline" className="gap-2 mr-2" onClick={() => window.print()}>
          <FileText className="h-4 w-4" />
          طباعة
        </Button>
        <Button className="gap-2 bg-primary hover:bg-primary/90" onClick={() => window.location.reload()}>
          <Truck className="h-4 w-4" />
          عرض كفاتورة
        </Button>
      </div>
    </div>
  );
};
