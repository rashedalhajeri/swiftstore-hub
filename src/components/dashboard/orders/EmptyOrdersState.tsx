
import React from 'react';
import { Package2 } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

export const EmptyOrdersState: React.FC = () => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-10">
        <Package2 className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium mb-2">لا توجد طلبات</h3>
        <p className="text-muted-foreground text-center max-w-md">
          لم يتم تسجيل أي طلبات حتى الآن. عندما يقوم العملاء بإنشاء طلبات، ستظهر هنا.
        </p>
      </CardContent>
    </Card>
  );
};
