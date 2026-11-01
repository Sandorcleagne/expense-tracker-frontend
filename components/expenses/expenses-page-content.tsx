"use client";

import {
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  ShoppingCart,
  Tag,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import ExpenseTable from "./expense-table";
import { useDashboard } from "@/hooks/useAnalytics";
import { cn } from "@/lib/utils";

// ── Constants ─────────────────────────────────────────────────────────────────

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const CATEGORY_CONFIG: Record<string, { color: string; label: string }> = {
  FOOD:          { color: "#f97316", label: "Food" },
  RENT:          { color: "#3b82f6", label: "Rent" },
  TRANSPORT:     { color: "#8b5cf6", label: "Transport" },
  TRAVEL:        { color: "#8b5cf6", label: "Travel" },
  SHOPPING:      { color: "#ec4899", label: "Shopping" },
  ENTERTAINMENT: { color: "#22c55e", label: "Entertainment" },
  BILLS:         { color: "#ef4444", label: "Bills" },
  HEALTH:        { color: "#06b6d4", label: "Health" },
  EDUCATION:     { color: "#eab308", label: "Education" },
  GIFT:          { color: "#f43f5e", label: "Gift" },
  OTHER:         { color: "#6b7280", label: "Other" },
};
const DEFAULT_COLOR = "#94a3b8";

// ── Skeleton ──────────────────────────────────────────────────────────────────

function CardSkeleton() {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="h-4 w-24 animate-pulse rounded bg-gray-100" />
            <div className="h-7 w-32 animate-pulse rounded bg-gray-100" />
          </div>
          <div className="h-10 w-10 animate-pulse rounded-lg bg-gray-100" />
        </div>
        <div className="mt-3 h-4 w-28 animate-pulse rounded bg-gray-100" />
      </CardContent>
    </Card>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export function ExpensesPageContent() {
  const now = new Date();
  const { data, isLoading } = useDashboard(
    now.getMonth() + 1,
    now.getFullYear(),
  );

  // ── Derived values ───────────────────────────────────────────────────────────
  const thisMonthExpenses = data?.currentMonth?.expenses ?? 0;
  const expensesChange    = data?.changes?.expenses ?? 0;

  const topCategory = data?.spendingByCategory?.reduce(
    (max, c) => (c.total > (max?.total ?? 0) ? c : max),
    data?.spendingByCategory?.[0],
  );
  const topCategoryName   = topCategory
    ? topCategory.category.charAt(0).toUpperCase() +
      topCategory.category.slice(1).toLowerCase()
    : "—";
  const topCategoryAmount = topCategory?.total ?? 0;
  const totalByCategory   =
    data?.spendingByCategory?.reduce((s, c) => s + c.total, 0) ?? 0;

  // Bar chart — expenses only per month
  const barData = data?.monthlyChart?.map((item) => ({
    month:    MONTH_LABELS[item.month - 1],
    expenses: item.expenses,
  }));

  // Pie chart — spending by category
  const pieData = data?.spendingByCategory?.map((item) => {
    const key = item.category.toUpperCase();
    return {
      name:  CATEGORY_CONFIG[key]?.label ?? item.category,
      value: item.total,
      color: CATEGORY_CONFIG[key]?.color ?? DEFAULT_COLOR,
    };
  });
  const pieTotal = pieData?.reduce((s, d) => s + d.value, 0) ?? 0;

  // ── Summary cards ────────────────────────────────────────────────────────────
  const cards = [
    {
      title: "This Month",
      value: thisMonthExpenses,
      change: expensesChange,
      positiveIsGood: false,
      label: "vs last month",
      icon: TrendingDown,
      iconBg: "bg-red-50",
      iconColor: "text-red-600",
    },
    {
      title: "Total Tracked",
      value: totalByCategory,
      change: expensesChange,
      positiveIsGood: false,
      label: "vs last month",
      icon: ShoppingCart,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
    },
    {
      title: "Top Category",
      value: topCategoryAmount,
      change: null,
      label: topCategoryName,
      icon: Tag,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* ── Summary cards ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)
          : cards.map((card) => {
              const Icon       = card.icon;
              const isPositive = (card.change ?? 0) >= 0;
              const isGood     =
                card.positiveIsGood !== undefined
                  ? card.positiveIsGood
                    ? isPositive
                    : !isPositive
                  : true;

              return (
                <Card key={card.title} className="transition-shadow hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          {card.title}
                        </p>
                        <p className="mt-1 text-2xl font-bold text-gray-900">
                          {formatCurrency(card.value)}
                        </p>
                      </div>
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-lg",
                          card.iconBg,
                        )}
                      >
                        <Icon className={cn("h-5 w-5", card.iconColor)} />
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-1">
                      {card.change !== null && card.change !== undefined ? (
                        <>
                          {isPositive ? (
                            <ArrowUpRight
                              className={cn("h-4 w-4", isGood ? "text-green-600" : "text-red-600")}
                            />
                          ) : (
                            <ArrowDownRight
                              className={cn("h-4 w-4", isGood ? "text-green-600" : "text-red-600")}
                            />
                          )}
                          <span className={cn("text-sm font-medium", isGood ? "text-green-600" : "text-red-600")}>
                            {Math.abs(card.change)}%
                          </span>
                          <span className="text-sm text-gray-400">{card.label}</span>
                        </>
                      ) : (
                        <span className="text-sm text-gray-400">{card.label}</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
      </div>

      {/* ── Charts row ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Bar chart — monthly expenses trend (spans 2 cols on lg) */}
        <div className="lg:col-span-2">
          <Card className="transition-shadow hover:shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold text-gray-900">
                  Monthly Expenses
                </CardTitle>
                <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                  {now.getFullYear()}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                {isLoading ? (
                  <div className="h-full w-full animate-pulse rounded-xl bg-gray-100" />
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={barData}
                      margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#f1f5f9"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#94a3b8" }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#94a3b8" }}
                        tickFormatter={(v) =>
                          `₹${(Number(v) / 1000).toFixed(0)}k`
                        }
                      />
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
                          "Expenses",
                        ]}
                      />
                      <Bar
                        dataKey="expenses"
                        name="Expenses"
                        fill="#ef4444"
                        radius={[4, 4, 0, 0]}
                        maxBarSize={36}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pie chart — spending by category */}
        <Card className="transition-shadow hover:shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold text-gray-900">
                By Category
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
            ) : !pieData || pieData.length === 0 ? (
              <div className="flex h-[200px] items-center justify-center text-sm text-gray-400">
                No expenses this month
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                {/* Donut */}
                <div className="h-[180px] w-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={78}
                        paddingAngle={3}
                        dataKey="value"
                        strokeWidth={0}
                      >
                        {pieData.map((entry, index) => (
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

                {/* Legend */}
                <div className="w-full space-y-2">
                  {pieData.map((cat) => {
                    const pct = ((cat.value / pieTotal) * 100).toFixed(1);
                    return (
                      <div
                        key={cat.name}
                        className="flex items-center justify-between text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: cat.color }}
                          />
                          <span className="text-gray-600">{cat.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-gray-900">
                            ₹{cat.value.toLocaleString("en-IN")}
                          </span>
                          <span className="w-10 text-right text-xs text-gray-400">
                            {pct}%
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
      </div>

      {/* ── Expense table ────────────────────────────────────────────────────── */}
      <ExpenseTable />
    </div>
  );
}
