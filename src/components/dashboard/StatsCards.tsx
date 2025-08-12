// src/components/dashboard/StatsCards.tsx
import React from "react";
import { useApp } from "../../context/AppContext";
import {
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  DollarSign,
  Eye,
} from "lucide-react";
import { StatCard } from "../../types";

const StatsCards: React.FC = () => {
  const { analyticsData } = useApp();

  const stats: StatCard[] = [
    {
      name: "Total Clicks",
      value: analyticsData?.clicks?.toLocaleString() || "0",
      change: "+12.5%",
      changeType: "increase",
      icon: Eye,
      color: "blue",
    },
    {
      name: "Page Views",
      value: analyticsData?.dpvs?.toLocaleString() || "0",
      change: "+8.2%",
      changeType: "increase",
      icon: Users,
      color: "green",
    },
    {
      name: "Add to Carts",
      value: analyticsData?.atcs?.toLocaleString() || "0",
      change: "+15.3%",
      changeType: "increase",
      icon: ShoppingCart,
      color: "yellow",
    },
    {
      name: "Sales Commission",
      value: `$${analyticsData?.salesCommission?.toLocaleString() || "0"}`,
      change: "-2.1%",
      changeType: "decrease",
      icon: DollarSign,
      color: "red",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {stat.value}
              </p>
            </div>
            <div className={`p-3 rounded-md bg-${stat.color}-100`}>
              <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
            </div>
          </div>

          <div className="mt-4 flex items-center">
            {stat.changeType === "increase" ? (
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
            )}
            <span
              className={`text-sm font-medium ${
                stat.changeType === "increase"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {stat.change}
            </span>
            <span className="text-sm text-gray-500 ml-2">vs last month</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
