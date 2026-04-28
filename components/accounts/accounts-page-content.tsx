"use client";

import { useState } from "react";
import {
    Landmark,
    CreditCard,
    Wallet2,
    BadgeCheck,
    DollarSign,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { accounts as initialAccounts } from "@/lib/dummy-data";
import { Account } from "@/types";
import { AccountDetailModal } from "./account-detail-modal";
import { cn } from "@/lib/utils";

function formatCurrency(value: number): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(value);
}

function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

const accountTypeIcons: Record<string, typeof Landmark> = {
    savings: Landmark,
    current: Landmark,
    credit: CreditCard,
    wallet: Wallet2,
};

const accountTypeLabels: Record<string, string> = {
    savings: "Savings Account",
    current: "Current Account",
    credit: "Credit Card",
    wallet: "Digital Wallet",
};

export function AccountsPageContent() {
    const [accountsList, setAccountsList] = useState<Account[]>(initialAccounts);
    const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
    const [detailOpen, setDetailOpen] = useState(false);

    const totalBalance = accountsList.reduce((sum, a) => sum + a.balance, 0);
    const defaultAccount = accountsList.find((a) => a.isDefault);
    const accountCount = accountsList.length;

    function handleSetDefault(accountId: string) {
        setAccountsList((prev) =>
            prev.map((a) => ({
                ...a,
                isDefault: a.id === accountId,
            }))
        );
    }

    function handleOpenDetail(account: Account) {
        setSelectedAccount(account);
        setDetailOpen(true);
    }

    return (
        <div className="space-y-6">
            {/* Summary cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Card className="transition-shadow hover:shadow-md">
                    <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Total Balance
                                </p>
                                <p
                                    className={cn(
                                        "mt-1 text-2xl font-bold",
                                        totalBalance >= 0
                                            ? "text-gray-900"
                                            : "text-red-600"
                                    )}
                                >
                                    {formatCurrency(totalBalance)}
                                </p>
                            </div>
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                                <DollarSign className="h-5 w-5 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="transition-shadow hover:shadow-md">
                    <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Total Accounts
                                </p>
                                <p className="mt-1 text-2xl font-bold text-gray-900">
                                    {accountCount}
                                </p>
                            </div>
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50">
                                <CreditCard className="h-5 w-5 text-purple-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="transition-shadow hover:shadow-md">
                    <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Default Account
                                </p>
                                <p className="mt-1 text-lg font-bold text-gray-900 truncate">
                                    {defaultAccount?.bankName ?? "None"}
                                </p>
                                {defaultAccount && (
                                    <p className="text-xs text-gray-400">
                                        {accountTypeLabels[defaultAccount.accountType]}
                                    </p>
                                )}
                            </div>
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
                                <BadgeCheck className="h-5 w-5 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Accounts list header */}
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                    Your Accounts
                </h2>
            </div>

            {/* Accounts list */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {accountsList.map((account) => {
                    const Icon =
                        accountTypeIcons[account.accountType] ?? Landmark;

                    return (
                        <Card
                            key={account.id}
                            className="cursor-pointer transition-shadow hover:shadow-md"
                            onClick={() => handleOpenDetail(account)}
                        >
                            <CardContent className="p-6">
                                {/* Header row */}
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="flex h-10 w-10 items-center justify-center rounded-lg"
                                            style={{
                                                backgroundColor: `${account.color}15`,
                                            }}
                                        >
                                            <Icon
                                                className="h-5 w-5"
                                                style={{ color: account.color }}
                                            />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">
                                                {account.bankName}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                {accountTypeLabels[account.accountType]}
                                            </p>
                                        </div>
                                    </div>
                                    {account.isDefault && (
                                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                                            <BadgeCheck className="h-3 w-3" />
                                            Default
                                        </span>
                                    )}
                                </div>

                                {/* Balance */}
                                <div className="mt-4">
                                    <p className="text-xs text-gray-400">
                                        {account.accountNumber}
                                    </p>
                                    <p
                                        className={cn(
                                            "mt-1 text-xl font-bold",
                                            account.balance >= 0
                                                ? "text-gray-900"
                                                : "text-red-600"
                                        )}
                                    >
                                        {formatCurrency(account.balance)}
                                    </p>
                                </div>

                                {/* Footer */}
                                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                                    <p className="text-xs text-gray-400">
                                        Last txn:{" "}
                                        {formatDate(account.lastTransactionDate)}
                                    </p>

                                    {/* Default switcher */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleSetDefault(account.id);
                                        }}
                                        className={cn(
                                            "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                                            account.isDefault
                                                ? "bg-blue-600"
                                                : "bg-gray-200"
                                        )}
                                        role="switch"
                                        aria-checked={account.isDefault}
                                        aria-label={`Set ${account.bankName} as default`}
                                    >
                                        <span
                                            className={cn(
                                                "pointer-events-none inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm ring-0 transition-transform",
                                                account.isDefault
                                                    ? "translate-x-[18px]"
                                                    : "translate-x-[3px]"
                                            )}
                                        />
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Account detail modal */}
            <AccountDetailModal
                open={detailOpen}
                onOpenChange={setDetailOpen}
                account={selectedAccount}
            />
        </div>
    );
}
