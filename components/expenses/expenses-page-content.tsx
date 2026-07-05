"use client";
import { TrendingDown, ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { allExpenses } from "@/lib/dummy-data";
import { formatCurrency } from "@/lib/utils";
import ExpenseTable from "./expense-table";

export function ExpensesPageContent() {
  const totalExpenses = allExpenses.reduce(
    (sum, tx) => sum + Math.abs(tx.amount),
    0,
  );
  const thisMonthTotal = allExpenses
    .filter((tx) => tx.createdAt?.startsWith("2026-04"))
    .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
  const avgPerTransaction = totalExpenses / allExpenses.length;

  return (
    <div className="space-y-6">
      {/* Summary row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="transition-shadow hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Expenses
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
              <span className="text-sm font-medium text-red-600">3.1%</span>
              <span className="text-sm text-gray-400">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-shadow hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">This Month</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {formatCurrency(thisMonthTotal)}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50">
                <TrendingDown className="h-5 w-5 text-orange-600" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1">
              <ArrowUpRight className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-600">5.2%</span>
              <span className="text-sm text-gray-400">under budget</span>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-shadow hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Avg per Transaction
                </p>
                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {formatCurrency(avgPerTransaction)}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                <TrendingDown className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1">
              <ArrowDownRight className="h-4 w-4 text-red-600" />
              <span className="text-sm font-medium text-red-600">1.8%</span>
              <span className="text-sm text-gray-400">vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>
      <ExpenseTable />
    </div>
  );
}
