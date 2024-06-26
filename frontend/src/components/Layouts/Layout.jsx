// components/Layouts/Layout.jsx
import React from 'react';
import AdminLayout from "./AdminLayout";
import MainLayout from "./MainLayout";
import { isAdmin } from "../config/isAdmin";

const Layout = ({ children }) => {
  return isAdmin ? <AdminLayout>{children}</AdminLayout> : <MainLayout>{children}</MainLayout>;
};

export default Layout;
