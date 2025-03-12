
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Phone, MapPin, Upload } from "lucide-react";

const accountFormSchema = z.object({
  name: z.string().min(2, {
    message: "يجب أن يكون الاسم حرفين على الأقل.",
  }),
  email: z.string().email({
    message: "يرجى إدخال بريد إلكتروني صالح.",
  }),
  phone: z.string().min(8, {
    message: "يجب أن يكون رقم الهاتف 8 أرقام على الأقل.",
  }),
  address: z.string().optional(),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

const defaultValues: Partial<AccountFormValues> = {
  name: "مستخدم متجر.أنا",
  email: "user@linok.me",
  phone: "+96512345678",
  address: "الكويت، مدينة الكويت",
};

const Account = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  function onSubmit(data: AccountFormValues) {
    setIsLoading(true);
    
    // محاكاة الحفظ في قاعدة البيانات
    setTimeout(() => {
      setIsLoading(false);
      console.log(data);
      // يمكن إضافة إشعار هنا "تم تحديث المعلومات بنجاح"
    }, 1000);
  }

  return (
    <div className="space-y-6" style={{ direction: "rtl" }}>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">إعدادات الحساب</h1>
        <p className="text-muted-foreground">
          إدارة معلومات حسابك الشخصية
        </p>
      </div>
      
      <Separator />
      
      <div className="grid gap-6">
        {/* معلومات الحساب الأساسية */}
        <Card>
          <CardHeader>
            <CardTitle>المعلومات الشخصية</CardTitle>
            <CardDescription>
              تحديث معلومات حسابك الشخصية.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
              <div className="flex flex-col items-center space-y-2">
                <Avatar className="w-32 h-32">
                  <AvatarImage src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&h=100&auto=format&fit=crop" alt="صورة الملف الشخصي" />
                  <AvatarFallback className="text-4xl">U</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm" className="mt-2">
                  <Upload className="ml-2 h-4 w-4" />
                  تغيير الصورة
                </Button>
              </div>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex-1">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الاسم</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-3 pr-10" placeholder="اسمك الكامل" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>البريد الإلكتروني</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input className="pl-3 pr-10" placeholder="بريدك الإلكتروني" {...field} />
                            </div>
                          </FormControl>
                          <FormDescription>
                            هذا هو بريدك الإلكتروني الذي ستتلقى عليه الإشعارات.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>رقم الهاتف</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input className="pl-3 pr-10" placeholder="رقم هاتفك" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>العنوان</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MapPin className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-3 pr-10" placeholder="عنوانك" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "جاري الحفظ..." : "حفظ التغييرات"}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </CardContent>
        </Card>
        
        {/* تغيير كلمة المرور */}
        <Card>
          <CardHeader>
            <CardTitle>تغيير كلمة المرور</CardTitle>
            <CardDescription>
              تغيير كلمة مرور حسابك.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <FormLabel>كلمة المرور الحالية</FormLabel>
                  <Input type="password" placeholder="أدخل كلمة المرور الحالية" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <FormLabel>كلمة المرور الجديدة</FormLabel>
                  <Input type="password" placeholder="أدخل كلمة المرور الجديدة" />
                </div>
                
                <div className="space-y-2">
                  <FormLabel>تأكيد كلمة المرور</FormLabel>
                  <Input type="password" placeholder="أعد إدخال كلمة المرور الجديدة" />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="outline" className="ml-2">إلغاء</Button>
            <Button>تغيير كلمة المرور</Button>
          </CardFooter>
        </Card>
        
        {/* حذف الحساب */}
        <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="text-destructive">حذف الحساب</CardTitle>
            <CardDescription>
              حذف حسابك وجميع البيانات المرتبطة به بشكل نهائي.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              سيؤدي حذف حسابك إلى إزالة جميع معلوماتك وبياناتك من منصتنا بشكل نهائي، بما في ذلك متجرك ومنتجاتك وطلباتك وعملائك. لا يمكن التراجع عن هذا الإجراء.
            </p>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="destructive">حذف الحساب نهائياً</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Account;
