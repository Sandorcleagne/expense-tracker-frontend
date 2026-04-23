"use client";

import { useState } from "react";
import { DollarSign, FileText, Tag, Loader2 } from "lucide-react";
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

const expenseCategories = [
    "Food",
    "Transport",
    "Shopping",
    "Bills",
    "Entertainment",
    "Health",
    "Education",
    "Other",
];

interface AddExpenseModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function AddExpenseModal({ open, onOpenChange }: AddExpenseModalProps) {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [status, setStatus] = useState<"completed" | "pending">("completed");
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    function resetForm() {
        setDescription("");
        setAmount("");
        setCategory("");
        setDate(new Date());
        setStatus("completed");
        setSubmitting(false);
        setSuccess(false);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitting(true);

        // Simulate a save (frontend-only)
        setTimeout(() => {
            setSubmitting(false);
            setSuccess(true);
            setTimeout(() => {
                onOpenChange(false);
                resetForm();
            }, 1200);
        }, 800);
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

                {success ? (
                    <div className="flex flex-col items-center gap-3 py-8">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
                            <svg
                                className="h-7 w-7 text-green-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2.5}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                            Expense added successfully!
                        </p>
                    </div>
                ) : (
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
                                <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <Input
                                    type="number"
                                    min="0.01"
                                    step="0.01"
                                    placeholder="0.00"
                                    className="pl-9"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Category */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-700">
                                Category
                            </label>
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
                                    {expenseCategories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Date — shadcn Calendar */}
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
                                            "rounded-lg border px-4 py-2 text-sm font-medium capitalize transition-colors",
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
                                disabled={!isValid || submitting}
                                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                                {submitting ? "Saving..." : "Add Expense"}
                            </button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
