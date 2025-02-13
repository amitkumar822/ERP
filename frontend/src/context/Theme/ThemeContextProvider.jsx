import { useState, useEffect } from "react";
import ThemeContext from "./ThemeContext";

export const ThemeProvider = ({ children }) => {
  const [themeColorProvider, setThemeColorProvider] = useState(
    localStorage.getItem("themeColor") || "#ffffff"
  );
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--theme-color",
      themeColorProvider
    );
    console.log("themeColorProvider", themeColorProvider);
    localStorage.getItem("themeColor");
  }, [themeColorProvider]);

  return (
    <ThemeContext
      value={{
        themeColorProvider,
        setThemeColorProvider,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </ThemeContext>
  );
};
