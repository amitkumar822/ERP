import ClassManagement from "@/pages/dashboard/academics/ClassManagement";
import Syllabus from "@/pages/dashboard/academics/Syllabus";
import TimeTable from "@/pages/dashboard/academics/TimeTable";
import Dashboard from "@/pages/dashboard/Dashboard";
import Library from "@/pages/dashboard/library/Library";
import MainDashboard from "@/pages/dashboard/MainDashboard";
import Settings from "@/pages/dashboard/settings/Settings";
import AddStudentForm from "@/pages/dashboard/student/AddStudentForm";
import AttendancePage from "@/pages/dashboard/student/AttendancePage";
import StudentList from "@/pages/dashboard/student/StudentsList";
import AddTeacher from "@/pages/dashboard/teacher/AddTeacherPage";
import TeachersList from "@/pages/dashboard/teacher/TeachersList";
import Transport from "@/pages/dashboard/transport/Transport";
import NotFound from "@/pages/NotFound";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainDashboard />}>
      <Route path="" element={<Dashboard />} />
      <Route path="dashboard" element={<Dashboard />} />

      {/* Students Routes */}
      <Route path="students/list" element={<StudentList />} />
      <Route path="students/add" element={<AddStudentForm />} />
      <Route path="students/attendance" element={<AttendancePage />} />

      {/* Teachers Routes */}
        <Route path="teachers/list" element={<TeachersList />} />
        <Route path="teachers/add" element={<AddTeacher />} />

      {/* Academics Routes */}
        <Route path="academics/classes" element={<ClassManagement />} />
        <Route path="academics/timetable" element={<TimeTable />} />
        <Route path="academics/syllabus" element={<Syllabus />} />

      {/* Other Routes */}
      <Route path="transport" element={<Transport />} />
      <Route path="library" element={<Library />} />
      <Route path="settings" element={<Settings />} />
      {/* <Route path="help" element={<Help />} /> */}

      
      {/* Error Page */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export { router };
