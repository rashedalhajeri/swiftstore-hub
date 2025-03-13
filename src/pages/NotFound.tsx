
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Logo from "@/components/Logo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center">
      <div className="mb-8">
        <Logo size="lg" />
      </div>
      
      <h1 className="text-6xl font-bold text-primary mb-4 animate-fade-in">404</h1>
      
      <div className="relative w-24 h-px bg-border mx-auto my-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-background border border-border"></div>
      </div>
      
      <p className="text-xl text-foreground mb-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        الصفحة غير موجودة
      </p>
      <p className="text-muted-foreground mb-8 max-w-md animate-fade-in" style={{ animationDelay: '0.2s' }}>
        عذرًا، الصفحة التي تبحث عنها غير موجودة أو تم نقلها أو حذفها.
      </p>
      
      <Button asChild className="button-hover-effect animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <Link to="/">
          <Home className="mr-2 h-4 w-4" />
          العودة إلى الصفحة الرئيسية
        </Link>
      </Button>
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 bottom-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/3 filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-primary/3 filter blur-3xl"></div>
      </div>
    </div>
  );
};

export default NotFound;
