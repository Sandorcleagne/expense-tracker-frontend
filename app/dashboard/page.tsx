"use client";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { SummaryCards } from "@/components/dashboard/summary-cards";
import { ExpenseChart } from "@/components/dashboard/expense-chart";
import { CategoryBreakdown } from "@/components/dashboard/category-breakdown";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { useDashboard } from "@/hooks/useAnalytics";
export default function DashboardPage() {
  const now = new Date();
  const { data, isLoading } = useDashboard(
    now.getMonth() + 1,
    now.getFullYear(),
  );
  const totalIncome = data?.monthlyChart?.reduce(
    (accu, income) => accu + income.income,
    0,
  );
  const totalExpense = data?.monthlyChart?.reduce(
    (accu, expense) => accu + expense.expenses,
    0,
  );
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <SummaryCards
          data={data?.currentMonth}
          changes={data?.changes}
          totalBalance={data?.totalBalance}
          isLoading={isLoading}
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {(totalIncome !== 0 || totalExpense !== 0) && (
            <div className="lg:col-span-2">
              <ExpenseChart data={data?.monthlyChart} isLoading={false} />
            </div>
          )}
          {data?.spendingByCategory?.length !== 0 && (
            <div>
              <CategoryBreakdown
                data={data?.spendingByCategory}
                isLoading={false}
              />
            </div>
          )}
        </div>

        <RecentTransactions />
      </div>
    </DashboardLayout>
  );
}
