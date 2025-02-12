import { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, User, Settings, LogOut, Sun, Moon, Home, Bus } from "lucide-react";
import ThemeContext from "@/context/Theme/ThemeContext";

const Navbar = () => {
  const { themeColorProvider, darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <nav
      className={`${themeColorProvider === "#ffff" ? "dark:text-black" : "dark:text-white"} shadow-md px-6 py-3 fixed top-0 left-0 w-full z-50 text-gray-800 dark:bg-gray-900 `}
      style={{ backgroundColor: themeColorProvider }}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="flex items-center gap-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png"
              alt="Logo"
              className="w-8 h-8"
            />
            <span className="text-xl font-bold">School ERP</span>
          </Link>
        </motion.div>

        <ul className="hidden md:flex items-center gap-6">
          <li>
            <Link to="/" className="flex items-center gap-1">
              <Home className="w-5 h-5" /> Home
            </Link>
          </li>
          <li>
            <Link to="/transport" className="flex items-center gap-1">
              <Bus className="w-5 h-5" /> Transport
            </Link>
          </li>
          <li>
            <Link to="/settings" className="flex items-center gap-1">
              <Settings className="w-5 h-5" /> Settings
            </Link>
          </li>
        </ul>

        {/* User Profile & Dark Mode */}
        <div className="hidden md:flex items-center gap-4">
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-gray-400" />}
          </button>

          {/* User Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-2">
              <User className="w-6 h-6" />
            </button>
            <div className="absolute right-0 hidden group-hover:block bg-white dark:bg-gray-800 shadow-md rounded-md mt-2 w-40">
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                Profile
              </Link>
              <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                Settings
              </Link>
              <button className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2">
                <LogOut className="w-5 h-5" /> Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
