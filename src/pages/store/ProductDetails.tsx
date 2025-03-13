
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, ShoppingCart, Heart, Share2, Star, Check, Package, RefreshCw, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StoreLayout from '@/layouts/StoreLayout';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { Separator } from '@/components/ui/separator';
import ProductCard from '@/components/store/ProductCard';
import ProductGrid from '@/components/store/ProductGrid';
import RatingStars from '@/components/store/RatingStars';
import { storeService } from '@/services/storeService';
import { productService } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/types/store';
import { useDeviceType } from '@/hooks/use-device-type';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const deviceType = useDeviceType();
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
          
          const productData: Product = {
            id: fetchedProduct.id,
            name: fetchedProduct.name,
            price: fetchedProduct.price,
            image: fetchedProduct.image,
            category: fetchedProduct.category,
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
          
          const allProducts = await productService.getAllProducts();
          
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
            
          setRelatedProducts(relatedProductsData.slice(0, deviceType === 'mobile' ? 2 : 4));
        } catch (error) {
          console.error("Failed to fetch product:", error);
          toast({
            title: "خطأ",
            description: "فشل في تحميل تفاصيل المنتج.",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProduct();
  }, [id, toast, deviceType]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast({
        title: "تمت الإضافة بنجاح",
        description: `تمت إضافة ${product.name} إلى سلة التسوق`,
        variant: "default",
      });
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

  if (loading || !product) {
    return (
      <StoreLayout>
        <div className="container mx-auto px-4 py-8 animate-pulse">
          <div className="h-4 w-32 bg-muted rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-96 bg-muted rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 w-3/4 bg-muted rounded"></div>
              <div className="h-4 w-1/4 bg-muted rounded"></div>
              <div className="h-20 bg-muted rounded"></div>
              <div className="h-8 w-1/4 bg-muted rounded mt-6"></div>
              <div className="flex gap-2">
                <div className="h-10 w-32 bg-muted rounded"></div>
                <div className="h-10 w-32 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </StoreLayout>
    );
  }

  const categoryName = typeof product.category === 'string' 
    ? product.category 
    : product.category?.name || '';

  return (
    <StoreLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-sm breadcrumbs mb-4">
          <ul className="flex items-center gap-2 text-muted-foreground">
            <li>
              <Link to="/store" className="hover:text-primary transition-colors flex items-center gap-1">
                <ArrowLeft size={16} className="inline-block" />
                <span>الرئيسية</span>
              </Link>
            </li>
            <li className="flex items-center gap-1 before:content-['/'] before:ml-2">
              <Link to={`/store?category=${categoryName}`} className="hover:text-primary transition-colors">
                {categoryName}
              </Link>
            </li>
            <li className="before:content-['/'] before:ml-2">{product.name}</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <div className="relative rounded-lg overflow-hidden shadow-sm border">
              <img
                src={selectedImage || product.image}
                alt={product.name}
                className="w-full object-contain aspect-square"
              />
              {product.featured && (
                <Badge 
                  className="absolute top-4 right-4 bg-primary/90"
                >
                  منتج مميز
                </Badge>
              )}
            </div>
            <div className="mt-4 grid grid-cols-4 sm:grid-cols-5 gap-2">
              {product.images && product.images.map((image, index) => (
                <button
                  key={index}
                  className={`rounded-md overflow-hidden cursor-pointer shadow-sm border ${selectedImage === image ? 'border-primary border-2' : 'border-muted hover:border-primary/50'}`}
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image}
                    alt={`${product.name} - ${index}`}
                    className="w-full h-16 md:h-20 object-cover"
                  />
                </button>
              ))}
              <button
                className={`rounded-md overflow-hidden cursor-pointer shadow-sm border ${selectedImage === product.image ? 'border-primary border-2' : 'border-muted hover:border-primary/50'}`}
                onClick={() => setSelectedImage(product.image)}
              >
                <img
                  src={product.image}
                  alt={`${product.name} - Main`}
                  className="w-full h-16 md:h-20 object-cover"
                />
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-xl md:text-2xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center mb-4">
              <RatingStars rating={product.rating || 0} />
              <span className="text-sm text-muted-foreground mr-2">
                ({product.reviews ? product.reviews.length : 0} تقييمات)
              </span>
            </div>
            <div className="flex items-center mb-4 gap-2">
              <Badge className="bg-secondary text-foreground border-0">{categoryName}</Badge>
              {product.stock && product.stock <= 5 ? (
                <Badge variant="destructive">كمية محدودة</Badge>
              ) : product.stock && product.stock > 0 ? (
                <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">متوفر</Badge>
              ) : (
                <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">غير متوفر</Badge>
              )}
            </div>
            
            <div className="text-2xl font-bold mb-4 text-primary">
              {product.price.toFixed(3)} KWD
            </div>
            
            <p className="text-muted-foreground mb-6">{product.description}</p>

            {/* Quantity selector */}
            <div className="mb-6">
              <p className="text-sm font-medium mb-2">الكمية</p>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-r-none"
                  onClick={() => handleQuantityChange('decrease')}
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </Button>
                <div className="h-10 px-6 flex items-center justify-center border-y">
                  {quantity}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-l-none"
                  onClick={() => handleQuantityChange('increase')}
                  disabled={product.stock ? quantity >= product.stock : true}
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>

            {/* Availability info */}
            {product.stock ? (
              product.stock <= 5 ? (
                <div className="text-amber-600 mb-4 flex items-center gap-1 text-sm">
                  <Package size={16} />
                  <span>المخزون قليل - متبقي ({product.stock} قطعة فقط)</span>
                </div>
              ) : (
                <div className="text-green-600 mb-4 flex items-center gap-1 text-sm">
                  <Check size={16} />
                  <span>متوفر في المخزون ({product.stock} قطعة)</span>
                </div>
              )
            ) : (
              <div className="text-red-600 mb-4 flex items-center gap-1 text-sm">
                <Package size={16} />
                <span>غير متوفر حالياً</span>
              </div>
            )}

            {/* Action buttons */}
            <div className={`flex gap-2 mb-6 ${deviceType === 'mobile' ? 'flex-col' : ''}`}>
              <Button 
                className="flex-1 gap-2" 
                onClick={handleAddToCart}
                disabled={!product.stock || product.stock === 0}
              >
                <ShoppingCart size={18} />
                <span>أضف إلى السلة</span>
              </Button>
              <Button variant="secondary" className="flex-1 gap-2">
                <Heart size={18} />
                <span>أضف للمفضلة</span>
              </Button>
            </div>

            {/* Product benefits */}
            <div className="space-y-3 mb-6 border rounded-lg p-4 bg-muted/10">
              <div className="flex items-start gap-2 text-sm">
                <Truck className="mt-0.5 h-4 w-4 text-primary shrink-0" />
                <div>
                  <p className="font-medium">شحن سريع</p>
                  <p className="text-muted-foreground text-xs">التوصيل خلال 2-4 أيام عمل</p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <RefreshCw className="mt-0.5 h-4 w-4 text-primary shrink-0" />
                <div>
                  <p className="font-medium">استرجاع مجاني</p>
                  <p className="text-muted-foreground text-xs">استرجاع مجاني خلال 14 يوم</p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 h-4 w-4 text-primary shrink-0" />
                <div>
                  <p className="font-medium">منتجات أصلية 100%</p>
                  <p className="text-muted-foreground text-xs">ضمان أصالة جميع المنتجات</p>
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>SKU: {product.sku || 'N/A'}</span>
              <div className="flex items-center gap-2">
                <span>مشاركة:</span>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Share2 size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="description" className="mt-12">
          <TabsList className="w-full flex justify-center">
            <TabsTrigger value="description">الوصف</TabsTrigger>
            <TabsTrigger value="details">التفاصيل</TabsTrigger>
            <TabsTrigger value="reviews">التقييمات ({product.reviews ? product.reviews.length : 0})</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6 px-2">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-lg font-medium mb-4">وصف المنتج</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>
          </TabsContent>
          <TabsContent value="details" className="mt-6 px-2">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-lg font-medium mb-4">مواصفات المنتج</h3>
              <ul className="space-y-2">
                {product.attributes && Object.entries(product.attributes as Record<string, string>).map(([key, value]) => (
                  <li key={key} className="flex border-b pb-2">
                    <strong className="w-1/3 text-muted-foreground">{key}:</strong>
                    <span className="w-2/3">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6 px-2">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-lg font-medium mb-4">آراء العملاء</h3>
              {product.reviews && product.reviews.length > 0 ? (
                <ul className="space-y-4">
                  {product.reviews.map((review) => (
                    <li key={review.id} className="border-b pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{review.userName}</span>
                          <RatingStars rating={review.rating} />
                        </div>
                        <span className="text-xs text-muted-foreground">{review.date}</span>
                      </div>
                      <p className="text-muted-foreground text-sm">{review.comment}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-muted-foreground py-6">لا يوجد تقييمات لهذا المنتج حتى الآن.</p>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <ProductGrid 
              products={relatedProducts}
              title="منتجات ذات صلة"
              showViewAll={false}
            />
          </section>
        )}
      </div>
    </StoreLayout>
  );
};

export default ProductDetails;
