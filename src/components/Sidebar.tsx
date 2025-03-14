
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Home, Sparkles, DollarSign, Phone, Menu, X } from 'lucide-react';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

const Sidebar = ({ activeSection, onSectionClick }: SidebarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const sidebarItems = [
    { id: 'home', icon: Home, label: 'الرئيسية' },
    { id: 'features', icon: Sparkles, label: 'المميزات' },
    { id: 'pricing', icon: DollarSign, label: 'الأسعار' },
    { id: 'contact', icon: Phone, label: 'تواصل معنا' },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-40 bg-indigo-600 text-white p-2 rounded-full shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 bottom-0 w-64 bg-gradient-to-b from-slate-900 to-slate-800 z-30 shadow-lg transition-all duration-300 ease-in-out transform h-full flex flex-col",
        isScrolled && "shadow-xl",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        "md:w-20"
      )}>
        {/* Logo area */}
        <div className="p-4 border-b border-slate-700 flex items-center justify-center">
          <Logo variant="light" size="md" animated />
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-6">
          <ul className="space-y-4 px-3">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      onSectionClick(item.id);
                      if (isOpen) setIsOpen(false);
                    }}
                    className={cn(
                      "group w-full flex items-center justify-center md:flex-col py-3 px-4 rounded-xl transition-all duration-300",
                      activeSection === item.id
                        ? "bg-gradient-to-r from-indigo-600 to-fuchsia-600 shadow-md"
                        : "hover:bg-slate-700"
                    )}
                  >
                    <Icon 
                      className={cn(
                        "transition-all duration-300 group-hover:scale-110 md:mb-2",
                        activeSection === item.id 
                          ? "text-white" 
                          : "text-slate-400 group-hover:text-white"
                      )} 
                      size={22} 
                    />
                    <span className={cn(
                      "transition-all duration-300 ml-3 md:ml-0 md:text-xs",
                      activeSection === item.id 
                        ? "text-white font-medium" 
                        : "text-slate-400 group-hover:text-white",
                    )}>
                      {item.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        
        {/* User Profile */}
        <div className="mt-auto p-4 border-t border-slate-700">
          <Button 
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 flex items-center justify-center gap-2"
            onClick={() => window.location.href = "/login"}
          >
            <span className="text-white">تسجيل دخول</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
