import TeacherSalariesHistory from "@/components/dashboard/teacher/TeacherSalariesHistory";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import React from "react";
import { Link } from "react-router";

const TeacherSalaryList = () => {
  return (
    <div className="container mx-auto max-w-8xl">
      <Card className="mt-6 p-4">
        {/* Teacher Salaries History */}
        <TeacherSalariesHistory />

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
