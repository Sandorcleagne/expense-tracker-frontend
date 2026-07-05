import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import TransactionsPageContent from "@/components/transaction/transaction-page-content";

export default function Transaction() {
  return (
    <DashboardLayout
      title="Transaction"
      subtitle="Track and manage all your spending"
    >
      <TransactionsPageContent />
    </DashboardLayout>
  );
}
