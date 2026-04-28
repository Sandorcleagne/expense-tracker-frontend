"use client";

import {
    Landmark,
    CreditCard,
    User,
    Calendar,
    DollarSign,
    BadgeCheck,
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Account } from "@/types";
import { cn } from "@/lib/utils";

interface AccountDetailModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    account: Account | null;
}

function formatCurrency(value: number): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(value);
}

function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}

const accountTypeLabels: Record<string, string> = {
    savings: "Savings Account",
    current: "Current Account",
    credit: "Credit Card",
    wallet: "Digital Wallet",
};

export function AccountDetailModal({
    open,
    onOpenChange,
    account,
}: AccountDetailModalProps) {
    if (!account) return null;

    const details = [
        {
            icon: Landmark,
            label: "Bank",
            value: account.bankName,
        },
        {
            icon: CreditCard,
            label: "Account Type",
            value: accountTypeLabels[account.accountType] ?? account.accountType,
        },
        {
            icon: CreditCard,
            label: "Account Number",
            value: account.accountNumber,
        },
        {
            icon: User,
            label: "Account Holder",
            value: account.holderName,
        },
        {
            icon: DollarSign,
            label: "Balance",
            value: formatCurrency(account.balance),
            valueClass:
                account.balance >= 0 ? "text-green-600" : "text-red-600",
        },
        {
            icon: Calendar,
            label: "Last Transaction",
            value: formatDate(account.lastTransactionDate),
        },
    ];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="flex items-center gap-3">
                        <div
                            className="flex h-10 w-10 items-center justify-center rounded-lg"
                            style={{ backgroundColor: `${account.color}15` }}
                        >
                            <Landmark
                                className="h-5 w-5"
                                style={{ color: account.color }}
                            />
                        </div>
                        <div>
                            <DialogTitle className="flex items-center gap-2">
                                {account.bankName}
                                {account.isDefault && (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                                        <BadgeCheck className="h-3 w-3" />
                                        Default
                                    </span>
                                )}
                            </DialogTitle>
                            <DialogDescription>
                                {accountTypeLabels[account.accountType] ??
                                    account.accountType}
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="mt-4 space-y-3">
                    {details.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.label}
                                className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50/50 px-4 py-3"
                            >
                                <div className="flex items-center gap-3">
                                    <Icon className="h-4 w-4 text-gray-400" />
                                    <span className="text-sm text-gray-500">
                                        {item.label}
                                    </span>
                                </div>
                                <span
                                    className={cn(
                                        "text-sm font-medium text-gray-900",
                                        item.valueClass
                                    )}
                                >
                                    {item.value}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </DialogContent>
        </Dialog>
    );
}
