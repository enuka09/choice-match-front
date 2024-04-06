import React from "react";
import AdminNavbar from "./navbar";
import { Outlet } from "react-router-dom";

const AdminLayout: React.FC = () => {
  return (
    <div className="flex h-lvh">
      <AdminNavbar />
      <div className="flex flex-1 flex-col">
        <div className="flex-1 overflow-auto bg-[#002137]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
