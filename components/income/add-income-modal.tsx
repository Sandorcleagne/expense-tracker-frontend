"use client";

import { useState } from "react";
import { DollarSign, FileText, Tag, RefreshCw, Loader2 } from "lucide-react";
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

const incomeCategories = [
    "Employment",
    "Freelance",
    "Investments",
    "Real Estate",
    "Side Hustle",
    "Government",
    "Gifts",
    "Other",
];

interface AddIncomeModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function AddIncomeModal({ open, onOpenChange }: AddIncomeModalProps) {
    const [source, setSource] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [recurring, setRecurring] = useState(false);
    const [status, setStatus] = useState<"received" | "pending">("received");
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    function resetForm() {
        setSource("");
        setAmount("");
        setCategory("");
        setDate(new Date());
        setRecurring(false);
        setStatus("received");
        setSubmitting(false);
        setSuccess(false);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitting(true);

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
        source.trim() !== "" &&
        amount.trim() !== "" &&
        Number(amount) > 0 &&
        category !== "" &&
        date !== undefined;

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Add New Income</DialogTitle>
                    <DialogDescription>
                        Fill in the details below to record a new income source.
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
                            Income added successfully!
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                        {/* Source */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-700">
                                Source
                            </label>
                            <div className="relative">
                                <FileText className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <Input
                                    placeholder="e.g. Monthly Salary"
                                    className="pl-9"
                                    value={source}
                                    onChange={(e) => setSource(e.target.value)}
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
                                    {incomeCategories.map((cat) => (
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
                                placeholder="Select income date"
                            />
                        </div>

                        {/* Recurring toggle */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-700">
                                Recurring
                            </label>
                            <button
                                type="button"
                                onClick={() => setRecurring(!recurring)}
                                className={cn(
                                    "inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
                                    recurring
                                        ? "border-blue-600 bg-blue-50 text-blue-700"
                                        : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                                )}
                            >
                                <RefreshCw className="h-4 w-4" />
                                {recurring ? "Recurring" : "One-time"}
                            </button>
                        </div>

                        {/* Status */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-700">
                                Status
                            </label>
                            <div className="flex gap-2">
                                {(["received", "pending"] as const).map((s) => (
                                    <button
                                        key={s}
                                        type="button"
                                        onClick={() => setStatus(s)}
                                        className={cn(
                                            "rounded-lg border px-4 py-2 text-sm font-medium capitalize transition-colors",
                                            status === s
                                                ? "border-green-600 bg-green-50 text-green-700"
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
                                className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                                {submitting ? "Saving..." : "Add Income"}
                            </button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
