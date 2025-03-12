
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUp, ArrowDown, DollarSign, ShoppingBag, Users, Store, Plus } from "lucide-react";

// Sample data for the dashboard charts and stats with English months
const revenueData = [
  { name: "January", total: 1200 },
  { name: "February", total: 2100 },
  { name: "March", total: 1800 },
  { name: "April", total: 2400 },
  { name: "May", total: 3100 },
  { name: "June", total: 2900 },
  { name: "July", total: 3800 },
];

const Dashboard = () => {
  return (
    <div className="space-y-6" style={{ direction: "rtl" }}>
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">لوحة التحكم</h1>
          <p className="text-muted-foreground">
            مرحبًا بك في متجرك، اطلع على أداء متجرك وأحدث الإحصائيات.
          </p>
        </div>
        <Button asChild className="button-hover-effect">
          <Link to="/dashboard/products/new">
            <Plus className="mr-2 h-4 w-4" />
            إضافة منتج جديد
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Revenue */}
        <Card className="hover:shadow-md transition-all duration-300 hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الإيرادات</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">43,500 KWD</div>
            <div className="flex items-center pt-1 text-xs text-muted-foreground">
              <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500 font-medium">+20.1%</span>
              <span className="mr-1">مقارنة بالشهر الماضي</span>
            </div>
          </CardContent>
        </Card>

        {/* Total Orders */}
        <Card className="hover:shadow-md transition-all duration-300 hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الطلبات</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">136</div>
            <div className="flex items-center pt-1 text-xs text-muted-foreground">
              <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500 font-medium">+12.5%</span>
              <span className="mr-1">مقارنة بالشهر الماضي</span>
            </div>
          </CardContent>
        </Card>

        {/* Total Customers */}
        <Card className="hover:shadow-md transition-all duration-300 hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي العملاء</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <div className="flex items-center pt-1 text-xs text-muted-foreground">
              <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500 font-medium">+9.2%</span>
              <span className="mr-1">مقارنة بالشهر الماضي</span>
            </div>
          </CardContent>
        </Card>

        {/* Conversion Rate */}
        <Card className="hover:shadow-md transition-all duration-300 hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">معدل التحويل</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4%</div>
            <div className="flex items-center pt-1 text-xs text-muted-foreground">
              <ArrowDown className="mr-1 h-3 w-3 text-red-500" />
              <span className="text-red-500 font-medium">-0.5%</span>
              <span className="mr-1">مقارنة بالشهر الماضي</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-7">
        {/* Revenue Chart */}
        <Card className="col-span-4 hover:shadow-md transition-all duration-300">
          <CardHeader>
            <CardTitle>إيرادات المبيعات</CardTitle>
            <CardDescription>
              إجمالي الإيرادات حسب الشهر لهذا العام
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={revenueData}>
                <XAxis 
                  dataKey="name" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `${value} KWD`} 
                />
                <Tooltip 
                  formatter={(value) => [`${value} KWD`, 'الإيرادات']} 
                  labelFormatter={(label) => `شهر: ${label}`} 
                />
                <Bar 
                  dataKey="total" 
                  fill="hsl(var(--primary))" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="col-span-3 hover:shadow-md transition-all duration-300">
          <CardHeader>
            <CardTitle>آخر النشاطات</CardTitle>
            <CardDescription>
              أحدث الطلبات والمبيعات في متجرك
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Activity 1 */}
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-green-500"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">طلب جديد #1087</p>
                  <p className="text-xs text-muted-foreground">
                    أحمد محمد اشترى "سماعات لاسلكية"
                  </p>
                  <p className="text-xs text-muted-foreground">
                    منذ 10 دقائق
                  </p>
                </div>
                <div className="font-medium">299 KWD</div>
              </div>
              
              {/* Activity 2 */}
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">عميل جديد</p>
                  <p className="text-xs text-muted-foreground">
                    ليلى أحمد سجلت في متجرك
                  </p>
                  <p className="text-xs text-muted-foreground">
                    منذ 32 دقيقة
                  </p>
                </div>
              </div>
              
              {/* Activity 3 */}
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-yellow-500"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">تحديث حالة الطلب #1084</p>
                  <p className="text-xs text-muted-foreground">
                    تم تغيير حالة الطلب إلى "تم الشحن"
                  </p>
                  <p className="text-xs text-muted-foreground">
                    منذ ساعة
                  </p>
                </div>
              </div>
              
              {/* Activity 4 */}
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-green-500"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">طلب جديد #1086</p>
                  <p className="text-xs text-muted-foreground">
                    خالد سعيد اشترى "حقيبة ظهر"
                  </p>
                  <p className="text-xs text-muted-foreground">
                    منذ ساعتين
                  </p>
                </div>
                <div className="font-medium">150 KWD</div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <Button variant="ghost" asChild className="text-sm">
                <Link to="/dashboard/orders">
                  <span>عرض جميع الطلبات</span>
                  <ArrowRight className="mr-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-all duration-300 hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">إضافة منتج</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground mb-4">
              أضف منتجات جديدة إلى متجرك واعرضها للعملاء
            </p>
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link to="/dashboard/products/new">إضافة منتج</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-all duration-300 hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">تخصيص المتجر</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground mb-4">
              خصص شكل ومظهر متجرك ليعكس هويتك التجارية
            </p>
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link to="/dashboard/settings/store">تخصيص المتجر</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-all duration-300 hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">إدارة الطلبات</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground mb-4">
              راجع وقم بإدارة طلبات العملاء وتتبع حالتها
            </p>
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link to="/dashboard/orders">إدارة الطلبات</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-all duration-300 hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">إدارة العملاء</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground mb-4">
              اطلع على قائمة العملاء وإدارة حساباتهم
            </p>
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link to="/dashboard/customers">إدارة العملاء</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
