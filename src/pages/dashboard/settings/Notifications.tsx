
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Mail, MessageSquare, Phone, Shield, ShoppingBag } from "lucide-react";

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  email: boolean;
  push: boolean;
  sms: boolean;
}

const SettingsNotifications = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "orders",
      title: "الطلبات الجديدة",
      description: "إعلامك عند وصول طلب جديد من أحد العملاء",
      icon: ShoppingBag,
      email: true,
      push: true,
      sms: false,
    },
    {
      id: "comments",
      title: "التعليقات والمراجعات",
      description: "إعلامك عندما يترك العملاء تعليقات أو تقييمات جديدة",
      icon: MessageSquare,
      email: true,
      push: true,
      sms: false,
    },
    {
      id: "security",
      title: "تنبيهات الأمان",
      description: "إعلامك عند تسجيل الدخول من جهاز جديد أو تغيير كلمة المرور",
      icon: Shield,
      email: true,
      push: true,
      sms: true,
    },
    {
      id: "stock",
      title: "تنبيهات المخزون",
      description: "إعلامك عندما ينخفض مخزون منتج عن الحد الأدنى",
      icon: Bell,
      email: true,
      push: false,
      sms: false,
    },
  ]);

  const [marketingEmails, setMarketingEmails] = useState(true);
  const [serviceEmails, setServiceEmails] = useState(true);

  const handleToggle = (id: string, channel: 'email' | 'push' | 'sms') => {
    setNotifications(notifications.map(item => {
      if (item.id === id) {
        return { ...item, [channel]: !item[channel] };
      }
      return item;
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">إعدادات الإشعارات</h1>
        <p className="text-muted-foreground">
          تخصيص إشعارات وتنبيهات متجرك
        </p>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">تنبيهات المتجر</h2>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="border-primary">
              <Mail className="w-3 h-3 me-1" />
              بريد
            </Badge>
            <Badge variant="outline" className="border-primary">
              <Bell className="w-3 h-3 me-1" />
              تنبيه
            </Badge>
            <Badge variant="outline" className="border-primary">
              <Phone className="w-3 h-3 me-1" />
              رسالة
            </Badge>
          </div>
        </div>
        
        <Card>
          <CardContent className="p-6 space-y-5">
            {notifications.map((item) => (
              <div key={item.id} className="flex items-start pb-5 border-b last:border-b-0 last:pb-0">
                <div className="p-2 rounded-md bg-primary/10 text-primary me-5">
                  <item.icon className="h-5 w-5" />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                </div>
                
                <div className="flex items-center gap-5">
                  <div className="flex items-center justify-center w-12">
                    <Switch 
                      checked={item.email} 
                      onCheckedChange={() => handleToggle(item.id, 'email')} 
                    />
                  </div>
                  <div className="flex items-center justify-center w-12">
                    <Switch 
                      checked={item.push} 
                      onCheckedChange={() => handleToggle(item.id, 'push')} 
                    />
                  </div>
                  <div className="flex items-center justify-center w-12">
                    <Switch 
                      checked={item.sms} 
                      onCheckedChange={() => handleToggle(item.id, 'sms')} 
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">رسائل البريد الإلكتروني</h2>
        
        <Card>
          <CardHeader>
            <CardTitle>رسائل المتجر العامة</CardTitle>
            <CardDescription>
              تحكم في إعدادات رسائل البريد الإلكتروني المرسلة من متجرك
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">رسائل تسويقية</div>
                <div className="text-sm text-muted-foreground">
                  رسائل تسويقية وعروض خاصة وإشعارات بخصوص العروض الجديدة
                </div>
              </div>
              <Switch 
                checked={marketingEmails} 
                onCheckedChange={setMarketingEmails} 
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">رسائل المعاملات والخدمة</div>
                <div className="text-sm text-muted-foreground">
                  إشعارات هامة متعلقة بحسابك وطلباتك ومعاملاتك
                </div>
              </div>
              <Switch 
                checked={serviceEmails} 
                onCheckedChange={setServiceEmails} 
              />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-end">
        <Button type="submit">حفظ التغييرات</Button>
      </div>
    </div>
  );
};

export default SettingsNotifications;
