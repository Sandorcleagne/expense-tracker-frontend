"use client";

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
import { cn } from "@/lib/utils";
import { DashboardResult } from "@/hooks/useAnalytics";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Props {
  totalBalance: number | undefined;
  data: DashboardResult["currentMonth"] | undefined;
  changes: DashboardResult["changes"] | undefined;
  isLoading: boolean;
}

// ── Currency formatter — changed to INR to match your data ────────────────────
function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

// ── Skeleton — matches your card layout exactly ───────────────────────────────
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

export function SummaryCards({
  totalBalance,
  data,
  changes,
  isLoading,
}: Props) {
  // WHY build cards inside the component instead of outside like before?
  //   Previously cards[] was static — values came from imported summaryData.
  //   Now values come from props which aren't available outside the component.
  //   The array structure and map() pattern is kept exactly the same.
  const cards = [
    {
      title: "Total Balance",
      value: totalBalance ?? 0,
      change: changes?.balance ?? 0,
      icon: Wallet,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      positiveIsGood: true,
    },
    {
      title: "Total Income",
      value: data?.income ?? 0,
      change: changes?.income ?? 0,
      icon: TrendingUp,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
      positiveIsGood: true,
    },
    {
      title: "Total Expenses",
      value: data?.expenses ?? 0,
      change: changes?.expenses ?? 0,
      icon: TrendingDown,
      iconBg: "bg-red-50",
      iconColor: "text-red-600",
      // expenses going DOWN is good — so positive change = bad (red)
      positiveIsGood: false,
    },
    {
      title: "Savings",
      value: data?.savings ?? 0,
      change: changes?.savings ?? 0,
      icon: PiggyBank,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
      positiveIsGood: true,
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        const isPositive = card.change >= 0;
        // isGood = did the metric move in a direction that benefits the user
        // Expenses: +3.1% (went up) → isPositive=true, isGood=false → red
        // Income:   +8.2% (went up) → isPositive=true, isGood=true  → green
        // Expenses: -3.1% (went down) → isPositive=false, isGood=true → green ✓
        const isGood = card.positiveIsGood ? isPositive : !isPositive;

        return (
          <Card key={card.title} className="transition-shadow hover:shadow-md">
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
                    card.iconBg,
                  )}
                >
                  <Icon className={cn("h-5 w-5", card.iconColor)} />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1">
                {isPositive ? (
                  <ArrowUpRight
                    className={cn(
                      "h-4 w-4",
                      isGood ? "text-green-600" : "text-red-600",
                    )}
                  />
                ) : (
                  <ArrowDownRight
                    className={cn(
                      "h-4 w-4",
                      isGood ? "text-green-600" : "text-red-600",
                    )}
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
                <span className="text-sm text-gray-400">vs last month</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
