import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  MoreHorizontal, 
  Tags,
  ShoppingBag,
  Package,
  Loader2
} from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Link } from 'react-router-dom';
import { productService } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "خطأ في تحميل المنتجات",
        description: "حدث خطأ أثناء محاولة تحميل المنتجات",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = (id: string) => {
    setProductToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (productToDelete) {
      setIsLoading(true);
      try {
        await productService.deleteProduct(productToDelete);
        setProducts(products.filter(product => product.id !== productToDelete));
        toast({
          title: "تم الحذف بنجاح",
          description: "تم حذف المنتج بنجاح",
        });
      } catch (error) {
        console.error('Error deleting product:', error);
        toast({
          title: "خطأ في حذف المنتج",
          description: "حدث خطأ أثناء محاولة حذف المنتج",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
        setIsDeleteDialogOpen(false);
        setProductToDelete(null);
      }
    }
  };

  const getStatusBadge = (product: any) => {
    if (product.stock <= 0) {
      return <Badge variant="destructive">نفذ المخزون</Badge>;
    } else if (product.stock < 5) {
      return <Badge variant="outline">مخزون منخفض</Badge>;
    } else {
      return <Badge className="bg-green-500 hover:bg-green-600">متوفر</Badge>;
    }
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.category && product.category.name && product.category.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (product.id && product.id.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6" style={{ direction: "rtl" }}>
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">المنتجات</h1>
          <p className="text-muted-foreground">
            إدارة منتجات متجرك وتتبع المخزون والمبيعات
          </p>
        </div>
        <Button asChild className="button-hover-effect">
          <Link to="/dashboard/products/new">
            <Plus className="ml-2 h-4 w-4" />
            إضافة منتج جديد
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            placeholder="بحث عن منتج..." 
            className="pr-10" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex gap-2">
          <Filter size={16} />
          <span>تصفية</span>
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">جميع المنتجات</TabsTrigger>
          <TabsTrigger value="active">المنتجات النشطة</TabsTrigger>
          <TabsTrigger value="out_of_stock">نفذ المخزون</TabsTrigger>
          <TabsTrigger value="draft">المسودات</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>قائمة المنتجات</CardTitle>
              <CardDescription>
                إجمالي {filteredProducts.length} منتج في متجرك
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center items-center py-10">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>المنتج</TableHead>
                      <TableHead>رقم المنتج</TableHead>
                      <TableHead>الفئة</TableHead>
                      <TableHead>السعر</TableHead>
                      <TableHead>المخزون</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead className="text-left">إجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.length > 0 ? filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-md overflow-hidden">
                              <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="text-sm line-clamp-1">{product.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{product.id.substring(0, 8)}</TableCell>
                        <TableCell>{product.category ? product.category.name : '-'}</TableCell>
                        <TableCell>{product.price.toFixed(2)} KWD</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>{getStatusBadge(product)}</TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" asChild>
                              <Link to={`/store/product/${product.id}`}>
                                <Eye size={16} />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="icon" asChild>
                              <Link to={`/dashboard/products/${product.id}/edit`}>
                                <Edit size={16} />
                              </Link>
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal size={16} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>خيارات</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                  <Link to={`/dashboard/products/${product.id}/edit`}>
                                    <Edit className="ml-2" size={16} />
                                    <span>تعديل المنتج</span>
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link to={`/store/product/${product.id}`}>
                                    <Eye className="ml-2" size={16} />
                                    <span>عرض المنتج</span>
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Tags className="ml-2" size={16} />
                                  <span>إدارة العلامات</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleDeleteProduct(product.id)} className="text-red-500 focus:text-red-500">
                                  <Trash2 className="ml-2" size={16} />
                                  <span>حذف المنتج</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    )) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          لا توجد منتجات مطابقة لبحثك
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>المنتجات النشطة</CardTitle>
              <CardDescription>
                قائمة المنتجات المتاحة للبيع في متجرك
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">
                سيتم عرض قائمة المنتجات النشطة هنا
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="out_of_stock">
          <Card>
            <CardHeader>
              <CardTitle>منتجات نفذت من المخزون</CardTitle>
              <CardDescription>
                منتجات تحتاج إلى إعادة تخزين
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">
                سيتم عرض قائمة المنتجات التي نفذت من المخزون هنا
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="draft">
          <Card>
            <CardHeader>
              <CardTitle>مسودات المنتجات</CardTitle>
              <CardDescription>
                منتجات غير منشورة في المتجر
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">
                سيتم عرض قائمة مسودات المنتجات هنا
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>هل أنت متأكد من حذف هذا المنتج؟</DialogTitle>
            <DialogDescription>
              هذا الإجراء لا يمكن التراجع عنه. سيتم حذف المنتج نهائيًا من قاعدة البيانات.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} disabled={isLoading}>
              إلغاء
            </Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'حذف'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">إجمالي المنتجات</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {products.filter(p => p.stock > 0).length} منتج متوفر
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">المخزون المنخفض</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {products.filter(p => p.stock < 5 && p.stock > 0).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {products.filter(p => p.stock === 0).length} منتج نفذ من المخزون
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">الفئات</CardTitle>
            <Tags className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(products.map(p => p.category?.id).filter(Boolean)).size}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              تنوع في تصنيفات المنتجات
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Products;
