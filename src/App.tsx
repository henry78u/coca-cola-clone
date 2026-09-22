import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

// Public pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import History from "./pages/History";
import StoreLocator from "./pages/StoreLocator";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

// Dashboard pages
import Overview from "./pages/dashboard/Overview";
import Invest from "./pages/dashboard/Invest";
import Portfolio from "./pages/dashboard/Portfolio";
import Market from "./pages/dashboard/Market";
import InvestNews from "./pages/dashboard/InvestNews";
import Settings from "./pages/dashboard/Settings";
import ProductsMgmt from "./pages/dashboard/ProductsMgmt";
import Orders from "./pages/dashboard/Orders";
import Analytics from "./pages/dashboard/Analytics";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Standalone Authentication Route (No layout) */}
        <Route path="/login" element={<Login />} />

        {/* Protected Dashboard Routes (Nested inside DashboardLayout) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Overview />} />
          <Route path="invest" element={<Invest />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="market" element={<Market />} />
          <Route path="news" element={<InvestNews />} />
          <Route path="settings" element={<Settings />} />

          {/* Admin-only Routes */}
          <Route
            path="products"
            element={
              <AdminRoute>
                <ProductsMgmt />
              </AdminRoute>
            }
          />
          <Route
            path="orders"
            element={
              <AdminRoute>
                <Orders />
              </AdminRoute>
            }
          />
          <Route
            path="analytics"
            element={
              <AdminRoute>
                <Analytics />
              </AdminRoute>
            }
          />
        </Route>

        {/* Public Website Routes (Nested inside PublicLayout) */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/history" element={<History />} />
          <Route path="/locator" element={<StoreLocator />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
