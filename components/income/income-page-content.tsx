"use client";

import {
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  PiggyBank,
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
import { cn } from "@/lib/utils";
import { useDashboard } from "@/hooks/useAnalytics";
import { useTransactions } from "@/hooks/useTransaction";
import { Transaction } from "@/types";
import IncomeTable from "./income-table";

// ── Constants ─────────────────────────────────────────────────────────────────

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// Rotating palette for dynamically-named income categories
const PALETTE = [
  "#22c55e", "#3b82f6", "#8b5cf6", "#f97316",
  "#ec4899", "#06b6d4", "#eab308", "#f43f5e",
  "#6b7280", "#14b8a6",
];

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

export function IncomePageContent() {
  const now = new Date();

  const { data, isLoading } = useDashboard(
    now.getMonth() + 1,
    now.getFullYear(),
  );

  // Fetch all income transactions so we can group by category for the pie chart
  const { data: txData, isLoading: txLoading } = useTransactions({
    type: "INCOME",
  });

  // ── Derived values ───────────────────────────────────────────────────────────
  const thisMonthIncome  = data?.currentMonth?.income   ?? 0;
  const thisMonthSavings = data?.currentMonth?.savings  ?? 0;
  const incomeChange     = data?.changes?.income        ?? 0;
  const savingsChange    = data?.changes?.savings       ?? 0;

  const cards = [
    {
      title: "This Month",
      value: thisMonthIncome,
      change: incomeChange,
      positiveIsGood: true,
      label: "vs last month",
      icon: TrendingUp,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Total Balance",
      value: data?.totalBalance ?? 0,
      change: data?.changes?.balance ?? 0,
      positiveIsGood: true,
      label: "vs last month",
      icon: DollarSign,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Savings",
      value: thisMonthSavings,
      change: savingsChange,
      positiveIsGood: true,
      label: "vs last month",
      icon: PiggyBank,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];

  // Bar chart — income per month
  const barData = data?.monthlyChart?.map((item) => ({
    month:  MONTH_LABELS[item.month - 1],
    income: item.income,
  }));

  // Pie chart — aggregate income transactions by category client-side
  const categoryMap = new Map<string, number>();
  txData?.result?.transactions?.forEach((tx: Transaction) => {
    const key = tx.category || "Other";
    categoryMap.set(key, (categoryMap.get(key) ?? 0) + tx.amount);
  });
  const pieData = Array.from(categoryMap.entries()).map(([name, value], i) => ({
    name,
    value,
    color: PALETTE[i % PALETTE.length],
  }));
  const pieTotal = pieData.reduce((s, d) => s + d.value, 0);

  return (
    <div className="space-y-6">
      {/* ── Summary cards ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)
          : cards.map((card) => {
              const Icon       = card.icon;
              const isPositive = card.change >= 0;
              const isGood     = card.positiveIsGood ? isPositive : !isPositive;

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
                      {isPositive ? (
                        <ArrowUpRight
                          className={cn("h-4 w-4", isGood ? "text-green-600" : "text-red-600")}
                        />
                      ) : (
                        <ArrowDownRight
                          className={cn("h-4 w-4", isGood ? "text-green-600" : "text-red-600")}
                        />
                      )}
                      <span
                        className={cn(
                          "text-sm font-medium",
                          isGood ? "text-green-600" : "text-red-600",
                        )}
                      >
                        {Math.abs(card.change)}%
                      </span>
                      <span className="text-sm text-gray-400">{card.label}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
      </div>

      {/* ── Charts row ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Bar chart — monthly income trend (2/3 width on lg) */}
        <div className="lg:col-span-2">
          <Card className="transition-shadow hover:shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold text-gray-900">
                  Monthly Income Trend
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
                          "Income",
                        ]}
                      />
                      <Bar
                        dataKey="income"
                        name="Income"
                        fill="#22c55e"
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

        {/* Pie chart — income by category (1/3 width on lg) */}
        <Card className="transition-shadow hover:shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold text-gray-900">
                By Category
              </CardTitle>
              <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                All Time
              </span>
            </div>
          </CardHeader>
          <CardContent>
            {txLoading ? (
              <div className="flex flex-col items-center gap-4">
                <div className="h-[180px] w-[180px] animate-pulse rounded-full bg-gray-100" />
                <div className="w-full space-y-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="h-3 w-24 animate-pulse rounded bg-gray-100" />
                      <div className="h-3 w-16 animate-pulse rounded bg-gray-100" />
                    </div>
                  ))}
                </div>
              </div>
            ) : !pieData || pieData.length === 0 ? (
              <div className="flex h-[200px] items-center justify-center text-sm text-gray-400">
                No income recorded yet
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

      {/* ── Income table ─────────────────────────────────────────────────────── */}
      <IncomeTable />
    </div>
  );
}
