import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./frontend/src/pages/HomePage";
import Account from "./frontend/src/components/Account/Account";
import ShopPage from "./frontend/src/pages/ShopPage";
import CartPage from "./frontend/src/pages/CartPage";
import ContactPage from "./frontend/src/pages/ContactPage";
import ProductDetailsPage from "./frontend/src/pages/ProductDetailsPage";
import AdminUserPage from "./frontend/src/pages/admin/AdminUserPage";
import CategoryPage from "./frontend/src/components/Categories/CategoryPage";
import UpdateCategoryPage from "./frontend/src/components/Categories/UpdateCategoryPage";
import CreateProductPage from "./frontend/src/components/Products/CreateProductPage";
import UpdateProductPage from "./frontend/src/components/Products/UpdateProductPage";
import ProductPage from "./frontend/src/components/Products/ProductPage";
import OrderPage from "./frontend/src/components/Products/OrderPage";
import AdminLayout from "./frontend/src/components/Layouts/AdminLayout";
import CouponPage from "./frontend/src/components/Coupon/CouponPage";
import Success from "./frontend/src/pages/Success";

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
