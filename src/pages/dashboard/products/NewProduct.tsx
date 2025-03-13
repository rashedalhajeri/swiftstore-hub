
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Save, ImagePlus, Trash2, Plus, Minus, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

// نموذج التحقق من صحة المنتج
const productFormSchema = z.object({
  name: z.string().min(3, { message: 'يجب أن يكون اسم المنتج 3 أحرف على الأقل' }),
  sku: z.string().min(3, { message: 'يجب أن يكون SKU المنتج 3 أحرف على الأقل' }).optional(),
  price: z.coerce.number().min(0, { message: 'يجب أن يكون السعر 0 أو أكثر' }),
  comparePrice: z.coerce.number().min(0, { message: 'يجب أن يكون السعر المقارن 0 أو أكثر' }).optional(),
  description: z.string().min(10, { message: 'يجب أن يكون الوصف 10 أحرف على الأقل' }),
  stock: z.coerce.number().min(0, { message: 'يجب أن تكون الكمية 0 أو أكثر' }),
  category: z.string().min(1, { message: 'يرجى اختيار فئة' }),
  featured: z.boolean().default(false),
  status: z.enum(['active', 'draft', 'out_of_stock']),
  weight: z.coerce.number().min(0, { message: 'يجب أن يكون الوزن 0 أو أكثر' }).optional(),
  width: z.coerce.number().min(0, { message: 'يجب أن يكون العرض 0 أو أكثر' }).optional(),
  height: z.coerce.number().min(0, { message: 'يجب أن يكون الارتفاع 0 أو أكثر' }).optional(),
  length: z.coerce.number().min(0, { message: 'يجب أن يكون الطول 0 أو أكثر' }).optional(),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

// Sample categories data
const categories = [
  { id: 'electronics', name: 'إلكترونيات' },
  { id: 'clothing', name: 'ملابس' },
  { id: 'home', name: 'أثاث منزلي' },
  { id: 'kitchen', name: 'مستلزمات المطبخ' },
  { id: 'books', name: 'كتب' },
];

const NewProduct = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<{ preview: string; file?: File }[]>([]);
  const [imageUploading, setImageUploading] = useState(false);
  const [variantOptions, setVariantOptions] = useState<string[]>([]);
  const [variantOptionValue, setVariantOptionValue] = useState('');
  const [attributes, setAttributes] = useState<{ key: string; value: string }[]>([]);
  const [newAttributeKey, setNewAttributeKey] = useState('');
  const [newAttributeValue, setNewAttributeValue] = useState('');
  const [saving, setSaving] = useState(false);
  
  // Toggle fields visibility state
  const [showComparePrice, setShowComparePrice] = useState(false);
  const [showSku, setShowSku] = useState(false);

  // Initialize form with defaults
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: '',
      sku: '',
      price: 0,
      comparePrice: undefined,
      description: '',
      stock: 0,
      category: '',
      featured: false,
      status: 'active',
      weight: undefined,
      width: undefined,
      height: undefined,
      length: undefined,
    },
  });

  const onSubmit = async (data: ProductFormValues) => {
    setSaving(true);
    
    try {
      // In a real app, we would upload images and save product data
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('تم إضافة المنتج بنجاح');
      navigate('/dashboard/products');
    } catch (error) {
      toast.error('حدث خطأ أثناء حفظ المنتج');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setImageUploading(true);
    
    const newImages = Array.from(files).map(file => ({
      preview: URL.createObjectURL(file),
      file
    }));
    
    setImages([...images, ...newImages]);
    setImageUploading(false);
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    
    // Revoke the object URL to avoid memory leaks
    if (newImages[index].preview) {
      URL.revokeObjectURL(newImages[index].preview);
    }
    
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const addVariantOption = () => {
    if (variantOptionValue.trim() && !variantOptions.includes(variantOptionValue)) {
      setVariantOptions([...variantOptions, variantOptionValue]);
      setVariantOptionValue('');
    }
  };

  const removeVariantOption = (option: string) => {
    setVariantOptions(variantOptions.filter(o => o !== option));
  };

  const addAttribute = () => {
    if (newAttributeKey.trim() && newAttributeValue.trim()) {
      setAttributes([...attributes, { key: newAttributeKey, value: newAttributeValue }]);
      setNewAttributeKey('');
      setNewAttributeValue('');
    }
  };

  const removeAttribute = (index: number) => {
    const newAttributes = [...attributes];
    newAttributes.splice(index, 1);
    setAttributes(newAttributes);
  };

  return (
    <div className="space-y-6" style={{ direction: "rtl" }}>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">إضافة منتج جديد</h2>
          <p className="text-muted-foreground">
            أضف منتجًا جديدًا إلى متجرك وقم بتعيين خصائصه
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate('/dashboard/products')}>
            <ArrowLeft className="ml-2 h-4 w-4" />
            إلغاء
          </Button>
          <Button onClick={form.handleSubmit(onSubmit)} disabled={saving} className="bg-primary text-white hover:bg-primary/90">
            {saving ? (
              <>جاري الحفظ...</>
            ) : (
              <>
                <Save className="ml-2 h-4 w-4" />
                حفظ المنتج
              </>
            )}
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="mb-4 bg-muted/50 p-1 rounded-lg">
              <TabsTrigger value="basic" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">المعلومات الأساسية</TabsTrigger>
              <TabsTrigger value="images" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">الصور</TabsTrigger>
              <TabsTrigger value="inventory" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">المخزون</TabsTrigger>
              <TabsTrigger value="attributes" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">الخصائص</TabsTrigger>
              <TabsTrigger value="variants" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">المتغيرات</TabsTrigger>
              <TabsTrigger value="shipping" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">الشحن</TabsTrigger>
            </TabsList>

            {/* Basic Info Tab */}
            <TabsContent value="basic">
              <Card className="border-none shadow-sm">
                <CardContent className="pt-6 space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">اسم المنتج</FormLabel>
                        <FormControl>
                          <Input placeholder="أدخل اسم المنتج" {...field} className="focus-visible:ring-primary" />
                        </FormControl>
                        <FormDescription>
                          اسم المنتج كما سيظهر في المتجر
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-medium">رمز المنتج (SKU)</h3>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setShowSku(!showSku)}
                          className="h-8 px-2 text-muted-foreground"
                        >
                          {showSku ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
                          {showSku ? 'إخفاء' : 'إظهار'}
                        </Button>
                      </div>
                      
                      {showSku && (
                        <FormField
                          control={form.control}
                          name="sku"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input placeholder="PROD-001" {...field} className="focus-visible:ring-primary" />
                              </FormControl>
                              <FormDescription>
                                رمز تعريفي فريد للمنتج
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">الفئة</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="focus-visible:ring-primary">
                                <SelectValue placeholder="اختر فئة المنتج" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category.id} value={category.id}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            الفئة التي ينتمي إليها المنتج
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">السعر</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" step="0.01" {...field} className="focus-visible:ring-primary" />
                          </FormControl>
                          <FormDescription>
                            سعر البيع في المتجر (بالدينار الكويتي)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-medium">السعر المقارن</h3>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setShowComparePrice(!showComparePrice)}
                          className="h-8 px-2 text-muted-foreground"
                        >
                          {showComparePrice ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
                          {showComparePrice ? 'إخفاء' : 'إظهار'}
                        </Button>
                      </div>
                      
                      {showComparePrice && (
                        <FormField
                          control={form.control}
                          name="comparePrice"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  min="0" 
                                  step="0.01" 
                                  {...field} 
                                  value={field.value === undefined ? '' : field.value}
                                  onChange={(e) => field.onChange(e.target.value === '' ? undefined : parseFloat(e.target.value))}
                                  className="focus-visible:ring-primary"
                                />
                              </FormControl>
                              <FormDescription>
                                السعر الأصلي قبل الخصم، سيظهر كسعر مشطوب
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">وصف المنتج</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="أدخل وصفاً مفصلاً للمنتج..."
                            className="h-32 focus-visible:ring-primary"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          وصف تفصيلي للمنتج، يمكن أن يتضمن المميزات والمواصفات
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">حالة المنتج</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="focus-visible:ring-primary">
                                <SelectValue placeholder="اختر حالة المنتج" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="active">نشط (متاح للبيع)</SelectItem>
                              <SelectItem value="draft">مسودة (غير منشور)</SelectItem>
                              <SelectItem value="out_of_stock">نفذ من المخزون</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            حالة المنتج في المتجر
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="featured"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">منتج مميز</FormLabel>
                            <FormDescription>
                              عرض هذا المنتج في قسم المنتجات المميزة على الصفحة الرئيسية
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Images Tab */}
            <TabsContent value="images">
              <Card className="border-none shadow-sm">
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">صور المنتج</h3>
                      <p className="text-sm text-muted-foreground">
                        أضف صورًا للمنتج. الصورة الأولى ستكون الصورة الرئيسية.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
                      {images.map((image, index) => (
                        <div key={index} className="relative group aspect-square rounded-md overflow-hidden shadow-sm border border-muted">
                          <img
                            src={image.preview}
                            alt={`Product preview ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          {index === 0 && (
                            <div className="absolute bottom-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full shadow-sm">
                              الصورة الرئيسية
                            </div>
                          )}
                        </div>
                      ))}
                      
                      <label className="border border-dashed rounded-md flex flex-col items-center justify-center aspect-square cursor-pointer hover:bg-muted/50 transition-colors">
                        <ImagePlus className="h-8 w-8 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground">إضافة صورة</span>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={handleImageUpload}
                          disabled={imageUploading}
                        />
                      </label>
                    </div>
                    
                    <div className="text-sm text-muted-foreground bg-muted/30 p-4 rounded-lg">
                      <p className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-muted-foreground"></span> يمكن إضافة حتى 8 صور للمنتج</p>
                      <p className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-muted-foreground"></span> أقصى حجم للصورة: 5 ميجابايت</p>
                      <p className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-muted-foreground"></span> أفضل أبعاد: 1000 × 1000 بكسل</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Inventory Tab */}
            <TabsContent value="inventory">
              <Card className="border-none shadow-sm">
                <CardContent className="pt-6 space-y-6">
                  <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">الكمية المتوفرة في المخزون</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" {...field} className="focus-visible:ring-primary" />
                        </FormControl>
                        <FormDescription>
                          عدد الوحدات المتوفرة للبيع
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium">إعدادات المخزون</h3>
                      <Separator className="my-4" />
                    </div>
                    
                    <div className="space-y-6">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <div className="flex-grow">
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <Checkbox id="track-inventory" />
                            <div className="space-y-1">
                              <label
                                htmlFor="track-inventory"
                                className="text-sm font-medium leading-none cursor-pointer"
                              >
                                تتبع المخزون
                              </label>
                              <p className="text-sm text-muted-foreground">
                                تحديث كمية المخزون تلقائيًا عند إتمام الطلبات
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <div className="flex-grow">
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <Checkbox id="continue-selling" />
                            <div className="space-y-1">
                              <label
                                htmlFor="continue-selling"
                                className="text-sm font-medium leading-none cursor-pointer"
                              >
                                متابعة البيع عند نفاذ المخزون
                              </label>
                              <p className="text-sm text-muted-foreground">
                                السماح للعملاء بشراء المنتج حتى عندما يكون غير متوفر في المخزون
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <div className="flex-grow">
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <Checkbox id="low-stock" />
                            <div className="space-y-1">
                              <label
                                htmlFor="low-stock"
                                className="text-sm font-medium leading-none cursor-pointer"
                              >
                                تنبيهات المخزون المنخفض
                              </label>
                              <p className="text-sm text-muted-foreground">
                                تلقي إشعار عندما ينخفض المخزون عن حد معين
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Attributes Tab */}
            <TabsContent value="attributes">
              <Card className="border-none shadow-sm">
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">خصائص المنتج</h3>
                      <p className="text-sm text-muted-foreground">
                        أضف خصائص إضافية للمنتج مثل المادة، اللون، الحجم، إلخ.
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex flex-col gap-4">
                        {attributes.map((attr, index) => (
                          <div key={index} className="flex items-center gap-2 bg-muted/20 p-3 rounded-md">
                            <div className="grid grid-cols-2 gap-2 flex-1">
                              <Input value={attr.key} readOnly placeholder="اسم الخاصية" className="bg-background" />
                              <Input value={attr.value} readOnly placeholder="قيمة الخاصية" className="bg-background" />
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeAttribute(index)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        
                        <div className="flex items-center gap-2 mt-2">
                          <div className="grid grid-cols-2 gap-2 flex-1">
                            <Input
                              value={newAttributeKey}
                              onChange={(e) => setNewAttributeKey(e.target.value)}
                              placeholder="اسم الخاصية (مثل: اللون)"
                              className="focus-visible:ring-primary"
                            />
                            <Input
                              value={newAttributeValue}
                              onChange={(e) => setNewAttributeValue(e.target.value)}
                              placeholder="قيمة الخاصية (مثل: أحمر)"
                              className="focus-visible:ring-primary"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={addAttribute}
                            disabled={!newAttributeKey || !newAttributeValue}
                            className="border-primary text-primary hover:bg-primary/10"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Variants Tab */}
            <TabsContent value="variants">
              <Card className="border-none shadow-sm">
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">متغيرات المنتج</h3>
                      <p className="text-sm text-muted-foreground">
                        إضافة متغيرات للمنتج مثل الألوان والأحجام المختلفة.
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-4">
                        <h4 className="text-md font-medium">خيارات المتغيرات</h4>
                        <div className="flex gap-2 flex-wrap">
                          {variantOptions.map((option, index) => (
                            <div key={index} className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-sm flex items-center gap-1 shadow-sm">
                              <span>{option}</span>
                              <button
                                type="button"
                                onClick={() => removeVariantOption(option)}
                                className="text-muted-foreground hover:text-foreground"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                          
                          {variantOptions.length === 0 && (
                            <div className="w-full text-sm text-muted-foreground bg-muted/30 p-6 rounded-lg text-center">
                              لا توجد متغيرات حتى الآن. أضف خيارات المتغيرات أدناه.
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-4">
                        <Input
                          value={variantOptionValue}
                          onChange={(e) => setVariantOptionValue(e.target.value)}
                          placeholder="أضف خيار متغير (مثل: أحمر، S، 256GB)"
                          className="focus-visible:ring-primary"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={addVariantOption}
                          disabled={!variantOptionValue.trim()}
                          className="border-primary text-primary hover:bg-primary/10"
                        >
                          إضافة
                        </Button>
                      </div>
                      
                      {variantOptions.length > 0 && (
                        <>
                          <Separator className="my-4" />
                          <div className="space-y-2">
                            <h4 className="text-md font-medium">المتغيرات المنشأة</h4>
                            <div className="w-full text-sm text-muted-foreground bg-muted/30 p-6 rounded-lg flex items-center justify-center gap-2">
                              <CheckCircle2 className="h-5 w-5 text-primary" />
                              <span>يمكن إضافة متغيرات محددة بعد حفظ المنتج</span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Shipping Tab */}
            <TabsContent value="shipping">
              <Card className="border-none shadow-sm">
                <CardContent className="pt-6 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">معلومات الشحن</h3>
                    <p className="text-sm text-muted-foreground">
                      معلومات تساعد في حساب تكاليف الشحن وإعداد الطلبات.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="weight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">الوزن (كجم)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="0" 
                              step="0.01" 
                              {...field} 
                              value={field.value === undefined ? '' : field.value}
                              onChange={(e) => field.onChange(e.target.value === '' ? undefined : parseFloat(e.target.value))}
                              className="focus-visible:ring-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <div className="flex-grow">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse p-4 bg-muted/20 rounded-lg h-full">
                          <Checkbox id="requires-shipping" defaultChecked />
                          <div className="space-y-1">
                            <label
                              htmlFor="requires-shipping"
                              className="text-sm font-medium leading-none cursor-pointer"
                            >
                              هذا المنتج يتطلب شحن
                            </label>
                            <p className="text-sm text-muted-foreground">
                              قم بإلغاء تحديد هذا الخيار للمنتجات الرقمية أو الخدمات
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                    <FormField
                      control={form.control}
                      name="length"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">الطول (سم)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="0" 
                              step="0.1" 
                              {...field} 
                              value={field.value === undefined ? '' : field.value}
                              onChange={(e) => field.onChange(e.target.value === '' ? undefined : parseFloat(e.target.value))}
                              className="focus-visible:ring-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="width"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">العرض (سم)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="0" 
                              step="0.1" 
                              {...field} 
                              value={field.value === undefined ? '' : field.value}
                              onChange={(e) => field.onChange(e.target.value === '' ? undefined : parseFloat(e.target.value))}
                              className="focus-visible:ring-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="height"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">الارتفاع (سم)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="0" 
                              step="0.1" 
                              {...field} 
                              value={field.value === undefined ? '' : field.value}
                              onChange={(e) => field.onChange(e.target.value === '' ? undefined : parseFloat(e.target.value))}
                              className="focus-visible:ring-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex justify-end gap-2">
            <Button variant="outline" onClick={() => navigate('/dashboard/products')}>
              إلغاء
            </Button>
            <Button type="submit" disabled={saving} className="bg-primary text-white hover:bg-primary/90">
              {saving ? (
                <>جاري الحفظ...</>
              ) : (
                <>
                  <Save className="ml-2 h-4 w-4" />
                  حفظ المنتج
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NewProduct;
