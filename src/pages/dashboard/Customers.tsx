import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  ShoppingBag, 
  Calendar, 
  DollarSign, 
  ChevronRight,
  ChevronLeft,
  UserPlus,
  Send,
  FileText,
  Clock,
  Package,
  Truck,
  Check
} from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { format } from "date-fns";
import { Link } from 'react-router-dom';
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: Date;
  joinDate: Date;
  status: 'active' | 'inactive';
  avatar?: string;
}

const customersData: Customer[] = [
  {
    id: "CUST-001",
    name: "أحمد محمد",
    email: "ahmed@example.com",
    phone: "+966 55 123 4567",
    address: "شارع الملك فهد",
    city: "الرياض",
    country: "المملكة العربية السعودية",
    totalOrders: 5,
    totalSpent: 1250.75,
    lastOrderDate: new Date(2023, 9, 5),
    joinDate: new Date(2023, 2, 10),
    status: "active",
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: "CUST-002",
    name: "نورة علي",
    email: "noura@example.com",
    phone: "+974 33 987 6543",
    address: "شارع السلام",
    city: "الدوحة",
    country: "قطر",
    totalOrders: 3,
    totalSpent: 450.50,
    lastOrderDate: new Date(2023, 8, 28),
    joinDate: new Date(2023, 4, 15),
    status: "active",
    avatar: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: "CUST-003",
    name: "خالد إبراهيم",
    email: "khalid@example.com",
    phone: "+966 50 765 4321",
    address: "شارع مكة",
    city: "جدة",
    country: "المملكة العربية السعودية",
    totalOrders: 2,
    totalSpent: 320.25,
    lastOrderDate: new Date(2023, 8, 15),
    joinDate: new Date(2023, 5, 22),
    status: "inactive",
    avatar: "https://i.pravatar.cc/150?img=3"
  },
  {
    id: "CUST-004",
    name: "فاطمة عبدالله",
    email: "fatima@example.com",
    phone: "+971 52 345 6789",
    address: "شارع الاستقلال",
    city: "دبي",
    country: "الإمارات العربية المتحدة",
    totalOrders: 7,
    totalSpent: 1890.30,
    lastOrderDate: new Date(2023, 9, 1),
    joinDate: new Date(2023, 1, 5),
    status: "active",
    avatar: "https://i.pravatar.cc/150?img=9"
  },
  {
    id: "CUST-005",
    name: "عمر أحمد",
    email: "omar@example.com",
    phone: "+962 77 555 9876",
    address: "شارع الملك عبدالله",
    city: "عمان",
    country: "الأردن",
    totalOrders: 1,
    totalSpent: 150.00,
    lastOrderDate: new Date(2023, 7, 20),
    joinDate: new Date(2023, 6, 30),
    status: "active",
    avatar: "https://i.pravatar.cc/150?img=4"
  },
  {
    id: "CUST-006",
    name: "سارة محمد",
    email: "sara@example.com",
    phone: "+20 100 123 4567",
    address: "شارع المرسى",
    city: "القاهرة",
    country: "مصر",
    totalOrders: 4,
    totalSpent: 760.45,
    lastOrderDate: new Date(2023, 9, 3),
    joinDate: new Date(2023, 3, 18),
    status: "active",
    avatar: "https://i.pravatar.cc/150?img=8"
  },
  {
    id: "CUST-007",
    name: "محمد علي",
    email: "mohamed@example.com",
    phone: "+961 71 987 6543",
    address: "شارع الحمراء",
    city: "بيروت",
    country: "لبنان",
    totalOrders: 6,
    totalSpent: 1100.20,
    lastOrderDate: new Date(2023, 9, 4),
    joinDate: new Date(2023, 0, 25),
    status: "active",
    avatar: "https://i.pravatar.cc/150?img=2"
  },
  {
    id: "CUST-008",
    name: "ليلى عبدالرحمن",
    email: "layla@example.com",
    phone: "+212 61 234 5678",
    address: "شارع محمد الخامس",
    city: "الرباط",
    country: "المغرب",
    totalOrders: 0,
    totalSpent: 0,
    lastOrderDate: new Date(2023, 5, 12),
    joinDate: new Date(2023, 5, 10),
    status: "inactive",
    avatar: "https://i.pravatar.cc/150?img=7"
  }
];

