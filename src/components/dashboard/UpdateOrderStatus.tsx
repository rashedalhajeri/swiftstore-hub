
import React, { useState, useEffect } from 'react';
import { Order } from '@/types/store';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  Truck, 
  CheckCircle, 
  XCircle,
  Loader2,
  AlertCircle
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
  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    // Track if status has changed from original
    setHasChanged(status !== order.status);
  }, [status, order.status]);

  const handleStatusUpdate = () => {
    if (!hasChanged) return;
    
    setIsUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      onStatusUpdate(status);
      setIsUpdating(false);
      
      // Show success toast with the new status
      toast.success(`تم تحديث الحالة إلى ${getStatusLabel(status)}`, {
        description: `الطلب رقم #${order.id} تم تحديث حالته بنجاح`
      });
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

  // Function to get appropriate icon color based on status
  const getStatusIconColor = (orderStatus: Order['status']): string => {
    switch (orderStatus) {
      case 'pending':
        return 'text-yellow-600';
      case 'processing':
        return 'text-blue-600';
      case 'shipped':
        return 'text-indigo-600';
      case 'delivered':
        return 'text-green-600';
      case 'cancelled':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  // Function to render the appropriate icon
  const renderStatusIcon = (orderStatus: Order['status']) => {
    const color = getStatusIconColor(orderStatus);
    
    switch (orderStatus) {
      case 'pending':
        return <Clock className={`h-4 w-4 ${color}`} />;
      case 'processing':
        return <Loader2 className={`h-4 w-4 ${color}`} />;
      case 'shipped':
        return <Truck className={`h-4 w-4 ${color}`} />;
      case 'delivered':
        return <CheckCircle className={`h-4 w-4 ${color}`} />;
      case 'cancelled':
        return <XCircle className={`h-4 w-4 ${color}`} />;
      default:
        return <AlertCircle className={`h-4 w-4 text-gray-600`} />;
    }
  };

  return (
    <div className="py-4" style={{ direction: "rtl" }}>
      <div className="mb-4 px-1">
        <h3 className="text-sm font-medium text-muted-foreground">الرجاء اختيار الحالة الجديدة للطلب رقم #{order.id}</h3>
      </div>
      
      <RadioGroup 
        value={status} 
        onValueChange={(value) => setStatus(value as Order['status'])}
        className="space-y-4"
      >
        <div className={`flex items-center space-x-2 space-x-reverse rounded-md p-2 transition-colors ${status === 'pending' ? 'bg-muted/50' : ''}`}>
          <RadioGroupItem value="pending" id="pending" />
          <Label htmlFor="pending" className="flex flex-col cursor-pointer">
            <span className="flex items-center gap-2">
              {renderStatusIcon('pending')}
              <span>قيد الانتظار</span>
            </span>
            <span className="text-xs text-muted-foreground pr-6">
              {getStatusDescription('pending')}
            </span>
          </Label>
        </div>
        
        <div className={`flex items-center space-x-2 space-x-reverse rounded-md p-2 transition-colors ${status === 'processing' ? 'bg-muted/50' : ''}`}>
          <RadioGroupItem value="processing" id="processing" />
          <Label htmlFor="processing" className="flex flex-col cursor-pointer">
            <span className="flex items-center gap-2">
              {renderStatusIcon('processing')}
              <span>قيد المعالجة</span>
            </span>
            <span className="text-xs text-muted-foreground pr-6">
              {getStatusDescription('processing')}
            </span>
          </Label>
        </div>
        
        <div className={`flex items-center space-x-2 space-x-reverse rounded-md p-2 transition-colors ${status === 'shipped' ? 'bg-muted/50' : ''}`}>
          <RadioGroupItem value="shipped" id="shipped" />
          <Label htmlFor="shipped" className="flex flex-col cursor-pointer">
            <span className="flex items-center gap-2">
              {renderStatusIcon('shipped')}
              <span>تم الشحن</span>
            </span>
            <span className="text-xs text-muted-foreground pr-6">
              {getStatusDescription('shipped')}
            </span>
          </Label>
        </div>
        
        <div className={`flex items-center space-x-2 space-x-reverse rounded-md p-2 transition-colors ${status === 'delivered' ? 'bg-muted/50' : ''}`}>
          <RadioGroupItem value="delivered" id="delivered" />
          <Label htmlFor="delivered" className="flex flex-col cursor-pointer">
            <span className="flex items-center gap-2">
              {renderStatusIcon('delivered')}
              <span>تم التوصيل</span>
            </span>
            <span className="text-xs text-muted-foreground pr-6">
              {getStatusDescription('delivered')}
            </span>
          </Label>
        </div>
        
        <div className={`flex items-center space-x-2 space-x-reverse rounded-md p-2 transition-colors ${status === 'cancelled' ? 'bg-muted/50' : ''}`}>
          <RadioGroupItem value="cancelled" id="cancelled" />
          <Label htmlFor="cancelled" className="flex flex-col cursor-pointer">
            <span className="flex items-center gap-2">
              {renderStatusIcon('cancelled')}
              <span>ملغي</span>
            </span>
            <span className="text-xs text-muted-foreground pr-6">
              {getStatusDescription('cancelled')}
            </span>
          </Label>
        </div>
      </RadioGroup>
      
      <DialogFooter className="mt-6 gap-2">
        <Button variant="outline" onClick={onCancel}>
          إلغاء
        </Button>
        <Button 
          disabled={!hasChanged || isUpdating}
          onClick={handleStatusUpdate}
          className={!hasChanged ? "opacity-50" : ""}
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
