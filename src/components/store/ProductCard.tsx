
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Eye, Heart } from 'lucide-react';
import { Product } from '@/types/store';
import { useCart } from '@/contexts/CartContext';
import { useDeviceType } from '@/hooks/use-device-type';
import RatingStars from './RatingStars';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const deviceType = useDeviceType();
  
  // Extract category name
  const categoryName = typeof product.category === 'string' 
    ? product.category 
    : product.category?.name || '';
    
  const handleAddToCart = () => {
    addToCart(product, 1);
    toast.success(`تمت إضافة ${product.name} إلى السلة`);
  };
  
  const handleAddToWishlist = () => {
    toast.success(`تمت إضافة ${product.name} إلى المفضلة`);
  };

  return (
    <Card className="group h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="relative overflow-hidden">
        <Link to={`/store/product/${product.id}`} className="block">
          <div className="aspect-square relative overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </Link>
        
        {/* Quick action buttons that appear on hover */}
        <div className="absolute top-2 left-2 flex flex-col gap-2 transition-opacity duration-300">
          <Button 
            variant="secondary" 
            size="icon" 
            className="h-8 w-8 opacity-0 group-hover:opacity-100 bg-white/80 hover:bg-white shadow-sm"
            onClick={handleAddToWishlist}
          >
            <Heart size={16} />
          </Button>
          <Link to={`/store/product/${product.id}`}>
            <Button 
              variant="secondary" 
              size="icon" 
              className="h-8 w-8 opacity-0 group-hover:opacity-100 bg-white/80 hover:bg-white shadow-sm"
            >
              <Eye size={16} />
            </Button>
          </Link>
        </div>
        
        {/* Product badges */}
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          {product.featured && (
            <Badge 
              variant="default"
              className="bg-primary/90 hover:bg-primary"
            >
              {deviceType === 'mobile' ? 'مميز' : 'منتج مميز'}
            </Badge>
          )}
          {product.stock && product.stock <= 5 && (
            <Badge 
              variant="destructive"
            >
              {deviceType === 'mobile' ? 'محدود' : 'كمية محدودة'}
            </Badge>
          )}
        </div>
      </div>
      
      <CardContent className="p-4 flex-grow">
        <Link to={`/store/product/${product.id}`} className="block">
          <h3 className="font-medium line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-muted-foreground">
            {categoryName}
          </span>
          
          {product.rating > 0 && (
            <div className="flex items-center">
              <RatingStars rating={product.rating} />
              <span className="text-xs text-muted-foreground ml-1">
                ({product.rating})
              </span>
            </div>
          )}
        </div>
        
        <div className="font-bold text-lg mt-2">
          {product.price.toFixed(3)} KWD
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 mt-auto">
        <Button 
          className={`w-full gap-2 ${deviceType === 'mobile' ? 'h-9 text-sm py-1' : ''}`}
          onClick={handleAddToCart}
        >
          <ShoppingBag className="h-4 w-4" />
          <span>إضافة للسلة</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
