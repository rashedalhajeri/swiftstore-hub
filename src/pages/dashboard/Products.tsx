
import React, { useState } from 'react';
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
  Package
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

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  sold: number;
  status: 'active' | 'draft' | 'out_of_stock';
  imageUrl: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "PROD-001",
      name: "هاتف ذكي Samsung Galaxy S22",
      price: 299.99,
      category: "إلكترونيات",
      stock: 24,
      sold: 16,
      status: "active",
      imageUrl: "https://via.placeholder.com/150"
    },
    {
      id: "PROD-002",
      name: "سماعات لاسلكية Sony WH-1000XM4",
      price: 149.99,
      category: "إلكترونيات",
      stock: 12,
      sold: 8,
      status: "active",
      imageUrl: "https://via.placeholder.com/150"
    },
    {
      id: "PROD-003",
      name: "حقيبة ظهر للرحلات",
      price: 59.99,
      category: "ملابس",
      stock: 0,
      sold: 20,
      status: "out_of_stock",
      imageUrl: "https://via.placeholder.com/150"
    },
    {
      id: "PROD-004",
      name: "ساعة ذكية Fitbit Versa 3",
      price: 129.99,
      category: "إلكترونيات",
      stock: 8,
      sold: 12,
      status: "active",
      imageUrl: "https://via.placeholder.com/150"
    },
    {
      id: "PROD-005",
      name: "قميص رجالي كلاسيكي",
      price: 39.99,
      category: "ملابس",
      stock: 18,
      sold: 7,
      status: "active",
      imageUrl: "https://via.placeholder.com/150"
    },
    {
      id: "PROD-006",
      name: "كتاب التفكير السريع والبطيء",
      price: 15.99,
      category: "كتب",
      stock: 3,
      sold: 27,
      status: "active",
      imageUrl: "https://via.placeholder.com/150"
    },
    {
      id: "PROD-007",
      name: "مكنسة كهربائية Dyson V11",
      price: 349.99,
      category: "أثاث منزلي",
      stock: 5,
      sold: 3,
      status: "active",
      imageUrl: "https://via.placeholder.com/150"
    },
    {
      id: "PROD-008",
      name: "مجموعة أواني طبخ",
      price: 89.99,
      category: "مستلزمات المطبخ",
      stock: 0,
      sold: 15,
      status: "out_of_stock",
      imageUrl: "https://via.placeholder.com/150"
    },
    {
      id: "PROD-009",
      name: "طاولة قهوة خشبية",
      price: 119.99,
      category: "أثاث منزلي",
      stock: 7,
      sold: 4,
      status: "active",
      imageUrl: "https://via.placeholder.com/150"
    },
    {
      id: "PROD-010",
      name: "كاميرا Canon EOS 90D",
      price: 799.99,
      category: "إلكترونيات",
      stock: 2,
      sold: 6,
      status: "active",
      imageUrl: "https://via.placeholder.com/150"
    }
  ]);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDeleteProduct = (id: string) => {
    setProductToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      setProducts(products.filter(product => product.id !== productToDelete));
      setIsDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  const getStatusBadge = (status: Product['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500 hover:bg-green-600">نشط</Badge>;
      case 'draft':
        return <Badge variant="outline">مسودة</Badge>;
      case 'out_of_stock':
        return <Badge variant="destructive">نفذ المخزون</Badge>;
      default:
        return null;
    }
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.id.toLowerCase().includes(searchTerm.toLowerCase())
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>المنتج</TableHead>
                    <TableHead>رقم المنتج</TableHead>
                    <TableHead>الفئة</TableHead>
                    <TableHead>السعر</TableHead>
                    <TableHead>المخزون</TableHead>
                    <TableHead>المبيعات</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead className="text-left">إجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-md overflow-hidden">
                            <img 
                              src={product.imageUrl} 
                              alt={product.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-sm line-clamp-1">{product.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{product.id}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.price.toFixed(2)} KWD</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>{product.sold}</TableCell>
                      <TableCell>{getStatusBadge(product.status)}</TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye size={16} />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit size={16} />
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
                              <DropdownMenuItem>
                                <Edit className="ml-2" size={16} />
                                <span>تعديل المنتج</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Eye className="ml-2" size={16} />
                                <span>عرض المنتج</span>
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
                  ))}
                  
                  {filteredProducts.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center">
                        لا توجد منتجات مطابقة لبحثك
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
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

      {/* حوار تأكيد الحذف */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>هل أنت متأكد من حذف هذا المنتج؟</DialogTitle>
            <DialogDescription>
              هذا الإجراء لا يمكن التراجع عنه. سيتم حذف المنتج نهائيًا من قاعدة البيانات.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              إلغاء
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              حذف
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* بطاقات إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">إجمالي المنتجات</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {products.filter(p => p.status === 'active').length} منتج نشط
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
              {new Set(products.map(p => p.category)).size}
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
