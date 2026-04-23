import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { ExpensesPageContent } from "@/components/expenses/expenses-page-content";

export default function ExpensesPage() {
    return (
        <DashboardLayout
            title="Expenses"
            subtitle="Track and manage all your spending"
        >
            <ExpensesPageContent />
        </DashboardLayout>
    );
}
