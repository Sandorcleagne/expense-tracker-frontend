import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { SummaryCards } from "@/components/dashboard/summary-cards";
import { ExpenseChart } from "@/components/dashboard/expense-chart";
import { CategoryBreakdown } from "@/components/dashboard/category-breakdown";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";

export default function DashboardPage() {
    return (
        <DashboardLayout>
            <div className="space-y-6">
                <SummaryCards />

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <ExpenseChart />
                    </div>
                    <div>
                        <CategoryBreakdown />
                    </div>
                </div>

                <RecentTransactions />
            </div>
        </DashboardLayout>
    );
}
