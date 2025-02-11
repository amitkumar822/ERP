import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { Moon, Sun, User, Bell, Lock, Palette } from "lucide-react";
import ThemeContext from "@/context/Theme/ThemeContext";

const themes = [
  { name: "Blue", color: "#007bff" },
  { name: "Green", color: "#28a745" },
  { name: "Purple", color: "#6f42c1" },
  { name: "Orange", color: "#fd7e14" },
  { name: "Red", color: "#dc3545" },
  { name: "Pink", color: "#e83e8c" },
  { name: "Teal", color: "#20c997" },
  { name: "Yellow", color: "#ffc107" },
  { name: "Cyan", color: "#17a2b8" },
  { name: "Indigo", color: "#6610f2" },
  { name: "Lime", color: "#cddc39" },
  { name: "Amber", color: "#ffbf00" },
  { name: "Deep Orange", color: "#ff5722" },
  { name: "Light Green", color: "#8bc34a" },
  { name: "Magenta", color: "#ff00ff" },
  { name: "Turquoise", color: "#40e0d0" },
  { name: "Crimson", color: "#dc143c" },
  { name: "Plum", color: "#dda0dd" },
  { name: "Gold", color: "#ffd700" },
  { name: "White", color: "#ffff" },
];

const Settings = () => {
  const { themeColorProvider, setThemeColorProvider } =
    useContext(ThemeContext);
  const [themeColor, setThemeColor] = useState(
    localStorage.getItem("themeColor") || "#007bff"
  );
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const handleThemeChange = (color) => {
    localStorage.setItem("themeColor", color);
    setThemeColorProvider(color);
    setThemeColor(color);
    document.documentElement.style.setProperty("--theme-color", color);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      {/* Page Header */}
      <motion.h1
        className="text-3xl font-bold text-gray-800 dark:text-white mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        ⚙️ Settings
      </motion.h1>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Theme Customization */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 border-l-4 border-[var(--theme-color)]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
            <Palette className="w-6 h-6 text-[var(--theme-color)]" />
            Theme Customization
          </h2>
          <div className="flex flex-wrap gap-3 mt-4">
            {themes.map((theme) => (
              <button
                key={theme.name}
                className="w-10 h-10 rounded-full border-2"
                style={{ backgroundColor: theme.color }}
                onClick={() => handleThemeChange(theme.color)}
              ></button>
            ))}
          </div>
        </motion.div>

        {/* Dark Mode Toggle */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 border-l-4 border-[var(--theme-color)]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
            {darkMode ? (
              <Moon className="w-6 h-6 text-yellow-400" />
            ) : (
              <Sun className="w-6 h-6 text-orange-400" />
            )}
            Dark Mode
          </h2>
          <button
            className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "Disable Dark Mode" : "Enable Dark Mode"}
          </button>
        </motion.div>

        {/* Account Settings */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 border-l-4 border-[var(--theme-color)]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
            <User className="w-6 h-6 text-[var(--theme-color)]" />
            Account Settings
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            Update your profile, email, and password.
          </p>
          <button
            className={`mt-4 px-4 py-2 text-white rounded-lg hover:opacity-80 transition`}
            style={{
              backgroundColor: themeColor === "#ffff" ? "blue" : themeColor,
            }}
          >
            Edit Profile
          </button>
        </motion.div>

        {/* Notification Settings */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 border-l-4 border-[var(--theme-color)]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
            <Bell className="w-6 h-6 text-[var(--theme-color)]" />
            Notification Settings
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            Manage email and app notifications.
          </p>
          <button
            className={`mt-4 px-4 py-2 text-white rounded-lg hover:opacity-80 transition`}
            style={{
              backgroundColor: themeColor === "#ffff" ? "blue" : themeColor,
            }}
          >
            Manage Notifications
          </button>
        </motion.div>

        {/* Security Settings */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 border-l-4 border-[var(--theme-color)]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
            <Lock className="w-6 h-6 text-[var(--theme-color)]" />
            Security & Privacy
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            Enable two-factor authentication & reset password.
          </p>
          <button
            className={`mt-4 px-4 py-2 text-white rounded-lg hover:opacity-80 transition`}
            style={{
              backgroundColor: themeColor === "#ffff" ? "blue" : themeColor,
            }}
          >
            Security Settings
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
