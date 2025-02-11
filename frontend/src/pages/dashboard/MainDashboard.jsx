import React from "react";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import StudentsList from "./student/StudentsList";
import AddStudentForm from "./student/AddStudentForm";
import AttendancePage from "./student/AttendancePage";
import TeachersList from "./teacher/TeachersList";
import ClassManagement from "./academics/ClassManagement";
import AddTeacherPage from "./teacher/AddTeacherPage";
import AddTeacher from "./teacher/AddTeacher";

const MainDashboard = () => {
  return (
    <div className="h-screen fixed w-full">
      {/* Navigation */}
      <div className="w-full py-2 bg-blue-900 text-white fixed top-0 left-0 right-0 z-50">
        Navbar
      </div>

      {/* Main Content */}
      <div className="flex gap-2 pt-10 h-full">
        {/* Sidebar (Fixed) */}
        <div>
          <Sidebar />
        </div>

        {/* Dashboard (Scrollable) */}
        <div className="flex-1 overflow-y-auto h-screen px- pb-10">
          {/* <Dashboard /> */}

          {/* <StudentsList /> */}
          {/* <AddStudentForm /> */}
          {/* <AttendancePage /> */}

          {/* <TeachersList /> */}
          {/* <AddTeacherPage /> */}

          <ClassManagement />
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
