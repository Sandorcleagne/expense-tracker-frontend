"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardResult } from "@/hooks/useAnalytics";

interface Props {
  data: DashboardResult["spendingByCategory"] | undefined;
  isLoading: boolean;
}

const CATEGORY_CONFIG: Record<string, { color: string; label: string }> = {
  FOOD: { color: "#f97316", label: "Food" },
  RENT: { color: "#3b82f6", label: "Rent" },
  TRAVEL: { color: "#8b5cf6", label: "Travel" },
  SHOPPING: { color: "#ec4899", label: "Shopping" },
  ENTERTAINMENT: { color: "#22c55e", label: "Entertainment" },
  BILLS: { color: "#ef4444", label: "Bills" },
  HEALTH: { color: "#06b6d4", label: "Health" },
  GIFT: { color: "#f43f5e", label: "Gift" },
  OTHER: { color: "#6b7280", label: "Other" },
};

const DEFAULT_COLOR = "#94a3b8";

export function CategoryBreakdown({ data, isLoading }: Props) {
  const total = data?.reduce((sum, item) => sum + item.total, 0) ?? 0;

  // API gives: { category: "RENT", total: 15000 }
  // JSX needs: { name: "Rent", value: 15000, color: "#3b82f6" }
  // Same shape as your original categoryData — only the source changes
  const chartData = data?.map((item) => ({
    name: CATEGORY_CONFIG[item.category]?.label ?? item.category,
    value: item.total,
    color: CATEGORY_CONFIG[item.category]?.color ?? DEFAULT_COLOR,
  }));

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold text-gray-900">
            Spending by Category
          </CardTitle>
          <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
            This Month
          </span>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <div className="h-[200px] w-[200px] shrink-0 animate-pulse rounded-full bg-gray-100" />
            <div className="flex-1 space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="h-3 w-24 animate-pulse rounded bg-gray-100" />
                  <div className="h-3 w-16 animate-pulse rounded bg-gray-100" />
                </div>
              ))}
            </div>
          </div>
        ) : !chartData || chartData.length === 0 ? (
          <div className="flex h-[200px] items-center justify-center text-sm text-gray-400">
            No expenses this month
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            {/* Donut chart — structure identical to your original */}
            <div className="h-[200px] w-[200px] shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      fontSize: "13px",
                    }}
                    formatter={(value) => [
                      `₹${Number(value).toLocaleString("en-IN")}`,
                      undefined,
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend — structure identical to your original */}
            <div className="flex-1 space-y-3">
              {chartData.map((category) => {
                const percentage = ((category.value / total) * 100).toFixed(1);
                return (
                  <div
                    key={category.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-sm text-gray-600">
                        {category.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-900">
                        ₹{category.value.toLocaleString("en-IN")}
                      </span>
                      <span className="w-12 text-right text-xs text-gray-400">
                        {percentage}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
