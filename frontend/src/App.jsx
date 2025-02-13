import React from "react";
import { Outlet } from "react-router";

const App = () => {
  return (
    <div className="container">
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default App;
