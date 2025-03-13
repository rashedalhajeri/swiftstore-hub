
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDeviceType } from '@/hooks/use-device-type';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface StoreCategoryTabsProps {
  categories: string[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const StoreCategoryTabs = ({ 
  categories, 
  selectedCategory, 
  onCategorySelect 
}: StoreCategoryTabsProps) => {
  const deviceType = useDeviceType();
  const [showScrollArea, setShowScrollArea] = useState(false);
  
  // Check if we need scroll area on smaller screens
  useEffect(() => {
    const checkWidth = () => {
      if (deviceType === 'mobile' || deviceType === 'tablet') {
        setShowScrollArea(true);
      } else {
        setShowScrollArea(false);
      }
    };
    
    checkWidth();
  }, [deviceType]);
  
  if (showScrollArea) {
    return (
      <div className="w-full my-6">
        <ScrollArea className="w-full">
          <div className="flex space-x-2 py-1 px-1">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => onCategorySelect(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className="whitespace-nowrap"
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    );
  }
  
  return (
    <Tabs 
      defaultValue={selectedCategory} 
      value={selectedCategory}
      onValueChange={onCategorySelect}
      className="w-full my-6"
    >
      <TabsList className="w-full flex justify-center">
        {categories.map((category) => (
          <TabsTrigger key={category} value={category}>
            {category}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default StoreCategoryTabs;
