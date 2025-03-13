
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Star } from 'lucide-react';
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
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Extract category name
  const categoryName = typeof product.category === 'string' 
    ? product.category 
    : product.category?.name || '';

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? 'تمت إزالة المنتج من المفضلة' : 'تمت إضافة المنتج إلى المفضلة');
  };

  return (
    <Link to={`/store/product/${product.id}`}>
      <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all duration-200">
        <div className="aspect-square relative overflow-hidden rounded-lg">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white ${
              isFavorite ? 'text-red-500' : 'text-gray-500'
            }`}
            onClick={handleToggleFavorite}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
          </Button>
        </div>
        
        <CardContent className="p-3">
          <div className="text-sm font-medium mb-1 line-clamp-1">
            {product.name}
          </div>
          
          <div className="flex items-center space-x-1 rtl:space-x-reverse mb-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">{product.rating?.toFixed(1) || "4.5"}</span>
          </div>
          
          <div className="font-bold">
            {product.price.toFixed(3)} KWD
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
