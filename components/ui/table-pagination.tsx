"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface TablePaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
    onPageChange: (page: number) => void;
}

export function TablePagination({
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    onPageChange,
}: TablePaginationProps) {
    if (totalPages <= 1) return null;

    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, totalItems);

    function getPageNumbers(): (number | "ellipsis")[] {
        const pages: (number | "ellipsis")[] = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
            return pages;
        }

        pages.push(1);

        if (currentPage > 3) {
            pages.push("ellipsis");
        }

        const rangeStart = Math.max(2, currentPage - 1);
        const rangeEnd = Math.min(totalPages - 1, currentPage + 1);

        for (let i = rangeStart; i <= rangeEnd; i++) {
            pages.push(i);
        }

        if (currentPage < totalPages - 2) {
            pages.push("ellipsis");
        }

        pages.push(totalPages);

        return pages;
    }

    return (
        <div className="flex flex-col items-center justify-between gap-3 pt-4 sm:flex-row">
            <p className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-medium text-gray-700">{start}</span>
                {" "}to{" "}
                <span className="font-medium text-gray-700">{end}</span>
                {" "}of{" "}
                <span className="font-medium text-gray-700">{totalItems}</span>
                {" "}results
            </p>

            <div className="flex items-center gap-1">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Previous page"
                >
                    <ChevronLeft className="h-4 w-4" />
                </button>

                {getPageNumbers().map((page, idx) =>
                    page === "ellipsis" ? (
                        <span
                            key={`ellipsis-${idx}`}
                            className="inline-flex h-8 w-8 items-center justify-center text-sm text-gray-400"
                        >
                            …
                        </span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={cn(
                                "inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition-colors",
                                currentPage === page
                                    ? "bg-blue-600 text-white"
                                    : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                            )}
                        >
                            {page}
                        </button>
                    )
                )}

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Next page"
                >
                    <ChevronRight className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
