
import React from 'react';
import { Order } from '@/types/store';
import { 
  CreditCard, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  Tag,
  DollarSign
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
import { Card, CardContent } from '@/components/ui/card';

interface OrderDetailsProps {
  order: Order;
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
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

  return (
    <div className="space-y-6" style={{ direction: "rtl" }}>
      {/* Order Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">تاريخ الطلب</span>
              </div>
              <span className="text-sm">{formatDate(order.createdAt)}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">حالة الطلب</span>
              </div>
              {getStatusBadge(order.status)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">إجمالي الطلب</span>
              </div>
              <span className="text-sm font-bold">{order.total.toFixed(2)} KWD</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Items */}
      <div>
        <h3 className="text-lg font-medium mb-3">المنتجات</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>المنتج</TableHead>
              <TableHead>السعر</TableHead>
              <TableHead>الكمية</TableHead>
              <TableHead>المجموع</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.items.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded overflow-hidden">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span>{item.product.name}</span>
                  </div>
                </TableCell>
                <TableCell>{item.product.price.toFixed(2)} KWD</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{(item.product.price * item.quantity).toFixed(2)} KWD</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3} className="text-left font-bold">المجموع الفرعي</TableCell>
              <TableCell className="font-bold">{order.total.toFixed(2)} KWD</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} className="text-left font-bold">الشحن</TableCell>
              <TableCell className="font-bold">0.00 KWD</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} className="text-left font-bold">الضريبة</TableCell>
              <TableCell className="font-bold">0.00 KWD</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} className="text-left font-bold">الإجمالي</TableCell>
              <TableCell className="font-bold">{order.total.toFixed(2)} KWD</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer Information */}
        <div>
          <h3 className="text-lg font-medium mb-3">معلومات العميل</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">{order.shipping.name}</p>
                <p className="text-sm text-muted-foreground">{order.shipping.address}</p>
                <p className="text-sm text-muted-foreground">{order.shipping.city}، {order.shipping.state} {order.shipping.zipCode}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <p>{order.shipping.phone}</p>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <p>{order.shipping.email}</p>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div>
          <h3 className="text-lg font-medium mb-3">معلومات الدفع</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">طريقة الدفع</p>
                <p className="text-sm text-muted-foreground">{getPaymentMethodName(order.payment.method)}</p>
              </div>
            </div>
            
            {order.payment.method === 'credit_card' || order.payment.method === 'debit_card' ? (
              <>
                <div className="text-sm">
                  <p className="text-muted-foreground">رقم البطاقة</p>
                  <p>{order.payment.cardNumber}</p>
                </div>
                {order.payment.cardHolder && (
                  <div className="text-sm">
                    <p className="text-muted-foreground">اسم حامل البطاقة</p>
                    <p>{order.payment.cardHolder}</p>
                  </div>
                )}
              </>
            ) : null}
            
            {order.payment.transactionId && (
              <div className="text-sm">
                <p className="text-muted-foreground">رقم العملية</p>
                <p>{order.payment.transactionId}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
