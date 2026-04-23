import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { ReportsPageContent } from "@/components/reports/reports-page-content";

export default function ReportsPage() {
    return (
        <DashboardLayout
            title="Reports"
            subtitle="Detailed financial analytics and insights"
        >
            <ReportsPageContent />
        </DashboardLayout>
    );
}
