
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
    }, 1000);
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
          <Label htmlFor="pending" className="flex items-center gap-2 cursor-pointer">
            <Clock className="h-4 w-4 text-yellow-600" />
            <span>قيد الانتظار</span>
          </Label>
        </div>
        
        <div className="flex items-center space-x-2 space-x-reverse">
          <RadioGroupItem value="processing" id="processing" />
          <Label htmlFor="processing" className="flex items-center gap-2 cursor-pointer">
            <Loader2 className="h-4 w-4 text-blue-600" />
            <span>قيد المعالجة</span>
          </Label>
        </div>
        
        <div className="flex items-center space-x-2 space-x-reverse">
          <RadioGroupItem value="shipped" id="shipped" />
          <Label htmlFor="shipped" className="flex items-center gap-2 cursor-pointer">
            <Truck className="h-4 w-4 text-indigo-600" />
            <span>تم الشحن</span>
          </Label>
        </div>
        
        <div className="flex items-center space-x-2 space-x-reverse">
          <RadioGroupItem value="delivered" id="delivered" />
          <Label htmlFor="delivered" className="flex items-center gap-2 cursor-pointer">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>تم التوصيل</span>
          </Label>
        </div>
        
        <div className="flex items-center space-x-2 space-x-reverse">
          <RadioGroupItem value="cancelled" id="cancelled" />
          <Label htmlFor="cancelled" className="flex items-center gap-2 cursor-pointer">
            <XCircle className="h-4 w-4 text-red-600" />
            <span>ملغي</span>
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
