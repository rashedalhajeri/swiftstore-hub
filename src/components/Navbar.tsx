import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Logo from './Logo';
import { Menu, X, Bell, User, Settings, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleSignOut = async () => {
    console.log('Sign out button clicked');
    try {
      await signOut();
      console.log('Navigating to home after sign out');
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Error in handleSignOut:', error);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Logo animated size="md" />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className="text-sm font-medium transition-colors hover:text-foreground/80 animated-underline"
          >
            الرئيسية
          </Link>
          <Link 
            to="/features" 
            className="text-sm font-medium transition-colors hover:text-foreground/80 animated-underline"
          >
            المميزات
          </Link>
          <Link 
            to="/pricing" 
            className="text-sm font-medium transition-colors hover:text-foreground/80 animated-underline"
          >
            الأسعار
          </Link>
          <Link 
            to="/contact" 
            className="text-sm font-medium transition-colors hover:text-foreground/80 animated-underline"
          >
            تواصل معنا
          </Link>
        </nav>

        {/* Auth Buttons or User Menu */}
        <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
          {user ? (
            <div className="flex items-center gap-4">
              {/* Dashboard Button */}
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard" className="flex items-center gap-2">
                  <LayoutDashboard size={16} />
                  <span>لوحة التحكم</span>
                </Link>
              </Button>

              {/* Notifications */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell size={20} />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                      3
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="end">
                  <div className="p-4 border-b">
                    <h3 className="font-medium text-center">الإشعارات</h3>
                  </div>
                  <div className="max-h-[300px] overflow-auto">
                    <div className="p-4 border-b hover:bg-accent transition-colors cursor-pointer">
                      <div className="flex justify-between items-start">
                        <p className="text-sm font-medium">طلب جديد</p>
                        <span className="text-xs text-muted-foreground">منذ 5 دقائق</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">تم استلام طلب جديد بقيمة 120 ريال</p>
                    </div>
                    <div className="p-4 border-b hover:bg-accent transition-colors cursor-pointer">
                      <div className="flex justify-between items-start">
                        <p className="text-sm font-medium">إشعار نظام</p>
                        <span className="text-xs text-muted-foreground">منذ ساعة</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">تم تحديث النظام إلى الإصدار الجديد</p>
                    </div>
                    <div className="p-4 hover:bg-accent transition-colors cursor-pointer">
                      <div className="flex justify-between items-start">
                        <p className="text-sm font-medium">رسالة جديدة</p>
                        <span className="text-xs text-muted-foreground">منذ يومين</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">لديك رسالة جديدة من العميل أحمد</p>
                    </div>
                  </div>
                  <div className="p-2 border-t">
                    <Button variant="ghost" size="sm" className="w-full">
                      عرض كل الإشعارات
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <User size={16} />
                    <span>{user.email?.split('@')[0]}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{user.email}</span>
                      {isAdmin && <span className="text-xs text-muted-foreground">مسؤول النظام</span>}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer flex items-center gap-2">
                      <LayoutDashboard size={16} />
                      <span>لوحة التحكم</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/settings/account" className="cursor-pointer flex items-center gap-2">
                      <Settings size={16} />
                      <span>الإعدادات</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleSignOut} 
                    className="cursor-pointer flex items-center gap-2 text-destructive focus:text-destructive"
                  >
                    <LogOut size={16} />
                    <span>تسجيل الخروج</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">تسجيل الدخول</Link>
              </Button>
              <Button asChild className="button-hover-effect">
                <Link to="/register">إنشاء حساب</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-background transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ top: '64px' }}
      >
        <div className="container mx-auto px-4 py-8 flex flex-col">
          <nav className="flex flex-col space-y-6 mb-8">
            <Link to="/" className="text-lg font-medium">
              الرئيسية
            </Link>
            <Link to="/features" className="text-lg font-medium">
              المميزات
            </Link>
            <Link to="/pricing" className="text-lg font-medium">
              الأسعار
            </Link>
            <Link to="/contact" className="text-lg font-medium">
              تواصل معنا
            </Link>
          </nav>
          <div className="flex flex-col space-y-4">
            {user ? (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <User size={20} />
                  <div>
                    <p className="font-medium">{user.email?.split('@')[0]}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <Button asChild className="w-full">
                  <Link to="/dashboard">لوحة التحكم</Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link to="/dashboard/settings/account">الإعدادات</Link>
                </Button>
                <Button 
                  variant="destructive" 
                  className="w-full" 
                  onClick={handleSignOut}
                >
                  تسجيل الخروج
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" asChild className="w-full">
                  <Link to="/login">تسجيل الدخول</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link to="/register">إنشاء حساب</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
