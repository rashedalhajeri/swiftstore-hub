
import React from 'react';
import { Order } from '@/types/store';
import { Package, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface OrdersStatsProps {
  orders: Order[];
}

export const OrdersStats: React.FC<OrdersStatsProps> = ({ orders }) => {
  return (
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
  );
};
