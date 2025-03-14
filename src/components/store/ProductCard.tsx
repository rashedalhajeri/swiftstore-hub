
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import { Product } from '@/types/store';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Format price with 2 decimal places
  const formattedPrice = product.price.toFixed(3);
  
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
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast.success('تمت إضافة المنتج إلى السلة');
  };

  return (
    <Link to={`/store/product/${product.id}`}>
      <Card 
        className="overflow-hidden border-none rounded-xl shadow-sm hover:shadow-md transition-all duration-200 relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative">
          <AspectRatio ratio={1} className="rounded-t-xl bg-gray-50">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </AspectRatio>
          
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white ${
              isFavorite ? 'text-red-500' : 'text-gray-500'
            } shadow-sm`}
            onClick={handleToggleFavorite}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
          </Button>
          
          <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 transform transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <Button 
              size="sm" 
              className="w-full bg-white text-black hover:bg-white/90 transition-all"
              onClick={handleAddToCart}
            >
              إضافة للسلة
            </Button>
          </div>
        </div>
        
        <CardContent className="p-3">
          <div className="text-[10px] uppercase text-gray-500 font-medium">
            {categoryName || "ملابس"}
          </div>
          
          <div className="text-sm font-medium line-clamp-1 mb-1 mt-1">
            {product.name}
          </div>
          
          <div className="font-bold text-sm md:text-base">
            {formattedPrice} KWD
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
