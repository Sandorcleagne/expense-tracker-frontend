"use client";

import { useTransactions } from "@/hooks/useTransaction";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Transaction } from "@/types";
import { TablePagination } from "@/components/ui/table-pagination";
import { cn, formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Filter, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AddIncomeModal } from "./add-income-modal";
import { useCategories } from "@/hooks/useCategories";

const TXN_TYPE = "INCOME";
const PAGE_SIZE = 5;

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const statusStyles: Record<string, string> = {
  completed: "bg-green-50 text-green-700",
  pending:   "bg-yellow-50 text-yellow-700",
  failed:    "bg-red-50 text-red-700",
};

const IncomeTable = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch]                     = useState("");
  const [incomeModalOpen, setIncomeModalOpen]   = useState(false);
  const [currentPage, setCurrentPage]           = useState(1);

  const { data, isLoading, isError } = useTransactions({
    limit: PAGE_SIZE,
    skip: 0,
    type: TXN_TYPE,
  });

  // Derive category filter pills from API categories
  const { data: categoriesData } = useCategories();
  const categories = [
    "All",
    ...(categoriesData?.result?.categories?.map((c) => c.categoryName) ?? []),
  ];

  const filtered = data?.result?.transactions?.filter((tx: Transaction) => {
    const matchesCategory =
      selectedCategory === "All" || tx.category === selectedCategory;
    const matchesSearch = tx.description
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages      = Math.ceil((filtered?.length ?? 0) / PAGE_SIZE);
  const paginatedIncome = filtered?.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  function handleCategoryChange(cat: string) {
    setSelectedCategory(cat);
    setCurrentPage(1);
  }

  function handleSearchChange(value: string) {
    setSearch(value);
    setCurrentPage(1);
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-16">
          <span className="text-sm text-gray-400">Loading income...</span>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-16">
          <span className="text-sm text-red-500">Error loading income.</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-base font-semibold text-gray-900">
              All Income
            </CardTitle>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIncomeModalOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                Add Income
              </button>
              <button className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 cursor-pointer">
                <Download className="h-4 w-4" />
                Export
              </button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Search & category filter */}
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search income..."
                className="pl-9"
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                      selectedCategory === cat
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200",
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Table */}
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
              {paginatedIncome?.map((tx: Transaction) => (
                <TableRow key={tx._id}>
                  <TableCell className="text-gray-500">
                    {formatDate(tx.transactionDate || "")}
                  </TableCell>
                  <TableCell className="font-medium text-gray-900">
                    {tx.description}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                      {tx.category}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-semibold text-green-600">
                    +{formatCurrency(tx.amount)}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
                        statusStyles[tx.status.toLowerCase()] ??
                          "bg-gray-100 text-gray-600",
                      )}
                    >
                      {tx.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
              {filtered?.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="py-8 text-center text-gray-400"
                  >
                    No income found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filtered?.length ?? 0}
            pageSize={PAGE_SIZE}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>

      <AddIncomeModal open={incomeModalOpen} onOpenChange={setIncomeModalOpen} />
    </>
  );
};

export default IncomeTable;

