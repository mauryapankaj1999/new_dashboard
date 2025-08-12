// src/components/dashboard/PartnershipsOverview.tsx
import React from "react";
import { useApp } from "../../context/AppContext";
import { Users, UserPlus, TrendingUp, TrendingDown } from "lucide-react";

const PartnershipsOverview: React.FC = () => {
  const { partnershipsData } = useApp();

  if (!partnershipsData) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Active Brands Card */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Active Brands</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {partnershipsData.activeBrands}
            </p>
          </div>
          <div className="p-3 bg-green-100 rounded-md">
            <Users className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="mt-4 flex items-center">
          {partnershipsData.activeChange >= 0 ? (
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
          )}
          <span
            className={`text-sm font-medium ${
              partnershipsData.activeChange >= 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {partnershipsData.activeChange > 0 ? "+" : ""}
            {partnershipsData.activeChange}%
          </span>
          <span className="text-sm text-gray-500 ml-2">vs last month</span>
        </div>

        <div className="mt-4 bg-gray-50 rounded-md p-3">
          <p className="text-sm text-gray-600">
            Strong partnership growth with consistent brand engagement
          </p>
        </div>
      </div>

      {/* Invited Brands Card */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Invited Brands</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {partnershipsData.invitedBrands}
            </p>
          </div>
          <div className="p-3 bg-blue-100 rounded-md">
            <UserPlus className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="mt-4 flex items-center">
          {partnershipsData.invitedChange >= 0 ? (
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
          )}
          <span
            className={`text-sm font-medium ${
              partnershipsData.invitedChange >= 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {partnershipsData.invitedChange > 0 ? "+" : ""}
            {partnershipsData.invitedChange}%
          </span>
          <span className="text-sm text-gray-500 ml-2">vs last month</span>
        </div>

        <div className="mt-4 bg-gray-50 rounded-md p-3">
          <p className="text-sm text-gray-600">
            Pending partnerships awaiting activation and onboarding
          </p>
        </div>
      </div>
    </div>
  );
};

export default PartnershipsOverview;
