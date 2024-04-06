// Layout.tsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import AdminLayout from "./admin";

const Layout: React.FC = () => {
  const location = useLocation();
  const isAdminDashboard = location.pathname.startsWith("/admin-dashboard");

  return (
    <div>
      {isAdminDashboard ? (
        <AdminLayout />
      ) : (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Layout;
