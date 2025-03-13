import React, { useState } from 'react';
import { 
  Package, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Truck, 
  CheckCircle, 
  XCircle, 
  Package2, 
  Clock,
  Loader2
} from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import OrderDetails from "@/components/dashboard/OrderDetails";
import UpdateOrderStatus from "@/components/dashboard/UpdateOrderStatus";
import { Order } from "@/types/store";

// نماذج بيانات طلبات مؤقتة (سيتم استبدالها بالبيانات من قاعدة البيانات)
const mockOrders: Order[] = [
  {
    id: "ord-001",
    items: [
      {
        product: {
          id: "1",
          name: "هاتف ذكي Samsung Galaxy S22",
          price: 299.99,
          image: "https://via.placeholder.com/150",
          category: "إلكترونيات",
          featured: true
        },
        quantity: 1
      },
      {
        product: {
          id: "2",
          name: "سماعات لاسلكية Sony WH-1000XM4",
          price: 149.99,
          image: "https://via.placeholder.com/150",
          category: "إلكترونيات",
          featured: false
        },
        quantity: 1
      }
    ],
    total: 449.98,
    status: "delivered",
    shipping: {
      name: "أحمد محمد",
      address: "شارع السالم، بلوك 3، منزل 21",
      city: "الكويت",
      state: "حولي",
      zipCode: "12345",
      email: "ahmed@example.com",
      phone: "123-456-7890"
    },
    payment: {
      method: "credit_card",
      cardNumber: "xxxx-xxxx-xxxx-1234",
      cardHolder: "أحمد محمد",
      expiryMonth: "12",
      expiryYear: "2025",
      transactionId: "trx-987654"
    },
    createdAt: "2023-10-15T12:30:45Z"
  },
  {
    id: "ord-002",
    items: [
      {
        product: {
          id: "7",
          name: "مكنسة كهربائية Dyson V11",
          price: 349.99,
          image: "https://via.placeholder.com/150",
          category: "الأجهزة المنزلية",
          featured: true
        },
        quantity: 1
      }
    ],
    total: 349.99,
    status: "processing",
    shipping: {
      name: "فاطمة علي",
      address: "شارع الفحيحيل، بلوك 7، شقة 3",
      city: "الكويت",
      state: "الأحمدي",
      zipCode: "54321",
      email: "fatima@example.com",
      phone: "098-765-4321"
    },
    payment: {
      method: "debit_card",
      cardNumber: "xxxx-xxxx-xxxx-5678",
      cardHolder: "فاطمة علي",
      expiryMonth: "09",
      expiryYear: "2024",
      transactionId: "trx-123456"
    },
    createdAt: "2023-10-17T15:45:12Z"
  },
  {
    id: "ord-003",
    items: [
      {
        product: {
          id: "8",
          name: "مجموعة أواني طبخ",
          price: 89.99,
          image: "https://via.placeholder.com/150",
          category: "المطبخ",
          featured: false
        },
        quantity: 1
      }
    ],
    total: 89.99,
    status: "shipped",
    shipping: {
      name: "محمد خالد",
      address: "شارع مبارك الكبير، بلوك 12، منزل 5",
      city: "الكويت",
      state: "العاصمة",
      zipCode: "13579",
      email: "mohamed@example.com",
      phone: "555-123-4567"
    },
    payment: {
      method: "paypal",
      transactionId: "pay-98765432"
    },
    createdAt: "2023-10-19T09:12:34Z"
  },
  {
    id: "ord-004",
    items: [
      {
        product: {
          id: "5",
          name: "قميص رجالي كلاسيكي",
          price: 39.99,
          image: "https://via.placeholder.com/150",
          category: "الملابس",
          featured: false
        },
        quantity: 2
      },
      {
        product: {
          id: "6",
          name: "كتاب التفكير السريع والبطيء",
          price: 15.99,
          image: "https://via.placeholder.com/150",
          category: "الكتب",
          featured: false
        },
        quantity: 1
      }
    ],
    total: 95.97,
    status: "pending",
    shipping: {
      name: "نورة سعد",
      address: "شارع عبد الله السالم، بلوك 9، شقة 32",
      city: "الكويت",
      state: "الفروانية",
      zipCode: "24680",
      email: "noura@example.com",
      phone: "777-888-9999"
    },
    payment: {
      method: "cod"
    },
    createdAt: "2023-10-20T18:20:15Z"
  },
  {
    id: "ord-005",
    items: [
      {
        product: {
          id: "10",
          name: "كاميرا Canon EOS 90D",
          price: 799.99,
          image: "https://via.placeholder.com/150",
          category: "إلكترونيات",
          featured: true
        },
        quantity: 1
      }
    ],
    total: 799.99,
    status: "cancelled",
    shipping: {
      name: "خالد يوسف",
      address: "شارع سالم المبارك، بلوك 15، منزل 7",
      city: "الكويت",
      state: "حولي",
      zipCode: "13579",
      email: "khaled@example.com",
      phone: "444-555-6666"
    },
    payment: {
      method: "credit_card",
      cardNumber: "xxxx-xxxx-xxxx-9012",
      cardHolder: "خالد يوسف",
      expiryMonth: "05",
      expiryYear: "2026",
      transactionId: "trx-456789"
    },
    createdAt: "2023-10-21T10:05:30Z"
  }
];

