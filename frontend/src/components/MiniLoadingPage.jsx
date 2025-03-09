import React from "react";

export const MiniLoadingPage = () => {
  return (
    <div className="inset-0 flex items-center justify-center bg-[rgba(4,2,2,0.1)] rounded-lg z-50">
      <div>
        <div className="flex flex-col items-center justify-center h-screen space-y-6">
          {/* Animated SVG Pulse */}
          <svg
            className="w-20 h-20 text-blue-500 animate-spin"
            viewBox="0 0 50 50"
          >
            <circle
              className="opacity-25"
              cx="25"
              cy="25"
              r="20"
              stroke="currentColor"
              strokeWidth="5"
              fill="none"
            ></circle>
            <circle
              className="opacity-75"
              cx="25"
              cy="25"
              r="20"
              stroke="currentColor"
              strokeWidth="5"
              fill="none"
              strokeDasharray="31.4 31.4"
              strokeLinecap="round"
            ></circle>
          </svg>

          {/* Loading Text */}
          <p className="text-lg font-semibold text-white bg-[green] px-4 py-2 rounded-full animate-pulse">
            Fetching data... Please wait!
          </p>
        </div>
      </div>
    </div>
  );
};
