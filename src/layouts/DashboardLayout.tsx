
import { useState, useEffect } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  Menu, 
  X, 
  LogOut,
  User,
  Store,
  CreditCard,
  Bell,
  Shield,
  Globe,
  HelpCircle,
  Edit,
  Tags,
  Percent,
  ListFilter
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
  submenu?: { label: string; href: string; icon: React.ElementType }[];
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
    icon: ListFilter,
    label: 'الفئات',
    href: '/dashboard/categories',
  },
  {
    icon: Percent,
    label: 'العروض والخصومات',
    href: '/dashboard/promotions',
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
    submenu: [
      { label: 'الحساب', href: '/dashboard/settings/account', icon: User },
      { label: 'المتجر', href: '/dashboard/settings/store', icon: Store },
      { label: 'الاشتراك والفواتير', href: '/dashboard/settings/billing', icon: CreditCard },
      { label: 'الإشعارات', href: '/dashboard/settings/notifications', icon: Bell },
      { label: 'الأمان', href: '/dashboard/settings/security', icon: Shield },
      { label: 'النطاقات', href: '/dashboard/settings/domains', icon: Globe },
      { label: 'المساعدة والدعم', href: '/dashboard/settings/support', icon: HelpCircle },
    ],
  },
];

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userName, setUserName] = useState('مستخدم متجر.أنا');
  const [storeUrl, setStoreUrl] = useState('linok.me/store');
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

  // Retrieve store URL from localStorage if available
  useEffect(() => {
    const savedStoreUrl = localStorage.getItem('storeUrl');
    if (savedStoreUrl) {
      setStoreUrl(`linok.me/${savedStoreUrl}`);
    }
  }, []);

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

      {/* Sidebar - Now fixed position */}
      <aside 
        className={cn(
          "bg-sidebar text-sidebar-foreground fixed inset-y-0 left-0 z-30 w-64 flex flex-col h-screen",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "transition-all duration-300 ease-in-out md:translate-x-0"
        )}
      >
        {/* Sidebar Header - Fixed */}
        <div className="p-4 flex items-center justify-between border-b border-sidebar-border shrink-0">
          <Logo variant="light" size="md" />
          {isMobile && (
            <button onClick={() => setSidebarOpen(false)}>
              <X size={20} className="text-sidebar-foreground" />
            </button>
          )}
        </div>

        {/* Sidebar Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <nav className="px-3 py-4 space-y-2">
            {sidebarItems.map((item) => {
              const isActive = item.href === location.pathname ||
                              (item.href !== '/dashboard' && location.pathname.startsWith(item.href));
              const hasSubmenu = item.submenu && item.submenu.length > 0;
              const isSettingsItem = item.href === '/dashboard/settings';
              
              return (
                <div key={item.label} className="space-y-1">
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 p-2 rounded-md transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "hover:bg-sidebar-accent/50"
                    )}
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                  
                  {hasSubmenu && isSettingsItem && isSettingsPage && (
                    <div className="mr-6 mt-2 border-r pr-2 border-sidebar-border space-y-1">
                      {item.submenu.map((subItem) => {
                        const isSubActive = location.pathname === subItem.href;
                        
                        return (
                          <Link
                            key={subItem.href}
                            to={subItem.href}
                            className={cn(
                              "flex items-center gap-3 p-2 rounded-md text-sm transition-colors",
                              isSubActive
                                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                : "hover:bg-sidebar-accent/50"
                            )}
                          >
                            <subItem.icon size={18} />
                            <span>{subItem.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer - Fixed */}
        <div className="p-4 border-t border-sidebar-border shrink-0">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border border-sidebar-accent">
              <AvatarImage src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&h=100&auto=format&fit=crop" alt="User Avatar" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{userName}</p>
              <p className="text-xs text-sidebar-foreground/70 truncate">{storeUrl}</p>
            </div>
            <Button variant="ghost" size="icon" className="text-sidebar-foreground">
              <LogOut size={18} />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content - With sidebar width offset */}
      <div className={cn(
        "flex-1 flex flex-col min-h-screen w-full",
        sidebarOpen ? "md:mr-64" : ""
      )}>
        {/* Header - Fixed at top */}
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
                        {sidebarItems.find(item => item.href === '/dashboard/settings')?.submenu?.find(subItem => 
                          subItem.href.includes(currentSettingsPage))?.label || ''}
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
                className="h-9"
                asChild
              >
                <Link to="/store" className="flex items-center gap-2">
                  <Store size={16} />
                  <span>عرض المتجر</span>
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-9 border-dashed"
                asChild
              >
                <Link to="/dashboard/settings/store" className="flex items-center gap-2">
                  <Edit size={16} />
                  <span>تحرير المتجر</span>
                </Link>
              </Button>
            </div>
          </div>
        </header>

        {/* Settings Sub-navigation for larger screens */}
        {isSettingsPage && !isMobile && (
          <div className="bg-background border-b p-0 w-full sticky top-16 z-10">
            <div className="container flex-shrink-0 h-14 flex items-center overflow-x-auto">
              <nav className="flex items-center space-x-4 rtl:space-x-reverse">
                {sidebarItems.find(item => item.href === '/dashboard/settings')?.submenu?.map((item) => {
                  const isActive = location.pathname === item.href;
                  
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
                      {item.icon && <item.icon size={16} />}
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        )}

        {/* Page Content - Scrollable with fixed header */}
        <main className="flex-1 container py-6 px-4 md:px-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
