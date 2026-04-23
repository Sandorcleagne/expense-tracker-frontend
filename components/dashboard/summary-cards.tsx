import React from "react";
import {
    Wallet,
    TrendingUp,
    TrendingDown,
    PiggyBank,
    ArrowUpRight,
    ArrowDownRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { summaryData } from "@/lib/dummy-data";
import { cn } from "@/lib/utils";

const cards = [
    {
        title: "Total Balance",
        value: summaryData.totalBalance,
        change: summaryData.balanceChange,
        icon: Wallet,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-600",
    },
    {
        title: "Total Income",
        value: summaryData.totalIncome,
        change: summaryData.incomeChange,
        icon: TrendingUp,
        iconBg: "bg-green-50",
        iconColor: "text-green-600",
    },
    {
        title: "Total Expenses",
        value: summaryData.totalExpenses,
        change: summaryData.expenseChange,
        icon: TrendingDown,
        iconBg: "bg-red-50",
        iconColor: "text-red-600",
    },
    {
        title: "Savings",
        value: summaryData.savings,
        change: summaryData.savingsChange,
        icon: PiggyBank,
        iconBg: "bg-purple-50",
        iconColor: "text-purple-600",
    },
];

function formatCurrency(value: number): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}

export function SummaryCards() {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => {
                const Icon = card.icon;
                const isPositive = card.change >= 0;

                return (
                    <Card
                        key={card.title}
                        className="transition-shadow hover:shadow-md"
                    >
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-gray-500">
                                        {card.title}
                                    </p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {formatCurrency(card.value)}
                                    </p>
                                </div>
                                <div
                                    className={cn(
                                        "flex h-10 w-10 items-center justify-center rounded-lg",
                                        card.iconBg
                                    )}
                                >
                                    <Icon className={cn("h-5 w-5", card.iconColor)} />
                                </div>
                            </div>
                            <div className="mt-3 flex items-center gap-1">
                                {isPositive ? (
                                    <ArrowUpRight className="h-4 w-4 text-green-600" />
                                ) : (
                                    <ArrowDownRight className="h-4 w-4 text-red-600" />
                                )}
                                <span
                                    className={cn(
                                        "text-sm font-medium",
                                        isPositive ? "text-green-600" : "text-red-600"
                                    )}
                                >
                                    {Math.abs(card.change)}%
                                </span>
                                <span className="text-sm text-gray-400">vs last month</span>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
