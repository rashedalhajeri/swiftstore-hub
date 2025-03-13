
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import { Product } from '@/types/store';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Format price with 2 decimal places
  const formattedPrice = product.price.toFixed(2);
  
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
      <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all duration-200 relative">
        <div className="aspect-square relative overflow-hidden rounded-xl">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-2 right-2 bg-white rounded-full hover:bg-white ${
              isFavorite ? 'text-red-500' : 'text-gray-500'
            }`}
            onClick={handleToggleFavorite}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
          </Button>
        </div>
        
        <CardContent className="p-3">
          <div className="text-xs uppercase text-gray-500">
            {categoryName || "KIDS STYLISH CLOTHES"}
          </div>
          
          <div className="text-sm font-medium line-clamp-1 mb-1">
            {product.name}
          </div>
          
          <div className="font-bold">
            ${formattedPrice}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
