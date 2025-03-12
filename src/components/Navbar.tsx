
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Logo from './Logo';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

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

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link to="/login">تسجيل الدخول</Link>
          </Button>
          <Button asChild className="button-hover-effect">
            <Link to="/register">إنشاء حساب</Link>
          </Button>
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
            <Button variant="outline" asChild className="w-full">
              <Link to="/login">تسجيل الدخول</Link>
            </Button>
            <Button asChild className="w-full">
              <Link to="/register">إنشاء حساب</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
