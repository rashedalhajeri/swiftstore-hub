
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { AlertTriangle, Shield, Smartphone } from "lucide-react";

const SettingsSecurity = () => {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [passwordExpiry, setPasswordExpiry] = useState(false);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">إعدادات الأمان</h1>
        <p className="text-muted-foreground">
          إدارة كلمة المرور وإعدادات الأمان الأخرى لحسابك
        </p>
      </div>
      
      <Separator />
      
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">كلمة المرور</h2>
        
        <Card>
          <CardHeader>
            <CardTitle>تغيير كلمة المرور</CardTitle>
            <CardDescription>
              يُنصح بتغيير كلمة المرور بشكل دوري لزيادة مستوى الأمان
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="current-password">كلمة المرور الحالية</Label>
              <Input id="current-password" type="password" autoComplete="current-password" />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="new-password">كلمة المرور الجديدة</Label>
              <Input id="new-password" type="password" autoComplete="new-password" />
              <p className="text-xs text-muted-foreground mt-1">
                يجب أن تكون كلمة المرور 8 أحرف على الأقل وتحتوي على حروف وأرقام ورموز
              </p>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">تأكيد كلمة المرور</Label>
              <Input id="confirm-password" type="password" autoComplete="new-password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>تحديث كلمة المرور</Button>
          </CardFooter>
        </Card>
        
        <h2 className="text-xl font-semibold mt-6">المصادقة الثنائية</h2>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="flex items-center">
                  <Smartphone className="me-2 h-5 w-5" />
                  المصادقة الثنائية (2FA)
                </CardTitle>
                <CardDescription>
                  زيادة أمان حسابك باستخدام رمز إضافي عند تسجيل الدخول
                </CardDescription>
              </div>
              <Switch
                checked={is2FAEnabled}
                onCheckedChange={setIs2FAEnabled}
              />
            </div>
          </CardHeader>
          {is2FAEnabled && (
            <CardContent>
              <div className="pb-4 pt-2">
                <div className="rounded-md bg-primary/10 p-4 flex items-start">
                  <Shield className="h-5 w-5 text-primary mt-0.5 me-3" />
                  <div>
                    <h4 className="font-medium">المصادقة الثنائية مُفعّلة</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      سيُطلب منك إدخال رمز من تطبيق المصادقة في كل مرة تقوم فيها بتسجيل الدخول إلى حسابك.
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <Button variant="outline">إعادة ضبط المصادقة الثنائية</Button>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
        
        <h2 className="text-xl font-semibold mt-6">إعدادات أمان إضافية</h2>
        
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">تنبيهات تسجيل الدخول</Label>
                  <p className="text-sm text-muted-foreground">
                    تلقي تنبيهات عند تسجيل الدخول من جهاز أو موقع جديد
                  </p>
                </div>
                <Switch
                  checked={loginAlerts}
                  onCheckedChange={setLoginAlerts}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">انتهاء صلاحية كلمة المرور</Label>
                  <p className="text-sm text-muted-foreground">
                    مطالبتك بتغيير كلمة المرور كل 90 يومًا
                  </p>
                </div>
                <Switch
                  checked={passwordExpiry}
                  onCheckedChange={setPasswordExpiry}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-destructive/50 bg-destructive/5">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center">
              <AlertTriangle className="me-2 h-5 w-5" />
              حذف الحساب
            </CardTitle>
            <CardDescription className="text-destructive/90">
              سيؤدي حذف حسابك إلى إزالة جميع البيانات المرتبطة به نهائيًا
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="destructive">حذف الحساب</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SettingsSecurity;
