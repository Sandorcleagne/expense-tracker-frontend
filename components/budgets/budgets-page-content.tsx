"use client";

import { useState } from "react";
import {
    Target,
    AlertTriangle,
    CheckCircle2,
    Plus,
    TrendingDown,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { budgets } from "@/lib/dummy-data";
import { AddBudgetModal } from "./add-budget-modal";
import { cn } from "@/lib/utils";

function formatCurrency(value: number): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}

export function BudgetsPageContent() {
    const [budgetModalOpen, setBudgetModalOpen] = useState(false);
    const totalBudgeted = budgets.reduce((sum, b) => sum + b.budgeted, 0);
    const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
    const overBudgetCount = budgets.filter((b) => b.spent > b.budgeted).length;
    const underBudgetCount = budgets.filter(
        (b) => b.spent <= b.budgeted
    ).length;

    return (
        <div className="space-y-6">
            {/* Summary cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <Card className="transition-shadow hover:shadow-md">
                    <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Total Budgeted
                                </p>
                                <p className="mt-1 text-2xl font-bold text-gray-900">
                                    {formatCurrency(totalBudgeted)}
                                </p>
                            </div>
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                                <Target className="h-5 w-5 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="transition-shadow hover:shadow-md">
                    <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Total Spent
                                </p>
                                <p className="mt-1 text-2xl font-bold text-gray-900">
                                    {formatCurrency(totalSpent)}
                                </p>
                            </div>
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
                                <TrendingDown className="h-5 w-5 text-red-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="transition-shadow hover:shadow-md">
                    <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Under Budget
                                </p>
                                <p className="mt-1 text-2xl font-bold text-green-600">
                                    {underBudgetCount} categories
                                </p>
                            </div>
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
                                <CheckCircle2 className="h-5 w-5 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="transition-shadow hover:shadow-md">
                    <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Over Budget
                                </p>
                                <p className="mt-1 text-2xl font-bold text-red-600">
                                    {overBudgetCount} categories
                                </p>
                            </div>
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
                                <AlertTriangle className="h-5 w-5 text-red-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Budget header */}
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                    Budget Categories
                </h2>
                <button
                    onClick={() => setBudgetModalOpen(true)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                    <Plus className="h-4 w-4" />
                    Add Budget
                </button>
            </div>

            {/* Budget cards grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {budgets.map((budget) => {
                    const percentage = Math.min(
                        (budget.spent / budget.budgeted) * 100,
                        100
                    );
                    const isOver = budget.spent > budget.budgeted;
                    const remaining = budget.budgeted - budget.spent;

                    return (
                        <Card
                            key={budget.id}
                            className="transition-shadow hover:shadow-md"
                        >
                            <CardContent className="p-6">
                                {/* Category header */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <div
                                            className="h-3 w-3 rounded-full"
                                            style={{ backgroundColor: budget.color }}
                                        />
                                        <span className="font-medium text-gray-900">
                                            {budget.category}
                                        </span>
                                    </div>
                                    {isOver && (
                                        <AlertTriangle className="h-4 w-4 text-red-500" />
                                    )}
                                </div>

                                {/* Amounts */}
                                <div className="mt-4 flex items-end justify-between">
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {formatCurrency(budget.spent)}
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            of {formatCurrency(budget.budgeted)}
                                        </p>
                                    </div>
                                    <span
                                        className={cn(
                                            "text-sm font-semibold",
                                            isOver ? "text-red-600" : "text-green-600"
                                        )}
                                    >
                                        {percentage.toFixed(0)}%
                                    </span>
                                </div>

                                {/* Progress bar */}
                                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                                    <div
                                        className={cn(
                                            "h-full rounded-full transition-all",
                                            isOver ? "bg-red-500" : "bg-green-500"
                                        )}
                                        style={{
                                            width: `${Math.min((budget.spent / budget.budgeted) * 100, 100)}%`,
                                            backgroundColor: isOver ? undefined : budget.color,
                                        }}
                                    />
                                </div>

                                {/* Remaining */}
                                <p
                                    className={cn(
                                        "mt-2 text-xs",
                                        isOver ? "text-red-500" : "text-gray-400"
                                    )}
                                >
                                    {isOver
                                        ? `${formatCurrency(Math.abs(remaining))} over budget`
                                        : `${formatCurrency(remaining)} remaining`}
                                </p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Overall progress */}
            <Card className="transition-shadow hover:shadow-md">
                <CardHeader>
                    <CardTitle className="text-base font-semibold text-gray-900">
                        Overall Budget Usage
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {budgets.map((budget) => {
                            const pct = (budget.spent / budget.budgeted) * 100;
                            const isOver = pct > 100;

                            return (
                                <div key={budget.id} className="space-y-1.5">
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="h-2.5 w-2.5 rounded-full"
                                                style={{ backgroundColor: budget.color }}
                                            />
                                            <span className="font-medium text-gray-700">
                                                {budget.category}
                                            </span>
                                        </div>
                                        <span className="text-gray-500">
                                            {formatCurrency(budget.spent)} /{" "}
                                            {formatCurrency(budget.budgeted)}
                                        </span>
                                    </div>
                                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                                        <div
                                            className={cn(
                                                "h-full rounded-full transition-all",
                                                isOver ? "bg-red-500" : ""
                                            )}
                                            style={{
                                                width: `${Math.min(pct, 100)}%`,
                                                backgroundColor: isOver ? undefined : budget.color,
                                            }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* Add Budget Modal */}
            <AddBudgetModal
                open={budgetModalOpen}
                onOpenChange={setBudgetModalOpen}
            />
        </div>
    );
}
