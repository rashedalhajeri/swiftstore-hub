
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Minus, 
  Plus, 
  Heart, 
  Share2, 
  Package, 
  ArrowLeft,
  ShoppingBag,
  TruckIcon,
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import StoreLayout from '@/layouts/StoreLayout';
import { getProductById, getRelatedProducts } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import RatingStars from '@/components/store/RatingStars';
import ProductCard from '@/components/store/ProductCard';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');
  const [product, setProduct] = useState(id ? getProductById(id) : undefined);
  const [relatedProducts, setRelatedProducts] = useState(product ? getRelatedProducts(product.category, product.id) : []);

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedImage(foundProduct.image);
        setRelatedProducts(getRelatedProducts(foundProduct.category, foundProduct.id));
      } else {
        // إذا لم يتم العثور على المنتج، انتقل إلى الصفحة الرئيسية للمتجر
        navigate('/store');
        toast({
          title: "لم يتم العثور على المنتج",
          description: "المنتج المطلوب غير موجود",
          variant: "destructive",
        });
      }
    }
  }, [id, navigate, toast]);

  if (!product) {
    return (
      <StoreLayout>
        <div className="container mx-auto py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">جاري التحميل...</h1>
        </div>
      </StoreLayout>
    );
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (product.stock && quantity < product.stock) {
      setQuantity(quantity + 1);
    } else if (!product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <StoreLayout>
      <div className="container mx-auto px-4 py-8">
        {/* زر العودة */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="flex items-center gap-1"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={16} />
            <span>العودة</span>
          </Button>
        </div>

        {/* تفاصيل المنتج */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* صور المنتج */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden border">
              <img 
                src={selectedImage} 
                alt={product.name} 
                className="w-full h-full object-cover" 
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-auto py-2">
                {product.images.map((img, index) => (
                  <button 
                    key={index}
                    className={`border rounded-md overflow-hidden flex-shrink-0 w-20 h-20 ${selectedImage === img ? 'border-primary' : 'border-border'}`}
                    onClick={() => setSelectedImage(img)}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} - ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* معلومات المنتج */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
                  {product.category}
                </Badge>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Heart size={20} className="text-muted-foreground" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Share2 size={20} className="text-muted-foreground" />
                  </Button>
                </div>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
              
              {product.rating && (
                <div className="flex items-center gap-4 mb-2">
                  <RatingStars rating={product.rating} showRating size="lg" />
                  <span className="text-sm text-muted-foreground">
                    {product.reviews?.length || 0} تقييمات
                  </span>
                </div>
              )}

              <div className="text-3xl font-bold text-primary my-4">
                {product.price.toFixed(3)} KWD
              </div>
              
              <div className="mb-6">
                <p className="text-muted-foreground">
                  {product.description}
                </p>
              </div>
            </div>

            {/* معلومات السلعة والتوفر */}
            <div className="py-4 border-t border-b space-y-3">
              {product.sku && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">رمز المنتج:</span>
                  <span className="font-medium">{product.sku}</span>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">التوفر:</span>
                {product.stock ? (
                  product.stock > 10 ? (
                    <span className="text-green-600 font-medium flex items-center gap-1">
                      <Package size={16} />
                      متوفر في المخزون
                    </span>
                  ) : (
                    <span className="text-amber-600 font-medium flex items-center gap-1">
                      <Package size={16} />
                      متبقي {product.stock} قطعة فقط
                    </span>
                  )
                ) : (
                  <span className="text-red-600 font-medium flex items-center gap-1">
                    <Package size={16} />
                    غير متوفر حالياً
                  </span>
                )}
              </div>
            </div>

            {/* خيارات الشراء */}
            <div className="space-y-4 pt-2">
              {/* كمية المنتج */}
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">الكمية:</span>
                <div className="flex items-center">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-r-none"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </Button>
                  <div className="h-10 w-16 flex items-center justify-center border-y">
                    {quantity}
                  </div>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-l-none"
                    onClick={increaseQuantity}
                    disabled={product.stock ? quantity >= product.stock : false}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </div>

              {/* أزرار الشراء */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button 
                  className="flex-1 button-hover-effect" 
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={!product.stock || product.stock === 0}
                >
                  <ShoppingBag className="ml-2 h-5 w-5" />
                  إضافة للسلة
                </Button>
                <Button 
                  className="flex-1" 
                  size="lg" 
                  variant="outline"
                  onClick={() => {
                    handleAddToCart();
                    navigate('/store/cart');
                  }}
                  disabled={!product.stock || product.stock === 0}
                >
                  شراء الآن
                </Button>
              </div>
            </div>

            {/* ميزات إضافية */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col items-center text-center p-3 rounded-lg border">
                <TruckIcon className="mb-2 text-primary" size={24} />
                <span className="text-sm font-medium">شحن سريع</span>
                <span className="text-xs text-muted-foreground">خلال 2-4 أيام عمل</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 rounded-lg border">
                <ShieldCheck className="mb-2 text-primary" size={24} />
                <span className="text-sm font-medium">ضمان الجودة</span>
                <span className="text-xs text-muted-foreground">ضمان لمدة سنة كاملة</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 rounded-lg border">
                <CreditCard className="mb-2 text-primary" size={24} />
                <span className="text-sm font-medium">دفع آمن</span>
                <span className="text-xs text-muted-foreground">طرق دفع متعددة</span>
              </div>
            </div>
          </div>
        </div>

        {/* معلومات إضافية وتقييمات */}
        <div className="mb-12">
          <Tabs defaultValue="details">
            <TabsList className="mb-4 flex justify-center w-full">
              <TabsTrigger value="details" className="flex-1">المواصفات</TabsTrigger>
              <TabsTrigger value="reviews" className="flex-1">التقييمات</TabsTrigger>
              <TabsTrigger value="shipping" className="flex-1">الشحن والإرجاع</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="bg-secondary/20 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">مواصفات المنتج</h3>
              
              {product.attributes && Object.keys(product.attributes).length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(product.attributes).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between border-b pb-2">
                      <span className="font-medium">{key}:</span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">لا توجد مواصفات إضافية متاحة.</p>
              )}
            </TabsContent>
            
            <TabsContent value="reviews" className="bg-secondary/20 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">تقييمات المنتج</h3>
                <Button variant="outline" size="sm">
                  أضف تقييمك
                </Button>
              </div>
              
              {product.reviews && product.reviews.length > 0 ? (
                <div className="space-y-6">
                  {product.reviews.map(review => (
                    <div key={review.id} className="border-b pb-6">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold">{review.userName}</h4>
                        <span className="text-sm text-muted-foreground">
                          {review.date}
                        </span>
                      </div>
                      <RatingStars rating={review.rating} size="sm" />
                      <p className="mt-2 text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">لا توجد تقييمات بعد. كن أول من يقيم هذا المنتج!</p>
              )}
            </TabsContent>
            
            <TabsContent value="shipping" className="bg-secondary/20 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">معلومات الشحن والإرجاع</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-base mb-2">الشحن</h4>
                  <p className="text-muted-foreground">
                    يتم شحن المنتجات خلال 24 ساعة من تأكيد الطلب. الشحن داخل الكويت يستغرق 2-4 أيام عمل.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-bold text-base mb-2">سياسة الإرجاع</h4>
                  <p className="text-muted-foreground">
                    يمكنك إرجاع المنتج خلال 14 يوماً من استلامه إذا كان في حالته الأصلية وغير مستخدم.
                    لا تنطبق سياسة الإرجاع على المنتجات المخفضة أو المنتجات المصنوعة حسب الطلب.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-bold text-base mb-2">الضمان</h4>
                  <p className="text-muted-foreground">
                    جميع المنتجات الإلكترونية تأتي مع ضمان لمدة سنة ضد عيوب التصنيع.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* المنتجات ذات الصلة */}
        {relatedProducts.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">منتجات ذات صلة</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
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
