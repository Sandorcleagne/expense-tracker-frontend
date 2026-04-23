import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { BudgetsPageContent } from "@/components/budgets/budgets-page-content";

export default function BudgetsPage() {
    return (
        <DashboardLayout
            title="Budgets"
            subtitle="Set limits and track your spending goals"
        >
            <BudgetsPageContent />
        </DashboardLayout>
    );
}
