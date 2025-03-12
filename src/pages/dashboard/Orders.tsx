
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  MoreHorizontal, 
  Eye, 
  Package, 
  Truck, 
  CheckCircle, 
  XCircle, 
  Clock
} from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Link } from 'react-router-dom';

// تعريف أنواع البيانات
type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  date: Date;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  paymentMethod: string;
  shippingAddress: string;
}

const getStatusBadge = (status: OrderStatus) => {
  switch (status) {
    case 'pending':
      return <Badge variant="outline" className="border-yellow-500 text-yellow-500">قيد الانتظار</Badge>;
    case 'processing':
      return <Badge className="bg-blue-500 hover:bg-blue-600">قيد المعالجة</Badge>;
    case 'shipped':
      return <Badge className="bg-indigo-500 hover:bg-indigo-600">تم الشحن</Badge>;
    case 'delivered':
      return <Badge className="bg-green-500 hover:bg-green-600">تم التسليم</Badge>;
    case 'cancelled':
      return <Badge variant="destructive">ملغي</Badge>;
    default:
      return null;
  }
};

const getStatusIcon = (status: OrderStatus) => {
  switch (status) {
    case 'pending':
      return <Clock className="h-5 w-5 text-yellow-500" />;
    case 'processing':
      return <Package className="h-5 w-5 text-blue-500" />;
    case 'shipped':
      return <Truck className="h-5 w-5 text-indigo-500" />;
    case 'delivered':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'cancelled':
      return <XCircle className="h-5 w-5 text-red-500" />;
    default:
      return null;
  }
};

