import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { sidebarData } from "./Sidebar";


const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  // Toggle Sidebar
  const toggleSidebar = () => setIsOpen(!isOpen);

  // Close Sidebar when clicking a menu item
  const closeSidebar = () => setIsOpen(false);

  // Toggle Submenu
  const toggleSubMenu = (index) =>
    setActiveMenu(activeMenu === index ? null : index);

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-2 right-4 z-50 p-2 bg-gray-900 text-white rounded-full shadow-lg dark:bg-gray-800 cursor-pointer"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar Overlay (Closes when clicked) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-50 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar Menu */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 h-screen w-64 bg-white dark:bg-gray-900 text-gray-900 dark:text-white z-50 shadow-lg border-r border-gray-300 dark:border-gray-700"
      >
        {/* Sidebar Header */}
        <div className="p-4 flex items-center justify-between border-b border-gray-300 dark:border-gray-700">
          <h1 className="text-xl font-bold">School Admin</h1>
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-all duration-200 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Sidebar Menu */}
        <div className="p-4">
          {sidebarData.map((item, index) => (
            <div key={index}>
              <Link
                to={item?.subItems ? "#" : item.link}
                onClick={() => {
                  if (!item.subItems) closeSidebar();
                  toggleSubMenu(index);
                }}
                className="flex items-center p-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer transition-all duration-200"
              >
                {item.icon}
                <span className="ml-3">{item.title}</span>
                {item.subItems && (
                  <ChevronDown
                    className={`ml-auto transform transition-transform ${
                      activeMenu === index ? "rotate-180" : ""
                    }`}
                  />
                )}
              </Link>

              {activeMenu === index && item.subItems && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.2 }}
                  className="pl-6 mt-2 space-y-2"
                >
                  {item.subItems.map((subItem, subIndex) => (
                    <NavLink
                      to={subItem.link}
                      key={subIndex}
                      className="flex items-center p-2 bg-gray-50 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer transition-all duration-200"
                      onClick={closeSidebar}
                    >
                      {subItem.icon}
                      <span className="ml-3">{subItem.title}</span>
                    </NavLink>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default MobileSidebar;
