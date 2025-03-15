
import { ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const Logo = ({ className, size = 'default', variant = 'dark', animated = false }: { 
  className?: string; 
  size?: 'small' | 'default' | 'large' | 'md' | 'lg'; 
  variant?: 'dark' | 'light';
  animated?: boolean;
}) => {
  const isMobile = useIsMobile();
  
  // تحديد حجم الشعار بناء على الخاصية المستلمة
  const logoSize = {
    small: 'w-4 h-4',
    default: isMobile ? 'w-5 h-5' : 'w-6 h-6',
    large: 'w-8 h-8',
    md: 'w-6 h-6',
    lg: 'w-10 h-10'
  }[size];
  
  // تحديد حجم النص بناء على الخاصية المستلمة
  const textSize = {
    small: 'text-lg',
    default: isMobile ? 'text-xl' : 'text-2xl',
    large: 'text-3xl',
    md: 'text-2xl',
    lg: 'text-4xl'
  }[size];

  const textColor = variant === 'light' ? 'text-white' : 'text-slate-800';
  const gradientColors = variant === 'light' 
    ? 'from-indigo-400 to-purple-400' 
    : 'from-indigo-500 to-purple-500';

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("relative group", animated && "hover:scale-105 transition-transform duration-300")}>
        <div className={cn(
          "absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur-lg opacity-75",
          animated && "group-hover:opacity-100 transition-all duration-500"
        )}></div>
        <div className={cn(
          `relative bg-gradient-to-r ${gradientColors} p-2 md:p-2.5 rounded-xl`,
          animated && "transform-gpu group-hover:scale-105 group-hover:rotate-3 transition-all duration-500"
        )}>
          <ShoppingBag className={cn(
            logoSize, 
            "text-white", 
            animated && "transform-gpu group-hover:-rotate-6 transition-transform duration-500"
          )} />
        </div>
      </div>
      <div>
        <h1 className={cn("font-bold tracking-tight", textSize)}>
          <span className={cn(
            "bg-gradient-to-r bg-clip-text text-transparent",
            variant === 'light' ? 'from-indigo-300 to-purple-300' : 'from-indigo-500 to-purple-500'
          )}>
            Linok
          </span>
          <span className={textColor}>.me</span>
        </h1>
      </div>
    </div>
  );
};

export default Logo;
