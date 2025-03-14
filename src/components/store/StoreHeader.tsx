
import React from 'react';
import { Store } from '@/types/store';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { AspectRatio } from '@/components/ui/aspect-ratio';

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
    return (
      <div className="w-full flex flex-col gap-4">
        <div className="w-full md:h-64 bg-gray-100 animate-pulse rounded-lg overflow-hidden">
          <AspectRatio ratio={isMobile ? 16/9 : 21/9}>
            <div className="w-full h-full bg-gray-100 animate-pulse" />
          </AspectRatio>
        </div>
        <div className="flex gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-100 animate-pulse"></div>
          <div className="flex-1 space-y-2">
            <div className="h-6 bg-gray-100 animate-pulse rounded w-1/3"></div>
            <div className="h-4 bg-gray-100 animate-pulse rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-background">
      {/* Hero section with banner */}
      <div className="mb-6 overflow-hidden">
        <div className="w-full rounded-b-2xl overflow-hidden shadow-sm relative">
          <AspectRatio ratio={isMobile ? 16/9 : 21/9}>
            <img 
              src={store?.banner || "/lovable-uploads/3e000195-9fd0-4623-9f95-8e97c92179fc.png"} 
              alt={`${store?.name || 'Store'} Banner`}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback image if the banner fails to load
                e.currentTarget.src = "/lovable-uploads/3e000195-9fd0-4623-9f95-8e97c92179fc.png";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            {store?.name && (
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <h1 className="text-white text-xl md:text-3xl font-bold tracking-tight text-shadow">
                  {store.name}
                </h1>
                {store.description && (
                  <p className="text-white/90 text-sm md:text-base mt-1 line-clamp-2 text-shadow">
                    {store.description}
                  </p>
                )}
              </div>
            )}
          </AspectRatio>
        </div>
      </div>
      
      {/* Category filter buttons */}
      <div className="px-4 mb-6">
        <div className="flex overflow-x-auto space-x-2 rtl:space-x-reverse no-scrollbar pb-1">
          <Button variant="default" size={isMobile ? "sm" : "default"} className="whitespace-nowrap rounded-full bg-gradient-to-r from-purple-500 to-pink-500 border-none hover:opacity-90">
            الكل
          </Button>
          <Button variant="outline" size={isMobile ? "sm" : "default"} className="whitespace-nowrap rounded-full border-gray-200 hover:bg-gray-50 hover:text-purple-500">
            جديدنا
          </Button>
          <Button variant="outline" size={isMobile ? "sm" : "default"} className="whitespace-nowrap rounded-full border-gray-200 hover:bg-gray-50 hover:text-purple-500">
            ملابس رسمية
          </Button>
          <Button variant="outline" size={isMobile ? "sm" : "default"} className="whitespace-nowrap rounded-full border-gray-200 hover:bg-gray-50 hover:text-purple-500">
            كاجوال
          </Button>
          <Button variant="outline" size={isMobile ? "sm" : "default"} className="whitespace-nowrap rounded-full border-gray-200 hover:bg-gray-50 hover:text-purple-500">
            إكسسوارات
          </Button>
        </div>
      </div>
      
      {/* Products Section Header */}
      <div className="flex justify-between items-center px-4 mb-4">
        <h2 className="text-base md:text-lg font-semibold">المنتجات المميزة</h2>
        <a href="#" className="text-xs md:text-sm text-purple-500 hover:text-purple-700 transition-colors">عرض الكل</a>
      </div>
    </div>
  );
};

export default StoreHeader;
