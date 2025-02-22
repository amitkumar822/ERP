import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router";
import { router } from "./routes/Router";
import { ThemeProvider } from "./context/Theme/ThemeContextProvider.jsx";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { appStore } from "./redux/app/store.js";
// import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={appStore}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
        <ThemeProvider>
          <RouterProvider router={router} />
          <ToastContainer
            position="top-left"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </ThemeProvider>
      {/* </PersistGate> */}
    </Provider>
  </StrictMode>
);
