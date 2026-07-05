import { analyticsService } from "@/lib/api/services/analyticsService";
import { useQuery } from "@tanstack/react-query";
export const analyticsKeys = {
  all: ["analytics"] as const, // invalidate everything analytics
  dashboard: (month: number, year: number) =>
    ["analytics", "dashboard", month, year] as const,
  expenses: (month: number, year: number) =>
    ["analytics", "expenses", month, year] as const,
  income: (year: number) => ["analytics", "income", year] as const,
  reports: (year: number, page: number, limit: number) =>
    ["analytics", "reports", year, page, limit] as const,
};
export interface DashboardResult {
  totalBalance: number;
  currentMonth: {
    income: number;
    expenses: number;
    savings: number;
  };
  changes: {
    income: number; // % vs last month — positive = up, negative = down
    expenses: number;
    savings: number;
    balance: number;
  };
  monthlyChart: { month: number; income: number; expenses: number }[];
  spendingByCategory: { category: string; total: number }[];
}
export function useDashboard(month: number, year: number) {
  return useQuery({
    queryKey: analyticsKeys.dashboard(month, year),
    queryFn: async () => {
      const res = await analyticsService.getDashboard(month, year);
      return res.data.result as DashboardResult;
    },
  });
}
