import { TeacherStaffSalaryTable } from "@/components/dashboard/TeacherStaffSalaryTable";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { useGetAllTeacherFeesQuery } from "@/redux/features/api/feeApi";
import React from "react";
import { Link } from "react-router";

const TeacherSalaryList = () => {
  //& ************ 👇 Start Teacher Salary Get API 👇 ****************
  const { data: teacherSalaryDetails } = useGetAllTeacherFeesQuery();

  return (
    <div className="container mx-auto max-w-7xl">
      <Card className="mt-6 p-4">
        {/* Teacher Salary History List */}
        <div>
          <TeacherStaffSalaryTable
            title="Salary Payment History"
            salaryDetails={teacherSalaryDetails}
          />
        </div>

        {/* Pay Teacher Salary Button */}
        <CardTitle className="mt-4 text-center">
          <Link to="/payments/teachers">
            <Button className="cursor-pointer">Pay Teacher Salary</Button>
          </Link>
        </CardTitle>
      </Card>
    </div>
  );
};

export default TeacherSalaryList;
