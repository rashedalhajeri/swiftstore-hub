
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, ShoppingCart, Heart, Share2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StoreLayout from '@/layouts/StoreLayout';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { Separator } from '@/components/ui/separator';
import ProductCard from '@/components/store/ProductCard';
import RatingStars from '@/components/store/RatingStars';
import { productService } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/types/store';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        setLoading(true);
        try {
          const fetchedProduct = await productService.getProductById(id);
          
          // Convert the Supabase response to match our Product interface
          const productData: Product = {
            id: fetchedProduct.id,
            name: fetchedProduct.name,
            price: fetchedProduct.price,
            image: fetchedProduct.image,
            category: typeof fetchedProduct.category === 'string' 
              ? fetchedProduct.category 
              : fetchedProduct.category?.name || '',
            category_id: fetchedProduct.category_id,
            featured: !!fetchedProduct.featured,
            description: fetchedProduct.description,
            images: fetchedProduct.images as string[] || [],
            sku: fetchedProduct.sku,
            stock: fetchedProduct.stock,
            attributes: fetchedProduct.attributes as Record<string, string> || {},
            rating: fetchedProduct.rating,
            created_at: fetchedProduct.created_at,
            updated_at: fetchedProduct.updated_at
          };
          
          setProduct(productData);
          setSelectedImage(productData.image);
          
          // Fetch related products
          const allProducts = await productService.getAllProducts();
          
          // Convert all products to match our Product interface
          const relatedProductsData: Product[] = allProducts
            .filter(p => p.category_id === productData.category_id && p.id !== productData.id)
            .map(p => ({
              id: p.id,
              name: p.name,
              price: p.price,
              image: p.image,
              category: typeof p.category === 'string' ? p.category : p.category?.name || '',
              category_id: p.category_id,
              featured: !!p.featured,
              description: p.description,
              images: p.images as string[] || [],
              sku: p.sku,
              stock: p.stock,
              attributes: p.attributes as Record<string, string> || {},
              rating: p.rating,
              created_at: p.created_at,
              updated_at: p.updated_at
            }));
            
          setRelatedProducts(relatedProductsData.slice(0, 4)); // Get first 4 related products
        } catch (error) {
          console.error("Failed to fetch product:", error);
          toast({
            title: "Error",
            description: "Failed to load product details.",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProduct();
  }, [id, toast]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    if (!product?.stock) return;

    if (type === 'increase' && quantity < product.stock) {
      setQuantity(quantity + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) {
    return (
      <StoreLayout>
        <div className="container mx-auto px-4 py-8">
          <p>Loading product details...</p>
        </div>
      </StoreLayout>
    );
  }

  if (!product) {
    return (
      <StoreLayout>
        <div className="container mx-auto px-4 py-8">
          <p>Product not found.</p>
        </div>
      </StoreLayout>
    );
  }

  return (
    <StoreLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="text-sm breadcrumbs mb-4">
          <ul>
            <li>
              <Link to="/store">
                <ArrowLeft size={16} className="inline-block ltr:mr-2 rtl:ml-2" />
                المنتجات
              </Link>
            </li>
            <li>{product.name}</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <div className="relative rounded-lg overflow-hidden shadow-md">
              <img
                src={selectedImage || product.image}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {product.images && product.images.map((image, index) => (
                <div
                  key={index}
                  className={`rounded-md overflow-hidden cursor-pointer shadow-sm border ${selectedImage === image ? 'border-primary-500 border-2' : 'border-transparent'}`}
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image}
                    alt={`${product.name} - ${index}`}
                    className="w-full h-24 object-cover"
                  />
                </div>
              ))}
              <div
                className={`rounded-md overflow-hidden cursor-pointer shadow-sm border ${selectedImage === product.image ? 'border-primary-500 border-2' : 'border-transparent'}`}
                onClick={() => setSelectedImage(product.image)}
              >
                <img
                  src={product.image}
                  alt={`${product.name} - Main`}
                  className="w-full h-24 object-cover"
                />
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center mb-4">
              <RatingStars rating={product.rating || 0} />
              <span className="text-sm text-muted-foreground ml-2">
                ({product.reviews ? product.reviews.length : 0} تقييمات)
              </span>
            </div>
            <div className="flex items-center mb-4">
              <Badge className="bg-secondary border-0 text-sm">{product.category}</Badge>
              {product.featured && (
                <Badge className="bg-primary text-primary-foreground border-0 text-sm mr-2">مميز</Badge>
              )}
            </div>
            <p className="text-gray-700 mb-6">{product.description}</p>

            <div className="flex items-center justify-between mb-6">
              <div className="text-xl font-bold">{product.price.toFixed(3)} KWD</div>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-r-none"
                  onClick={() => handleQuantityChange('decrease')}
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </Button>
                <div className="h-9 px-3 flex items-center justify-center border-y text-sm">
                  {quantity}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-l-none"
                  onClick={() => handleQuantityChange('increase')}
                  disabled={product.stock ? quantity >= product.stock : false}
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>

            {product.stock && product.stock <= 5 ? (
              <div className="text-red-500 mb-4">
                المخزون قليل متبقي ({product.stock} فقط)
              </div>
            ) : null}

            <div className="flex gap-2 mb-6">
              <Button className="w-full button-hover-effect" onClick={handleAddToCart}>
                <ShoppingCart size={16} className="ml-2" />
                أضف إلى السلة
              </Button>
              <Button variant="secondary" className="w-full">
                <Heart size={16} className="ml-2" />
                المفضلة
              </Button>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>SKU: {product.sku || 'N/A'}</span>
              <div className="flex items-center">
                شارك:
                <Share2 size={16} className="mr-2" />
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <Tabs defaultValue="description" className="mt-8">
          <TabsList>
            <TabsTrigger value="description">الوصف</TabsTrigger>
            <TabsTrigger value="details">التفاصيل</TabsTrigger>
            <TabsTrigger value="reviews">التقييمات ({product.reviews ? product.reviews.length : 0})</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-4">
            <p>{product.description}</p>
          </TabsContent>
          <TabsContent value="details" className="mt-4">
            <ul className="list-disc list-inside">
              {product.attributes && Object.entries(product.attributes).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="reviews" className="mt-4">
            {product.reviews && product.reviews.length > 0 ? (
              <ul>
                {product.reviews.map((review) => (
                  <li key={review.id} className="mb-4">
                    <div className="flex items-center mb-1">
                      <Star size={16} className="text-yellow-500 ml-1" />
                      <span className="font-bold">{review.rating}</span>
                      <span className="text-muted-foreground text-sm mr-2">
                        {review.userName} - {review.date}
                      </span>
                    </div>
                    <p>{review.comment}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>لا يوجد تقييمات لهذا المنتج حتى الآن.</p>
            )}
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">منتجات ذات صلة</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </StoreLayout>
  );
};

export default ProductDetails;
