import React from "react";
import Sidebar from "./Sidebar";

const MainDashboard = () => {
  return (
    <div>
      {/* Navigation */}
      <div className="w-full py-2 bg-blue-900 text-white">Navbar</div>

      <div className="flex gap-2">
        {/* Sidebar */}
        <div>
          <Sidebar />
        </div>
        <div>
          {/* Main Content */}
          <div>Main Content</div>
          <div>Dashboard</div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
