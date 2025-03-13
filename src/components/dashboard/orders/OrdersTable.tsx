
import React from 'react';
import { Order } from '@/types/store';
import { StatusBadge } from './StatusBadge';
import { Eye, MoreHorizontal, Package, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface OrdersTableProps {
  orders: Order[];
  onViewDetails: (order: Order) => void;
  onUpdateStatus: (order: Order) => void;
  filterStatus?: string;
}

export const OrdersTable: React.FC<OrdersTableProps> = ({ 
  orders, 
  onViewDetails, 
  onUpdateStatus,
  filterStatus
}) => {
  // Filter orders if filterStatus is provided
  const filteredOrders = filterStatus && filterStatus !== 'all' 
    ? orders.filter(order => order.status === filterStatus)
    : orders;

  return (
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
              <StatusBadge status={order.status} />
            </TableCell>
            <TableCell>
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="icon" onClick={() => onViewDetails(order)}>
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
                    <DropdownMenuItem onClick={() => onUpdateStatus(order)}>
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
  );
};
