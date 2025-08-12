// src/context/AppContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios, { AxiosResponse } from "axios";
import {
  AppContextType,
  Partnership,
  Analytics,
  ChartDataPoint,
  Product,
  DateRange,
  MetricType,
} from "../types";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [partnershipsData, setPartnershipsData] = useState<Partnership | null>(
    null
  );
  const [analyticsData, setAnalyticsData] = useState<Analytics | null>(null);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedMetric, setSelectedMetric] = useState<MetricType>("clicks");
  const [dateRange, setDateRange] = useState<DateRange>({ start: "", end: "" });

  const API_BASE =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";

  const isProduction = process.env.NODE_ENV === "production";

  const loadPartnershipsData = async (): Promise<void> => {
    setLoading(true);
    try {
      const response: AxiosResponse<Partnership> = await axios.get(
        `${API_BASE}/partnerships`
      );
      setPartnershipsData(response.data);
    } catch (error) {
      console.error("Failed to load partnerships data:", error);
      const mockData: Partnership = {
        activeBrands: 156,
        invitedBrands: 89,
        activeChange: 12.5,
        invitedChange: -3.2,
        totalRevenue: 245800,
        monthlyGrowth: 18.6,
      };
      setPartnershipsData(mockData);
    } finally {
      setLoading(false);
    }
  };

  const loadAnalyticsData = async (
    startDate?: string,
    endDate?: string
  ): Promise<void> => {
    setLoading(true);
    try {
      const params =
        startDate && endDate ? `?start=${startDate}&end=${endDate}` : "";
      const response: AxiosResponse<Analytics> = await axios.get(
        `${API_BASE}/analytics${params}`
      );
      setAnalyticsData(response.data);
    } catch (error) {
      console.error("Failed to load analytics data:", error);
      const mockAnalytics: Analytics = {
        clicks: 45230,
        dpvs: 32450,
        atcs: 8950,
        salesCommission: 12500.75,
        conversionRate: 19.8,
        earningsPerClick: 2.85,
        totalSales: 98750.5,
        averageOrderValue: 127.85,
      };
      setAnalyticsData(mockAnalytics);
    } finally {
      setLoading(false);
    }
  };

  const loadChartData = async (): Promise<void> => {
    setLoading(true);
    try {
      const response: AxiosResponse<ChartDataPoint[]> = await axios.get(
        `${API_BASE}/chartData`
      );
      setChartData(response.data);
    } catch (error) {
      console.error("Failed to load chart data:", error);
      const mockChartData: ChartDataPoint[] = [
        {
          month: "Jan",
          clicks: 12000,
          dpvs: 8500,
          atcs: 2100,
          conversions: 420,
          sales: 15600,
          commission: 2340,
        },
        {
          month: "Feb",
          clicks: 15200,
          dpvs: 11200,
          atcs: 2800,
          conversions: 560,
          sales: 21840,
          commission: 3276,
        },
        {
          month: "Mar",
          clicks: 18500,
          dpvs: 13800,
          atcs: 3450,
          conversions: 690,
          sales: 26910,
          commission: 4037,
        },
        {
          month: "Apr",
          clicks: 16800,
          dpvs: 12600,
          atcs: 3150,
          conversions: 630,
          sales: 24570,
          commission: 3686,
        },
        {
          month: "May",
          clicks: 22100,
          dpvs: 16400,
          atcs: 4100,
          conversions: 820,
          sales: 31980,
          commission: 4797,
        },
        {
          month: "Jun",
          clicks: 25600,
          dpvs: 19200,
          atcs: 4800,
          conversions: 960,
          sales: 37440,
          commission: 5616,
        },
        {
          month: "Jul",
          clicks: 28900,
          dpvs: 21700,
          atcs: 5425,
          conversions: 1085,
          sales: 42330,
          commission: 6350,
        },
      ];
      setChartData(mockChartData);
    } finally {
      setLoading(false);
    }
  };

  const loadProducts = async (): Promise<void> => {
    setLoading(true);
    try {
      const response: AxiosResponse<Product[]> = await axios.get(
        `${API_BASE}/products`
      );
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error("Failed to load products:", error);
      const mockProducts: Product[] = [
        {
          id: 1,
          name: "Premium Wireless Headphones",
          price: 199.99,
          category: "Electronics",
          stock: 45,
          status: "In Stock",
          rating: 4.5,
          sales: 234,
          image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop",
          description:
            "High-quality wireless headphones with active noise cancellation",
        },
        {
          id: 2,
          name: "Smart Fitness Watch",
          price: 299.99,
          category: "Wearables",
          stock: 23,
          status: "Low Stock",
          rating: 4.2,
          sales: 189,
          image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop",
          description: "Advanced fitness tracking with heart rate monitoring",
        },
      ];
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = (searchTerm: string, category: string): void => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category && category !== "All") {
      filtered = filtered.filter((product) => product.category === category);
    }

    setFilteredProducts(filtered);
  };

  const applyDateFilter = (startDate: string, endDate: string): void => {
    setDateRange({ start: startDate, end: endDate });
    loadAnalyticsData(startDate, endDate);
  };

  useEffect(() => {
    loadPartnershipsData();
    loadAnalyticsData();
    loadChartData();
    loadProducts();
  }, []);

  const value: AppContextType = {
    loading,
    partnershipsData,
    analyticsData,
    chartData,
    products,
    filteredProducts,
    selectedMetric,
    dateRange,
    setSelectedMetric,
    filterProducts,
    applyDateFilter,
    loadPartnershipsData,
    loadAnalyticsData,
    loadChartData,
    loadProducts,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
