
import React, { useState } from 'react';
import { PlusCircle, Pencil, Trash2, Plus } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// نموذج الفئة
interface Category {
  id: string;
  name: string;
  description: string;
  products: number;
  imageUrl?: string;
  parentId?: string;
}

// المخطط التحققي للفئة
const categorySchema = z.object({
  name: z.string().min(1, { message: "يرجى إدخال اسم الفئة" }),
  description: z.string().optional(),
  parentId: z.string().optional(),
  imageUrl: z.string().optional(),
});

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'إلكترونيات', description: 'أجهزة إلكترونية وكمبيوتر', products: 12 },
    { id: '2', name: 'ملابس', description: 'ملابس رجالية ونسائية', products: 24 },
    { id: '3', name: 'أثاث منزلي', description: 'أثاث وديكورات منزلية', products: 8 },
    { id: '4', name: 'مستلزمات المطبخ', description: 'أدوات وأجهزة المطبخ', products: 15 },
  ]);
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = (values: z.infer<typeof categorySchema>) => {
    // إذا كان هناك تحرير لفئة موجودة
    if (currentCategory) {
      setCategories(categories.map(cat => 
        cat.id === currentCategory.id 
          ? { ...cat, name: values.name, description: values.description || "" }
          : cat
      ));
    } else {
      // إضافة فئة جديدة
      const newCategory: Category = {
        id: Math.random().toString(36).substring(2, 9),
        name: values.name,
        description: values.description || "",
        products: 0,
      };
      setCategories([...categories, newCategory]);
    }
    
    // إغلاق النافذة المنبثقة وإعادة تعيين النموذج
    setIsAddDialogOpen(false);
    setCurrentCategory(null);
    form.reset();
  };

  const handleEdit = (category: Category) => {
    setCurrentCategory(category);
    form.setValue("name", category.name);
    form.setValue("description", category.description);
    setIsAddDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setCategories(categories.filter(category => category.id !== id));
  };

  const handleAddNew = () => {
    setCurrentCategory(null);
    form.reset();
    setIsAddDialogOpen(true);
  };

  return (
    <div className="space-y-6" style={{ direction: "rtl" }}>
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">الفئات</h1>
          <p className="text-muted-foreground">
            إدارة فئات المنتجات في متجرك
          </p>
        </div>
        <Button onClick={handleAddNew} className="button-hover-effect">
          <Plus className="ml-2 h-4 w-4" />
          إضافة فئة جديدة
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">جميع الفئات</TabsTrigger>
          <TabsTrigger value="main">الفئات الرئيسية</TabsTrigger>
          <TabsTrigger value="sub">الفئات الفرعية</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>قائمة الفئات</CardTitle>
                <div className="flex items-center gap-2">
                  <Input placeholder="بحث..." className="w-60" />
                </div>
              </div>
              <CardDescription>
                جميع فئات المنتجات في متجرك
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-md text-primary">
                        <span className="text-lg font-bold">{category.name.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="font-medium">{category.name}</div>
                        <div className="text-sm text-muted-foreground">{category.description}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm text-muted-foreground ml-4">
                        {category.products} منتج
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(category)}>
                        <Pencil size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(category.id)}>
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="main" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>الفئات الرئيسية</CardTitle>
              <CardDescription>عرض وإدارة الفئات الرئيسية فقط</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                نفس القائمة مع تصفية للفئات الرئيسية فقط
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sub" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>الفئات الفرعية</CardTitle>
              <CardDescription>عرض وإدارة الفئات الفرعية فقط</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                نفس القائمة مع تصفية للفئات الفرعية فقط
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* نافذة الإضافة والتحرير */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{currentCategory ? 'تحرير الفئة' : 'إضافة فئة جديدة'}</DialogTitle>
            <DialogDescription>
              أدخل معلومات الفئة أدناه. اضغط حفظ عند الانتهاء.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم الفئة</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل اسم الفئة" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>وصف الفئة</FormLabel>
                    <FormControl>
                      <Input placeholder="وصف مختصر للفئة (اختياري)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Separator />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  إلغاء
                </Button>
                <Button type="submit">
                  {currentCategory ? 'تحديث' : 'إضافة'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Categories;
