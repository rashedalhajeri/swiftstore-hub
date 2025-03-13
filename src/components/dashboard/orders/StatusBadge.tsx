
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Truck, 
  CheckCircle, 
  XCircle, 
  Package2, 
  Loader2
} from 'lucide-react';

type StatusType = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

interface StatusBadgeProps {
  status: StatusType;
}

export const statusMap: { [key: string]: { label: string; color: string; icon: React.ComponentType<any> } } = {
  pending: { label: "قيد الانتظار", color: "yellow", icon: Clock },
  processing: { label: "جاري المعالجة", color: "blue", icon: Package2 },
  shipped: { label: "تم الشحن", color: "purple", icon: Truck },
  delivered: { label: "تم التسليم", color: "green", icon: CheckCircle },
  cancelled: { label: "ملغى", color: "red", icon: XCircle },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const StatusIcon = statusMap[status].icon;
  
  return (
    <Badge className={`bg-${statusMap[status].color}-500 hover:bg-${statusMap[status].color}-600`}>
      <StatusIcon className="ml-2 h-4 w-4" />
      {statusMap[status].label}
    </Badge>
  );
};
