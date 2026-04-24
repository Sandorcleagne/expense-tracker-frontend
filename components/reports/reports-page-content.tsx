"use client";

import { useState } from "react";
import {
    TrendingUp,
    TrendingDown,
    PiggyBank,
    BarChart3,
    Download,
    ArrowUpRight,
    ArrowDownRight,
} from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Legend,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    reportSummary,
    topExpenseCategories,
    monthlyData,
} from "@/lib/dummy-data";
import { TablePagination } from "@/components/ui/table-pagination";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 5;

function formatCurrency(value: number): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}

export function ReportsPageContent() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalIncome = reportSummary.reduce((s, r) => s + r.income, 0);
    const totalExpenses = reportSummary.reduce((s, r) => s + r.expenses, 0);
    const totalSavings = reportSummary.reduce((s, r) => s + r.savings, 0);
    const avgSavingsRate =
        reportSummary.reduce((s, r) => s + r.savingsRate, 0) /
        reportSummary.length;

    const totalPages = Math.ceil(reportSummary.length / PAGE_SIZE);
    const paginatedReports = reportSummary.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    return (
        <div className="space-y-6">
            {/* Top KPIs */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <Card className="transition-shadow hover:shadow-md">
                    <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Annual Income
                                </p>
                                <p className="mt-1 text-2xl font-bold text-gray-900">
                                    {formatCurrency(totalIncome)}
                                </p>
                            </div>
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
                                <TrendingUp className="h-5 w-5 text-green-600" />
                            </div>
                        </div>
                        <div className="mt-3 flex items-center gap-1">
                            <ArrowUpRight className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium text-green-600">12.4%</span>
                            <span className="text-sm text-gray-400">vs last year</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="transition-shadow hover:shadow-md">
                    <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Annual Expenses
                                </p>
                                <p className="mt-1 text-2xl font-bold text-gray-900">
                                    {formatCurrency(totalExpenses)}
                                </p>
                            </div>
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
                                <TrendingDown className="h-5 w-5 text-red-600" />
                            </div>
                        </div>
                        <div className="mt-3 flex items-center gap-1">
                            <ArrowDownRight className="h-4 w-4 text-red-600" />
                            <span className="text-sm font-medium text-red-600">5.7%</span>
                            <span className="text-sm text-gray-400">vs last year</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="transition-shadow hover:shadow-md">
                    <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Total Savings
                                </p>
                                <p className="mt-1 text-2xl font-bold text-gray-900">
                                    {formatCurrency(totalSavings)}
                                </p>
                            </div>
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50">
                                <PiggyBank className="h-5 w-5 text-purple-600" />
                            </div>
                        </div>
                        <div className="mt-3 flex items-center gap-1">
                            <ArrowUpRight className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium text-green-600">18.2%</span>
                            <span className="text-sm text-gray-400">vs last year</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="transition-shadow hover:shadow-md">
                    <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Avg Savings Rate
                                </p>
                                <p className="mt-1 text-2xl font-bold text-gray-900">
                                    {avgSavingsRate.toFixed(1)}%
                                </p>
                            </div>
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                                <BarChart3 className="h-5 w-5 text-blue-600" />
                            </div>
                        </div>
                        <div className="mt-3 flex items-center gap-1">
                            <ArrowUpRight className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium text-green-600">2.1%</span>
                            <span className="text-sm text-gray-400">vs last year</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Savings trend area chart */}
            <Card className="transition-shadow hover:shadow-md">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-base font-semibold text-gray-900">
                                Savings Trend
                            </CardTitle>
                            <CardDescription>
                                Monthly savings over the past year
                            </CardDescription>
                        </div>
                        <button className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                            <Download className="h-4 w-4" />
                            Export PDF
                        </button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={reportSummary}
                                margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
                            >
                                <defs>
                                    <linearGradient
                                        id="savingsGradient"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
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
                                        `$${(Number(v) / 1000).toFixed(1)}k`
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
                                        `$${Number(value).toLocaleString()}`,
                                        "Savings",
                                    ]}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="savings"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    fill="url(#savingsGradient)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Income vs Expenses comparison + Top categories */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <Card className="transition-shadow hover:shadow-md">
                        <CardHeader>
                            <CardTitle className="text-base font-semibold text-gray-900">
                                Income vs Expenses (Monthly)
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[280px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={monthlyData}
                                        margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
                                        barGap={4}
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
                                                `$${(Number(v) / 1000).toFixed(0)}k`
                                            }
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: "#fff",
                                                border: "1px solid #e2e8f0",
                                                borderRadius: "8px",
                                                fontSize: "13px",
                                            }}
                                            formatter={(value) => [
                                                `$${Number(value).toLocaleString()}`,
                                                undefined,
                                            ]}
                                        />
                                        <Legend
                                            iconType="circle"
                                            iconSize={8}
                                            wrapperStyle={{ fontSize: "13px", paddingTop: "12px" }}
                                        />
                                        <Bar
                                            dataKey="income"
                                            name="Income"
                                            fill="#22c55e"
                                            radius={[4, 4, 0, 0]}
                                            maxBarSize={28}
                                        />
                                        <Bar
                                            dataKey="expenses"
                                            name="Expenses"
                                            fill="#ef4444"
                                            radius={[4, 4, 0, 0]}
                                            maxBarSize={28}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Top expense categories pie */}
                <Card className="transition-shadow hover:shadow-md">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold text-gray-900">
                            Top Expense Categories
                        </CardTitle>
                        <CardDescription>Annual breakdown</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center gap-4">
                            <div className="h-[170px] w-[170px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={topExpenseCategories}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={48}
                                            outerRadius={75}
                                            paddingAngle={3}
                                            dataKey="value"
                                            strokeWidth={0}
                                        >
                                            {topExpenseCategories.map((entry, i) => (
                                                <Cell key={`cell-${i}`} fill={entry.color} />
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
                                                `$${Number(value).toLocaleString()}`,
                                                undefined,
                                            ]}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="w-full space-y-2">
                                {topExpenseCategories.map((cat) => (
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
                                        <span className="font-medium text-gray-900">
                                            {formatCurrency(cat.value)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Monthly breakdown table */}
            <Card className="transition-shadow hover:shadow-md">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-base font-semibold text-gray-900">
                            Monthly Breakdown
                        </CardTitle>
                        <button className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                            <Download className="h-4 w-4" />
                            Export CSV
                        </button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent">
                                <TableHead>Month</TableHead>
                                <TableHead className="text-right">Income</TableHead>
                                <TableHead className="text-right">Expenses</TableHead>
                                <TableHead className="text-right">Savings</TableHead>
                                <TableHead className="hidden text-right sm:table-cell">
                                    Savings Rate
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedReports.map((row) => (
                                <TableRow key={row.month}>
                                    <TableCell className="font-medium text-gray-900">
                                        {row.month} 2026
                                    </TableCell>
                                    <TableCell className="text-right font-medium text-green-600">
                                        {formatCurrency(row.income)}
                                    </TableCell>
                                    <TableCell className="text-right font-medium text-red-600">
                                        {formatCurrency(row.expenses)}
                                    </TableCell>
                                    <TableCell className="text-right font-semibold text-gray-900">
                                        {formatCurrency(row.savings)}
                                    </TableCell>
                                    <TableCell className="hidden text-right sm:table-cell">
                                        <span
                                            className={cn(
                                                "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
                                                row.savingsRate >= 35
                                                    ? "bg-green-50 text-green-700"
                                                    : row.savingsRate >= 30
                                                        ? "bg-yellow-50 text-yellow-700"
                                                        : "bg-red-50 text-red-700"
                                            )}
                                        >
                                            {row.savingsRate}%
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <TablePagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalItems={reportSummary.length}
                        pageSize={PAGE_SIZE}
                        onPageChange={setCurrentPage}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
