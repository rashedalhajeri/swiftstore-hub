
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Loader2,
  XCircle
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { OrdersStats } from "@/components/dashboard/orders/OrdersStats";
import { OrdersTable } from "@/components/dashboard/orders/OrdersTable";
import { EmptyOrdersState } from "@/components/dashboard/orders/EmptyOrdersState";
import { OrdersSearch } from "@/components/dashboard/orders/OrdersSearch";
import { statusMap } from "@/components/dashboard/orders/StatusBadge";
import { Order } from "@/types/store";
import { orderService } from "@/services/api";
import { toast } from 'sonner';

const Orders = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isUpdateStatusOpen, setIsUpdateStatusOpen] = useState(false);

  const { 
    data: orders = [], 
    isLoading,
    isError
  } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const data = await orderService.getUserOrders();
      
      return data.map((dbOrder: any) => {
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
    },
    staleTime: 1000 * 60 * 5, // 5 دقائق قبل إعادة جلب البيانات
    gcTime: 1000 * 60 * 30, // 30 دقيقة للاحتفاظ بالبيانات في الذاكرة
  });

  const updateOrderMutation = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string, status: string }) => {
      return await orderService.updateOrderStatus(orderId, status);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      setIsUpdateStatusOpen(false);
      toast.success('تم تحديث حالة الطلب بنجاح');
    },
    onError: (error) => {
      console.error('Error updating order status:', error);
      toast.error('حدث خطأ أثناء تحديث حالة الطلب');
    }
  });

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
      updateOrderMutation.mutate({ orderId: selectedOrder.id, status: newStatus });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">جاري تحميل الطلبات...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="flex flex-col items-center gap-2 text-center">
          <XCircle className="h-12 w-12 text-destructive" />
          <h3 className="text-xl font-medium">فشل تحميل الطلبات</h3>
          <p className="text-muted-foreground mt-1 max-w-md">
            حدث خطأ أثناء تحميل الطلبات. يرجى تحديث الصفحة أو المحاولة مرة أخرى لاحقًا.
          </p>
          <Button 
            onClick={() => queryClient.invalidateQueries({ queryKey: ['orders'] })}
            className="mt-4"
          >
            إعادة المحاولة
          </Button>
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

      <OrdersSearch searchTerm={searchTerm} onSearchChange={handleSearch} />

      {orders.length === 0 ? (
        <EmptyOrdersState />
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
                <OrdersTable 
                  orders={filteredOrders} 
                  onViewDetails={handleOpenDetails} 
                  onUpdateStatus={handleUpdateStatus} 
                />
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
                  <OrdersTable 
                    orders={filteredOrders} 
                    onViewDetails={handleOpenDetails} 
                    onUpdateStatus={handleUpdateStatus} 
                    filterStatus={status} 
                  />
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
            <Button 
              variant="outline" 
              onClick={() => setIsUpdateStatusOpen(false)} 
              disabled={updateOrderMutation.isPending}
            >
              إلغاء
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <OrdersStats orders={orders} />
    </div>
  );
};

export default Orders;
