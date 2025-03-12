
import { useState, useEffect } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  ChevronDown, 
  Menu, 
  X, 
  LogOut,
  User,
  Store,
  CreditCard,
  Bell,
  Shield,
  Globe,
  HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';

type SidebarItemType = {
  icon: React.ElementType;
  label: string;
  href: string;
  items?: { label: string; href: string }[];
};

const sidebarItems: SidebarItemType[] = [
  {
    icon: LayoutDashboard,
    label: 'لوحة التحكم',
    href: '/dashboard',
  },
  {
    icon: Package,
    label: 'المنتجات',
    href: '/dashboard/products',
  },
  {
    icon: ShoppingCart,
    label: 'الطلبات',
    href: '/dashboard/orders',
  },
  {
    icon: Users,
    label: 'العملاء',
    href: '/dashboard/customers',
  },
  {
    icon: Settings,
    label: 'الإعدادات',
    href: '/dashboard/settings',
    items: [
      { label: 'الحساب', href: '/dashboard/settings/account' },
      { label: 'المتجر', href: '/dashboard/settings/store' },
      { label: 'الفواتير', href: '/dashboard/settings/billing' },
      { label: 'الإشعارات', href: '/dashboard/settings/notifications' },
      { label: 'الأمان', href: '/dashboard/settings/security' },
      { label: 'النطاقات', href: '/dashboard/settings/domains' },
      { label: 'المساعدة والدعم', href: '/dashboard/settings/support' },
    ],
  },
];

const settingsIcons: Record<string, React.ElementType> = {
  'account': User,
  'store': Store,
  'billing': CreditCard,
  'notifications': Bell,
  'security': Shield,
  'domains': Globe,
  'support': HelpCircle,
};

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const location = useLocation();
  const isMobile = useIsMobile();

  // Auto collapse sidebar on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  // Close sidebar on route change for mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  const handleItemClick = (label: string) => {
    if (expandedItem === label) {
      setExpandedItem(null);
    } else {
      setExpandedItem(label);
    }
  };

  const isSettingsPage = location.pathname.includes('/dashboard/settings');
  const currentSettingsPage = isSettingsPage ? 
    location.pathname.split('/dashboard/settings/')[1] || 'account' : '';

  return (
    <div className="min-h-screen flex bg-secondary/20">
      {/* Sidebar Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-sidebar text-sidebar-foreground fixed inset-y-0 left-0 z-30 w-64 transform transition-all duration-300 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "md:relative md:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
            <Logo variant="light" size="md" />
            {isMobile && (
              <button onClick={() => setSidebarOpen(false)}>
                <X size={20} className="text-sidebar-foreground" />
              </button>
            )}
          </div>

          <div className="px-3 py-4 flex-1 overflow-y-auto">
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <div key={item.label}>
                  {item.items ? (
                    <>
                      <button
                        onClick={() => handleItemClick(item.label)}
                        className={cn(
                          "w-full flex items-center justify-between p-2 rounded-md transition-colors",
                          location.pathname.includes(item.href) && !expandedItem
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "hover:bg-sidebar-accent/50"
                        )}
                      >
                        <span className="flex items-center gap-3">
                          <item.icon size={20} />
                          <span>{item.label}</span>
                        </span>
                        <ChevronDown 
                          size={16} 
                          className={cn(
                            "transition-transform", 
                            expandedItem === item.label && "transform rotate-180"
                          )} 
                        />
                      </button>
                      {expandedItem === item.label && (
                        <div className="ml-9 mt-1 space-y-1">
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.href}
                              to={subItem.href}
                              className={cn(
                                "block p-2 rounded-md text-sm transition-colors",
                                location.pathname === subItem.href
                                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                  : "hover:bg-sidebar-accent/50"
                              )}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center gap-3 p-2 rounded-md transition-colors",
                        location.pathname === item.href
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "hover:bg-sidebar-accent/50"
                      )}
                    >
                      <item.icon size={20} />
                      <span>{item.label}</span>
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>

          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 border border-sidebar-accent">
                <AvatarImage src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&h=100&auto=format&fit=crop" alt="User Avatar" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">مستخدم متجر.أنا</p>
                <p className="text-xs text-sidebar-foreground/70 truncate">linok.me/store</p>
              </div>
              <Button variant="ghost" size="icon" className="text-sidebar-foreground">
                <LogOut size={18} />
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen w-full">
        {/* Header */}
        <header className="bg-background/95 backdrop-blur-md border-b h-16 flex items-center px-4 sticky top-0 z-10">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden"
              >
                <Menu size={20} />
              </button>
              
              {/* Settings Breadcrumb Navigation */}
              {isSettingsPage && (
                <div className="flex items-center">
                  <Link to="/dashboard/settings" className="text-sm font-medium">
                    الإعدادات
                  </Link>
                  {currentSettingsPage && (
                    <div className="flex items-center">
                      <span className="mx-2 text-muted-foreground">/</span>
                      <span className="text-sm font-medium">
                        {sidebarItems[4].items?.find(item => 
                          item.href.includes(currentSettingsPage))?.label || ''}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-9 border-dashed"
                asChild
              >
                <Link to="/dashboard/store" className="flex items-center gap-2">
                  <Store size={16} />
                  <span>عرض المتجر</span>
                </Link>
              </Button>
            </div>
          </div>
        </header>

        {/* Settings Sub-navigation for larger screens */}
        {isSettingsPage && !isMobile && (
          <div className="bg-background border-b p-0 w-full">
            <div className="container flex-shrink-0 h-14 flex items-center overflow-x-auto">
              <nav className="flex items-center space-x-4 rtl:space-x-reverse">
                {sidebarItems[4].items?.map((item) => {
                  const isActive = location.pathname === item.href;
                  const settingKey = item.href.split('/').pop() || '';
                  const IconComponent = settingsIcons[settingKey];
                  
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                        isActive 
                          ? "bg-primary text-primary-foreground" 
                          : "hover:bg-muted"
                      )}
                    >
                      {IconComponent && <IconComponent size={16} />}
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 container py-6 px-4 md:px-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
