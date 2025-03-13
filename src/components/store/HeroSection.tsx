
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useDeviceType } from '@/hooks/use-device-type';
import { ShoppingBag, Info } from 'lucide-react';

interface HeroSectionProps {
  storeInfo: {
    name: string;
    slug: string;
    description?: string;
    banner?: string;
  };
}

const HeroSection = ({ storeInfo }: HeroSectionProps) => {
  const deviceType = useDeviceType();
  
  // Determine styles based on device type
  const getContainerClasses = () => {
    if (deviceType === 'mobile') {
      return 'py-8 px-4';
    } else if (deviceType === 'tablet') {
      return 'py-10 px-6';
    } else {
      return 'py-16 px-8';
    }
  };
  
  const getTitleClasses = () => {
    if (deviceType === 'mobile') {
      return 'text-2xl mb-3';
    } else if (deviceType === 'tablet') {
      return 'text-3xl mb-4';
    } else {
      return 'text-4xl mb-4';
    }
  };
  
  const getDescriptionClasses = () => {
    if (deviceType === 'mobile') {
      return 'text-sm mb-6 max-w-md';
    } else {
      return 'text-lg mb-8 max-w-2xl';
    }
  };

  return (
    <section className={`relative bg-gradient-to-r from-secondary/40 to-secondary/10 ${getContainerClasses()}`}>
      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className={`font-bold ${getTitleClasses()}`}>{storeInfo.name}</h1>
          <p className={`text-muted-foreground ${getDescriptionClasses()}`}>
            {storeInfo.description || "متجرك المفضل للمنتجات الأصلية عالية الجودة بأسعار تنافسية"}
          </p>
          <div className={`flex flex-wrap gap-3 justify-center ${deviceType === 'mobile' ? 'flex-col' : ''}`}>
            <Button asChild size={deviceType === 'mobile' ? 'default' : 'lg'} className="button-hover-effect gap-2">
              <Link to={`/store?store=${storeInfo.slug}&page=products`}>
                <ShoppingBag size={deviceType === 'mobile' ? 16 : 18} />
                <span>تسوق الآن</span>
              </Link>
            </Button>
            <Button asChild variant="outline" size={deviceType === 'mobile' ? 'default' : 'lg'} className="gap-2">
              <Link to={`/store?store=${storeInfo.slug}&page=about`}>
                <Info size={deviceType === 'mobile' ? 16 : 18} />
                <span>تعرف علينا</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        {storeInfo.banner ? (
          <img 
            src={storeInfo.banner} 
            alt={storeInfo.name} 
            className="w-full h-full object-cover opacity-15"
          />
        ) : (
          <>
            <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-primary/10 animate-pulse-light"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-primary/5 animate-pulse-light" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full bg-primary/10 animate-pulse-light" style={{ animationDelay: '0.5s' }}></div>
          </>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
