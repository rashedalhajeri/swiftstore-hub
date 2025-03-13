
import React, { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import UpdatePassword from "./pages/UpdatePassword";
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
import Products from "./pages/dashboard/Products";
import NewProduct from "./pages/dashboard/products/NewProduct";
import EditProduct from "./pages/dashboard/products/EditProduct";
import Orders from "./pages/dashboard/Orders";
import Customers from "./pages/dashboard/Customers";
import SettingsAccount from "./pages/dashboard/settings/Account";
import SettingsStore from "./pages/dashboard/settings/Store";
import SettingsBilling from "./pages/dashboard/settings/Billing";
import SettingsNotifications from "./pages/dashboard/settings/Notifications";
import SettingsSecurity from "./pages/dashboard/settings/Security";
import SettingsDomains from "./pages/dashboard/settings/Domains";
import SettingsSupport from "./pages/dashboard/settings/Support";
import LoadingScreen from "./components/LoadingScreen";

// تكوين مخزن مؤقت أكثر فعالية
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // منع إعادة جلب البيانات عند تغيير التركيز على النافذة
      retry: 1, // تقليل عدد محاولات إعادة المحاولة
      staleTime: 1000 * 60 * 5, // 5 دقائق قبل اعتبار البيانات قديمة
    },
  },
});

// غلاف حماية للمسارات التي تتطلب تسجيل الدخول - تم تحسينه
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  // تحديد مدة قصوى للتحميل - تم تقليلها إلى 3 ثوانٍ
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  
  useEffect(() => {
    let timeoutId: number;
    
    if (loading) {
      timeoutId = window.setTimeout(() => {
        setLoadingTimeout(true);
      }, 3000);
    }
    
    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [loading]);
  
  // عرض شاشة التحميل لمدة أقصر
  if (loading && !loadingTimeout) {
    return <LoadingScreen />;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// غلاف للمسارات العامة - تم تحسينه
const PublicOnlyRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  // تحديد مدة قصوى للتحميل - تم تقليلها إلى 3 ثوانٍ
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  
  useEffect(() => {
    let timeoutId: number;
    
    if (loading) {
      timeoutId = window.setTimeout(() => {
        setLoadingTimeout(true);
      }, 3000);
    }
    
    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [loading]);
  
  // عرض شاشة التحميل لمدة أقصر
  if (loading && !loadingTimeout) {
    return <LoadingScreen />;
  }
  
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={
                <PublicOnlyRoute>
                  <Login />
                </PublicOnlyRoute>
              } />
              <Route path="/register" element={
                <PublicOnlyRoute>
                  <Register />
                </PublicOnlyRoute>
              } />
              <Route path="/reset-password" element={
                <PublicOnlyRoute>
                  <ResetPassword />
                </PublicOnlyRoute>
              } />
              <Route path="/update-password" element={
                <PublicOnlyRoute>
                  <UpdatePassword />
                </PublicOnlyRoute>
              } />
              <Route path="/store" element={<StoreFront />} />
              <Route path="/store/product/:id" element={<ProductDetails />} />
              <Route path="/store/cart" element={<Cart />} />
              <Route path="/store/checkout" element={<Checkout />} />
              <Route path="/store/order-confirmation" element={<OrderConfirmation />} />
              
              {/* Dashboard Routes (Protected) */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }>
                <Route index element={<Dashboard />} />
                <Route path="products" element={<Products />} />
                <Route path="products/new" element={<NewProduct />} />
                <Route path="products/:id/edit" element={<EditProduct />} />
                <Route path="categories" element={<Categories />} />
                <Route path="promotions" element={<Promotions />} />
                <Route path="orders" element={<Orders />} />
                <Route path="customers" element={<Customers />} />
                
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
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
