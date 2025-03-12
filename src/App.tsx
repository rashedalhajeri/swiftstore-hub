
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
import Categories from "./pages/dashboard/Categories";
import Promotions from "./pages/dashboard/Promotions";
import SettingsAccount from "./pages/dashboard/settings/Account";
import SettingsStore from "./pages/dashboard/settings/Store";
import SettingsBilling from "./pages/dashboard/settings/Billing";
import SettingsNotifications from "./pages/dashboard/settings/Notifications";
import SettingsSecurity from "./pages/dashboard/settings/Security";
import SettingsDomains from "./pages/dashboard/settings/Domains";
import SettingsSupport from "./pages/dashboard/settings/Support";

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
              <Route path="categories" element={<Categories />} />
              <Route path="promotions" element={<Promotions />} />
              <Route path="orders" element={<div className="text-2xl font-bold">صفحة الطلبات</div>} />
              <Route path="customers" element={<div className="text-2xl font-bold">صفحة العملاء</div>} />
              
              {/* Settings Routes */}
              <Route path="settings" element={<SettingsAccount />} />
              <Route path="settings/account" element={<SettingsAccount />} />
              <Route path="settings/store" element={<SettingsStore />} />
              <Route path="settings/billing" element={<SettingsBilling />} />
              <Route path="settings/notifications" element={<SettingsNotifications />} />
              <Route path="settings/security" element={<SettingsSecurity />} />
              <Route path="settings/domains" element={<SettingsDomains />} />
              <Route path="settings/support" element={<SettingsSupport />} />
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