const sampleOrders = [
  {
    id: "ORD-2023-001",
    date: new Date(2023, 9, 5),
    status: "delivered",
    total: 350.75,
    items: 3
  },
  {
    id: "ORD-2023-002",
    date: new Date(2023, 8, 18),
    status: "delivered",
    total: 420.00,
    items: 2
  },
  {
    id: "ORD-2023-003",
    date: new Date(2023, 7, 30),
    status: "cancelled",
    total: 180.50,
    items: 1
  }
];

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>(customersData);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [isOrdersDialogOpen, setIsOrdersDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();
  const itemsPerPage = 7;

  const viewCustomerDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    setActiveTab("details");
    setIsViewDialogOpen(true);
  };

  const openEmailDialog = (customer: Customer) => {
    setSelectedCustomer(customer);
    setEmailSubject(`مرحباً ${customer.name}، رسالة من متجرك`);
    setEmailBody(`مرحباً ${customer.name}،\n\nنشكرك على تعاملك معنا. نود إعلامك بأحدث العروض والمنتجات المتاحة في متجرنا.\n\nمع أطيب التحيات،\nفريق خدمة العملاء`);
    setIsEmailDialogOpen(true);
  };

  const openOrdersDialog = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsOrdersDialogOpen(true);
  };

  const sendEmail = () => {
    if (!emailSubject || !emailBody) {
      toast({
        title: "تنبيه",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "تم إرسال البريد الإلكتروني",
      description: `تم إرسال البريد الإلكتروني إلى ${selectedCustomer?.name} بنجاح`,
      variant: "default"
    });
    setIsEmailDialogOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "delivered":
        return <Badge className="bg-green-500 hover:bg-green-600">تم التوصيل</Badge>;
      case "processing":
        return <Badge className="bg-blue-500 hover:bg-blue-600">قيد المعالجة</Badge>;
      case "shipped":
        return <Badge className="bg-indigo-500 hover:bg-indigo-600">تم الشحن</Badge>;
      case "pending":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">قيد الانتظار</Badge>;
      case "cancelled":
        return <Badge variant="destructive">ملغي</Badge>;
      default:
        return <Badge variant="outline">غير معروف</Badge>;
    }
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  
  const currentCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === 'active').length;
  const inactiveCustomers = customers.filter(c => c.status === 'inactive').length;
  const totalRevenue = customers.reduce((sum, customer) => sum + customer.totalSpent, 0);
  const averageSpend = totalCustomers > 0 ? totalRevenue / totalCustomers : 0;

  return (
    <div className="space-y-6" style={{ direction: "rtl" }}>
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">العملاء</h1>
          <p className="text-muted-foreground">
            إدارة حسابات عملاء متجرك وتتبع نشاطهم
          </p>
        </div>
        <Button className="button-hover-effect">
          <UserPlus className="ml-2 h-4 w-4" />
          إضافة عميل جديد
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              <span>إجمالي العملاء</span>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {activeCustomers} عميل نشط • {inactiveCustomers} عميل غير نشط
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              <span>إجمالي الإيرادات</span>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRevenue.toFixed(2)} KWD</div>
            <p className="text-xs text-muted-foreground mt-1">
              متوسط الإنفاق: {averageSpend.toFixed(2)} KWD
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              <span>إجمالي الطلبات</span>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {customers.reduce((sum, customer) => sum + customer.totalOrders, 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              متوسط الطلبات: {(customers.reduce((sum, customer) => sum + customer.totalOrders, 0) / (totalCustomers || 1)).toFixed(1)} لكل عميل
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              <span>عملاء جدد</span>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {customers.filter(customer => {
                const now = new Date();
                const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
                return customer.joinDate > thirtyDaysAgo;
              }).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              في آخر 30 يوم
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            placeholder="بحث عن عميل..." 
            className="pr-10" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex gap-2">
          <Filter size={16} />
          <span>تصفية</span>
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">جميع العملاء</TabsTrigger>
          <TabsTrigger value="active">العملاء النشطون</TabsTrigger>
          <TabsTrigger value="inactive">العملاء غير النشطين</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>قائمة العملاء</CardTitle>
              <CardDescription>
                إجمالي {filteredCustomers.length} عميل في متجرك
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>العميل</TableHead>
                    <TableHead>رقم العميل</TableHead>
                    <TableHead>الموقع</TableHead>
                    <TableHead>الطلبات</TableHead>
                    <TableHead>الإنفاق</TableHead>
                    <TableHead>آخر طلب</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead className="text-left">إجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={customer.avatar} alt={customer.name} />
                            <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{customer.name}</div>
                            <div className="text-sm text-muted-foreground">{customer.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{customer.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin size={14} className="text-muted-foreground" />
                          <span>{customer.city}, {customer.country}</span>
                        </div>
                      </TableCell>
                      <TableCell>{customer.totalOrders}</TableCell>
                      <TableCell>{customer.totalSpent.toFixed(2)} KWD</TableCell>
                      <TableCell>
                        {customer.totalOrders > 0 
                          ? format(customer.lastOrderDate, "dd/MM/yyyy") 
                          : "لا يوجد"
                        }
                      </TableCell>
                      <TableCell>
                        {customer.status === 'active' 
                          ? <Badge className="bg-green-500 hover:bg-green-600">نشط</Badge>
                          : <Badge variant="outline">غير نشط</Badge>
                        }
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => viewCustomerDetails(customer)}
                            className="text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                          >
                            <User size={16} />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-slate-600 hover:text-slate-900 hover:bg-slate-100">
                                <MoreHorizontal size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>خيارات</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => viewCustomerDetails(customer)}>
                                <User className="ml-2" size={16} />
                                <span>عرض التفاصيل</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openEmailDialog(customer)}>
                                <Mail className="ml-2" size={16} />
                                <span>إرسال بريد إلكتروني</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openOrdersDialog(customer)}>
                                <ShoppingBag className="ml-2" size={16} />
                                <span>عرض الطلبات</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-500 focus:text-red-500">
                                <svg className="ml-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M18 6 6 18"></path>
                                  <path d="m6 6 12 12"></path>
                                </svg>
                                <span>تعطيل الحساب</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {currentCustomers.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center">
                        لا يوجد عملاء مطابقين لبحثك
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
            
            {totalPages > 1 && (
              <CardFooter className="flex justify-between py-4">
                <div className="text-sm text-muted-foreground">
                  عرض {(currentPage - 1) * itemsPerPage + 1} إلى {Math.min(currentPage * itemsPerPage, filteredCustomers.length)} من أصل {filteredCustomers.length} عميل
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <div className="text-sm">{currentPage} من {totalPages}</div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            )}
          </Card>
        </TabsContent>
        
        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>العملاء النشطون</CardTitle>
              <CardDescription>
                العملاء الذين لديهم حسابات نشطة في متجرك
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">
                سيتم عرض قائمة العملاء النشطين هنا
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="inactive">
          <Card>
            <CardHeader>
              <CardTitle>العملاء غير النشطين</CardTitle>
              <CardDescription>
                العملاء الذين لديهم حسابات غير نشطة في متجرك
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">
                سيتم عرض قائمة العملاء غير النشطين هنا
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          {selectedCustomer && (
            <>
              <DialogHeader>
                <DialogTitle>معلومات العميل</DialogTitle>
                <DialogDescription>
                  تفاصيل حساب العميل ونشاطه في المتجر
                </DialogDescription>
              </DialogHeader>
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="details">التفاصيل</TabsTrigger>
                  <TabsTrigger value="orders">الطلبات</TabsTrigger>
                  <TabsTrigger value="activity">النشاط</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-14 w-14">
                        <AvatarImage src={selectedCustomer.avatar} alt={selectedCustomer.name} />
                        <AvatarFallback className="text-lg">{selectedCustomer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-semibold">{selectedCustomer.name}</h3>
                        <p className="text-sm text-muted-foreground">#{selectedCustomer.id}</p>
                      </div>
                    </div>
                    {selectedCustomer.status === 'active' 
                      ? <Badge className="bg-green-500 hover:bg-green-600">نشط</Badge>
                      : <Badge variant="outline">غير نشط</Badge>
                    }
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">معلومات الاتصال</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{selectedCustomer.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{selectedCustomer.phone}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                          <div>
                            <p>{selectedCustomer.address}</p>
                            <p>{selectedCustomer.city}، {selectedCustomer.country}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">معلومات الحساب</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>تاريخ التسجيل: {format(selectedCustomer.joinDate, "dd/MM/yyyy")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                          <span>إجمالي الطلبات: {selectedCustomer.totalOrders}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span>إجمالي الإنفاق: {selectedCustomer.totalSpent.toFixed(2)} KWD</span>
                        </div>
                        {selectedCustomer.totalOrders > 0 && (
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>آخر طلب: {format(selectedCustomer.lastOrderDate, "dd/MM/yyyy")}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="text-sm font-medium mb-2">الإجراءات السريعة</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" className="w-full flex items-center justify-center gap-2" onClick={() => openOrdersDialog(selectedCustomer)}>
                        <ShoppingBag className="h-4 w-4" />
                        <span>عرض سجل الطلبات</span>
                      </Button>
                      <Button variant="outline" className="w-full flex items-center justify-center gap-2" onClick={() => openEmailDialog(selectedCustomer)}>
                        <Send className="h-4 w-4" />
                        <span>إرسال بريد إلكتروني</span>
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="orders">
                  <div className="border rounded-md overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>رقم الطلب</TableHead>
                          <TableHead>التاريخ</TableHead>
                          <TableHead>الحالة</TableHead>
                          <TableHead>المبلغ</TableHead>
                          <TableHead>إجراءات</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sampleOrders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{format(order.date, "dd/MM/yyyy")}</TableCell>
                            <TableCell>{getStatusBadge(order.status)}</TableCell>
                            <TableCell>{order.total.toFixed(2)} KWD</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm" asChild>
                                <Link to={`/dashboard/orders/${order.id}`}>عرض التفاصيل</Link>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                
                <TabsContent value="activity">
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground mb-2">
                      سجل نشاط العميل في المتجر
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 border-b pb-4">
                        <div className="bg-blue-100 text-blue-700 rounded-full p-1.5">
                          <ShoppingBag size={16} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">قام بإجراء طلب جديد</p>
                          <p className="text-xs text-muted-foreground mt-1">طلب رقم: ORD-2023-001</p>
                          <p className="text-xs mt-1">{format(new Date(2023, 9, 5), "dd/MM/yyyy - hh:mm a")}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 border-b pb-4">
                        <div className="bg-green-100 text-green-700 rounded-full p-1.5">
                          <User size={16} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">قام بتحديث بيانات الحساب</p>
                          <p className="text-xs text-muted-foreground mt-1">تم تحديث العنوان ورقم الهاتف</p>
                          <p className="text-xs mt-1">{format(new Date(2023, 8, 20), "dd/MM/yyyy - hh:mm a")}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 border-b pb-4">
                        <div className="bg-yellow-100 text-yellow-700 rounded-full p-1.5">
                          <Mail size={16} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">اشترك في النشرة البريدية</p>
                          <p className="text-xs mt-1">{format(new Date(2023, 7, 10), "dd/MM/yyyy - hh:mm a")}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="bg-purple-100 text-purple-700 rounded-full p-1.5">
                          <UserPlus size={16} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">انضم إلى المتجر</p>
                          <p className="text-xs mt-1">{format(selectedCustomer.joinDate, "dd/MM/yyyy - hh:mm a")}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <DialogFooter className="flex justify-between items-center">
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                  إغلاق
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" className="gap-2" onClick={() => openEmailDialog(selectedCustomer)}>
                    <Mail className="h-4 w-4" />
                    مراسلة
                  </Button>
                  <Button>تحرير معلومات العميل</Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedCustomer && (
            <>
              <DialogHeader>
                <DialogTitle>إرسال بريد إلكتروني</DialogTitle>
                <DialogDescription>
                  إرسال بريد إلكتروني إلى {selectedCustomer.name}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedCustomer.avatar} alt={selectedCustomer.name} />
                    <AvatarFallback>{selectedCustomer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{selectedCustomer.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedCustomer.email}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">عنوان الرسالة</label>
                    <Input 
                      id="subject" 
                      value={emailSubject} 
                      onChange={(e) => setEmailSubject(e.target.value)} 
                      placeholder="أدخل عنوان الرسالة" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="body" className="text-sm font-medium">محتوى الرسالة</label>
                    <Textarea 
                      id="body" 
                      value={emailBody} 
                      onChange={(e) => setEmailBody(e.target.value)} 
                      placeholder="أدخل محتوى الرسالة" 
                      rows={8} 
                    />
                  </div>
                  
                  <div className="bg-muted/50 rounded-md p-3 text-sm">
                    <p className="font-medium mb-2 flex items-center gap-2">
                      <Check size={16} className="text-green-500" />
                      <span>يمكنك استخدام المتغيرات التالية في الرسالة:</span>
                    </p>
                    <ul className="space-y-1 text-muted-foreground">
                      <li><code className="bg-muted px-1 py-0.5 rounded">{'{name}'}</code> - اسم العميل</li>
                      <li><code className="bg-muted px-1 py-0.5 rounded">{'{order_id}'}</code> - رقم آخر طلب</li>
                      <li><code className="bg-muted px-1 py-0.5 rounded">{'{store}'}</code> - اسم المتجر</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <DialogFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setIsEmailDialogOpen(false)}>
                  إلغاء
                </Button>
                <Button onClick={sendEmail} className="gap-2">
                  <Send className="h-4 w-4" />
                  إرسال
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isOrdersDialogOpen} onOpenChange={setIsOrdersDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          {selectedCustomer && (
            <>
              <DialogHeader>
                <DialogTitle>سجل طلبات العميل</DialogTitle>
                <DialogDescription>
                  عرض كامل لسجل طلبات {selectedCustomer.name}
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedCustomer.avatar} alt={selectedCustomer.name} />
                      <AvatarFallback>{selectedCustomer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{selectedCustomer.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedCustomer.email}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-sm font-medium">إجمالي الطلبات: {selectedCustomer.totalOrders}</p>
                    <p className="text-sm text-muted-foreground">الإنفاق الكلي: {selectedCustomer.totalSpent.toFixed(2)} KWD</p>
                  </div>
                </div>
                
                <Separator className="mb-4" />
                
                {selectedCustomer.totalOrders > 0 ? (
                  <div className="space-y-4">
                    <div className="border rounded-md overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>رقم الطلب</TableHead>
                            <TableHead>التاريخ</TableHead>
                            <TableHead>المنتجات</TableHead>
                            <TableHead>الحالة</TableHead>
                            <TableHead>المبلغ</TableHead>
                            <TableHead>إجراءات</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {sampleOrders.map((order) => (
                            <TableRow key={order.id}>
                              <TableCell className="font-medium">{order.id}</TableCell>
                              <TableCell>{format(order.date, "dd/MM/yyyy")}</TableCell>
                              <TableCell>{order.items} منتجات</TableCell>
                              <TableCell>{getStatusBadge(order.status)}</TableCell>
                              <TableCell>{order.total.toFixed(2)} KWD</TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                                    <FileText className="h-3.5 w-3.5 ml-1" />
                                    التفاصيل
                                  </Button>
                                  <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                                    <Package className="h-3.5 w-3.5 ml-1" />
                                    الفاتورة
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-md">
                      <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>تفاصيل إضافية</span>
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">وقت التسليم المتوسط:</p>
                          <p className="font-medium">3 أيام</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">طريقة الدفع المفضلة:</p>
                          <p className="font-medium">بطاقة ائتمان</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">عمليات الإرجاع:</p>
                          <p className="font-medium">لا يوجد</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">آخر تحديث:</p>
                          <p className="font-medium">{format(new Date(), "dd/MM/yyyy")}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground/60 mb-3" />
                    <h3 className="text-lg font-medium mb-1">لا يوجد طلبات</h3>
                    <p className="text-muted-foreground text-sm">
                      لم يقم هذا العميل بإجراء أي طلبات حتى الآن
                    </p>
                  </div>
                )}
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsOrdersDialogOpen(false)}>
                  إغلاق
                </Button>
                {selectedCustomer.totalOrders > 0 && (
                  <Button asChild>
                    <Link to="/dashboard/orders" className="flex items-center gap-2">
                      <Truck className="h-4 w-4" />
                      عرض جميع الطلبات
                    </Link>
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Customers;
