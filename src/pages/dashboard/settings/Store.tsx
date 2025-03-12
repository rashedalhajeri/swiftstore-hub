
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StoreIcon, Globe, Upload, Facebook, Instagram, Twitter } from "lucide-react";

const storeFormSchema = z.object({
  name: z.string().min(2, {
    message: "يجب أن يكون اسم المتجر حرفين على الأقل.",
  }),
  description: z.string().max(500, {
    message: "يجب ألا يتجاوز الوصف 500 حرف.",
  }).optional(),
  slug: z.string().min(3, {
    message: "يجب أن يكون رابط المتجر 3 أحرف على الأقل.",
  }).regex(/^[a-z0-9-]+$/, {
    message: "يمكن استخدام أحرف إنجليزية صغيرة وأرقام وشرطات فقط.",
  }),
  logo: z.string().optional(),
  banner: z.string().optional(),
  primaryColor: z.string().optional(),
  facebook: z.string().url({ message: "يرجى إدخال رابط صالح." }).optional().or(z.literal('')),
  instagram: z.string().url({ message: "يرجى إدخال رابط صالح." }).optional().or(z.literal('')),
  twitter: z.string().url({ message: "يرجى إدخال رابط صالح." }).optional().or(z.literal('')),
  isPublished: z.boolean().default(true),
});

type StoreFormValues = z.infer<typeof storeFormSchema>;

const defaultValues: Partial<StoreFormValues> = {
  name: "متجر.أنا",
  description: "متجر للملابس والإكسسوارات",
  slug: "store",
  logo: "",
  banner: "",
  primaryColor: "#8B5CF6",
  facebook: "https://facebook.com/mystore",
  instagram: "https://instagram.com/mystore",
  twitter: "",
  isPublished: true,
};

const SettingsStore = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const form = useForm<StoreFormValues>({
    resolver: zodResolver(storeFormSchema),
    defaultValues,
  });

  function onSubmit(data: StoreFormValues) {
    setIsLoading(true);
    
    // تحديث رابط المتجر في localStorage
    localStorage.setItem('storeUrl', data.slug);
    
    // محاكاة الحفظ في قاعدة البيانات
    setTimeout(() => {
      setIsLoading(false);
      console.log(data);
      // يمكن إضافة إشعار هنا "تم تحديث معلومات المتجر بنجاح"
    }, 1000);
  }

  return (
    <div className="space-y-6" style={{ direction: "rtl" }}>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">إعدادات المتجر</h1>
        <p className="text-muted-foreground">
          إدارة معلومات وإعدادات متجرك
        </p>
      </div>
      
      <Separator />
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="general">معلومات عامة</TabsTrigger>
          <TabsTrigger value="appearance">الشكل والتصميم</TabsTrigger>
          <TabsTrigger value="social">وسائل التواصل</TabsTrigger>
        </TabsList>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle>معلومات المتجر الأساسية</CardTitle>
                  <CardDescription>
                    تحديث المعلومات الأساسية لمتجرك.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>اسم المتجر</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <StoreIcon className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input className="pl-3 pr-10" placeholder="اسم متجرك" {...field} />
                            </div>
                          </FormControl>
                          <FormDescription>
                            هذا هو الاسم الذي سيظهر للعملاء.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="slug"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>رابط المتجر</FormLabel>
                          <FormControl>
                            <div className="relative flex items-center">
                              <Globe className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input className="pl-3 pr-10" placeholder="رابط-متجرك" {...field} />
                            </div>
                          </FormControl>
                          <FormDescription>
                            رابط المتجر الخاص بك: linok.me/{form.watch("slug")}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>وصف المتجر</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="وصف مختصر لمتجرك ومنتجاته" 
                            className="min-h-32 resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          وصف قصير يوضح طبيعة متجرك ونوع المنتجات التي تقدمها.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="isPublished"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>حالة المتجر</FormLabel>
                          <FormDescription>
                            {field.value ? 'متجرك نشط ومرئي للعملاء حالياً.' : 'متجرك غير نشط ولا يمكن للعملاء رؤيته.'}
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
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="appearance">
              <Card>
                <CardHeader>
                  <CardTitle>شكل وتصميم المتجر</CardTitle>
                  <CardDescription>
                    تخصيص شكل متجرك وهويته البصرية.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <FormLabel>شعار المتجر</FormLabel>
                      <div className="mt-2 flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-secondary/50 hover:bg-secondary">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground">
                              <span className="font-semibold">انقر لرفع الصورة</span> أو اسحب وأفلت
                            </p>
                            <p className="text-xs text-muted-foreground">PNG، JPG أو SVG (الحد الأقصى: 2MB)</p>
                          </div>
                          <input id="dropzone-file" type="file" className="hidden" />
                        </label>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        الحجم المثالي للشعار: 500 × 500 بكسل
                      </p>
                    </div>
                    
                    <div>
                      <FormLabel>صورة غلاف المتجر</FormLabel>
                      <div className="mt-2 flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-secondary/50 hover:bg-secondary">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground">
                              <span className="font-semibold">انقر لرفع الصورة</span> أو اسحب وأفلت
                            </p>
                            <p className="text-xs text-muted-foreground">PNG أو JPG (الحد الأقصى: 5MB)</p>
                          </div>
                          <input id="dropzone-file-banner" type="file" className="hidden" />
                        </label>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        الحجم المثالي للغلاف: 1200 × 400 بكسل
                      </p>
                    </div>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="primaryColor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>اللون الرئيسي للمتجر</FormLabel>
                        <div className="flex items-center gap-2">
                          <FormControl>
                            <Input type="color" {...field} className="w-20 p-1 h-10" />
                          </FormControl>
                          <Input 
                            value={field.value} 
                            onChange={field.onChange}
                            placeholder="#000000"
                            className="w-36"
                          />
                        </div>
                        <FormDescription>
                          اختر اللون الرئيسي لمتجرك الذي سيستخدم في العناصر المختلفة.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="social">
              <Card>
                <CardHeader>
                  <CardTitle>وسائل التواصل الاجتماعي</CardTitle>
                  <CardDescription>
                    ربط متجرك بحسابات التواصل الاجتماعي الخاصة بك.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="facebook"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>فيسبوك</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Facebook className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-3 pr-10" placeholder="https://facebook.com/your-page" {...field} />
                          </div>
                        </FormControl>
                        <FormDescription>
                          رابط صفحة الفيسبوك الخاصة بمتجرك.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="instagram"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>انستغرام</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Instagram className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-3 pr-10" placeholder="https://instagram.com/your-account" {...field} />
                          </div>
                        </FormControl>
                        <FormDescription>
                          رابط حساب الانستغرام الخاص بمتجرك.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="twitter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>تويتر</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Twitter className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-3 pr-10" placeholder="https://twitter.com/your-account" {...field} />
                          </div>
                        </FormControl>
                        <FormDescription>
                          رابط حساب تويتر الخاص بمتجرك.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "جاري الحفظ..." : "حفظ التغييرات"}
              </Button>
            </div>
          </form>
        </Form>
      </Tabs>
    </div>
  );
};

export default SettingsStore;
