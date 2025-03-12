
import { useState } from 'react';
import { 
  Package, 
  Search, 
  Filter,
  ChevronRight,
  Calendar,
  Clock,
  CreditCard,
  Truck,
  XCircle,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  MoreHorizontal
} from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

// Sample orders data
const SAMPLE_ORDERS: Order[] = [
  {
    id: "ORD-001",
    createdAt: "2023-06-15T14:30:00Z",
    status: "processing",
    total: 599.97,
    items: [
      {
        product: {
          id: 1,
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
          id: 2,
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
          id: 7,
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
          id: 8,
          name: "مجموعة أواني طبخ",
          price: 89.99,
          image: "https://via.placeholder.com/150",
          category: "مستلزمات المطبخ",
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
          id: 5,
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
          id: 6,
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
          id: 10,
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
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Filtered orders based on search term and status filter
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shipping.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shipping.email.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = filterStatus === "all" || order.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
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
          className="button-hover-effect"
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

      <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            placeholder="بحث عن طلب..." 
            className="pr-10" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="تصفية حسب الحالة" />
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
        <TabsList className="mb-4">
          <TabsTrigger value="all">جميع الطلبات</TabsTrigger>
          <TabsTrigger value="recent">الطلبات الحديثة</TabsTrigger>
          <TabsTrigger value="processing">قيد المعالجة</TabsTrigger>
          <TabsTrigger value="completed">مكتملة</TabsTrigger>
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
              {filteredOrders.length > 0 ? (
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <Card key={order.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row border-b">
                        <div className="p-4 md:w-3/4 space-y-3">
                          <div className="flex flex-col md:flex-row md:items-center justify-between">
                            <div className="flex items-center gap-3">
                              <h3 className="font-semibold text-lg">طلب #{order.id}</h3>
                              {getStatusBadge(order.status)}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground mt-2 md:mt-0">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span dir="ltr">{formatDate(order.createdAt)}</span>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                            <div className="flex flex-col">
                              <span className="text-sm text-muted-foreground">العميل</span>
                              <span className="font-medium">{order.shipping.name}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm text-muted-foreground">طريقة الدفع</span>
                              <div className="flex items-center">
                                <CreditCard className="h-4 w-4 mr-1" />
                                <span className="font-medium">
                                  {order.payment.method === 'credit_card' ? 'بطاقة ائتمان' : 
                                   order.payment.method === 'debit_card' ? 'بطاقة سحب' :
                                   order.payment.method === 'paypal' ? 'PayPal' : 'الدفع عند الاستلام'}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm text-muted-foreground">إجمالي الطلب</span>
                              <span className="font-medium">{order.total.toFixed(2)} KWD</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-3 pt-2 text-sm">
                            <span className="text-muted-foreground">المنتجات:</span>
                            {order.items.map((item, idx) => (
                              <span key={idx}>
                                {item.product.name} ({item.quantity})
                                {idx < order.items.length - 1 ? '، ' : ''}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex-shrink-0 border-t md:border-t-0 md:border-r p-4 md:w-1/4">
                          <div className="flex flex-col h-full justify-between gap-2">
                            <Button 
                              variant="default" 
                              className="w-full justify-between"
                              onClick={() => handleViewOrderDetails(order)}
                            >
                              <span>عرض التفاصيل</span>
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                            
                            <Button 
                              variant="outline" 
                              className="w-full justify-between"
                              onClick={() => {
                                setSelectedOrder(order);
                                setIsStatusUpdateOpen(true);
                              }}
                            >
                              <span>تحديث الحالة</span>
                              <Clock className="h-4 w-4" />
                            </Button>
                            
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="w-full justify-between">
                                  <span>المزيد من الخيارات</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>خيارات الطلب</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => {
                                  toast({
                                    title: "قريباً",
                                    description: "سيتم إضافة ميزة طباعة الفاتورة قريباً",
                                  });
                                }}>
                                  طباعة الفاتورة
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => {
                                  toast({
                                    title: "قريباً",
                                    description: "سيتم إضافة ميزة إرسال تأكيد البريد الإلكتروني قريباً",
                                  });
                                }}>
                                  إرسال تأكيد بالبريد الإلكتروني
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  className="text-red-500 focus:text-red-500"
                                  onClick={() => {
                                    if (order.status !== 'cancelled') {
                                      handleUpdateOrderStatus(order.id, 'cancelled');
                                    } else {
                                      toast({
                                        title: "تم إلغاء الطلب بالفعل",
                                        description: "هذا الطلب ملغى بالفعل",
                                      });
                                    }
                                  }}
                                >
                                  إلغاء الطلب
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    </Card>
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
          <Card>
            <CardHeader>
              <CardTitle>الطلبات الحديثة</CardTitle>
              <CardDescription>
                الطلبات التي تم استلامها خلال آخر 24 ساعة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-medium text-lg">قريباً</h3>
                <p className="text-muted-foreground mt-1">
                  سيتم تفعيل هذه الميزة قريباً
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="processing">
          <Card>
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
          <Card>
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

      {/* Order Details Dialog/Drawer */}
      {isMobile ? (
        <Drawer open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>تفاصيل الطلب #{selectedOrder?.id}</DrawerTitle>
              <DrawerDescription>
                عرض معلومات الطلب والمنتجات والشحن والدفع
              </DrawerDescription>
            </DrawerHeader>
            <div className="px-4 pb-4">
              {selectedOrder && <OrderDetails order={selectedOrder} />}
            </div>
            <DrawerFooter>
              <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
                إغلاق
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>تفاصيل الطلب #{selectedOrder?.id}</DialogTitle>
              <DialogDescription>
                عرض معلومات الطلب والمنتجات والشحن والدفع
              </DialogDescription>
            </DialogHeader>
            {selectedOrder && <OrderDetails order={selectedOrder} />}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
                إغلاق
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Update Order Status Dialog */}
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
    </div>
  );
};

export default Orders;
