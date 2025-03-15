
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Home, Sparkles, DollarSign, Phone, Menu, X } from 'lucide-react';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from '@/components/ui/sidebar';

interface SidebarProps {
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

const SidebarNavigation = ({ activeSection, onSectionClick }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

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
    <SidebarProvider>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-40 bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white p-2 rounded-full shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <ShadcnSidebar
        className={cn(
          "transition-all duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Logo area */}
        <SidebarHeader className="flex items-center justify-center border-b border-slate-700 p-4">
          <Logo variant="light" size="md" animated />
        </SidebarHeader>

        {/* Navigation */}
        <SidebarContent className="py-6">
          <SidebarMenu>
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={isActive}
                    className={cn(
                      "group w-full flex items-center justify-center md:flex-col py-3 px-4 rounded-xl transition-all duration-300",
                      isActive
                        ? "bg-gradient-to-r from-indigo-600 to-fuchsia-600 shadow-md"
                        : "hover:bg-slate-700"
                    )}
                    onClick={() => {
                      onSectionClick(item.id);
                      if (isOpen) setIsOpen(false);
                    }}
                    tooltip={item.label}
                  >
                    <Icon 
                      className={cn(
                        "transition-all duration-300 group-hover:scale-110 md:mb-2",
                        isActive 
                          ? "text-white" 
                          : "text-slate-400 group-hover:text-white"
                      )} 
                      size={22} 
                    />
                    <span className={cn(
                      "transition-all duration-300 ml-3 md:ml-0 md:text-xs",
                      isActive 
                        ? "text-white font-medium" 
                        : "text-slate-400 group-hover:text-white",
                    )}>
                      {item.label}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarContent>
        
        {/* User Profile */}
        <SidebarFooter className="mt-auto p-4 border-t border-slate-700">
          <Button 
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 flex items-center justify-center gap-2"
            onClick={() => window.location.href = "/login"}
          >
            <span className="text-white">تسجيل دخول</span>
          </Button>
        </SidebarFooter>
      </ShadcnSidebar>
    </SidebarProvider>
  );
};

export default SidebarNavigation;
