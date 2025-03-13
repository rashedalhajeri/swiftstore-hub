import { useState, useEffect } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, Menu, X, LogOut, User, Store, CreditCard, Bell, Shield, Globe, HelpCircle, Edit, Tags, Percent, ListFilter } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

type SidebarItemType = {
  icon: React.ElementType;
  label: string;
  href: string;
  submenu?: {
    label: string;
    href: string;
    icon: React.ElementType;
  }[];
};

const sidebarItems: SidebarItemType[] = [
  {
    icon: LayoutDashboard,
    label: 'لوحة التحكم',
    href: '/dashboard'
  },
  {
    icon: Package,
    label: 'المنتجات',
    href: '/dashboard/products'
  },
  {
    icon: ListFilter,
    label: 'الفئات',
    href: '/dashboard/categories'
  },
  {
    icon: Percent,
    label: 'العروض والخصومات',
    href: '/dashboard/promotions'
  },
  {
    icon: ShoppingCart,
    label: 'الطلبات',
    href: '/dashboard/orders'
  },
  {
    icon: Users,
    label: 'العملاء',
    href: '/dashboard/customers'
  },
  {
    icon: Settings,
    label: 'الإعدادات',
    href: '/dashboard/settings',
    submenu: [{
      label: 'الحساب',
      href: '/dashboard/settings/account',
      icon: User
    }, {
      label: 'المتجر',
      href: '/dashboard/settings/store',
      icon: Store
    }, {
      label: 'الاشتراك والفواتير',
      href: '/dashboard/settings/billing',
      icon: CreditCard
    }, {
      label: 'الإشعارات',
      href: '/dashboard/settings/notifications',
      icon: Bell
    }, {
      label: 'الأمان',
      href: '/dashboard/settings/security',
      icon: Shield
    }, {
      label: 'النطاقات',
      href: '/dashboard/settings/domains',
      icon: Globe
    }, {
      label: 'المساعدة والدعم',
      href: '/dashboard/settings/support',
      icon: HelpCircle
    }]
  }
];

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userFullName, setUserFullName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const location = useLocation();
  const isMobile = useIsMobile();
  const {
    user,
    signOut
  } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        try {
          const {
            data,
            error
          } = await supabase.from('profiles').select('first_name, last_name, email').eq('id', user.id).single();
          if (error) {
            console.error('Error fetching user profile:', error);
            return;
          }
          if (data) {
            const firstName = data.first_name || '';
            const lastName = data.last_name || '';
            setUserFullName(`${firstName} ${lastName}`.trim() || 'مستخدم متجر.أنا');
            setUserEmail(data.email || user.email || '');
          }
        } catch (error) {
          console.error('Unexpected error fetching profile:', error);
        }
      }
    };
    fetchUserProfile();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
  };

  const isSettingsPage = location.pathname.includes('/dashboard/settings');
  const currentSettingsPage = isSettingsPage ? location.pathname.split('/dashboard/settings/')[1] || 'account' : '';

  return <div className="flex h-screen bg-secondary/20 overflow-hidden">
      {isMobile && sidebarOpen && <div className="fixed inset-0 bg-black/50 z-20" onClick={() => setSidebarOpen(false)} />}

      <aside className={cn("bg-sidebar text-sidebar-foreground fixed inset-y-0 right-0 z-30 w-64 flex flex-col h-screen", sidebarOpen ? "translate-x-0" : "translate-x-full", "transition-all duration-300 ease-in-out md:translate-x-0")}>
        <div className="p-4 flex items-center justify-between border-b border-sidebar-border shrink-0">
          <Logo variant="light" size="md" />
          {isMobile && <button onClick={() => setSidebarOpen(false)}>
              <X size={20} className="text-sidebar-foreground" />
            </button>}
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          <nav className="px-3 space-y-1">
            {sidebarItems.map(item => {
            const isActive = item.href === location.pathname || item.href !== '/dashboard' && location.pathname.startsWith(item.href);
            const hasSubmenu = item.submenu && item.submenu.length > 0;
            const isSettingsItem = item.href === '/dashboard/settings';
            return <div key={item.label} className="space-y-1">
                  <Link to={item.href} className={cn("flex items-center gap-3 p-2.5 rounded-md transition-colors", isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/50")}>
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                  
                  {hasSubmenu && isSettingsItem && isSettingsPage && <div className="mr-6 mt-1 border-r pr-2 border-sidebar-border space-y-1">
                      {item.submenu.map(subItem => {
                  const isSubActive = location.pathname === subItem.href;
                  return <Link key={subItem.href} to={subItem.href} className={cn("flex items-center gap-3 p-2 rounded-md text-sm transition-colors", isSubActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/50")}>
                            <subItem.icon size={18} />
                            <span>{subItem.label}</span>
                          </Link>;
                })}
                    </div>}
                </div>;
          })}
          </nav>
        </div>

        <div className="p-4 border-t border-sidebar-border shrink-0">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 border border-sidebar-accent">
                <AvatarImage src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&h=100&auto=format&fit=crop" alt="User Avatar" />
                <AvatarFallback>
                  {userFullName ? userFullName.charAt(0).toUpperCase() : 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{userFullName}</p>
                <p className="text-xs text-sidebar-foreground/70 truncate">{userEmail}</p>
              </div>
              <Button variant="ghost" size="icon" className="text-sidebar-foreground" onClick={handleSignOut}>
                <LogOut size={18} />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mt-1">
              <Button variant="outline" size="sm" className="bg-sidebar-accent/50 border-sidebar-border text-sidebar-foreground w-full" asChild>
                <Link to="/store" className="flex items-center justify-center gap-1">
                  <Store size={14} />
                  <span className="text-xs">عرض المتجر</span>
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="bg-sidebar-accent/50 border-sidebar-border text-sidebar-foreground w-full" asChild>
                <Link to="/dashboard/settings/store" className="flex items-center justify-center gap-1">
                  <Edit size={14} />
                  <span className="text-xs">تحرير المتجر</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </aside>

      <div className={cn("flex-1 flex flex-col h-screen w-full", sidebarOpen ? "md:mr-64" : "")}>
        {/* Header */}
        

        {isSettingsPage && !isMobile && <div className="bg-background border-b p-0 w-full sticky top-16 z-10">
            <div className="container flex-shrink-0 h-14 flex items-center overflow-x-auto">
              <nav className="flex items-center space-x-4 rtl:space-x-reverse">
                {sidebarItems.find(item => item.href === '/dashboard/settings')?.submenu?.map(item => {
              const isActive = location.pathname === item.href;
              return <Link key={item.href} to={item.href} className={cn("flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors", isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted")}>
                      {item.icon && <item.icon size={16} />}
                      <span>{item.label}</span>
                    </Link>;
            })}
              </nav>
            </div>
          </div>}

        <main className="flex-1 overflow-y-auto">
          <div className="container py-6 px-4 md:px-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>;
};

export default DashboardLayout;
