import React from "react";
import MainDashboard from "./pages/dashboard/MainDashboard";
import { BrowserRouter } from "react-router";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <MainDashboard />
      </BrowserRouter>
    </div>
  );
};

export default App;
