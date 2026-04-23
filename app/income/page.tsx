import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { IncomePageContent } from "@/components/income/income-page-content";

export default function IncomePage() {
    return (
        <DashboardLayout
            title="Income"
            subtitle="Monitor your earnings and revenue streams"
        >
            <IncomePageContent />
        </DashboardLayout>
    );
}
