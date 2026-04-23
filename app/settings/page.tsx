import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { SettingsPageContent } from "@/components/settings/settings-page-content";

export default function SettingsPage() {
    return (
        <DashboardLayout
            title="Settings"
            subtitle="Manage your account and preferences"
        >
            <SettingsPageContent />
        </DashboardLayout>
    );
}