const statusMap: { [key: string]: { label: string; color: string; icon: React.ComponentType } } = {
  pending: { label: "قيد الانتظار", color: "yellow", icon: Clock },
  processing: { label: "جاري المعالجة", color: "blue", icon: Package2 },
  shipped: { label: "تم الشحن", color: "purple", icon: Truck },
  delivered: { label: "تم التسليم", color: "green", icon: CheckCircle },
  cancelled: { label: "ملغى", color: "red", icon: XCircle },
};

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isUpdateStatusOpen, setIsUpdateStatusOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.shipping.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.shipping.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  const handleUpdateStatus = (order: Order) => {
    setSelectedOrder(order);
    setIsUpdateStatusOpen(true);
  };

  const handleStatusUpdate = (newStatus: string) => {
    if (selectedOrder) {
      setIsLoading(true);
      setTimeout(() => {
        setOrders(orders.map(order =>
          order.id === selectedOrder.id ? { ...order, status: newStatus } : order
        ));
        setIsUpdateStatusOpen(false);
        setIsLoading(false);
      }, 500);
    }
  };

  return (
    <div className="space-y-6" style={{ direction: "rtl" }}>
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">الطلبات</h1>
          <p className="text-muted-foreground">
            إدارة وتتبع طلبات العملاء
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="بحث عن طلب..."
            className="pr-10"
            value={searchTerm}
            onChange={handleSearch}
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
          <TabsTrigger value="processing">جاري المعالجة</TabsTrigger>
          <TabsTrigger value="shipped">تم الشحن</TabsTrigger>
          <TabsTrigger value="delivered">تم التسليم</TabsTrigger>
          <TabsTrigger value="cancelled">ملغى</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>قائمة الطلبات</CardTitle>
              <CardDescription>
                إجمالي {filteredOrders.length} طلب
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>رقم الطلب</TableHead>
                    <TableHead>العميل</TableHead>
                    <TableHead>تاريخ الطلب</TableHead>
                    <TableHead>المجموع</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead className="text-left">إجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.shipping.name}</TableCell>
                      <TableCell>
                        {new Date(order.createdAt).toLocaleDateString('ar-KW', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </TableCell>
                      <TableCell>{order.total.toFixed(3)} KWD</TableCell>
                      <TableCell>
                        <Badge className={`bg-${statusMap[order.status].color}-500 hover:bg-${statusMap[order.status].color}-600`}>
                          <statusMap[order.status].icon className="ml-2 h-4 w-4" />
                          {statusMap[order.status].label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleOpenDetails(order)}>
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
                              <DropdownMenuItem onClick={() => handleUpdateStatus(order)}>
                                <Package className="ml-2" size={16} />
                                <span>تحديث الحالة</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-500 focus:text-red-500">
                                <Trash2 className="ml-2" size={16} />
                                <span>حذف الطلب</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* حالات الطلبات الأخرى */}
        {Object.keys(statusMap).map(status => (
          <TabsContent key={status} value={status}>
            <Card>
              <CardHeader>
                <CardTitle>طلبات {statusMap[status].label}</CardTitle>
                <CardDescription>
                  قائمة الطلبات التي حالتها {statusMap[status].label}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>رقم الطلب</TableHead>
                      <TableHead>العميل</TableHead>
                      <TableHead>تاريخ الطلب</TableHead>
                      <TableHead>المجموع</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead className="text-left">إجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders
                      .filter(order => order.status === status)
                      .map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.shipping.name}</TableCell>
                          <TableCell>
                            {new Date(order.createdAt).toLocaleDateString('ar-KW', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </TableCell>
                          <TableCell>{order.total.toFixed(3)} KWD</TableCell>
                          <TableCell>
                            <Badge className={`bg-${statusMap[order.status].color}-500 hover:bg-${statusMap[order.status].color}-600`}>
                              <statusMap[order.status].icon className="ml-2 h-4 w-4" />
                              {statusMap[order.status].label}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" onClick={() => handleOpenDetails(order)}>
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
                                  <DropdownMenuItem onClick={() => handleUpdateStatus(order)}>
                                    <Package className="ml-2" size={16} />
                                    <span>تحديث الحالة</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-500 focus:text-red-500">
                                    <Trash2 className="ml-2" size={16} />
                                    <span>حذف الطلب</span>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تفاصيل الطلب</DialogTitle>
            <DialogDescription>
              معلومات تفصيلية حول الطلب المحدد
            </DialogDescription>
          </DialogHeader>
          <Separator className="my-4" />
          {selectedOrder && <OrderDetails order={selectedOrder} />}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
              إغلاق
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isUpdateStatusOpen} onOpenChange={setIsUpdateStatusOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تحديث حالة الطلب</DialogTitle>
            <DialogDescription>
              تغيير حالة الطلب الحالي
            </DialogDescription>
          </DialogHeader>
          <Separator className="my-4" />
          {selectedOrder && (
            <UpdateOrderStatus
              order={selectedOrder}
              onStatusUpdate={handleStatusUpdate}
              isLoading={isLoading}
            />
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUpdateStatusOpen(false)} disabled={isLoading}>
              إلغاء
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">إجمالي الإيرادات</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {orders.reduce((total, order) => total + order.total, 0).toFixed(3)} KWD
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              منذ البداية
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">الطلبات قيد الانتظار</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {orders.filter(order => order.status === 'pending').length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              طلبات جديدة تنتظر المعالجة
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">متوسط قيمة الطلب</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(orders.reduce((total, order) => total + order.total, 0) / orders.length).toFixed(3)} KWD
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              متوسط قيمة كل طلب
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Orders;

import { Eye, Trash2 } from 'lucide-react';
