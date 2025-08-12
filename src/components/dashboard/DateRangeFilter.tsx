// src/components/dashboard/DateRangeFilter.tsx
import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Calendar } from "lucide-react";

const DateRangeFilter: React.FC = () => {
  const { applyDateFilter, dateRange } = useApp();
  const [startDate, setStartDate] = useState<string>(dateRange.start || "");
  const [endDate, setEndDate] = useState<string>(dateRange.end || "");

  const handleApplyFilter = (): void => {
    if (startDate && endDate) {
      applyDateFilter(startDate, endDate);
    }
  };

  const handleReset = (): void => {
    setStartDate("");
    setEndDate("");
    applyDateFilter("", "");
  };

  return (
    <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm">
      <Calendar className="h-5 w-5 text-gray-400" />

      <div className="flex items-center space-x-2">
        <label className="text-sm font-medium text-gray-700">From:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div className="flex items-center space-x-2">
        <label className="text-sm font-medium text-gray-700">To:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div className="flex space-x-2">
        <button
          onClick={handleApplyFilter}
          disabled={!startDate || !endDate}
          className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Apply
        </button>

        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default DateRangeFilter;
