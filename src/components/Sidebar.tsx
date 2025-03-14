
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Home, Sparkles, DollarSign, Phone } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

const Sidebar = ({ activeSection, onSectionClick }: SidebarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <div className={cn(
      "fixed left-0 top-0 bottom-0 w-20 bg-gradient-to-b from-slate-900 to-slate-800 z-20 shadow-lg flex flex-col items-center py-4 transition-all duration-300",
      isScrolled && "shadow-xl"
    )}>
      <div className="flex flex-col items-center space-y-8 mt-16">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onSectionClick(item.id)}
              className={cn(
                "group flex flex-col items-center justify-center w-14 h-14 rounded-xl transition-all duration-300",
                activeSection === item.id
                  ? "bg-gradient-to-r from-indigo-600 to-fuchsia-600 shadow-md"
                  : "hover:bg-slate-700"
              )}
            >
              <Icon 
                className={cn(
                  "transition-all duration-300 group-hover:scale-110",
                  activeSection === item.id 
                    ? "text-white" 
                    : "text-slate-400 group-hover:text-white"
                )} 
                size={20} 
              />
              <span className={cn(
                "text-xs mt-2 transition-all duration-300",
                activeSection === item.id 
                  ? "text-white font-medium" 
                  : "text-slate-400 group-hover:text-white",
              )}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
      
      <div className="mt-auto mb-8">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300">
          <span className="text-white text-sm font-bold">LN</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
