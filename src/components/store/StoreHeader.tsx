
import React from 'react';
import { Store } from '@/types/store';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface StoreHeaderProps {
  store: Store | null;
  error: string | null;
  isLoading: boolean;
  onRetry?: () => void;
}

const StoreHeader = ({
  store,
  error,
  isLoading,
  onRetry
}: StoreHeaderProps) => {
  const isMobile = useIsMobile();

  // تحسين عرض الخطأ بطريقة أفضل للمستخدم
  if (error) {
    return (
      <div className="w-full max-w-md mx-auto py-12 px-4">
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>خطأ</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        {onRetry && (
          <Button 
            onClick={onRetry} 
            className="w-full mb-4"
          >
            إعادة المحاولة
          </Button>
        )}
        <Button 
          onClick={() => window.history.back()} 
          className="w-full mb-4"
        >
          العودة
        </Button>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => window.location.href = '/'}
        >
          الذهاب إلى الصفحة الرئيسية
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return <div className="w-full flex flex-col gap-4">
        <div className="w-full h-48 md:h-64 bg-gray-100 animate-pulse rounded-lg"></div>
        <div className="flex gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-100 animate-pulse"></div>
          <div className="flex-1 space-y-2">
            <div className="h-6 bg-gray-100 animate-pulse rounded w-1/3"></div>
            <div className="h-4 bg-gray-100 animate-pulse rounded w-2/3"></div>
          </div>
        </div>
      </div>;
  }

  return (
    <div className="w-full bg-background">
      {/* Top promotional banner */}
      <div className="mx-4 mb-6">
        <div className="w-full rounded-xl overflow-hidden relative">
          <img 
            src={store?.banner || "/lovable-uploads/3e000195-9fd0-4623-9f95-8e97c92179fc.png"} 
            alt={`${store?.name || 'Store'} Banner`}
            className="w-full h-auto object-cover"
            onError={(e) => {
              // Fallback image if the banner fails to load
              e.currentTarget.src = "/lovable-uploads/3e000195-9fd0-4623-9f95-8e97c92179fc.png";
            }}
          />
        </div>
      </div>
      
      {/* Category filter buttons */}
      <div className="px-4 mb-6">
        <div className="flex overflow-x-auto space-x-2 rtl:space-x-reverse no-scrollbar">
          <Button variant="outline" className="whitespace-nowrap rounded-full bg-black text-white border-none">
            ALL
          </Button>
          <Button variant="outline" className="whitespace-nowrap rounded-full text-black">
            NEW IN
          </Button>
          <Button variant="outline" className="whitespace-nowrap rounded-full text-black">
            PARTYCHIC
          </Button>
          <Button variant="outline" className="whitespace-nowrap rounded-full text-black">
            CASUAL
          </Button>
        </div>
      </div>
      
      {/* Popular Products Header */}
      <div className="flex justify-between items-center px-4 mb-3">
        <h2 className="text-base font-semibold">POPULAR PRODUCTS</h2>
        <a href="/" className="text-xs text-gray-500">View All</a>
      </div>
    </div>
  );
};

export default StoreHeader;
