// src/components/dashboard/AnalyticsChart.tsx
import React from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useApp } from "../../context/AppContext";
import { MetricConfig } from "../../types";

const AnalyticsChart: React.FC = () => {
  const { chartData, selectedMetric } = useApp();

  const getMetricConfig = (): MetricConfig => {
    switch (selectedMetric) {
      case "clicks":
        return { dataKey: "clicks", color: "#3b82f6", name: "Clicks" };
      case "dpvs":
        return { dataKey: "dpvs", color: "#10b981", name: "Detail Page Views" };
      case "atcs":
        return { dataKey: "atcs", color: "#f59e0b", name: "Add to Carts" };
      case "conversions":
        return {
          dataKey: "conversions",
          color: "#ef4444",
          name: "Conversions ($)",
        };
      case "sales":
        return { dataKey: "sales", color: "#8b5cf6", name: "Sales ($)" };
      case "commission":
        return {
          dataKey: "commission",
          color: "#06b6d4",
          name: "Commission ($)",
        };
      default:
        return { dataKey: "clicks", color: "#3b82f6", name: "Clicks" };
    }
  };

  const metricConfig = getMetricConfig();

  const formatTooltipValue = (value: number | string): string => {
    const numValue = typeof value === "string" ? parseFloat(value) : value;
    const isMonetary = ["conversions", "sales", "commission"].includes(
      selectedMetric
    );
    return isMonetary
      ? `$${numValue.toLocaleString()}`
      : numValue.toLocaleString();
  };

  return (
    <div className="space-y-6">
      {/* Line Chart */}
      <div className="bg-white p-4 rounded-lg border">
        <h3 className="text-lg font-medium mb-4">
          Trend Analysis - {metricConfig.name}
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              formatter={(value) => [
                formatTooltipValue(value as number),
                metricConfig.name,
              ]}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey={metricConfig.dataKey}
              stroke={metricConfig.color}
              strokeWidth={2}
              dot={{ fill: metricConfig.color, strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-4 rounded-lg border">
        <h3 className="text-lg font-medium mb-4">
          Monthly Comparison - {metricConfig.name}
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              formatter={(value) => [
                formatTooltipValue(value as number),
                metricConfig.name,
              ]}
            />
            <Legend />
            <Bar dataKey={metricConfig.dataKey} fill={metricConfig.color} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Area Chart */}
      <div className="bg-white p-4 rounded-lg border">
        <h3 className="text-lg font-medium mb-4">
          Cumulative Growth - {metricConfig.name}
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              formatter={(value) => [
                formatTooltipValue(value as number),
                metricConfig.name,
              ]}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey={metricConfig.dataKey}
              stroke={metricConfig.color}
              fill={metricConfig.color}
              fillOpacity={0.6}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsChart;
