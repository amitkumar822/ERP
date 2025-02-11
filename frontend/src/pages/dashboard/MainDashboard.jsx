import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router";
import Navbar from "./Navbar";

const MainDashboard = () => {
  return (
    <div className="h-screen fixed w-full">
      {/* Navigation */}
      <div className="w-full bg-blue-900 text-white fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex pt-10 h-full">
        {/* Sidebar (Fixed) */}
        <div>
          <Sidebar />
        </div>

        {/* Dashboard (Scrollable) */}
        <div className="flex-1 overflow-y-auto h-screen py-2 pb-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
