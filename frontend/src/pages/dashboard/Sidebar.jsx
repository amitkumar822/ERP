import React, { useContext, useState } from "react";
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
  CreditCard,
  UserCheck,
  Briefcase,
  Truck,
  Table,
} from "lucide-react";
import { Link, NavLink } from "react-router";
import ThemeContext from "@/context/Theme/ThemeContext";

const Sidebar = () => {
  const { themeColorProvider } = useContext(ThemeContext);

  const [isCollapsed, setIsCollapsed] = useState(true);
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
      className={`h-screen overflow-auto pb-5 transition-all duration-300 border-r-2 shadow-md shadow-gray-800 dark:bg-gray-900 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Sidebar Header */}
      <div className="p-4 flex items-center justify-between border-b border-gray-700">
        {!isCollapsed && <h1 className="text-xl font-bold">School Admin</h1>}
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-blue-700 rounded transition-all duration-200 cursor-pointer"
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
            <Link
              to={item?.subItems ? "#" : item.link}
              onClick={() => toggleSubMenu(index)}
              className={`${
                themeColorProvider === "#ffff"
                  ? "dark:text-black"
                  : "dark:text-white"
              } flex items-center p-2 hover:bg-gray-200 my-1 rounded cursor-pointer transition-all duration-200`}
              style={{ backgroundColor: themeColorProvider }}
            >
              {item.icon}
              {!isCollapsed && <span className="ml-3">{item.title}</span>}
            </Link>
            {!isCollapsed && activeMenu === index && item.subItems && (
              <div className="pl-8 mt-2 space-y-1">
                {item.subItems.map((subItem, subIndex) => (
                  <NavLink
                    to={subItem.link}
                    key={subIndex}
                    className={({ isActive }) =>
                      `${
                        themeColorProvider === "#ffff"
                          ? "dark:text-black"
                          : "dark:text-white"
                      } flex items-center p-2 hover:bg-gray-200 rounded cursor-pointer transition-all duration-200 ${
                        isActive ? "bg-gray-300" : ""
                      }`
                    }
                    style={({ isActive }) =>
                      isActive ? {} : { backgroundColor: themeColorProvider }
                    }
                  >
                    {subItem.icon}
                    <span className="ml-3">{subItem.title}</span>
                  </NavLink>
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
        title: "Admission Form",
        icon: <UserPlus className="w-4 h-4" />,
        link: "/students/admission-form",
      },
      {
        title: "Mark Attendance",
        icon: <ClipboardList className="w-4 h-4" />,
        link: "/students/attendance",
      },
      {
        title: "View Attendance",
        icon: <Table className="w-4 h-4" />,
        link: "/students/view-attendance",
      },
    ],
  },
  {
    title: "Teachers",
    icon: <Users className="w-5 h-5" />,
    link: "/teachers",
    subItems: [
      {
        title: "Joining Form",
        icon: <UserPlus className="w-4 h-4" />,
        link: "/teachers/joining-form",
      },
      {
        title: "Teacher List",
        icon: <User className="w-4 h-4" />,
        link: "/teachers/list",
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
    title: "Payments",
    icon: <CreditCard className="w-5 h-5" />,
    link: "/payments",
    subItems: [
      {
        title: "Student Fees",
        icon: <User className="w-4 h-4" />,
        link: "/payments/students",
      },
      {
        title: "Teacher Salaries",
        icon: <UserCheck className="w-4 h-4" />,
        link: "/payments/teachers",
      },
      {
        title: "Staff Salaries",
        icon: <Briefcase className="w-4 h-4" />,
        link: "/payments/staff",
      },
      {
        title: "Driver Payments",
        icon: <Truck className="w-4 h-4" />,
        link: "/payments/drivers",
      },
      {
        title: "Fee Structure",
        icon: <FileText className="w-4 h-4" />,
        link: "/payments/fee-structure",
      },
    ],
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
