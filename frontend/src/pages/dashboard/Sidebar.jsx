import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  Bus,
  Library,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  User,
  UserPlus,
  ClipboardList,
  Book,
  Clock,
  FileText,
} from "lucide-react";
import { Link } from "react-router";

// Sidebar data in JSON format for easy management
const sidebarData = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
    link: "/dashboard",
  },
  {
    title: "Students",
    icon: <Users className="w-5 h-5" />,
    link: "/students",
    subItems: [
      {
        title: "Student List",
        icon: <User className="w-4 h-4" />,
        link: "/students/list",
      },
      {
        title: "Add Student",
        icon: <UserPlus className="w-4 h-4" />,
        link: "/students/add",
      },
      {
        title: "Attendance",
        icon: <ClipboardList className="w-4 h-4" />,
        link: "/students/attendance",
      },
    ],
  },
  {
    title: "Teachers",
    icon: <Users className="w-5 h-5" />,
    link: "/teachers",
    subItems: [
      {
        title: "Teacher List",
        icon: <User className="w-4 h-4" />,
        link: "/teachers/list",
      },
      {
        title: "Add Teacher",
        icon: <UserPlus className="w-4 h-4" />,
        link: "/teachers/add",
      },
    ],
  },
  {
    title: "Academics",
    icon: <BookOpen className="w-5 h-5" />,
    link: "/academics",
    subItems: [
      {
        title: "Class Management",
        icon: <Book className="w-4 h-4" />,
        link: "/academics/classes",
      },
      {
        title: "Timetable",
        icon: <Clock className="w-4 h-4" />,
        link: "/academics/timetable",
      },
      {
        title: "Syllabus",
        icon: <FileText className="w-4 h-4" />,
        link: "/academics/syllabus",
      },
    ],
  },
  {
    title: "Transport",
    icon: <Bus className="w-5 h-5" />,
    link: "/transport",
  },
  {
    title: "Library",
    icon: <Library className="w-5 h-5" />,
    link: "/library",
  },
  {
    title: "Settings",
    icon: <Settings className="w-5 h-5" />,
    link: "/settings",
  },
  {
    title: "Help & Support",
    icon: <HelpCircle className="w-5 h-5" />,
    link: "/help",
  },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  // Toggle sidebar collapse
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Toggle submenu
  const toggleSubMenu = (index) => {
    setActiveMenu(activeMenu === index ? null : index);
  };

  return (
    <div
      className={`h-screen transition-all duration-300 shadow-md shadow-gray-800 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Sidebar Header */}
      <div className="p-4 flex items-center justify-between border-b border-gray-700">
        {!isCollapsed && <h1 className="text-xl font-bold">School Admin</h1>}
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-700 rounded transition-all duration-200"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Sidebar Menu */}
      <div className="p-4">
        {sidebarData.map((item, index) => (
          <div key={index}>
            <div
              onClick={() => toggleSubMenu(index)}
              className="flex items-center p-2 hover:bg-gray-200 rounded cursor-pointer transition-all duration-200"
            >
              {item.icon}
              {!isCollapsed && <span className="ml-3">{item.title}</span>}
            </div>
            {!isCollapsed && activeMenu === index && item.subItems && (
              <div className="pl-8 mt-2 space-y-1">
                {item.subItems.map((subItem, subIndex) => (
                  <Link
                    to={subItem.link}
                    key={subIndex}
                    className="flex items-center p-2 hover:bg-gray-200 rounded cursor-pointer transition-all duration-200"
                  >
                    {subItem.icon}
                    <span className="ml-3">{subItem.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
