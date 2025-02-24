import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const NoRecordFound = ({ message, date, className, section, academicYear }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center text-center p-6 -mt-4"
    >
      {/* Animated SVG */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-40 h-40 text-gray-500"
        initial={{ y: -10 }}
        animate={{ y: 10 }}
        transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="9" y1="9" x2="15" y2="15" />
        <line x1="15" y1="9" x2="9" y2="15" />
      </motion.svg>

      {/* Bouncing Alert Icon */}
      <motion.div
        initial={{ y: -5 }}
        animate={{ y: 5 }}
        transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
        className="text-red-500 mt-4"
      >
        <AlertTriangle className="w-12 h-12" />
      </motion.div>

      {/* "No Records Found" Text */}
      <h2 className="text-3xl font-semibold text-gray-800 mt-4">
        No {message} Records Found
      </h2>

      {/* Dynamic Details */}
      <p className="text-gray-600 mt-2">
        No records found for <span className="font-semibold">{date}</span> in{" "}
        <span className="font-semibold">{className}</span> -{" "}
        <span className="font-semibold">{section}</span> (
        <span className="font-semibold">{academicYear}</span>).
      </p>
    </motion.div>
  );
};

export default NoRecordFound;
