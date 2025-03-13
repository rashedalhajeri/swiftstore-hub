
import React from 'react';
import { Loader2 } from 'lucide-react';
import Logo from './Logo';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary/10">
      <div className="relative mb-8">
        <Logo size="lg" />
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
        </div>
      </div>
      
      <div className="text-center max-w-md">
        <h2 className="text-xl font-medium text-foreground mb-1">جاري التحميل</h2>
        <p className="text-sm text-muted-foreground">
          نقوم بتجهيز كل شيء من أجلك...
        </p>
      </div>
      
      <div className="mt-8 w-48 h-1.5 bg-secondary rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full animate-pulse-fast w-2/3"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
