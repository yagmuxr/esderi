import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Account from "./components/Account/Account";
import ShopPage from "./pages/ShopPage";
import CartPage from "./pages/CartPage";
import ContactPage from "./pages/ContactPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import AdminUserPage from "./pages/admin/AdminUserPage";
import CategoryPage from "./components/Categories/CategoryPage";
import UpdateCategoryPage from "./components/Categories/UpdateCategoryPage";
import CreateProductPage from "./components/Products/CreateProductPage";
import UpdateProductPage from "./components/Products/UpdateProductPage";
import ProductPage from "./components/Products/ProductPage";
import OrderPage from "./components/Products/OrderPage";
import AdminLayout from "./components/Layouts/AdminLayout";
import CouponPage from "./components/Coupon/CouponPage";
import Success from "./pages/Success";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<Account />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/product/:id" element={<ProductDetailsPage />} />
      <Route path="/success" element={<Success />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="users" element={<AdminUserPage />} />
        <Route path="categories" element={<CategoryPage />} />
        <Route path="categories/:id" element={<UpdateCategoryPage />} />
        <Route path="products" element={<ProductPage />} />
        <Route path="products/create" element={<CreateProductPage />} />
        <Route path="products/:id" element={<UpdateProductPage />} />
        <Route path="orders" element={<OrderPage />} />
        <Route path="coupons" element={<CouponPage />} />
      </Route>
    </Routes>
  );
}

export default App;
