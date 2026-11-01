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
  // "Transport" is stored as-is from the expense form
  TRANSPORT: { color: "#8b5cf6", label: "Transport" },
  TRAVEL: { color: "#8b5cf6", label: "Travel" },
  SHOPPING: { color: "#ec4899", label: "Shopping" },
  ENTERTAINMENT: { color: "#22c55e", label: "Entertainment" },
  BILLS: { color: "#ef4444", label: "Bills" },
  HEALTH: { color: "#06b6d4", label: "Health" },
  EDUCATION: { color: "#eab308", label: "Education" },
  GIFT: { color: "#f43f5e", label: "Gift" },
  OTHER: { color: "#6b7280", label: "Other" },
};

const DEFAULT_COLOR = "#94a3b8";

export function CategoryBreakdown({ data, isLoading }: Props) {
  const total = data?.reduce((sum, item) => sum + item.total, 0) ?? 0;

  const chartData = data?.map((item) => {
    // Normalize to uppercase so "Food", "FOOD", "food" all hit the same key
    const key = item.category.toUpperCase();
    return {
      name: CATEGORY_CONFIG[key]?.label ?? item.category,
      value: item.total,
      color: CATEGORY_CONFIG[key]?.color ?? DEFAULT_COLOR,
    };
  });

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
          <div className="flex flex-col items-center gap-4">
            <div className="h-[180px] w-[180px] animate-pulse rounded-full bg-gray-100" />
            <div className="w-full space-y-2">
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
          <div className="flex flex-col items-center gap-4">
            {/* Donut chart — centred, same size as income-page-content */}
            <div className="h-[180px] w-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={78}
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

            {/* Legend — full-width below the chart */}
            <div className="w-full space-y-2">
              {chartData.map((category) => {
                const percentage = ((category.value / total) * 100).toFixed(1);
                return (
                  <div
                    key={category.name}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-gray-600">{category.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-gray-900">
                        ₹{category.value.toLocaleString("en-IN")}
                      </span>
                      <span className="w-10 text-right text-xs text-gray-400">
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
