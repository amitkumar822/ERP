import { useState, useEffect } from "react";
import ThemeContext from "./ThemeContext";

export const ThemeProvider = ({ children }) => {
  // const [themeColor, setThemeColor] = useState(localStorage.getItem("themeColor") || "#ffffff");
  // const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");

  // // Apply theme color globally
  // useEffect(() => {
  //   document.documentElement.style.setProperty("--theme-color", themeColor);
  //   localStorage.setItem("themeColor", themeColor);
  // }, [themeColor]);

  // // Apply dark mode globally
  // useEffect(() => {
  //   if (darkMode) {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //   }
  //   localStorage.setItem("darkMode", darkMode);
  // }, [darkMode]);

  // console.log("themeColor2", themeColor);
  
  const [themeColorProvider, setThemeColorProvider] = useState(localStorage.getItem("themeColor") || "#ffffff");
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    document.documentElement.style.setProperty("--theme-color", themeColorProvider);
    console.log("themeColorProvider", themeColorProvider);
    localStorage.getItem("themeColor");
    
  }, [themeColorProvider]);

  return (
    <ThemeContext.Provider value={{ themeColorProvider, setThemeColorProvider, darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
