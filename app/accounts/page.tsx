import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { AccountsPageContent } from "@/components/accounts/accounts-page-content";

export default function AccountsPage() {
    return (
        <DashboardLayout
            title="Accounts"
            subtitle="Manage your bank accounts and payment methods"
        >
            <AccountsPageContent />
        </DashboardLayout>
    );
}
