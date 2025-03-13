
import { useState } from 'react';
import { 
  Package, 
  Search,
  Calendar,
  CreditCard,
  Truck,
  XCircle,
  CheckCircle2,
  MoreHorizontal,
  FileText,
  AlertCircle,
  User,
  DollarSign,
  Filter
} from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose
} from "@/components/ui/drawer";
import { OrderDetails } from "@/components/dashboard/OrderDetails";
import { UpdateOrderStatus } from "@/components/dashboard/UpdateOrderStatus";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Order } from "@/types/store";
import { useIsMobile } from "@/hooks/use-mobile";

const SAMPLE_ORDERS: Order[] = [
  {
    id: "ORD-001",
    createdAt: "2023-06-15T14:30:00Z",
    status: "processing",
    total: 599.97,
    items: [
      {
        product: {
          id: "1",
          name: "هاتف ذكي Samsung Galaxy S22",
          price: 299.99,
          image: "https://via.placeholder.com/150",
          category: "إلكترونيات",
          featured: true,
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
          featured: false,
        },
        quantity: 2
      }
    ],
    shipping: {
      name: "أحمد محمد",
      address: "شارع 123، مبنى 45",
      city: "الكويت",
      state: "العاصمة",
      zipCode: "12345",
      email: "ahmed@example.com",
      phone: "+965 1234 5678"
    },
    payment: {
      method: "credit_card",
      cardNumber: "**** **** **** 4242",
      cardHolder: "أحمد محمد",
      expiryMonth: "06",
      expiryYear: "2025",
      transactionId: "txn_123456789"
    }
  },
  {
    id: "ORD-002",
    createdAt: "2023-06-14T10:15:00Z",
    status: "shipped",
    total: 349.99,
    items: [
      {
        product: {
          id: "7",
          name: "مكنسة كهربائية Dyson V11",
          price: 349.99,
          image: "https://via.placeholder.com/150",
          category: "أثاث منزلي",
          featured: false,
        },
        quantity: 1
      }
    ],
    shipping: {
      name: "سارة عبدالله",
      address: "شارع الخليج، مبنى 12",
      city: "الكويت",
      state: "حولي",
      zipCode: "54321",
      email: "sara@example.com",
      phone: "+965 9876 5432"
    },
    payment: {
      method: "paypal",
      transactionId: "txn_987654321"
    }
  },
  {
    id: "ORD-003",
    createdAt: "2023-06-13T16:45:00Z",
    status: "delivered",
    total: 89.99,
    items: [
      {
        product: {
          id: "8",
          name: "مجموعة أواني طبخ",
          price: 89.99,
          image: "https://via.placeholder.com/150",
          category: "مستلزمات ��لمطبخ",
          featured: false,
        },
        quantity: 1
      }
    ],
    shipping: {
      name: "خالد عبدالرحمن",
      address: "شارع التعاون، مبنى 33",
      city: "الكويت",
      state: "السالمية",
      zipCode: "13579",
      email: "khaled@example.com",
      phone: "+965 5555 8888"
    },
    payment: {
      method: "credit_card",
      cardNumber: "**** **** **** 5555",
      cardHolder: "خالد عبدالرحمن",
      expiryMonth: "08",
      expiryYear: "2024",
      transactionId: "txn_555555555"
    }
  },
  {
    id: "ORD-004",
    createdAt: "2023-06-12T13:20:00Z",
    status: "pending",
    total: 209.97,
    items: [
      {
        product: {
          id: "5",
          name: "قميص رجالي كلاسيكي",
          price: 39.99,
          image: "https://via.placeholder.com/150",
          category: "ملابس",
          featured: false,
        },
        quantity: 3
      },
      {
        product: {
          id: "6",
          name: "كتاب التفكير السريع والبطيء",
          price: 15.99,
          image: "https://via.placeholder.com/150",
          category: "كتب",
          featured: true,
        },
        quantity: 1
      }
    ],
    shipping: {
      name: "نورة أحمد",
      address: "شارع فهد السالم، مبنى 9",
      city: "الكويت",
      state: "الفروانية",
      zipCode: "24680",
      email: "noura@example.com",
      phone: "+965 1122 3344"
    },
    payment: {
      method: "cod"
    }
  },
  {
    id: "ORD-005",
    createdAt: "2023-06-11T09:00:00Z",
    status: "cancelled",
    total: 799.99,
    items: [
      {
        product: {
          id: "10",
          name: "كاميرا Canon EOS 90D",
          price: 799.99,
          image: "https://via.placeholder.com/150",
          category: "إلكترونيات",
          featured: false,
        },
        quantity: 1
      }
    ],
    shipping: {
      name: "محمد جاسم",
      address: "شارع المباركية، مبنى 25",
      city: "الكويت",
      state: "الجهراء",
      zipCode: "97531",
      email: "mohammad@example.com",
      phone: "+965 6677 9900"
    },
    payment: {
      method: "debit_card",
      cardNumber: "**** **** **** 7777",
      cardHolder: "محمد جاسم",
      expiryMonth: "12",
      expiryYear: "2023",
      transactionId: "txn_777777777"
    }
  }
];

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>(SAMPLE_ORDERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isStatusUpdateOpen, setIsStatusUpdateOpen] = useState(false);
  const [isInvoiceView, setIsInvoiceView] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shipping.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shipping.email.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = filterStatus === "all" || order.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewOrderDetails = (order: Order, invoiceView = false) => {
    setSelectedOrder(order);
    setIsInvoiceView(invoiceView);
    setIsDetailsOpen(true);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus } 
        : order
    ));
    
    setIsStatusUpdateOpen(false);
    
    toast({
      title: "تم تحديث حالة الطلب",
      description: `تم تغيير حالة الطلب ${orderId} إلى ${getStatusText(newStatus)}`,
    });
  };

  const handleDeleteOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDeleteOrder = () => {
    if (selectedOrder) {
      setOrders(orders.filter(order => order.id !== selectedOrder.id));
      setIsDeleteConfirmOpen(false);
      
      toast({
        title: "تم حذف الطلب",
        description: `تم حذف الطلب ${selectedOrder.id} بنجاح`,
        variant: "destructive",
      });
      
      setSelectedOrder(null);
    }
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

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'قيد الانتظار';
      case 'processing': return 'قيد المعالجة';
      case 'shipped': return 'تم الشحن';
      case 'delivered': return 'تم التوصيل';
      case 'cancelled': return 'ملغي';
      default: return '';
    }
  };

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

  return (
    <div className="space-y-6" style={{ direction: "rtl" }}>
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">الطلبات</h1>
          <p className="text-muted-foreground">
            إدارة طلبات العملاء وتتبع حالتها ومعالجتها
          </p>
        </div>
        <Button
          variant="outline" 
          className="w-full md:w-auto button-hover-effect"
          onClick={() => {
            toast({
              title: "قريباً",
              description: "سيتم إضافة ميزة تصدير الطلبات قريباً",
            });
          }}
        >
          <Package className="mr-2 h-4 w-4" />
          تصدير الطلبات
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        <div className="relative md:col-span-2">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            placeholder="بحث عن طلب..." 
            className="pr-10" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full">
            <div className="flex items-center">
              <Filter className="h-4 w-4 ml-2" />
              <SelectValue placeholder="تصفية حسب الحالة" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الحالات</SelectItem>
            <SelectItem value="pending">قيد الانتظار</SelectItem>
            <SelectItem value="processing">قيد المعالجة</SelectItem>
            <SelectItem value="shipped">تم الشحن</SelectItem>
            <SelectItem value="delivered">تم التوصيل</SelectItem>
            <SelectItem value="cancelled">ملغي</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4 bg-gray-100/80 w-full overflow-auto flex-nowrap">
          <TabsTrigger value="all">جميع الطلبات</TabsTrigger>
          <TabsTrigger value="recent">الطلبات الحديثة</TabsTrigger>
          <TabsTrigger value="processing">قيد المعالجة</TabsTrigger>
          <TabsTrigger value="completed">مكتملة</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <Card className="border-0 shadow-sm overflow-hidden">
            <CardHeader className="pb-2 bg-gray-50/70 border-b">
              <CardTitle>قائمة الطلبات</CardTitle>
              <CardDescription>
                إجمالي {filteredOrders.length} طلب
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 max-h-[calc(100vh-18rem)] overflow-y-auto">
              {filteredOrders.length > 0 ? (
                <div className="grid gap-0 divide-y">
                  {filteredOrders.map((order) => (
                    <div 
                      key={order.id} 
                      className="p-4 transition-colors hover:bg-gray-50/50 cursor-pointer"
                      onClick={() => handleViewOrderDetails(order)}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start md:items-center gap-3">
                          <span className="inline-flex items-center justify-center bg-primary/10 text-primary h-10 w-10 rounded-full flex-shrink-0">
                            <Package className="h-5 w-5" />
                          </span>
                          <div>
                            <h3 className="font-semibold text-lg">{order.id}</h3>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <Calendar className="h-4 w-4 ml-1" />
                              <span>{formatDate(order.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 space-x-reverse">
                          {getStatusBadge(order.status)}
                          <span className="text-primary font-bold">{order.total.toFixed(2)} KWD</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                        <div className="flex gap-2 items-center">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm truncate">{order.shipping.name}</span>
                        </div>
                        <div className="flex gap-2 items-center">
                          <CreditCard className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm truncate">
                            {order.payment.method === 'credit_card' ? 'بطاقة ائتمان' : 
                             order.payment.method === 'debit_card' ? 'بطاقة سحب' :
                             order.payment.method === 'paypal' ? 'PayPal' : 'الدفع عند الاستلام'}
                          </span>
                        </div>
                        <div className="flex gap-2 items-center justify-between w-full">
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{order.items.length} منتج</span>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                              <DropdownMenuLabel>إدارة الطلب</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation();
                                handleViewOrderDetails(order);
                              }}>
                                <Package className="ml-2 h-4 w-4" />
                                عرض التفاصيل
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation();
                                handleViewOrderDetails(order, true);
                              }}>
                                <FileText className="ml-2 h-4 w-4" />
                                عرض كفاتورة
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation();
                                setSelectedOrder(order);
                                setIsStatusUpdateOpen(true);
                              }}>
                                <Truck className="ml-2 h-4 w-4" />
                                تحديث الحالة
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-red-500 focus:text-red-500"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteOrder(order);
                                }}
                              >
                                <XCircle className="ml-2 h-4 w-4" />
                                حذف الطلب
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-medium text-lg">لا توجد طلبات</h3>
                  <p className="text-muted-foreground mt-1">
                    لم يتم العثور على طلبات تطابق معايير البحث الخاصة بك
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recent">
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle>الطلبات الحديثة</CardTitle>
              <CardDescription>
                الطلبات التي تم استلامها خلال آخر 24 ساعة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-medium text-lg">قريباً</h3>
                <p className="text-muted-foreground mt-1">
                  سيتم تفعيل هذه الميزة قريباً
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="processing">
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle>الطلبات قيد المعالجة</CardTitle>
              <CardDescription>
                الطلبات التي تحتاج إلى معالجة وشحن
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <Truck className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-medium text-lg">قريباً</h3>
                <p className="text-muted-foreground mt-1">
                  سيتم تفعيل هذه الميزة قريباً
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed">
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle>الطلبات المكتملة</CardTitle>
              <CardDescription>
                الطلبات التي تم تسليمها بنجاح
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <CheckCircle2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-medium text-lg">قريباً</h3>
                <p className="text-muted-foreground mt-1">
                  سيتم تفعيل هذه الميزة قريباً
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {isMobile ? (
        <Drawer open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DrawerContent className="max-h-[90vh] overflow-y-auto">
            <DrawerHeader className="sticky top-0 z-10 bg-background">
              <DrawerTitle>تفاصيل الطلب #{selectedOrder?.id}</DrawerTitle>
              <DrawerDescription>
                عرض معلومات الطلب والمنتجات والشحن والدفع
              </DrawerDescription>
            </DrawerHeader>
            <div className="px-4 py-2 overflow-y-auto">
              {selectedOrder && <OrderDetails order={selectedOrder} isInvoice={isInvoiceView} />}
            </div>
            <DrawerFooter className="sticky bottom-0 z-10 bg-background">
              <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
                إغلاق
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col rounded-lg shadow-lg border-0">
            <DialogHeader className="sticky top-0 z-10 bg-background px-6 py-4 border-b">
              <DialogTitle>
                {isInvoiceView ? (
                  <div className="flex items-center gap-2 text-xl">
                    <FileText className="h-5 w-5 text-primary" />
                    فاتورة الطلب #{selectedOrder?.id}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-xl">
                    <Package className="h-5 w-5 text-primary" />
                    تفاصيل الطلب #{selectedOrder?.id}
                  </div>
                )}
              </DialogTitle>
              <DialogDescription className="mt-1 text-muted-foreground">
                {isInvoiceView ? 'عرض فاتورة الطلب وطباعتها' : 'عرض معلومات الطلب والمنتجات والشحن والدفع'}
              </DialogDescription>
            </DialogHeader>
            <div className="overflow-y-auto flex-1 px-6 py-4">
              {selectedOrder && <OrderDetails order={selectedOrder} isInvoice={isInvoiceView} />}
            </div>
            <DialogFooter className="sticky bottom-0 pt-2 bg-background border-t mt-auto p-4">
              <Button variant="outline" onClick={() => setIsDetailsOpen(false)} className="gap-2">
                <XCircle className="h-4 w-4" />
                إغلاق
              </Button>
              {isInvoiceView && (
                <Button 
                  className="gap-2 bg-primary hover:bg-primary/90"
                  onClick={() => {
                    toast({
                      title: "جاري الطباعة",
                      description: "تم إرسال الفاتورة للطباعة",
                    });
                    window.print();
                  }}
                >
                  <FileText className="ml-2 h-4 w-4" />
                  طباعة الفاتورة
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={isStatusUpdateOpen} onOpenChange={setIsStatusUpdateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تحديث حالة الطلب</DialogTitle>
            <DialogDescription>
              تغيير حالة الطلب #{selectedOrder?.id}
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <UpdateOrderStatus 
              order={selectedOrder} 
              onStatusUpdate={(status) => handleUpdateOrderStatus(selectedOrder.id, status)} 
              onCancel={() => setIsStatusUpdateOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              <DialogTitle>تأكيد حذف الطلب</DialogTitle>
            </div>
            <DialogDescription className="pt-2">
              هل أنت متأكد من رغبتك في حذف الطلب #{selectedOrder?.id}؟
              <div className="mt-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                <p className="font-medium text-destructive mb-1">تحذير:</p>
                <p className="text-sm">هذا الإجراء لا يمكن التراجع عنه، وسيتم حذف الطلب نهائيًا من قاعدة البيانات.</p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteConfirmOpen(false)}>
              إلغاء
            </Button>
            <Button variant="destructive" onClick={confirmDeleteOrder}>
              حذف الطلب
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Orders;
