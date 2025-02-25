import React from "react";
import { Input } from "../ui/input";
import { classNames } from "@/helpers/classNames";
import { sections } from "@/helpers/sections";

const ClassSectionAcademicYear = ({
  selectedDate,
  setSelectedDate,
  fetchFormData,
  setFormFetchData,
}) => {
  const handleChange = (e) => {
    setFormFetchData({ ...fetchFormData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block font-medium mb-1">Select Class:</label>
          <select
            name="className"
            value={fetchFormData.className}
            onChange={handleChange}
            className="border rounded p-2 w-full dark:bg-gray-800 dark:text-white"
          >
            <option value="">Select class</option>
            {classNames.map((cls, index) => (
              <option value={cls} key={index}>
                {cls}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Select Section:</label>
          <select
            name="section"
            value={fetchFormData.section}
            onChange={handleChange}
            className="border rounded p-2 w-full dark:bg-gray-800 dark:text-white"
          >
            <option value="">Select section</option>
            {sections.map((section, index) => (
              <option value={section} key={index}>
                {section}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Academic Year</label>
          <select
            name="academicYear"
            value={fetchFormData.academicYear}
            onChange={handleChange}
            className="border rounded p-2 w-full dark:bg-gray-800 dark:text-white"
          >
            <option value="">Select year</option>
            <option value="2024-2025">2024-2025</option>
            <option value="2025-2026">2025-2026</option>
            <option value="2026-2027">2026-2027</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Select Date:</label>
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            required
            className="w-full dark:bg-gray-800 dark:text-white cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default ClassSectionAcademicYear;
