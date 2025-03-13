
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FileText, HelpCircle, MessageCircle, Search } from "lucide-react";

type SupportTicket = {
  id: string;
  title: string;
  status: "open" | "closed" | "pending";
  category: string;
  date: string;
  lastUpdate: string;
};

const SettingsSupport = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: "TKT-1234",
      title: "مشكلة في إضافة منتج جديد",
      status: "open",
      category: "منتجات",
      date: "2023-05-10",
      lastUpdate: "2023-05-11",
    },
    {
      id: "TKT-1233",
      title: "استفسار حول خيارات الدفع",
      status: "pending",
      category: "مدفوعات",
      date: "2023-05-08",
      lastUpdate: "2023-05-09",
    },
    {
      id: "TKT-1232",
      title: "طلب ميزة جديدة",
      status: "closed",
      category: "اقتراحات",
      date: "2023-05-05",
      lastUpdate: "2023-05-07",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-green-500">مفتوح</Badge>;
      case "pending":
        return <Badge className="bg-amber-500">قيد المراجعة</Badge>;
      case "closed":
        return <Badge variant="outline" className="text-muted-foreground">مغلق</Badge>;
      default:
        return null;
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !categoryFilter || ticket.category === categoryFilter;
    const matchesStatus = !statusFilter || ticket.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleSubmitTicket = () => {
    if (!subject || !category || !message) return;
    
    const newTicket: SupportTicket = {
      id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      title: subject,
      status: "open",
      category,
      date: new Date().toISOString().split('T')[0],
      lastUpdate: new Date().toISOString().split('T')[0],
    };
    
    setTickets([newTicket, ...tickets]);
    setSubject("");
    setCategory("");
    setMessage("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">المساعدة والدعم</h1>
        <p className="text-muted-foreground">
          الحصول على المساعدة وتذاكر الدعم الفني
        </p>
      </div>
      
      <Separator />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">تذاكر الدعم الفني</h2>
              <Button variant="outline">
                <Search className="h-4 w-4 me-2" />
                بحث متقدم
              </Button>
            </div>
            
            <div className="flex gap-3 mb-4">
              <div className="flex-1">
                <Input 
                  placeholder="بحث عن تذكرة..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-32 md:w-40">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="التصنيف" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">الكل</SelectItem>
                    <SelectItem value="منتجات">منتجات</SelectItem>
                    <SelectItem value="مدفوعات">مدفوعات</SelectItem>
                    <SelectItem value="فني">فني</SelectItem>
                    <SelectItem value="اقتراحات">اقتراحات</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-32 md:w-40">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">الكل</SelectItem>
                    <SelectItem value="open">مفتوح</SelectItem>
                    <SelectItem value="pending">قيد المراجعة</SelectItem>
                    <SelectItem value="closed">مغلق</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {filteredTickets.length === 0 ? (
              <Card className="p-8 flex flex-col items-center justify-center">
                <MessageCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium">لا توجد تذاكر</h3>
                <p className="text-muted-foreground mt-1">
                  {searchQuery || categoryFilter || statusFilter
                    ? "لم يتم العثور على تذاكر تطابق معايير البحث"
                    : "لم تقم بإنشاء أي تذاكر دعم بعد"}
                </p>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {filteredTickets.map((ticket) => (
                      <div key={ticket.id} className="p-4 flex items-center">
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center">
                            <span className="font-medium">{ticket.title}</span>
                            <Badge variant="outline" className="me-2 px-1.5 py-0 text-xs">
                              {ticket.id}
                            </Badge>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <span>
                              التصنيف: {ticket.category}
                            </span>
                            <span className="mx-2">•</span>
                            <span>
                              تاريخ الإنشاء: {new Date(ticket.date).toLocaleDateString('ar-SA')}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          {renderStatusBadge(ticket.status)}
                          <Button variant="ghost" size="sm">
                            عرض
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">تذكرة دعم جديدة</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>إنشاء تذكرة</CardTitle>
              <CardDescription>
                اطرح سؤالك أو أبلغ عن مشكلة لفريق الدعم
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر تصنيف" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="منتجات">منتجات</SelectItem>
                    <SelectItem value="مدفوعات">مدفوعات</SelectItem>
                    <SelectItem value="فني">مشكلة فنية</SelectItem>
                    <SelectItem value="اقتراحات">اقتراح ميزة</SelectItem>
                    <SelectItem value="أخرى">أخرى</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Input 
                  placeholder="الموضوع" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Textarea 
                  placeholder="اكتب رسالتك هنا..." 
                  className="min-h-[120px]"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSubmitTicket} className="w-full">
                إرسال التذكرة
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="h-5 w-5 me-2" />
                مركز المساعدة
              </CardTitle>
              <CardDescription>
                استكشف أدلة المساعدة وقاعدة المعرفة
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="cursor-pointer hover:bg-muted rounded-md p-3 transition-colors">
                <div className="flex items-start">
                  <FileText className="h-5 w-5 me-3 mt-0.5 text-primary" />
                  <div>
                    <h4 className="font-medium">دليل إضافة المنتجات</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      تعلم كيفية إضافة وتحرير وإدارة منتجاتك
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="cursor-pointer hover:bg-muted rounded-md p-3 transition-colors">
                <div className="flex items-start">
                  <FileText className="h-5 w-5 me-3 mt-0.5 text-primary" />
                  <div>
                    <h4 className="font-medium">إدارة الطلبات والشحن</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      دليل شامل للتعامل مع الطلبات وتتبع الشحنات
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="cursor-pointer hover:bg-muted rounded-md p-3 transition-colors">
                <div className="flex items-start">
                  <FileText className="h-5 w-5 me-3 mt-0.5 text-primary" />
                  <div>
                    <h4 className="font-medium">إعداد طرق الدفع</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      خطوات تكوين وإدارة طرق الدفع في متجرك
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                عرض كل المقالات
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SettingsSupport;
