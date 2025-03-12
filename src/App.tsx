
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./layouts/DashboardLayout";
import StoreFront from "./pages/StoreFront";
import ProductDetails from "./pages/store/ProductDetails";
import Cart from "./pages/store/Cart";
import Checkout from "./pages/store/Checkout";
import OrderConfirmation from "./pages/store/OrderConfirmation";
import { CartProvider } from "./contexts/CartContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/store" element={<StoreFront />} />
            <Route path="/store/product/:id" element={<ProductDetails />} />
            <Route path="/store/cart" element={<Cart />} />
            <Route path="/store/checkout" element={<Checkout />} />
            <Route path="/store/order-confirmation" element={<OrderConfirmation />} />
            
            {/* Dashboard Routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="products" element={<div className="text-2xl font-bold">صفحة المنتجات</div>} />
              <Route path="orders" element={<div className="text-2xl font-bold">صفحة الطلبات</div>} />
              <Route path="customers" element={<div className="text-2xl font-bold">صفحة العملاء</div>} />
              
              {/* Settings Routes */}
              <Route path="settings" element={<div className="text-2xl font-bold">صفحة الإعدادات العامة</div>} />
              <Route path="settings/account" element={<div className="text-2xl font-bold">إعدادات الحساب</div>} />
              <Route path="settings/store" element={<div className="text-2xl font-bold">إعدادات المتجر</div>} />
              <Route path="settings/billing" element={<div className="text-2xl font-bold">إعدادات الفواتير</div>} />
              <Route path="settings/notifications" element={<div className="text-2xl font-bold">إعدادات الإشعارات</div>} />
              <Route path="settings/security" element={<div className="text-2xl font-bold">إعدادات الأمان</div>} />
              <Route path="settings/domains" element={<div className="text-2xl font-bold">إعدادات النطاقات</div>} />
              <Route path="settings/support" element={<div className="text-2xl font-bold">المساعدة والدعم</div>} />
            </Route>
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
