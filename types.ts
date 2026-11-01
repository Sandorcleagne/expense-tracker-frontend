export interface Transaction {
  _id?: string;
  createdAt?: string;
  transactionDate?: string;
  description: string;
  category: string;
  amount: number;
  status: "COMPLETED" | "PENDING" | "FAILED";
  type: "INCOME" | "EXPENSE";
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
  _id: string;
  type: "savings" | "current" | "credit_card" | "cash" | "wallet";
  name: string;
  balance: number;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
  color: string;
  bankCode?: string;
  __v: number;
}

export interface ApiResponse<T> {
  status: boolean;
  message: string;
  result: T;
}

export interface Category {
  _id: string;
  categoryName: string;
  color: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CategoriesResult {
  categories: Category[];
  count: number;
  remaining: number;
}
