import React from "react";
import MainDashboard from "./pages/dashboard/MainDashboard";
import { BrowserRouter, Outlet } from "react-router";

const App = () => {
  return (
    <div className=" container">
      <Outlet/>
    </div>
  );
};

export default App;
