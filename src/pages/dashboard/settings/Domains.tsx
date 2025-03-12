
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Check, ExternalLink, Globe, Lock, Plus, RefreshCw, Settings } from "lucide-react";

const DomainsStatus = {
  ACTIVE: "active",
  PENDING: "pending",
  ERROR: "error",
} as const;

type Domain = {
  id: string;
  name: string;
  status: typeof DomainsStatus[keyof typeof DomainsStatus];
  primary: boolean;
  ssl: boolean;
  expiresAt?: string;
};

const SettingsDomains = () => {
  const [domains, setDomains] = useState<Domain[]>([
    {
      id: "1",
      name: "mystore.linok.me",
      status: DomainsStatus.ACTIVE,
      primary: true,
      ssl: true,
    },
    {
      id: "2",
      name: "mystore.com",
      status: DomainsStatus.PENDING,
      primary: false,
      ssl: false,
    },
  ]);
  
  const [newDomain, setNewDomain] = useState("");
  
  const handleAddDomain = () => {
    if (!newDomain || domains.some(d => d.name === newDomain)) return;
    
    setDomains([
      ...domains,
      {
        id: `domain-${Date.now()}`,
        name: newDomain,
        status: DomainsStatus.PENDING,
        primary: false,
        ssl: false,
      }
    ]);
    
    setNewDomain("");
  };
  
  const handleVerifyDomain = (id: string) => {
    // Simulate domain verification
    setDomains(domains.map(domain => {
      if (domain.id === id) {
        return {
          ...domain,
          status: DomainsStatus.ACTIVE,
          ssl: true,
        };
      }
      return domain;
    }));
  };
  
  const handleSetPrimary = (id: string) => {
    setDomains(domains.map(domain => ({
      ...domain,
      primary: domain.id === id,
    })));
  };
  
  const handleRemoveDomain = (id: string) => {
    setDomains(domains.filter(domain => domain.id !== id));
  };
  
  const renderDomainStatus = (status: Domain["status"]) => {
    switch (status) {
      case DomainsStatus.ACTIVE:
        return (
          <Badge className="bg-green-500">
            <Check className="h-3 w-3 ml-1" />
            متصل
          </Badge>
        );
      case DomainsStatus.PENDING:
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-500">
            <RefreshCw className="h-3 w-3 ml-1 animate-spin" />
            قيد التحقق
          </Badge>
        );
      case DomainsStatus.ERROR:
        return (
          <Badge variant="destructive">
            <AlertCircle className="h-3 w-3 ml-1" />
            خطأ
          </Badge>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6" style={{ direction: "rtl" }}>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">إعدادات النطاقات</h1>
        <p className="text-muted-foreground">
          إدارة نطاقات متجرك وإعدادات الاستضافة
        </p>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">النطاقات المتصلة</h2>
          <Button variant="outline" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            إعدادات DNS
          </Button>
        </div>
        
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {domains.map((domain) => (
                <div key={domain.id} className="p-4 flex items-center">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 ml-2 text-primary" />
                      <span className="font-medium">{domain.name}</span>
                      {domain.primary && (
                        <Badge variant="secondary" className="mr-2 px-1.5 py-0 text-xs">
                          رئيسي
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      {domain.ssl && (
                        <div className="flex items-center ml-4">
                          <Lock className="h-3 w-3 ml-1 text-green-500" />
                          <span>SSL مفعل</span>
                        </div>
                      )}
                      {domain.expiresAt && (
                        <div>
                          ينتهي في {domain.expiresAt}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {renderDomainStatus(domain.status)}
                    
                    <div className="flex gap-2 mr-4">
                      {domain.status === DomainsStatus.PENDING && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleVerifyDomain(domain.id)}
                        >
                          تحقق
                        </Button>
                      )}
                      
                      {domain.status === DomainsStatus.ACTIVE && !domain.primary && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleSetPrimary(domain.id)}
                        >
                          تعيين كرئيسي
                        </Button>
                      )}
                      
                      {!domain.primary && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRemoveDomain(domain.id)}
                        >
                          إزالة
                        </Button>
                      )}
                      
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-8 w-8 p-0"
                        asChild
                      >
                        <a href={`https://${domain.name}`} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">إضافة نطاق جديد</h2>
        
        <Card>
          <CardHeader>
            <CardTitle>ربط نطاق مخصص</CardTitle>
            <CardDescription>
              اربط نطاقك الخاص بمتجرك لإضفاء طابع احترافي
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <div className="flex-1">
                <Label htmlFor="domain">اسم النطاق</Label>
                <Input 
                  id="domain" 
                  placeholder="example.com" 
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleAddDomain}>
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col items-start">
            <p className="text-sm text-muted-foreground mb-4">
              بعد إضافة النطاق، ستحتاج إلى تكوين إعدادات DNS الخاصة بك للتحقق من ملكية النطاق.
            </p>
            <div className="border rounded-md p-3 w-full bg-muted/50">
              <p className="text-sm font-medium mb-2">سجلات DNS المطلوبة:</p>
              <div className="text-xs font-mono bg-muted p-2 rounded">
                <div className="mb-1">CNAME record</div>
                <div>Name: @</div>
                <div>Target: linok-me.vercel.app</div>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SettingsDomains;
