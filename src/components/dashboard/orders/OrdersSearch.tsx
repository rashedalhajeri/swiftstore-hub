
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface OrdersSearchProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const OrdersSearch: React.FC<OrdersSearchProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
      <div className="relative w-full md:w-96">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
        <Input
          placeholder="بحث عن طلب..."
          className="pr-10"
          value={searchTerm}
          onChange={onSearchChange}
        />
      </div>
      <Button variant="outline" className="flex gap-2">
        <Filter size={16} />
        <span>تصفية</span>
      </Button>
    </div>
  );
};
