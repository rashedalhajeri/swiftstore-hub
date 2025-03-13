
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

  return (
    <div className="min-h-screen bg-background flex flex-col" style={{ direction: 'rtl' }}>
      <StoreNavbar 
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isScrolled={isScrolled}
      />

      <main className="flex-1">
        {children}
      </main>

      <StoreFooter />
      
      <StoreMobileNav />
    </div>
  );
};

export default StoreLayout;
