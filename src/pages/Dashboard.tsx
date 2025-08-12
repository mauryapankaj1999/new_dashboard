import React from "react";
import { useApp } from "../context/AppContext";
import StatsCards from "../components/dashboard/StatsCards";
import AnalyticsChart from "../components/dashboard/AnalyticsChart";
import PartnershipsOverview from "../components/dashboard/PartnershipsOverview";
import DateRangeFilter from "../components/dashboard/DateRangeFilter";
import MetricSelector from "../components/dashboard/MetricSelector";

const Dashboard = () => {
  const { loading } = useApp();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          {/* <p className="text-gray-600">Welcome to your admin dashboard</p> */}
        </div>
        <DateRangeFilter />
      </div>

      {/* Stats Cards */}
      <StatsCards />

      <PartnershipsOverview />

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Performance Analytics
          </h2>
          <MetricSelector />
        </div>
        <AnalyticsChart />
      </div>
    </div>
  );
};

export default Dashboard;
