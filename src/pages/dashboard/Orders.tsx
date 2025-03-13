import React, { useState, useEffect } from 'react';
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
  Loader2,
  Eye,
  Trash2
} from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
  DialogFooter
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { OrderDetails } from "@/components/dashboard/OrderDetails";
import { UpdateOrderStatus } from "@/components/dashboard/UpdateOrderStatus";
import { Order } from "@/types/store";
import { orderService } from "@/services/api";
import { toast } from 'sonner';

const statusMap: { [key: string]: { label: string; color: string; icon: React.ComponentType<any> } } = {
  pending: { label: "قيد الانتظار", color: "yellow", icon: Clock },
  processing: { label: "جاري المعالجة", color: "blue", icon: Package2 },
  shipped: { label: "تم الشحن", color: "purple", icon: Truck },
  delivered: { label: "تم التسليم", color: "green", icon: CheckCircle },
  cancelled: { label: "ملغى", color: "red", icon: XCircle },
};

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isUpdateStatusOpen, setIsUpdateStatusOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await orderService.getUserOrders();
        
        const formattedOrders = data.map((dbOrder: any) => {
          const items = dbOrder.order_items.map((item: any) => ({
            product: item.product,
            quantity: item.quantity
          }));

          return {
            id: dbOrder.id,
            items,
            total: dbOrder.total,
            status: dbOrder.status || 'pending',
            shipping: dbOrder.shipping_info,
            payment: dbOrder.payment_info || { method: 'cod' },
            createdAt: dbOrder.created_at
          };
        });
        
        setOrders(formattedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('حدث خطأ أثناء تحميل الطلبات');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

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

  const handleStatusUpdate = async (newStatus: string) => {
    if (selectedOrder) {
      setIsLoading(true);
      try {
        await orderService.updateOrderStatus(selectedOrder.id, newStatus);
        
        setOrders(orders.map(order =>
          order.id === selectedOrder.id ? { ...order, status: newStatus as any } : order
        ));
        
        setIsUpdateStatusOpen(false);
        toast.success('تم تحديث حالة الطلب بنجاح');
      } catch (error) {
        console.error('Error updating order status:', error);
        toast.error('حدث خطأ أثناء تحديث حالة الطلب');
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">جاري تحميل الطلبات...</p>
        </div>
      </div>
    );
  }

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

      {orders.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <Package2 className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">لا توجد طلبات</h3>
            <p className="text-muted-foreground text-center max-w-md">
              لم يتم تسجيل أي طلبات حتى الآن. عندما يقوم العملاء بإنشاء طلبات، ستظهر هنا.
            </p>
          </CardContent>
        </Card>
      ) : (
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
                            {React.createElement(statusMap[order.status].icon, { 
                              className: "ml-2 h-4 w-4" 
                            })}
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
                                {React.createElement(statusMap[order.status].icon, { 
                                  className: "ml-2 h-4 w-4" 
                                })}
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
      )}

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
              onCancel={() => setIsUpdateStatusOpen(false)}
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
              {orders.length > 0
                ? (orders.reduce((total, order) => total + order.total, 0) / orders.length).toFixed(3)
                : "0.000"} KWD
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
