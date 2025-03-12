
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag } from 'lucide-react';
import { Product } from '@/types/store';
import { useCart } from '@/contexts/CartContext';
import RatingStars from './RatingStars';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <Card className="group h-full flex flex-col">
      <CardHeader className="p-0">
        <Link to={`/store/product/${product.id}`} className="block">
          <div className="aspect-square relative overflow-hidden rounded-t-lg">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
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
        <Link to={`/store/product/${product.id}`} className="block">
          <CardTitle className="text-base mb-2 line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </CardTitle>
        </Link>
        <div className="text-sm text-muted-foreground mb-2">
          {product.category}
        </div>
        {product.rating && (
          <div className="mb-3">
            <RatingStars rating={product.rating} showRating={true} />
          </div>
        )}
        <div className="font-bold text-lg mt-auto">
          {product.price.toFixed(3)} KWD
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto">
        <Button 
          className="w-full button-hover-effect"
          onClick={() => addToCart(product, 1)}
        >
          <ShoppingBag className="ml-2 h-4 w-4" />
          إضافة للسلة
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
