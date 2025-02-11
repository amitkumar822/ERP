import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from "recharts";
import { Bar as BarJs, Line as LineJs, Pie as PieJs } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartJsTooltip,
  Legend as ChartJsLegend,
  PointElement,
  LineElement,
  ArcElement,
} from "chart.js";
import {
  Users,
  BookOpen,
  DollarSign,
  ClipboardList,
  Award,
  Mail,
  UserPlus,
  UserCheck,
  UserX,
} from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartJsTooltip,
  ChartJsLegend,
  PointElement,
  LineElement,
  ArcElement
);

const Dashboard = () => {
  // Recharts Pie Chart Data
  const courseDistributionData = [
    { name: "Commerce", value: 400 },
    { name: "Science", value: 300 },
    { name: "Arts", value: 300 },
    { name: "Mechanical", value: 200 },
  ];
  const COLORS = ["#3B82F6", "#6366F1", "#F59E0B", "#10B981"];

  // Chart.js Data
  const studentEnrollmentData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Enrollment",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "De-enrollment",
        data: [10, 15, 20, 25, 30, 35, 40],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const earningsVsLossesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Earnings",
        data: [12000, 19000, 3000, 5000, 2000, 3000, 4500],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        label: "Losses",
        data: [2000, 3000, 4000, 1000, 5000, 2000, 3000],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  const attendanceData = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        label: "Attendance",
        data: [85, 15],
        backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  // New Students List Data
  const newStudents = [
    { id: 1, name: "Jack Roman", date: "01 August 2023", status: "Admitted", subject: "Commerce" },
    { id: 2, name: "Jimmy Morris", date: "31 July 2023", status: "Admitted", subject: "Mechanical" },
    { id: 3, name: "Nasrida Martines", date: "30 July 2023", status: "Admitted", subject: "Science" },
  ];

  // Teachers List Data
  const teachers = [
    { id: 1, name: "Alli Satuou", subject: "Commerce" },
    { id: 2, name: "Angelica Ramos", subject: "Mechanical" },
    { id: 3, name: "Aashon Cox", subject: "Science" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Total Students", value: "3,280", icon: <Users className="text-blue-500" /> },
          { title: "New Students", value: "245", icon: <UserPlus className="text-purple-500" /> },
          { title: "Total Courses", value: "28", icon: <ClipboardList className="text-orange-500" /> },
          { title: "Fees Collection", value: "$25,160", icon: <DollarSign className="text-green-500" /> },
        ].map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm flex items-center justify-between">
            <div>
              <p className="text-gray-500">{item.title}</p>
              <p className="text-3xl font-bold">{item.value}</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">{item.icon}</div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Student Enrollment Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Student Enrollment & De-enrollment</h2>
          <BarJs data={studentEnrollmentData} />
        </div>

        {/* Earnings vs Losses Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Earnings vs Losses</h2>
          <LineJs data={earningsVsLossesData} />
        </div>

        {/* Attendance Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Attendance Overview</h2>
          <PieJs data={attendanceData} />
        </div>

        {/* Course Distribution Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Course Distribution</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={courseDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {courseDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* New Students List */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">New Students (Admissions)</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Date</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Subject</th>
                </tr>
              </thead>
              <tbody>
                {newStudents.map((student) => (
                  <tr key={student.id}>
                    <td className="p-2">{student.name}</td>
                    <td className="p-2">{student.date}</td>
                    <td className="p-2">{student.status}</td>
                    <td className="p-2">{student.subject}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Teachers List */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Teachers</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Subject</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher) => (
                  <tr key={teacher.id}>
                    <td className="p-2">{teacher.name}</td>
                    <td className="p-2">{teacher.subject}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;