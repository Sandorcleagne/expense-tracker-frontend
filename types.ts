export interface Transaction {
  _id?: string;
  createdAt?: string;
  description: string;
  category: string;
  amount: number;
  status: "completed" | "pending" | "failed";
  type: "income" | "expense";
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
}

export interface CategoryData {
  name: string;
  value: number;
  color: string;
}

export interface SummaryCard {
  title: string;
  value: string;
  change: number;
  icon: string;
  trend: "up" | "down";
}

export interface SidebarItem {
  label: string;
  icon: string;
  href: string;
  active?: boolean;
}

export interface IncomeSource {
  id: string;
  source: string;
  category: string;
  amount: number;
  date: string;
  recurring: boolean;
  status: "received" | "pending" | "overdue";
}

export interface Budget {
  id: string;
  category: string;
  budgeted: number;
  spent: number;
  color: string;
}

export interface ReportSummary {
  month: string;
  income: number;
  expenses: number;
  savings: number;
  savingsRate: number;
}

export interface Account {
  id: string;
  bankName: string;
  accountType: "savings" | "current" | "credit" | "wallet";
  accountNumber: string;
  balance: number;
  currency: string;
  isDefault: boolean;
  color: string;
  lastTransactionDate: string;
  holderName: string;
}
