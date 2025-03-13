
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Heart, Star, Eye } from 'lucide-react';
import { Product } from '@/types/store';
import { useCart } from '@/contexts/CartContext';
import RatingStars from './RatingStars';
import { useState } from 'react';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  
  // Extract category name
  const categoryName = typeof product.category === 'string' 
    ? product.category 
    : product.category?.name || '';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast.success('تمت إضافة المنتج إلى السلة');
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success('تمت إضافة المنتج إلى المفضلة');
  };

  return (
    <Card 
      className="group h-full flex flex-col transition-all duration-300 hover:shadow-lg border border-transparent hover:border-primary/20 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="p-0">
        <Link to={`/store/product/${product.id}`} className="block">
          <div className="aspect-square relative overflow-hidden rounded-t-lg">
            <img 
              src={product.image} 
              alt={product.name}
              className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
            />
            
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Button variant="secondary" size="sm" className="rounded-full">
                <Eye size={18} className="ml-1" />
                عرض المنتج
              </Button>
            </div>
            
            {product.featured && (
              <Badge 
                className="absolute top-2 right-2 bg-primary/90 hover:bg-primary"
              >
                مميز
              </Badge>
            )}
            {product.stock && product.stock <= 5 && (
              <Badge 
                variant="destructive"
                className="absolute top-2 left-2"
              >
                كمية محدودة
              </Badge>
            )}
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <div className="text-sm text-primary/80 mb-1 font-medium">
          {categoryName}
        </div>
        <Link to={`/store/product/${product.id}`} className="block">
          <CardTitle className="text-base mb-2 line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </CardTitle>
        </Link>
        
        {product.rating && (
          <div className="mb-2">
            <RatingStars rating={product.rating} showRating={true} />
          </div>
        )}
        <div className="font-bold text-lg mt-auto">
          {product.price.toFixed(3)} KWD
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-2 mt-auto space-x-2 rtl:space-x-reverse">
        <Button 
          className="w-full button-hover-effect bg-primary hover:opacity-90 text-white font-medium"
          onClick={handleAddToCart}
        >
          <ShoppingBag className="ml-2 h-4 w-4" />
          إضافة للسلة
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          className="border-primary/30 hover:bg-primary/10 hover:text-primary transition-colors"
          onClick={handleAddToWishlist}
        >
          <Heart className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