const Orders = () => {
  // بيانات نموذجية للطلبات
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-2023-1001",
      customerName: "أحمد محمد",
      customerEmail: "ahmed@example.com",
      date: new Date(2023, 8, 28),
      status: "delivered",
      items: [
        { id: "1", name: "هاتف ذكي Samsung Galaxy S22", quantity: 1, price: 299.99 },
        { id: "2", name: "حافظة هاتف", quantity: 1, price: 19.99 }
      ],
      total: 319.98,
      paymentMethod: "بطاقة ائتمان",
      shippingAddress: "شارع الملك فهد، الرياض، المملكة العربية السعودية"
    },
    {
      id: "ORD-2023-1002",
      customerName: "نورة علي",
      customerEmail: "noura@example.com",
      date: new Date(2023, 8, 29),
      status: "shipped",
      items: [
        { id: "3", name: "سماعات لاسلكية Sony WH-1000XM4", quantity: 1, price: 149.99 }
      ],
      total: 149.99,
      paymentMethod: "باي بال",
      shippingAddress: "شارع السلام، الدوحة، قطر"
    },
    {
      id: "ORD-2023-1003",
      customerName: "خالد إبراهيم",
      customerEmail: "khalid@example.com",
      date: new Date(2023, 8, 30),
      status: "processing",
      items: [
        { id: "4", name: "حقيبة ظهر للرحلات", quantity: 1, price: 59.99 },
        { id: "5", name: "قميص رجالي كلاسيكي", quantity: 2, price: 39.99 }
      ],
      total: 139.97,
      paymentMethod: "دفع عند الاستلام",
      shippingAddress: "شارع مكة، جدة، المملكة العربية السعودية"
    },
    {
      id: "ORD-2023-1004",
      customerName: "فاطمة عبدالله",
      customerEmail: "fatima@example.com",
      date: new Date(2023, 9, 1),
      status: "pending",
      items: [
        { id: "6", name: "ساعة ذكية Fitbit Versa 3", quantity: 1, price: 129.99 }
      ],
      total: 129.99,
      paymentMethod: "بطاقة ائتمان",
      shippingAddress: "شارع الاستقلال، دبي، الإمارات العربية المتحدة"
    },
    {
      id: "ORD-2023-1005",
      customerName: "عمر أحمد",
      customerEmail: "omar@example.com",
      date: new Date(2023, 9, 2),
      status: "cancelled",
      items: [
        { id: "7", name: "مكنسة كهربائية Dyson V11", quantity: 1, price: 349.99 }
      ],
      total: 349.99,
      paymentMethod: "بطاقة ائتمان",
      shippingAddress: "شارع الملك عبدالله، عمان، الأردن"
    },
    {
      id: "ORD-2023-1006",
      customerName: "سارة محمد",
      customerEmail: "sara@example.com",
      date: new Date(2023, 9, 3),
      status: "delivered",
      items: [
        { id: "8", name: "كتاب التفكير السريع والبطيء", quantity: 1, price: 15.99 },
        { id: "9", name: "كتاب عادات العقل", quantity: 1, price: 13.99 }
      ],
      total: 29.98,
      paymentMethod: "باي بال",
      shippingAddress: "شارع المرسى، القاهرة، مصر"
    },
    {
      id: "ORD-2023-1007",
      customerName: "محمد علي",
      customerEmail: "mohamed@example.com",
      date: new Date(2023, 9, 4),
      status: "processing",
      items: [
        { id: "10", name: "كاميرا Canon EOS 90D", quantity: 1, price: 799.99 }
      ],
      total: 799.99,
      paymentMethod: "بطاقة ائتمان",
      shippingAddress: "شارع الحمراء، بيروت، لبنان"
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<OrderStatus | "">("");
  const [searchTerm, setSearchTerm] = useState("");

  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderDetailsOpen(true);
  };

  const openStatusDialog = (order: Order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setIsStatusDialogOpen(true);
  };

  const updateOrderStatus = () => {
    if (selectedOrder && newStatus) {
      setOrders(
        orders.map((order) =>
          order.id === selectedOrder.id ? { ...order, status: newStatus as OrderStatus } : order
        )
      );
      setIsStatusDialogOpen(false);
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // حساب إحصائيات الطلبات
  const pendingCount = orders.filter((order) => order.status === "pending").length;
  const processingCount = orders.filter((order) => order.status === "processing").length;
  const shippedCount = orders.filter((order) => order.status === "shipped").length;
  const deliveredCount = orders.filter((order) => order.status === "delivered").length;
  const cancelledCount = orders.filter((order) => order.status === "cancelled").length;

  const totalRevenue = orders
    .filter((order) => order.status !== "cancelled")
    .reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="space-y-6" style={{ direction: "rtl" }}>
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">الطلبات</h1>
          <p className="text-muted-foreground">
            إدارة طلبات العملاء ومتابعة حالتها
          </p>
        </div>
        <Button variant="outline" className="button-hover-effect">
          <Filter className="ml-2 h-4 w-4" />
          تصدير الطلبات
        </Button>
      </div>

      {/* بطاقات الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              <span>قيد الانتظار</span>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              <span>قيد المعالجة</span>
              <Package className="h-4 w-4 text-blue-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{processingCount}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              <span>تم الشحن</span>
              <Truck className="h-4 w-4 text-indigo-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{shippedCount}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              <span>تم التسليم</span>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deliveredCount}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              <span>ملغية</span>
              <XCircle className="h-4 w-4 text-red-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cancelledCount}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            placeholder="بحث عن رقم الطلب، اسم العميل..." 
            className="pr-10" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex gap-2">
          <Filter size={16} />
          <span>تصفية</span>
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">جميع الطلبات</TabsTrigger>
          <TabsTrigger value="pending">قيد الانتظار</TabsTrigger>
          <TabsTrigger value="processing">قيد المعالجة</TabsTrigger>
          <TabsTrigger value="shipped">تم الشحن</TabsTrigger>
          <TabsTrigger value="delivered">تم التسليم</TabsTrigger>
          <TabsTrigger value="cancelled">ملغية</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>جميع الطلبات</CardTitle>
              <CardDescription>
                إجمالي {filteredOrders.length} طلب | الإيرادات: {totalRevenue.toFixed(2)} KWD
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">رقم الطلب</TableHead>
                    <TableHead>العميل</TableHead>
                    <TableHead className="w-[120px]">
                      <div className="flex items-center gap-1">
                        <span>التاريخ</span>
                        <ArrowUpDown size={14} />
                      </div>
                    </TableHead>
                    <TableHead>حالة الطلب</TableHead>
                    <TableHead>المبلغ</TableHead>
                    <TableHead>طريقة الدفع</TableHead>
                    <TableHead className="text-left">إجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{order.customerName}</div>
                          <div className="text-sm text-muted-foreground">{order.customerEmail}</div>
                        </div>
                      </TableCell>
                      <TableCell>{format(order.date, "dd/MM/yyyy")}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(order.status)}
                        </div>
                      </TableCell>
                      <TableCell>{order.total.toFixed(2)} KWD</TableCell>
                      <TableCell>{order.paymentMethod}</TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => viewOrderDetails(order)}
                          >
                            <Eye size={16} />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>خيارات</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => viewOrderDetails(order)}>
                                <Eye className="ml-2" size={16} />
                                <span>عرض تفاصيل الطلب</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openStatusDialog(order)}>
                                <Package className="ml-2" size={16} />
                                <span>تحديث الحالة</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link to="/dashboard/orders/invoice" className="flex items-center">
                                  <svg className="ml-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                    <polyline points="14 2 14 8 20 8"></polyline>
                                    <line x1="16" y1="13" x2="8" y2="13"></line>
                                    <line x1="16" y1="17" x2="8" y2="17"></line>
                                    <polyline points="10 9 9 9 8 9"></polyline>
                                  </svg>
                                  <span>طباعة الفاتورة</span>
                                </Link>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {filteredOrders.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        لا توجد طلبات مطابقة لبحثك
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>الطلبات قيد الانتظار</CardTitle>
              <CardDescription>
                الطلبات التي تنتظر بدء المعالجة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">
                سيتم عرض قائمة الطلبات قيد الانتظار هنا
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="processing">
          <Card>
            <CardHeader>
              <CardTitle>الطلبات قيد المعالجة</CardTitle>
              <CardDescription>
                الطلبات التي يتم تجهيزها حاليًا
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">
                سيتم عرض قائمة الطلبات قيد المعالجة هنا
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="shipped">
          <Card>
            <CardHeader>
              <CardTitle>الطلبات المشحونة</CardTitle>
              <CardDescription>
                الطلبات التي تم شحنها وفي طريقها للعملاء
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">
                سيتم عرض قائمة الطلبات المشحونة هنا
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="delivered">
          <Card>
            <CardHeader>
              <CardTitle>الطلبات المسلّمة</CardTitle>
              <CardDescription>
                الطلبات التي تم تسليمها للعملاء
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">
                سيتم عرض قائمة الطلبات المسلّمة هنا
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="cancelled">
          <Card>
            <CardHeader>
              <CardTitle>الطلبات الملغاة</CardTitle>
              <CardDescription>
                الطلبات التي تم إلغاؤها
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">
                سيتم عرض قائمة الطلبات الملغاة هنا
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* حوار تفاصيل الطلب */}
      <Dialog open={isOrderDetailsOpen} onOpenChange={setIsOrderDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <span>تفاصيل الطلب | {selectedOrder.id}</span>
                  <div>
                    {getStatusBadge(selectedOrder.status)}
                  </div>
                </DialogTitle>
                <DialogDescription>
                  تاريخ الطلب: {format(selectedOrder.date, "dd/MM/yyyy")}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 my-2">
                <div className="flex justify-between items-start border-b pb-3">
                  <div>
                    <h4 className="font-medium">معلومات العميل</h4>
                    <p className="text-sm text-muted-foreground">{selectedOrder.customerName}</p>
                    <p className="text-sm text-muted-foreground">{selectedOrder.customerEmail}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(selectedOrder.status)}
                    <Button variant="outline" size="sm" onClick={() => openStatusDialog(selectedOrder)}>
                      تحديث الحالة
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">المنتجات</h4>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <div>
                          <p className="text-sm">{item.name}</p>
                          <p className="text-xs text-muted-foreground">الكمية: {item.quantity}</p>
                        </div>
                        <p className="text-sm">{(item.price * item.quantity).toFixed(2)} KWD</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <p className="font-medium">الإجمالي</p>
                    <p className="font-bold">{selectedOrder.total.toFixed(2)} KWD</p>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <p>طريقة الدفع</p>
                    <p>{selectedOrder.paymentMethod}</p>
                  </div>
                </div>
                
                <div className="border-t pt-3">
                  <h4 className="font-medium mb-1">عنوان الشحن</h4>
                  <p className="text-sm text-muted-foreground">{selectedOrder.shippingAddress}</p>
                </div>
              </div>
              
              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => setIsOrderDetailsOpen(false)}>
                  إغلاق
                </Button>
                <Button asChild>
                  <Link to="/dashboard/orders/invoice">
                    طباعة الفاتورة
                  </Link>
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* حوار تحديث حالة الطلب */}
      <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>تحديث حالة الطلب</DialogTitle>
            <DialogDescription>
              تغيير حالة الطلب {selectedOrder?.id}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 my-2">
            <div className="flex items-center gap-2">
              <p className="text-sm">الحالة الحالية:</p>
              {selectedOrder && getStatusBadge(selectedOrder.status)}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">الحالة الجديدة</label>
              <Select
                value={newStatus}
                onValueChange={(value) => setNewStatus(value as OrderStatus)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر حالة جديدة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">قيد الانتظار</SelectItem>
                  <SelectItem value="processing">قيد المعالجة</SelectItem>
                  <SelectItem value="shipped">تم الشحن</SelectItem>
                  <SelectItem value="delivered">تم التسليم</SelectItem>
                  <SelectItem value="cancelled">ملغي</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsStatusDialogOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={updateOrderStatus}>
              تحديث الحالة
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Orders;
