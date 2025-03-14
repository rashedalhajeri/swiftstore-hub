
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

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
    { id: 'home', icon: '🏠', label: 'الرئيسية' },
    { id: 'features', icon: '✨', label: 'المميزات' },
    { id: 'pricing', icon: '💰', label: 'الأسعار' },
    { id: 'contact', icon: '📞', label: 'تواصل معنا' },
  ];

  return (
    <div className={cn(
      "fixed left-0 top-0 bottom-0 w-16 bg-white z-20 border-r border-slate-200 flex flex-col items-center py-4",
      isScrolled && "shadow-sm"
    )}>
      <div className="flex flex-col items-center space-y-8 mt-16">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionClick(item.id)}
            className={cn(
              "group flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all",
              activeSection === item.id
                ? "bg-gradient-to-r from-indigo-500/20 to-fuchsia-500/20"
                : "hover:bg-slate-100"
            )}
          >
            <span className="text-xl">{item.icon}</span>
            <span className={cn(
              "text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity",
              activeSection === item.id && "opacity-100 font-medium"
            )}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
