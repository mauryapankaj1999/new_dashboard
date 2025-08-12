// src/types/index.ts
export interface Partnership {
  activeBrands: number;
  invitedBrands: number;
  activeChange: number;
  invitedChange: number;
  totalRevenue: number;
  monthlyGrowth: number;
}

export interface Analytics {
  clicks: number;
  dpvs: number;
  atcs: number;
  salesCommission: number;
  conversionRate: number;
  earningsPerClick: number;
  totalSales: number;
  averageOrderValue: number;
}

export interface ChartDataPoint {
  month: string;
  clicks: number;
  dpvs: number;
  atcs: number;
  conversions: number;
  sales: number;
  commission: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  rating: number;
  sales: number;
  image?: string;
  description?: string;
}

export interface DateRange {
  start: string;
  end: string;
}

export type MetricType =
  | "clicks"
  | "dpvs"
  | "atcs"
  | "conversions"
  | "sales"
  | "commission";

export interface MetricConfig {
  dataKey: MetricType;
  color: string;
  name: string;
}

export interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: {
    name: string;
    href: string;
  }[];
}

export interface StatCard {
  name: string;
  value: string;
  change: string;
  changeType: "increase" | "decrease";
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export interface AppContextType {
  loading: boolean;
  partnershipsData: Partnership | null;
  analyticsData: Analytics | null;
  chartData: ChartDataPoint[];
  products: Product[];
  filteredProducts: Product[];
  selectedMetric: MetricType;
  dateRange: DateRange;
  setSelectedMetric: (metric: MetricType) => void;
  filterProducts: (searchTerm: string, category: string) => void;
  applyDateFilter: (startDate: string, endDate: string) => void;
  loadPartnershipsData: () => Promise<void>;
  loadAnalyticsData: (startDate?: string, endDate?: string) => Promise<void>;
  loadChartData: () => Promise<void>;
  loadProducts: () => Promise<void>;
}
