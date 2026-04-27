"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TablePagination } from "@/components/ui/table-pagination";
import { transactions } from "@/lib/dummy-data";
import { cn } from "@/lib/utils";
import { useTransactions } from "@/hooks/useTransaction";
import { Transaction } from "@/types";

const PAGE_SIZE = 5;

const statusStyles: Record<string, string> = {
  completed: "bg-green-50 text-green-700",
  pending: "bg-yellow-50 text-yellow-700",
  failed: "bg-red-50 text-red-700",
};
const typeStyles: Record<string, string> = {
  income: "text-green-700",
  expense: "text-red-700",
};
function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatAmount(amount: number): string {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Math.abs(amount));
  return amount >= 0 ? `+${formatted}` : `-${formatted}`;
}
export function RecentTransactions() {
  const { data, isLoading, isError } = useTransactions({
    limit: PAGE_SIZE,
    skip: 0,
  });
  if (isLoading) return <div>Loading...</div>; // add shimmer effect
  if (isError) return <div>Error...</div>; // add error message with an icon of showing not data found
  if (data?.result?.transactions.length === 0)
    // add add transaction button
    return <div>No transactions</div>;
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold text-gray-900">
            Recent Transactions
          </CardTitle>
          <button className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700">
            View All
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="hidden sm:table-cell">Category</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.result?.transactions?.map((tx: Transaction) => (
              <TableRow key={tx._id}>
                <TableCell className="text-gray-500">
                  {formatDate(tx.createdAt || "")}
                </TableCell>
                <TableCell className="font-medium text-gray-900">
                  {tx.description}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                    {tx.category}
                  </span>
                </TableCell>
                <TableCell
                  className={cn(
                    "text-right font-semibold",
                    typeStyles[tx.type.toLowerCase()],
                  )}
                >
                  {formatAmount(tx.amount)}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
                      statusStyles[tx.status.toLowerCase()],
                    )}
                  >
                    {tx.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
