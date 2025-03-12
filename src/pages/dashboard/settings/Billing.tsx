
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Check, Zap } from "lucide-react";

type PlanId = "free" | "basic" | "pro";

const SettingsBilling = () => {
  const currentPlan: PlanId = "basic";
  const plans = [
    {
      id: "free" as PlanId,
      name: "المجاني",
      price: "0$",
      description: "مناسب للمتاجر الصغيرة والمبتدئين",
      features: [
        "10 منتجات",
        "تخزين 1GB",
        "تسجيل المبيعات",
        "دعم بالبريد الإلكتروني",
      ],
      isCurrent: currentPlan === "free",
    },
    {
      id: "basic" as PlanId,
      name: "الأساسي",
      price: "19$",
      period: "شهريًا",
      description: "مناسب للمتاجر المتوسطة",
      features: [
        "100 منتج",
        "تخزين 5GB",
        "تسجيل المبيعات",
        "تقارير متقدمة",
        "دعم فني متميز",
        "نطاق مخصص",
      ],
      isCurrent: currentPlan === "basic",
    },
    {
      id: "pro" as PlanId,
      name: "الاحترافي",
      price: "49$",
      period: "شهريًا",
      description: "مناسب للمتاجر الكبيرة",
      features: [
        "عدد غير محدود من المنتجات",
        "تخزين 20GB",
        "تسجيل المبيعات",
        "تقارير متقدمة",
        "دعم فني على مدار الساعة",
        "نطاق مخصص",
        "أدوات تسويق متقدمة",
        "تكامل مع أنظمة الشحن",
      ],
      isCurrent: currentPlan === "pro",
    },
  ];

  return (
    <div className="space-y-6" style={{ direction: "rtl" }}>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">الاشتراك والفواتير</h1>
        <p className="text-muted-foreground">
          إدارة اشتراكك وعرض فواتيرك السابقة
        </p>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">خطة الاشتراك الحالية</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`${plan.isCurrent ? 'border-primary' : ''} h-full flex flex-col`}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <div className="mt-2 flex items-end">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      {plan.period && <span className="text-sm text-muted-foreground mr-1">/{plan.period}</span>}
                    </div>
                  </div>
                  {plan.isCurrent && <Badge className="bg-primary">الخطة الحالية</Badge>}
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="h-4 w-4 ml-2 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                {plan.isCurrent ? (
                  <Button variant="outline" className="w-full">إدارة الاشتراك</Button>
                ) : (
                  <Button variant="default" className="w-full">
                    {plan.id === "free" ? "التنزيل للخطة المجانية" : "الترقية"}
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-8 space-y-6">
          <h2 className="text-xl font-semibold">سجل الفواتير</h2>
          <div className="bg-background border rounded-md">
            <div className="grid grid-cols-5 gap-4 p-4 border-b font-medium">
              <div>رقم الفاتورة</div>
              <div>التاريخ</div>
              <div>المبلغ</div>
              <div>الحالة</div>
              <div></div>
            </div>
            {[
              { id: "INV-2023-005", date: "01/05/2023", amount: "19.00$", status: "مدفوعة" },
              { id: "INV-2023-004", date: "01/04/2023", amount: "19.00$", status: "مدفوعة" },
              { id: "INV-2023-003", date: "01/03/2023", amount: "19.00$", status: "مدفوعة" },
            ].map((invoice) => (
              <div key={invoice.id} className="grid grid-cols-5 gap-4 p-4 border-b">
                <div>{invoice.id}</div>
                <div>{invoice.date}</div>
                <div>{invoice.amount}</div>
                <div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {invoice.status}
                  </Badge>
                </div>
                <div>
                  <Button variant="ghost" size="sm">تنزيل PDF</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">طريقة الدفع</h2>
        <Card>
          <CardHeader>
            <CardTitle>بطاقة الائتمان المسجلة</CardTitle>
            <CardDescription>تحديث معلومات الدفع الخاصة بك</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-12 w-12 bg-secondary flex items-center justify-center rounded-md ml-4">
                  <Zap className="text-primary h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium">فيزا تنتهي بـ **** 4242</p>
                  <p className="text-sm text-muted-foreground">تنتهي في 12/2025</p>
                </div>
              </div>
              <Button variant="outline">تحديث</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsBilling;
