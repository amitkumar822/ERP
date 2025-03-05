import ClassManagement from "@/pages/dashboard/academics/ClassManagement";
import Syllabus from "@/pages/dashboard/academics/Syllabus";
import TimeTable from "@/pages/dashboard/academics/TimeTable";
import Dashboard from "@/pages/dashboard/Dashboard";
import Library from "@/pages/dashboard/library/Library";
import MainDashboard from "@/pages/dashboard/MainDashboard";
import DriverSalaryPayment from "@/pages/dashboard/payments/DriverSalaryPayment";
import FeeStructure from "@/pages/dashboard/payments/FeeStructure";
import StaffSalaryList from "@/pages/dashboard/payments/listPayment/StaffSalaryList";
import StudentFeesList from "@/pages/dashboard/payments/listPayment/StudentFeesList";
import TeacherSalaryList from "@/pages/dashboard/payments/listPayment/TeacherSalaryList";
import StaffSalary from "@/pages/dashboard/payments/StaffSalary";
import StudentFeeStructure from "@/pages/dashboard/payments/StudentFeeStructure";
import TeacherSalaries from "@/pages/dashboard/payments/TeacherSalaries";
import Settings from "@/pages/dashboard/settings/Settings";
import StaffJoiningForm from "@/pages/dashboard/staff/StaffJoiningForm";
import AdmisssionForm from "@/pages/dashboard/student/AdmisssionForm";
import AttendancePage from "@/pages/dashboard/student/AttendancePage";
import CheckAttendance from "@/pages/dashboard/student/CheckAttendance";
import StudentList from "@/pages/dashboard/student/StudentsList";
import JoiningTeacher from "@/pages/dashboard/teacher/JoiningTeacher";
import TeachersList from "@/pages/dashboard/teacher/TeachersList";
import Transport from "@/pages/dashboard/transport/Transport";
import HelpAndSupport from "@/pages/helpAndSupport/HelpAndSupport";
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
      <Route path="students/admission-form" element={<AdmisssionForm />} />
      <Route path="students/attendance" element={<AttendancePage />} />
      <Route path="students/view-attendance" element={<CheckAttendance />} />

      {/* Teachers Routes */}
      <Route path="teachers/joining-form" element={<JoiningTeacher />} />
      <Route path="teachers/list" element={<TeachersList />} />

      {/* Academics Routes */}
      <Route path="academics/classes" element={<ClassManagement />} />
      <Route path="academics/timetable" element={<TimeTable />} />
      <Route path="academics/syllabus" element={<Syllabus />} />

      {/* Other Routes */}
      <Route path="staff" element={<StaffJoiningForm />} />
      <Route path="transport" element={<Transport />} />
      <Route path="library" element={<Library />} />

      {/* Payments */}
      <Route path="payments/students" element={<StudentFeeStructure />} />
      <Route path="payments/teachers" element={<TeacherSalaries />} />
      <Route path="payments/staff" element={<StaffSalary />} />
      <Route path="payments/drivers" element={<DriverSalaryPayment />} />
      <Route path="payments/fee-structure" element={<FeeStructure />} />

      {/* Payment Recourds */}
      <Route path="payment-history/students" element={<StudentFeesList />} />
      <Route path="payment-history/teachers" element={<TeacherSalaryList />} />
      <Route path="payment-history/staff" element={<StaffSalaryList />} />

      <Route path="settings" element={<Settings />} />
      <Route path="help" element={<HelpAndSupport />} />


      {/* Error Page */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export { router };
