
import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin,
  Instagram,
  Facebook,
  Twitter
} from 'lucide-react';
import { categories } from '@/data/products';
import { useStore } from '@/contexts/StoreContext';

const StoreFooter = () => {
  const { store } = useStore();
  const [searchParams] = useSearchParams();
  const params = useParams();
  const storeParam = searchParams.get('store');
  const storeSlug = params.storeSlug || storeParam;
  
  const storeInfo = {
    name: store?.name || 'متجر.أنا',
    url: store?.slug || localStorage.getItem('storeUrl') || 'store',
  };

  // بناء الروابط مع الحفاظ على الشكل المناسب للرابط
  const buildStoreLink = (path: string) => {
    // If we're using the direct slug approach
    if (params.storeSlug) {
      // For the home page (remove the trailing slash if any)
      if (path === '/store') {
        return `/${params.storeSlug}`;
      }
      // For other paths, replace /store/ with /{storeSlug}/
      return path.replace('/store', `/${params.storeSlug}`);
    }
    
    // Legacy approach with query parameter
    return storeParam ? `${path}?store=${storeParam}` : path;
  };

  return (
    <footer className="bg-background border-t mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4 text-primary">عن المتجر</h3>
            <p className="text-muted-foreground">
              {store?.description || 'نقدم لكم أفضل المنتجات بأفضل الأسعار مع خدمة عملاء متميزة'}
            </p>
            <div className="flex items-center gap-4 mt-6">
              {store?.instagram && (
                <a href={store.instagram} className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                  <Instagram strokeWidth={1.5} size={22} />
                </a>
              )}
              {store?.facebook && (
                <a href={store.facebook} className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                  <Facebook strokeWidth={1.5} size={22} />
                </a>
              )}
              {store?.twitter && (
                <a href={store.twitter} className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                  <Twitter strokeWidth={1.5} size={22} />
                </a>
              )}
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 text-primary">روابط مهمة</h3>
            <ul className="space-y-3">
              <li>
                <Link to={buildStoreLink('/store/about')} className="text-muted-foreground hover:text-primary transition-colors">
                  من نحن
                </Link>
              </li>
              <li>
                <Link to={buildStoreLink('/store/contact')} className="text-muted-foreground hover:text-primary transition-colors">
                  اتصل بنا
                </Link>
              </li>
              <li>
                <Link to={buildStoreLink('/store/privacy')} className="text-muted-foreground hover:text-primary transition-colors">
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link to={buildStoreLink('/store/terms')} className="text-muted-foreground hover:text-primary transition-colors">
                  الشروط والأحكام
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 text-primary">فئات المنتجات</h3>
            <ul className="space-y-3">
              {categories.slice(0, 6).map(category => (
                <li key={category}>
                  <Link
                    to={buildStoreLink(`/store?category=${category}`)}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 text-primary">تواصل معنا</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-primary" />
                <span>+965 1234 5678</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-primary" />
                <span>info@{storeInfo.url}.linok.me</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-primary" />
                <span>الكويت</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} {storeInfo.name}. جميع الحقوق محفوظة</p>
        </div>
      </div>
    </footer>
  );
};

export default StoreFooter;
