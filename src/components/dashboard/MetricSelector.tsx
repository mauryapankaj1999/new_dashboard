// src/components/dashboard/MetricSelector.tsx
import React from "react";
import { useApp } from "../../context/AppContext";
import { MetricType } from "../../types";

interface MetricOption {
  value: MetricType;
  label: string;
  color: string;
}

const MetricSelector: React.FC = () => {
  const { selectedMetric, setSelectedMetric } = useApp();

  const metrics: MetricOption[] = [
    { value: "clicks", label: "Clicks", color: "blue" },
    { value: "dpvs", label: "Detail Page Views", color: "green" },
    { value: "atcs", label: "Add to Carts", color: "yellow" },
    { value: "conversions", label: "Conversions ($)", color: "red" },
    { value: "sales", label: "Sales ($)", color: "purple" },
    { value: "commission", label: "Commission ($)", color: "cyan" },
  ];

  const handleMetricChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setSelectedMetric(event.target.value as MetricType);
  };

  return (
    <div className="flex items-center space-x-2">
      <label className="text-sm font-medium text-gray-700">Metric:</label>
      <select
        value={selectedMetric}
        onChange={handleMetricChange}
        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
      >
        {metrics.map((metric) => (
          <option key={metric.value} value={metric.value}>
            {metric.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MetricSelector;
