
import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import Logo from './Logo';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const LoadingScreen = () => {
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  // إضافة مؤقت للتعامل مع حالات التعليق
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoadingTimeout(true);
      // إذا كان المستخدم مسجلاً بالفعل، نحاول التوجيه مرة أخرى
      if (user) {
        navigate('/dashboard', { replace: true });
      }
    }, 5000);
    
    return () => clearTimeout(timeoutId);
  }, [user, navigate]);

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
        
        {loadingTimeout && (
          <div className="mt-4 p-3 bg-orange-100 text-orange-800 rounded-md text-xs">
            يبدو أن التحميل يستغرق وقتاً أطول من المعتاد. جاري المحاولة مرة أخرى...
          </div>
        )}
      </div>
      
      <div className="mt-8 w-48 h-1.5 bg-secondary rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full animate-pulse-fast w-2/3"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
