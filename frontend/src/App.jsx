import React from "react";
import MainDashboard from "./pages/dashboard/MainDashboard";
import { BrowserRouter, Outlet } from "react-router";

const App = () => {
  return (
    <div>
      <Outlet/>
    </div>
  );
};

export default App;
