
import React, { useState } from 'react';
import { Order } from '@/types/store';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  Truck, 
  CheckCircle, 
  XCircle,
  Loader2
} from 'lucide-react';
import { DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface UpdateOrderStatusProps {
  order: Order;
  onStatusUpdate: (status: Order['status']) => void;
  onCancel: () => void;
}

export const UpdateOrderStatus: React.FC<UpdateOrderStatusProps> = ({ 
  order, 
  onStatusUpdate, 
  onCancel 
}) => {
  const [status, setStatus] = useState<Order['status']>(order.status);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusUpdate = () => {
    setIsUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      onStatusUpdate(status);
      setIsUpdating(false);
      
      // Show success toast
      toast.success(`تم تحديث الحالة إلى ${getStatusLabel(status)}`);
    }, 1000);
  };

  // Function to get Arabic status label
  const getStatusLabel = (orderStatus: Order['status']): string => {
    switch (orderStatus) {
      case 'pending':
        return 'قيد الانتظار';
      case 'processing':
        return 'قيد المعالجة';
      case 'shipped':
        return 'تم الشحن';
      case 'delivered':
        return 'تم التوصيل';
      case 'cancelled':
        return 'ملغي';
      default:
        return orderStatus;
    }
  };

  // Function to get status description
  const getStatusDescription = (orderStatus: Order['status']): string => {
    switch (orderStatus) {
      case 'pending':
        return 'الطلب مستلم وبانتظار المعالجة';
      case 'processing':
        return 'جاري تجهيز وتحضير الطلب';
      case 'shipped':
        return 'تم إرسال الطلب مع شركة الشحن';
      case 'delivered':
        return 'تم توصيل الطلب للعميل بنجاح';
      case 'cancelled':
        return 'تم إلغاء الطلب';
      default:
        return '';
    }
  };

  return (
    <div className="py-4" style={{ direction: "rtl" }}>
      <RadioGroup 
        value={status} 
        onValueChange={(value) => setStatus(value as Order['status'])}
        className="space-y-4"
      >
        <div className="flex items-center space-x-2 space-x-reverse">
          <RadioGroupItem value="pending" id="pending" />
          <Label htmlFor="pending" className="flex flex-col cursor-pointer">
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-yellow-600" />
              <span>قيد الانتظار</span>
            </span>
            <span className="text-xs text-muted-foreground pr-6">
              {getStatusDescription('pending')}
            </span>
          </Label>
        </div>
        
        <div className="flex items-center space-x-2 space-x-reverse">
          <RadioGroupItem value="processing" id="processing" />
          <Label htmlFor="processing" className="flex flex-col cursor-pointer">
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 text-blue-600" />
              <span>قيد المعالجة</span>
            </span>
            <span className="text-xs text-muted-foreground pr-6">
              {getStatusDescription('processing')}
            </span>
          </Label>
        </div>
        
        <div className="flex items-center space-x-2 space-x-reverse">
          <RadioGroupItem value="shipped" id="shipped" />
          <Label htmlFor="shipped" className="flex flex-col cursor-pointer">
            <span className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-indigo-600" />
              <span>تم الشحن</span>
            </span>
            <span className="text-xs text-muted-foreground pr-6">
              {getStatusDescription('shipped')}
            </span>
          </Label>
        </div>
        
        <div className="flex items-center space-x-2 space-x-reverse">
          <RadioGroupItem value="delivered" id="delivered" />
          <Label htmlFor="delivered" className="flex flex-col cursor-pointer">
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>تم التوصيل</span>
            </span>
            <span className="text-xs text-muted-foreground pr-6">
              {getStatusDescription('delivered')}
            </span>
          </Label>
        </div>
        
        <div className="flex items-center space-x-2 space-x-reverse">
          <RadioGroupItem value="cancelled" id="cancelled" />
          <Label htmlFor="cancelled" className="flex flex-col cursor-pointer">
            <span className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-600" />
              <span>ملغي</span>
            </span>
            <span className="text-xs text-muted-foreground pr-6">
              {getStatusDescription('cancelled')}
            </span>
          </Label>
        </div>
      </RadioGroup>
      
      <DialogFooter className="mt-6">
        <Button variant="outline" onClick={onCancel}>
          إلغاء
        </Button>
        <Button 
          disabled={status === order.status || isUpdating}
          onClick={handleStatusUpdate}
          className={status === order.status ? "opacity-50" : ""}
        >
          {isUpdating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              جاري التحديث...
            </>
          ) : (
            'تحديث الحالة'
          )}
        </Button>
      </DialogFooter>
    </div>
  );
};
