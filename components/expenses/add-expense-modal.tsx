"use client";

import { useState } from "react";
import {
    FileText,
    Tag,
    Loader2,
    Wallet,
    IndianRupeeIcon,
    AlertCircle,
    RefreshCw,
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { cn } from "@/lib/utils";
import { useAccounts } from "@/hooks/useAccounts";
import { useCreateTransaction } from "@/hooks/useTransaction";
import { useCategories } from "@/hooks/useCategories";
import { toast } from "sonner";

interface AddExpenseModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

// ── Reusable skeleton & error primitives ─────────────────────────────────────

function SelectSkeleton() {
    return (
        <div className="h-9 w-full animate-pulse rounded-lg border border-gray-200 bg-gray-100" />
    );
}

function SelectError({
    message,
    onRetry,
}: {
    message: string;
    onRetry: () => void;
}) {
    return (
        <div className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-3 py-2">
            <div className="flex items-center gap-2 text-red-600">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span className="text-xs">{message}</span>
            </div>
            <button
                type="button"
                onClick={onRetry}
                className="ml-2 flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium text-red-600 hover:bg-red-100 transition-colors"
            >
                <RefreshCw className="h-3 w-3" />
                Retry
            </button>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────

export function AddExpenseModal({ open, onOpenChange }: AddExpenseModalProps) {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [status, setStatus] = useState<"completed" | "pending">("completed");
    const [accountId, setAccountId] = useState("");

    const {
        data: accounts,
        isLoading: accountLoading,
        isError: accountError,
        refetch: refetchAccounts,
    } = useAccounts();

    const {
        data: categories,
        isLoading: categoryLoading,
        isError: categoryError,
        refetch: refetchCategories,
    } = useCategories();

    const createTransaction = useCreateTransaction();

    function resetForm() {
        setDescription("");
        setAmount("");
        setCategory("");
        setDate(new Date());
        setStatus("completed");
        setAccountId("");
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        createTransaction.mutate(
            {
                type: "EXPENSE",
                amount: Number(amount),
                accountId,
                description,
                category,
                status: status.toUpperCase(),
                transactionDate: (date ?? new Date()).toISOString(),
            },
            {
                onSuccess: () => {
                    toast.success("Expense added successfully!");
                    setTimeout(() => {
                        onOpenChange(false);
                        resetForm();
                    }, 800);
                },
                onError: (error: any) => {
                    toast.error(
                        error?.response?.data?.message || "Failed to add expense"
                    );
                },
            }
        );
    }

    function handleOpenChange(value: boolean) {
        onOpenChange(value);
        if (!value) resetForm();
    }

    const isValid =
        description.trim() !== "" &&
        amount.trim() !== "" &&
        Number(amount) > 0 &&
        category !== "" &&
        accountId !== "" &&
        date !== undefined;

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Add New Expense</DialogTitle>
                    <DialogDescription>
                        Fill in the details below to record a new expense.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    {/* Description */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <div className="relative">
                            <FileText className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <Input
                                placeholder="e.g. Grocery Store"
                                className="pl-9"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Amount */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">
                            Amount
                        </label>
                        <div className="relative">
                            <IndianRupeeIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <Input
                                type="number"
                                min="0.01"
                                step="0.01"
                                placeholder="0.00"
                                className="pl-9"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                onWheel={(e) => e.currentTarget.blur()}
                                required
                            />
                        </div>
                    </div>

                    {/* Category */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">
                            Category
                        </label>
                        {categoryLoading ? (
                            <SelectSkeleton />
                        ) : categoryError ? (
                            <SelectError
                                message="Failed to load categories."
                                onRetry={refetchCategories}
                            />
                        ) : (
                            <div className="relative">
                                <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <select
                                    className="flex h-9 w-full appearance-none rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                >
                                    <option value="" disabled>
                                        Select a category
                                    </option>
                                    {categories?.result?.categories?.map((cat) => (
                                        <option key={cat._id} value={cat.categoryName}>
                                            {cat.categoryName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>

                    {/* Account */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">
                            Account
                        </label>
                        {accountLoading ? (
                            <SelectSkeleton />
                        ) : accountError ? (
                            <SelectError
                                message="Failed to load accounts."
                                onRetry={refetchAccounts}
                            />
                        ) : (
                            <div className="relative">
                                <Wallet className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <select
                                    className="flex h-9 w-full appearance-none rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent"
                                    value={accountId}
                                    onChange={(e) => setAccountId(e.target.value)}
                                    required
                                >
                                    <option value="" disabled>
                                        Select an account
                                    </option>
                                    {accounts?.result?.map((acc) => (
                                        <option key={acc._id} value={acc._id}>
                                            {acc.name} — ₹{acc.balance.toLocaleString("en-IN")}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>

                    {/* Date */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">Date</label>
                        <DatePicker
                            date={date}
                            onDateChange={setDate}
                            placeholder="Select expense date"
                        />
                    </div>

                    {/* Status */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">
                            Status
                        </label>
                        <div className="flex gap-2">
                            {(["completed", "pending"] as const).map((s) => (
                                <button
                                    key={s}
                                    type="button"
                                    onClick={() => setStatus(s)}
                                    className={cn(
                                        "rounded-lg border px-4 py-2 text-sm font-medium capitalize transition-colors cursor-pointer",
                                        status === s
                                            ? "border-blue-600 bg-blue-50 text-blue-700"
                                            : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                                    )}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-2 pt-2">
                        <DialogClose asChild>
                            <button
                                type="button"
                                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                        </DialogClose>
                        <button
                            type="submit"
                            disabled={!isValid || createTransaction.isPending}
                            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                        >
                            {createTransaction.isPending && (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            )}
                            {createTransaction.isPending ? "Saving..." : "Add Expense"}
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
