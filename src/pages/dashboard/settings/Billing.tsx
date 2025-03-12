
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle2, CreditCard, Gem, Package, Shield, Zap } from 'lucide-react';

// تعريف نوع موحد لجميع خطط الاشتراك
type PlanId = "free" | "basic" | "pro";

// تعريف واجهة للخطط مع استخدام النوع الموحد
interface Plan {
  id: PlanId;
  name: string;
  price: number;
  billing: 'monthly' | 'yearly';
  description: string;
  features: string[];
  current?: boolean;
  popular?: boolean;
}

const SettingsBilling = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [currentPlan, setCurrentPlan] = useState<PlanId>('basic');
  
  // تعريف الخطط باستخدام النوع الجديد
  const plans: Plan[] = [
    {
      id: 'free',
      name: 'خطة مجانية',
      price: 0,
      billing: 'monthly',
      description: 'للمتاجر الصغيرة والمبتدئين',
      features: [
        'متجر أساسي',
        'عدد 3 منتجات',
        'معالجة الطلبات يدويًا',
        'دعم عبر البريد الإلكتروني',
      ],
    },
    {
      id: 'basic',
      name: 'خطة أساسية',
      price: billingCycle === 'monthly' ? 19.99 : 199.99,
      billing: billingCycle,
      description: 'للمتاجر المتوسطة والنامية',
      features: [
        'كل مميزات الخطة المجانية',
        'عدد غير محدود من المنتجات',
        'معالجة الطلبات آليًا',
        'نطاق فرعي مجاني',
        'دعم فني على مدار اليوم',
      ],
      current: currentPlan === 'basic',
      popular: true,
    },
    {
      id: 'pro',
      name: 'خطة احترافية',
      price: billingCycle === 'monthly' ? 39.99 : 399.99,
      billing: billingCycle,
      description: 'للمتاجر المتقدمة والشركات',
      features: [
        'كل مميزات الخطة الأساسية',
        'تحليلات متقدمة',
        'نطاق مخصص',
        'تكامل مع أنظمة الحسابات',
        'دعم فني متميز',
        'تخصيص كامل للمتجر',
      ],
      current: currentPlan === 'pro',
    },
  ];

  // تغيير الخطة الحالية
  const handleChangePlan = (planId: PlanId) => {
    setCurrentPlan(planId);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">الاشتراك والفواتير</h1>
        <p className="text-muted-foreground">
          إدارة اشتراكك وخيارات الدفع ومراجعة الفواتير
        </p>
      </div>

      {/* قسم دورة الفوترة */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">دورة الفوترة</h2>
        <Card>
          <CardContent className="pt-6">
            <RadioGroup
              defaultValue={billingCycle}
              onValueChange={(value) => setBillingCycle(value as 'monthly' | 'yearly')}
              className="flex flex-col md:flex-row gap-4"
            >
              <div className="flex items-center space-x-2 space-x-reverse border rounded-md p-4 flex-1">
                <RadioGroupItem value="monthly" id="monthly" />
                <Label htmlFor="monthly" className="cursor-pointer flex-1">
                  <div className="font-medium mb-1">شهري</div>
                  <div className="text-sm text-muted-foreground">
                    ادفع شهريًا بسعر عادي
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse border rounded-md p-4 flex-1 relative">
                <RadioGroupItem value="yearly" id="yearly" />
                <Label htmlFor="yearly" className="cursor-pointer flex-1">
                  <div className="font-medium mb-1">سنوي</div>
                  <div className="text-sm text-muted-foreground">
                    ادفع سنويًا ووفر 15%
                  </div>
                </Label>
                <Badge className="absolute -top-2 right-4 bg-primary hover:bg-primary">وفر 15%</Badge>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      </div>

      {/* قسم الخطط */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">اختر خطة</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card key={plan.id} className={`relative ${plan.current ? 'border-primary' : ''}`}>
              {plan.popular && (
                <Badge 
                  className="absolute top-4 left-4 bg-primary hover:bg-primary"
                >
                  الأكثر شيوعًا
                </Badge>
              )}
              {plan.current && (
                <div className="absolute top-4 right-4">
                  <Badge 
                    variant="outline" 
                    className="border-primary text-primary flex items-center gap-1 border-2"
                  >
                    <CheckCircle2 size={14} />
                    <span>الخطة الحالية</span>
                  </Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {plan.id === 'free' && <Package size={20} />}
                  {plan.id === 'basic' && <Zap size={20} />}
                  {plan.id === 'pro' && <Gem size={20} />}
                  {plan.name}
                </CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold">${plan.price}</span>
                  {plan.price > 0 && (
                    <span className="text-muted-foreground">/{plan.billing === 'monthly' ? 'شهر' : 'سنة'}</span>
                  )}
                </div>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 size={18} className="text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                {currentPlan === plan.id ? (
                  <Button className="w-full" variant="outline" disabled>
                    خطتك الحالية
                  </Button>
                ) : (
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => handleChangePlan(plan.id)}
                  >
                    {plan.price === 0 ? 'الترقية مجانًا' : 'الترقية'}
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* قسم تفاصيل الفوترة */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">تفاصيل الفوترة</h2>
        <Card>
          <CardHeader>
            <CardTitle>طريقة الدفع</CardTitle>
            <CardDescription>
              تفاصيل طريقة الدفع الحالية وسجل الفواتير
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border p-4 rounded-md">
                <div className="flex items-center gap-3">
                  <CreditCard className="text-primary" />
                  <div>
                    <div className="font-medium">Visa **** **** **** 4242</div>
                    <div className="text-sm text-muted-foreground">تنتهي في 12/2025</div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">تعديل</Button>
              </div>
              
              <div className="flex items-center justify-between border p-4 rounded-md">
                <div className="flex items-center gap-3">
                  <Shield className="text-primary" />
                  <div>
                    <div className="font-medium">فواتير شهرية</div>
                    <div className="text-sm text-muted-foreground">تعديل الفترة الزمنية وتاريخ التجديد</div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">تعديل</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsBilling;
