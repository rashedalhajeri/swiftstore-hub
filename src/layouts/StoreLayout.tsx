
import { useState, useEffect } from 'react';
import { useStore } from '@/contexts/StoreContext';
import StoreNavbar from '@/components/store/StoreNavbar';
import StoreFooter from '@/components/store/StoreFooter';
import StoreMobileNav from '@/components/store/StoreMobileNav';

interface StoreLayoutProps {
  children: React.ReactNode;
}

const StoreLayout = ({ children }: StoreLayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const { store } = useStore();
  
  // تطبيق اللون الأساسي من المتجر
  useEffect(() => {
    if (store?.primary_color) {
      document.documentElement.style.setProperty('--primary', store.primary_color);
      
      // تحديث ألوان التدرج بناءً على اللون الأساسي
      const primaryHsl = hexToHSL(store.primary_color);
      if (primaryHsl) {
        const secondaryHue = (primaryHsl.h + 30) % 360; // لون متكامل
        document.documentElement.style.setProperty('--gradient-from', `hsl(${primaryHsl.h}, ${primaryHsl.s}%, ${primaryHsl.l}%)`);
        document.documentElement.style.setProperty('--gradient-to', `hsl(${secondaryHue}, ${primaryHsl.s}%, ${primaryHsl.l}%)`);
      }
    }
  }, [store?.primary_color]);

  // التحقق من تمرير الصفحة لإضافة تأثير على الهيدر
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // تحويل اللون الست عشري إلى HSL
  const hexToHSL = (hex: string) => {
    // إزالة # إذا كانت موجودة
    hex = hex.replace('#', '');
    
    // تحويل الست عشري إلى RGB
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;
    
    // حساب القيم الدنيا والقصوى
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    
    let h = 0, s = 0, l = (max + min) / 2;
    
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      
      h = Math.round(h * 60);
    }
    
    s = Math.round(s * 100);
    l = Math.round(l * 100);
    
    return { h, s, l };
  };

  return (
    <div className="min-h-screen bg-background flex flex-col" style={{ direction: 'rtl' }}>
      <StoreNavbar 
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isScrolled={isScrolled}
      />

      <main className="flex-1 pb-16 md:pb-0">
        {children}
      </main>

      <StoreFooter />
      
      <StoreMobileNav />
    </div>
  );
};

export default StoreLayout;
