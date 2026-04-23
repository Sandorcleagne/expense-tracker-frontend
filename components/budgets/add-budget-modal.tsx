"use client";

import { useState } from "react";
import { DollarSign, Tag, Palette, Loader2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const budgetCategories = [
    "Food",
    "Transport",
    "Shopping",
    "Bills",
    "Entertainment",
    "Health",
    "Education",
    "Savings",
    "Travel",
    "Other",
];

const colorOptions = [
    { label: "Orange", value: "#f97316" },
    { label: "Blue", value: "#3b82f6" },
    { label: "Purple", value: "#a855f7" },
    { label: "Red", value: "#ef4444" },
    { label: "Green", value: "#22c55e" },
    { label: "Cyan", value: "#06b6d4" },
    { label: "Yellow", value: "#eab308" },
    { label: "Teal", value: "#14b8a6" },
    { label: "Pink", value: "#ec4899" },
    { label: "Slate", value: "#64748b" },
];

const periodOptions = ["Monthly", "Weekly", "Yearly"] as const;

interface AddBudgetModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function AddBudgetModal({ open, onOpenChange }: AddBudgetModalProps) {
    const [category, setCategory] = useState("");
    const [budgetAmount, setBudgetAmount] = useState("");
    const [color, setColor] = useState(colorOptions[0].value);
    const [period, setPeriod] = useState<(typeof periodOptions)[number]>("Monthly");
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    function resetForm() {
        setCategory("");
        setBudgetAmount("");
        setColor(colorOptions[0].value);
        setPeriod("Monthly");
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
        category !== "" &&
        budgetAmount.trim() !== "" &&
        Number(budgetAmount) > 0;

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Add New Budget</DialogTitle>
                    <DialogDescription>
                        Set a spending limit for a category to stay on track.
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
                            Budget created successfully!
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
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
                                    {budgetCategories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Budget amount */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-700">
                                Budget Limit
                            </label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <Input
                                    type="number"
                                    min="1"
                                    step="1"
                                    placeholder="e.g. 1500"
                                    className="pl-9"
                                    value={budgetAmount}
                                    onChange={(e) => setBudgetAmount(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Period */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-700">
                                Period
                            </label>
                            <div className="flex gap-2">
                                {periodOptions.map((p) => (
                                    <button
                                        key={p}
                                        type="button"
                                        onClick={() => setPeriod(p)}
                                        className={cn(
                                            "rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
                                            period === p
                                                ? "border-blue-600 bg-blue-50 text-blue-700"
                                                : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                                        )}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Color picker */}
                        <div className="space-y-1.5">
                            <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                                <Palette className="h-4 w-4 text-gray-400" />
                                Color
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {colorOptions.map((c) => (
                                    <button
                                        key={c.value}
                                        type="button"
                                        onClick={() => setColor(c.value)}
                                        className={cn(
                                            "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-transform hover:scale-110",
                                            color === c.value
                                                ? "border-gray-900 scale-110"
                                                : "border-transparent"
                                        )}
                                        title={c.label}
                                    >
                                        <span
                                            className="h-5 w-5 rounded-full"
                                            style={{ backgroundColor: c.value }}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Preview */}
                        {category && budgetAmount && (
                            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                                <p className="text-xs font-medium text-gray-500">Preview</p>
                                <div className="mt-2 flex items-center gap-2.5">
                                    <div
                                        className="h-3 w-3 rounded-full"
                                        style={{ backgroundColor: color }}
                                    />
                                    <span className="font-medium text-gray-900">{category}</span>
                                </div>
                                <div className="mt-2 flex items-end justify-between">
                                    <div>
                                        <p className="text-lg font-bold text-gray-900">
                                            $0{" "}
                                            <span className="text-sm font-normal text-gray-400">
                                                of ${Number(budgetAmount).toLocaleString()}
                                            </span>
                                        </p>
                                    </div>
                                    <span className="text-xs text-gray-400">{period}</span>
                                </div>
                                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                                    <div
                                        className="h-full rounded-full"
                                        style={{ width: "0%", backgroundColor: color }}
                                    />
                                </div>
                            </div>
                        )}

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
                                {submitting ? "Creating..." : "Create Budget"}
                            </button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
