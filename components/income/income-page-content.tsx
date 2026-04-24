"use client";

import { useState } from "react";
import {
    TrendingUp,
    ArrowUpRight,
    DollarSign,
    RefreshCw,
    Plus,
} from "lucide-react";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { incomeSources, incomeByCategory, monthlyData } from "@/lib/dummy-data";
import { AddIncomeModal } from "./add-income-modal";
import { TablePagination } from "@/components/ui/table-pagination";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 5;

const statusStyles: Record<string, string> = {
    received: "bg-green-50 text-green-700",
    pending: "bg-yellow-50 text-yellow-700",
    overdue: "bg-red-50 text-red-700",
};

function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

function formatCurrency(value: number): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}

export function IncomePageContent() {
    const [incomeModalOpen, setIncomeModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const totalIncome = incomeSources.reduce((sum, s) => sum + s.amount, 0);
    const recurringIncome = incomeSources
        .filter((s) => s.recurring)
        .reduce((sum, s) => sum + s.amount, 0);
    const pendingIncome = incomeSources
        .filter((s) => s.status === "pending" || s.status === "overdue")
        .reduce((sum, s) => sum + s.amount, 0);

    const incomeOnlyData = monthlyData.map((m) => ({
        month: m.month,
        income: m.income,
    }));

    const totalPages = Math.ceil(incomeSources.length / PAGE_SIZE);
    const paginatedIncome = incomeSources.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    return (
        <div className="space-y-6">
            {/* Summary cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Card className="transition-shadow hover:shadow-md">
                    <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Total Income
                                </p>
                                <p className="mt-1 text-2xl font-bold text-gray-900">
                                    {formatCurrency(totalIncome)}
                                </p>
                            </div>
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
                                <DollarSign className="h-5 w-5 text-green-600" />
                            </div>
                        </div>
                        <div className="mt-3 flex items-center gap-1">
                            <ArrowUpRight className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium text-green-600">8.2%</span>
                            <span className="text-sm text-gray-400">vs last month</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="transition-shadow hover:shadow-md">
                    <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Recurring Income
                                </p>
                                <p className="mt-1 text-2xl font-bold text-gray-900">
                                    {formatCurrency(recurringIncome)}
                                </p>
                            </div>
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                                <RefreshCw className="h-5 w-5 text-blue-600" />
                            </div>
                        </div>
                        <div className="mt-3 flex items-center gap-1">
                            <ArrowUpRight className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium text-green-600">
                                {((recurringIncome / totalIncome) * 100).toFixed(0)}%
                            </span>
                            <span className="text-sm text-gray-400">of total income</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="transition-shadow hover:shadow-md">
                    <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Pending / Overdue
                                </p>
                                <p className="mt-1 text-2xl font-bold text-gray-900">
                                    {formatCurrency(pendingIncome)}
                                </p>
                            </div>
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-50">
                                <TrendingUp className="h-5 w-5 text-yellow-600" />
                            </div>
                        </div>
                        <div className="mt-3 flex items-center gap-1">
                            <span className="text-sm text-gray-400">
                                {
                                    incomeSources.filter(
                                        (s) => s.status === "pending" || s.status === "overdue"
                                    ).length
                                }{" "}
                                transactions awaiting
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts row */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Monthly income trend */}
                <div className="lg:col-span-2">
                    <Card className="transition-shadow hover:shadow-md">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-base font-semibold text-gray-900">
                                    Monthly Income Trend
                                </CardTitle>
                                <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                                    2026
                                </span>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[280px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={incomeOnlyData}
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
                                                `$${(Number(v) / 1000).toFixed(0)}k`
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
                                                "Income",
                                            ]}
                                        />
                                        <Bar
                                            dataKey="income"
                                            fill="#22c55e"
                                            radius={[4, 4, 0, 0]}
                                            maxBarSize={36}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Income by category donut */}
                <Card className="transition-shadow hover:shadow-md">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold text-gray-900">
                            Income by Source
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center gap-4">
                            <div className="h-[180px] w-[180px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={incomeByCategory}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={50}
                                            outerRadius={78}
                                            paddingAngle={3}
                                            dataKey="value"
                                            strokeWidth={0}
                                        >
                                            {incomeByCategory.map((entry, i) => (
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
                                {incomeByCategory.map((cat) => (
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

            {/* Income sources table */}
            <Card className="transition-shadow hover:shadow-md">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-base font-semibold text-gray-900">
                            Income Sources
                        </CardTitle>
                        <button
                            onClick={() => setIncomeModalOpen(true)}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
                        >
                            <Plus className="h-4 w-4" />
                            Add Income
                        </button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent">
                                <TableHead>Source</TableHead>
                                <TableHead className="hidden sm:table-cell">
                                    Category
                                </TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Recurring
                                </TableHead>
                                <TableHead className="hidden md:table-cell">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedIncome.map((src) => (
                                <TableRow key={src.id}>
                                    <TableCell className="font-medium text-gray-900">
                                        {src.source}
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                                            {src.category}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-gray-500">
                                        {formatDate(src.date)}
                                    </TableCell>
                                    <TableCell className="text-right font-semibold text-green-600">
                                        +{formatCurrency(src.amount)}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {src.recurring ? (
                                            <span className="inline-flex items-center gap-1 text-xs text-blue-600">
                                                <RefreshCw className="h-3 w-3" /> Yes
                                            </span>
                                        ) : (
                                            <span className="text-xs text-gray-400">One-time</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <span
                                            className={cn(
                                                "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
                                                statusStyles[src.status]
                                            )}
                                        >
                                            {src.status}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <TablePagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalItems={incomeSources.length}
                        pageSize={PAGE_SIZE}
                        onPageChange={setCurrentPage}
                    />
                </CardContent>
            </Card>

            {/* Add Income Modal */}
            <AddIncomeModal
                open={incomeModalOpen}
                onOpenChange={setIncomeModalOpen}
            />
        </div>
    );
}
