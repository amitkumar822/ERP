import { useState } from "react";
import { motion } from "framer-motion";
import { BusFront, MapPin, User, AlertTriangle, CheckCircle } from "lucide-react";

const Transport = () => {
  // Dummy Data for Transport System
  const [routes] = useState([
    {
      id: 1,
      routeName: "Route A - Downtown to School",
      busNumber: "MH-12-3456",
      driver: "John Doe",
      capacity: 50,
      occupied: 40,
      status: "Active",
    },
    {
      id: 2,
      routeName: "Route B - North Avenue to School",
      busNumber: "MH-45-6789",
      driver: "Jane Smith",
      capacity: 45,
      occupied: 30,
      status: "In Maintenance",
    },
    {
      id: 3,
      routeName: "Route C - West Park to School",
      busNumber: "MH-98-1234",
      driver: "Robert Johnson",
      capacity: 60,
      occupied: 50,
      status: "Active",
    },
  ]);

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      {/* Page Header */}
      <motion.h1
        className="text-3xl font-bold text-gray-800 dark:text-white mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🚌 Transport Management
      </motion.h1>

      {/* Transport Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {routes.map((route) => (
          <motion.div
            key={route.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 border-l-4 border-blue-500"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 * route.id }}
          >
            {/* Bus & Route Details */}
            <div className="flex items-center gap-3 mb-4">
              <BusFront className="w-8 h-8 text-blue-500" />
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {route.routeName}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Bus: <strong>{route.busNumber}</strong>
                </p>
              </div>
            </div>

            {/* Driver & Capacity */}
            <div className="flex justify-between text-gray-700 dark:text-gray-300 mb-3">
              <p className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-400" /> Driver: {route.driver}
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-400" /> Capacity: {route.occupied}/{route.capacity}
              </p>
            </div>

            {/* Status */}
            <div className="flex items-center justify-between">
              <span
                className={`px-3 py-1 text-sm font-semibold rounded-lg ${
                  route.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {route.status === "Active" ? (
                  <CheckCircle className="w-4 h-4 inline-block mr-1" />
                ) : (
                  <AlertTriangle className="w-4 h-4 inline-block mr-1" />
                )}
                {route.status}
              </span>

              <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition">
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Transport;
