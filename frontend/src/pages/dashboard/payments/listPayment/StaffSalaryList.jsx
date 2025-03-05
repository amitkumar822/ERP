import { TeacherStaffSalaryTable } from "@/components/dashboard/TeacherStaffSalaryTable";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { useGetAllStaffFeesQuery } from "@/redux/features/api/feeApi";
import React from "react";
import { Link } from "react-router";

const StaffSalaryList = () => {
  //& ************ 👇 Start Teacher Salary Get API 👇 ****************
  const { data: staffSalaryDetails } = useGetAllStaffFeesQuery();

  return (
    <div className="container mx-auto max-w-7xl">
      <Card className="mt-6 p-4">
        {/* Teacher Salary History List */}
        <div>
          <TeacherStaffSalaryTable
            title="Staff Salary Payment History"
            salaryDetails={staffSalaryDetails}
          />
        </div>

        {/* Pay Teacher Salary Button */}
        <CardTitle className="mt-4 text-center">
          <Link to="/payments/staff">
            <Button className="lg:w-1/4 md:w-1/2  w-full mt-4 cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white px-6 py-2 rounded-lg shadow-lg">
              Pay Staff Salary
            </Button>
          </Link>
        </CardTitle>
      </Card>
    </div>
  );
};

export default StaffSalaryList;
