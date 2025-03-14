
import { ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const Logo = ({ className, size = 'default' }: { className?: string; size?: 'small' | 'default' | 'large' }) => {
  const isMobile = useIsMobile();
  
  // تحديد حجم الشعار بناء على الخاصية المستلمة
  const logoSize = {
    small: 'w-4 h-4',
    default: isMobile ? 'w-5 h-5' : 'w-6 h-6',
    large: 'w-8 h-8'
  }[size];
  
  // تحديد حجم النص بناء على الخاصية المستلمة
  const textSize = {
    small: 'text-lg',
    default: isMobile ? 'text-xl' : 'text-2xl',
    large: 'text-3xl'
  }[size];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-all duration-500"></div>
        <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 p-2 md:p-2.5 rounded-xl transform-gpu group-hover:scale-105 group-hover:rotate-3 transition-all duration-500">
          <ShoppingBag className={cn(logoSize, "text-white transform-gpu group-hover:-rotate-6 transition-transform duration-500")} />
        </div>
      </div>
      <div>
        <h1 className={cn("font-bold tracking-tight", textSize)}>
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Linok
          </span>
          <span className="text-slate-800">.me</span>
        </h1>
      </div>
    </div>
  );
};

export default Logo;
