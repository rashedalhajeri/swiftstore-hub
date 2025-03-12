
import React, { useState } from 'react';
import { PlusCircle, Pencil, Trash2, Plus, Copy, CalendarIcon, CheckCircle, RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";

// البيانات النموذجية للعروض الترويجية
interface Promotion {
  id: string;
  code: string;
  type: 'percentage' | 'fixed' | 'shipping';
  value: number;
  validFrom: Date;
  validTo: Date;
  usageCount: number;
  maxUses: number | null;
  isActive: boolean;
  appliesTo: 'all' | 'specific' | 'category';
}

// المخطط التحققي للعرض الترويجي
const promotionSchema = z.object({
  code: z.string().min(3, { message: "يجب أن يكون رمز الخصم 3 أحرف على الأقل" }),
  type: z.enum(['percentage', 'fixed', 'shipping']),
  value: z.coerce.number().min(0, { message: "يجب أن تكون القيمة أكبر من أو تساوي صفر" }),
  validFrom: z.date(),
  validTo: z.date(),
  maxUses: z.coerce.number().nullable(),
  isActive: z.boolean(),
  appliesTo: z.enum(['all', 'specific', 'category']),
});

const Promotions = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([
    { 
      id: '1', 
      code: 'WELCOME20', 
      type: 'percentage', 
      value: 20, 
      validFrom: new Date(2023, 0, 1), 
      validTo: new Date(2023, 11, 31), 
      usageCount: 43, 
      maxUses: 100,
      isActive: true,
      appliesTo: 'all'
    },
    { 
      id: '2', 
      code: 'FREESHIP', 
      type: 'shipping', 
      value: 0, 
      validFrom: new Date(2023, 0, 1), 
      validTo: new Date(2023, 11, 31), 
      usageCount: 21, 
      maxUses: null,
      isActive: true,
      appliesTo: 'all'
    },
    { 
      id: '3', 
      code: 'SUMMER10', 
      type: 'fixed', 
      value: 10, 
      validFrom: new Date(2023, 5, 1), 
      validTo: new Date(2023, 8, 30), 
      usageCount: 0, 
      maxUses: 50,
      isActive: false,
      appliesTo: 'category'
    },
  ]);
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [currentPromotion, setCurrentPromotion] = useState<Promotion | null>(null);
  
  const form = useForm<z.infer<typeof promotionSchema>>({
    resolver: zodResolver(promotionSchema),
    defaultValues: {
      code: "",
      type: "percentage",
      value: 0,
      validFrom: new Date(),
      validTo: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      maxUses: null,
      isActive: true,
      appliesTo: 'all',
    },
  });

  const onSubmit = (values: z.infer<typeof promotionSchema>) => {
    // إذا كان هناك تحرير لعرض موجود
    if (currentPromotion) {
      setPromotions(promotions.map(promo => 
        promo.id === currentPromotion.id 
          ? { 
              ...promo, 
              code: values.code,
              type: values.type,
              value: values.value,
              validFrom: values.validFrom,
              validTo: values.validTo,
              maxUses: values.maxUses,
              isActive: values.isActive,
              appliesTo: values.appliesTo,
            }
          : promo
      ));
    } else {
      // إضافة عرض جديد
      const newPromotion: Promotion = {
        id: Math.random().toString(36).substring(2, 9),
        code: values.code,
        type: values.type,
        value: values.value,
        validFrom: values.validFrom,
        validTo: values.validTo,
        usageCount: 0,
        maxUses: values.maxUses,
        isActive: values.isActive,
        appliesTo: values.appliesTo,
      };
      setPromotions([...promotions, newPromotion]);
    }
    
    // إغلاق النافذة المنبثقة وإعادة تعيين النموذج
    setIsAddDialogOpen(false);
    setCurrentPromotion(null);
    form.reset();
  };

  const handleEdit = (promotion: Promotion) => {
    setCurrentPromotion(promotion);
    form.setValue("code", promotion.code);
    form.setValue("type", promotion.type);
    form.setValue("value", promotion.value);
    form.setValue("validFrom", promotion.validFrom);
    form.setValue("validTo", promotion.validTo);
    form.setValue("maxUses", promotion.maxUses);
    form.setValue("isActive", promotion.isActive);
    form.setValue("appliesTo", promotion.appliesTo);
    setIsAddDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setPromotions(promotions.filter(promotion => promotion.id !== id));
  };

  const handleAddNew = () => {
    setCurrentPromotion(null);
    form.reset();
    setIsAddDialogOpen(true);
  };
  
  const togglePromotionStatus = (id: string) => {
    setPromotions(promotions.map(promotion => 
      promotion.id === id 
        ? { ...promotion, isActive: !promotion.isActive }
        : promotion
    ));
  };

  const copyCodeToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    // يمكن إضافة إشعار هنا
  };

  const generateRandomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    form.setValue("code", result);
  };

  const getPromotionTypeText = (type: Promotion['type'], value: number) => {
    switch (type) {
      case 'percentage':
        return `${value}% خصم`;
      case 'fixed':
        return `${value} KWD خصم`;
      case 'shipping':
        return 'شحن مجاني';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6" style={{ direction: "rtl" }}>
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">العروض والخصومات</h1>
          <p className="text-muted-foreground">
            إدارة أكواد الخصم والعروض الترويجية في متجرك
          </p>
        </div>
        <Button onClick={handleAddNew} className="button-hover-effect">
          <Plus className="ml-2 h-4 w-4" />
          إضافة كود خصم جديد
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">جميع العروض</TabsTrigger>
          <TabsTrigger value="active">العروض النشطة</TabsTrigger>
          <TabsTrigger value="inactive">العروض غير النشطة</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>قائمة أكواد الخصم</CardTitle>
                <div className="flex items-center gap-2">
                  <Input placeholder="بحث..." className="w-60" />
                </div>
              </div>
              <CardDescription>
                جميع أكواد الخصم والعروض الترويجية في متجرك
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {promotions.map((promotion) => (
                  <div key={promotion.id} className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-center gap-3">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-md text-white ${promotion.isActive ? 'bg-green-500' : 'bg-gray-400'}`}>
                        {promotion.type === 'percentage' && '%'}
                        {promotion.type === 'fixed' && '$'}
                        {promotion.type === 'shipping' && '🚚'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{promotion.code}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-5 w-5" 
                            onClick={() => copyCodeToClipboard(promotion.code)}
                          >
                            <Copy size={14} />
                          </Button>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {getPromotionTypeText(promotion.type, promotion.value)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-xs text-muted-foreground ml-4 rtl:mr-4">
                        {format(promotion.validFrom, 'dd/MM/yyyy')} - {format(promotion.validTo, 'dd/MM/yyyy')}
                        <br />
                        {promotion.usageCount} استخدام
                        {promotion.maxUses && ` من أصل ${promotion.maxUses}`}
                      </div>
                      <div className="flex items-center gap-1 ml-4">
                        <span className="text-xs text-muted-foreground">
                          {promotion.isActive ? 'نشط' : 'غير نشط'}
                        </span>
                        <Switch 
                          checked={promotion.isActive} 
                          onCheckedChange={() => togglePromotionStatus(promotion.id)} 
                        />
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(promotion)}>
                        <Pencil size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(promotion.id)}>
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
                
                {promotions.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    لا توجد أكواد خصم حالياً. انقر على "إضافة كود خصم جديد" لإنشاء أول كود خصم.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="active" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>العروض النشطة</CardTitle>
              <CardDescription>عرض العروض والخصومات النشطة فقط</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                نفس القائمة مع تصفية للعروض النشطة فقط
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="inactive" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>العروض غير النشطة</CardTitle>
              <CardDescription>عرض العروض والخصومات غير النشطة فقط</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                نفس القائمة مع تصفية للعروض غير النشطة فقط
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* نافذة الإضافة والتحرير */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{currentPromotion ? 'تحرير كود الخصم' : 'إضافة كود خصم جديد'}</DialogTitle>
            <DialogDescription>
              أدخل تفاصيل كود الخصم أدناه. اضغط حفظ عند الانتهاء.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>كود الخصم</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input placeholder="مثال: SUMMER20" {...field} />
                        </FormControl>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={generateRandomCode}
                          className="whitespace-nowrap"
                        >
                          <RefreshCw size={14} className="ml-1" />
                          توليد تلقائي
                        </Button>
                      </div>
                      <FormDescription>
                        كود الخصم الذي سيستخدمه العملاء
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>نوع الخصم</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر نوع الخصم" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="percentage">نسبة مئوية (%)</SelectItem>
                          <SelectItem value="fixed">مبلغ ثابت (KWD)</SelectItem>
                          <SelectItem value="shipping">شحن مجاني</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {form.watch("type") !== "shipping" && (
                  <FormField
                    control={form.control}
                    name="value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>قيمة الخصم</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder={form.watch("type") === "percentage" ? "مثال: 20" : "مثال: 10"} 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          {form.watch("type") === "percentage" ? "نسبة الخصم المئوية" : "قيمة الخصم بالدينار الكويتي"}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                
                <FormField
                  control={form.control}
                  name="validFrom"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>تاريخ البدء</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-right font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "dd/MM/yyyy")
                              ) : (
                                <span>اختر تاريخ</span>
                              )}
                              <CalendarIcon className="mr-auto h-4 w-4" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="validTo"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>تاريخ الانتهاء</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-right font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "dd/MM/yyyy")
                              ) : (
                                <span>اختر تاريخ</span>
                              )}
                              <CalendarIcon className="mr-auto h-4 w-4" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="maxUses"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الحد الأقصى للاستخدام</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="اتركه فارغاً للاستخدام غير المحدود" 
                          {...field} 
                          value={field.value === null ? '' : field.value}
                          onChange={e => field.onChange(e.target.value === '' ? null : parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormDescription>
                        عدد المرات التي يمكن استخدام الكود فيها
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="appliesTo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ينطبق على</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر نطاق التطبيق" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="all">جميع المنتجات</SelectItem>
                          <SelectItem value="specific">منتجات محددة</SelectItem>
                          <SelectItem value="category">فئات محددة</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>حالة الكود</FormLabel>
                      <FormDescription>
                        تفعيل أو تعطيل كود الخصم
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <Separator />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  إلغاء
                </Button>
                <Button type="submit">
                  {currentPromotion ? 'تحديث' : 'إضافة'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// دالة مساعدة لدمج الفئات
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default Promotions;
