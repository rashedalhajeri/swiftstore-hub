
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Heart, Instagram, Facebook, Twitter } from 'lucide-react';
import { useDeviceType } from '@/hooks/use-device-type';
import { Separator } from '@/components/ui/separator';

interface StoreFooterProps {
  storeInfo: {
    name: string;
    slug: string;
    description?: string;
    instagram?: string | null;
    facebook?: string | null;
    twitter?: string | null;
  };
  categories: string[];
}

const StoreFooter = ({ storeInfo, categories }: StoreFooterProps) => {
  const deviceType = useDeviceType();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 pt-10 mt-12">
      <div className="container mx-auto px-4">
        <div className={`grid grid-cols-1 gap-8 ${deviceType === 'mobile' ? '' : deviceType === 'tablet' ? 'md:grid-cols-2' : 'md:grid-cols-4'}`}>
          {/* Store Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">عن المتجر</h3>
            <p className="text-muted-foreground mb-4">
              {storeInfo.description || "نقدم لكم أفضل المنتجات بأفضل الأسعار مع خدمة عملاء متميزة"}
            </p>
            <div className="flex items-center gap-4 mt-4">
              {storeInfo.instagram && (
                <a href={storeInfo.instagram} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                  <Instagram size={deviceType === 'mobile' ? 18 : 20} />
                </a>
              )}
              {storeInfo.facebook && (
                <a href={storeInfo.facebook} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                  <Facebook size={deviceType === 'mobile' ? 18 : 20} />
                </a>
              )}
              {storeInfo.twitter && (
                <a href={storeInfo.twitter} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                  <Twitter size={deviceType === 'mobile' ? 18 : 20} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">روابط مهمة</h3>
            <ul className="space-y-2">
              <li>
                <Link to={`/store?store=${storeInfo.slug}&page=about`} className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1">
                  <Heart size={16} className="opacity-70" />
                  <span>من نحن</span>
                </Link>
              </li>
              <li>
                <Link to={`/store?store=${storeInfo.slug}&page=contact`} className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1">
                  <Heart size={16} className="opacity-70" />
                  <span>اتصل بنا</span>
                </Link>
              </li>
              <li>
                <Link to={`/store?store=${storeInfo.slug}&page=privacy`} className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1">
                  <Heart size={16} className="opacity-70" />
                  <span>سياسة الخصوصية</span>
                </Link>
              </li>
              <li>
                <Link to={`/store?store=${storeInfo.slug}&page=terms`} className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1">
                  <Heart size={16} className="opacity-70" />
                  <span>الشروط والأحكام</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-lg mb-4">فئات المنتجات</h3>
            <ul className="space-y-2">
              {categories.map(category => (
                <li key={category}>
                  <Link
                    to={`/store?store=${storeInfo.slug}&category=${category}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">تواصل معنا</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone size={deviceType === 'mobile' ? 16 : 18} className="min-w-4 text-primary/80" />
                <span>+965 1234 5678</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={deviceType === 'mobile' ? 16 : 18} className="min-w-4 text-primary/80" />
                <span>info@{storeInfo.slug}.linok.me</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={deviceType === 'mobile' ? 16 : 18} className="min-w-4 text-primary/80" />
                <span>الكويت</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-6" />
        
        <div className="py-4 text-center text-sm text-muted-foreground">
          <p>© {currentYear} {storeInfo.name}. جميع الحقوق محفوظة</p>
        </div>
      </div>
    </footer>
  );
};

export default StoreFooter;
