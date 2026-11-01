"use client";

import { useState } from "react";
import {
  Landmark,
  CreditCard,
  Wallet2,
  BadgeCheck,
  DollarSign,
  Plus,
  Banknote,
  Loader2,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Account } from "@/types";
import { AccountDetailModal } from "./account-detail-modal";
import { cn } from "@/lib/utils";
import AddAccountModal from "./add-account-modal";
import EditAccountModal from "./edit-account-modal";
import { useAccounts, useDeleteAccount } from "@/hooks/useAccounts";
import { indianBanks } from "@/lib/utils/bank-list";
import { toast } from "sonner";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
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
  credit_card: CreditCard,
  wallet: Wallet2,
  cash: Banknote,
};

const accountTypeLabels: Record<string, string> = {
  savings: "Savings Account",
  current: "Current Account",
  credit_card: "Credit Card",
  wallet: "Digital Wallet",
  cash: "Cash",
};

export function AccountsPageContent() {
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editAccount, setEditAccount] = useState<Account | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Account | null>(null);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const { data, isLoading, isError } = useAccounts();
  const deleteAccount = useDeleteAccount();

  const accountsList: Account[] = data?.result ?? [];
  const totalBalance = accountsList.reduce((sum, a) => sum + a.balance, 0);
  const defaultAccount = accountsList.find((a) => a.isDefault);
  const accountCount = accountsList.length;

  function handleSetDefault(_accountId: string) {
    // TODO: wire up to API
  }

  function handleOpenDetail(account: Account) {
    setSelectedAccount(account);
    setDetailOpen(true);
  }

  function handleEdit(e: React.MouseEvent, account: Account) {
    e.stopPropagation();
    setMenuOpenId(null);
    setEditAccount(account);
    setEditOpen(true);
  }

  function handleDeleteConfirm(e: React.MouseEvent, account: Account) {
    e.stopPropagation();
    setMenuOpenId(null);
    setDeleteTarget(account);
  }

  function handleDelete() {
    if (!deleteTarget) return;
    deleteAccount.mutate(deleteTarget._id, {
      onSuccess: () => {
        toast.success("Account deleted successfully!");
        setDeleteTarget(null);
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || "Failed to delete account",
        );
      },
    });
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
                    totalBalance >= 0 ? "text-gray-900" : "text-red-600",
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
                  {defaultAccount?.name ?? "None"}
                </p>
                {defaultAccount && (
                  <p className="text-xs text-gray-400">
                    {accountTypeLabels[defaultAccount.type]}
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
        <h2 className="text-lg font-semibold text-gray-900">Your Accounts</h2>
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Add Account
        </button>
      </div>

      {/* Accounts list */}
      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <span className="ml-3 text-sm text-gray-500">Loading accounts…</span>
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-sm font-medium text-red-500">
            Failed to load accounts.
          </p>
          <p className="mt-1 text-xs text-gray-400">
            Please check your connection and try again.
          </p>
        </div>
      ) : accountsList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Wallet2 className="h-10 w-10 text-gray-300" />
          <p className="mt-3 text-sm font-medium text-gray-500">
            No accounts yet
          </p>
          <p className="mt-1 text-xs text-gray-400">
            Click "Add Account" to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {accountsList.map((account) => {
            const Icon = accountTypeIcons[account.type] ?? Landmark;

            return (
              <Card
                key={account._id}
                className="cursor-pointer transition-shadow hover:shadow-md"
                onClick={() => handleOpenDetail(account)}
              >
                <CardContent className="p-6">
                  {/* Header row */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {/* Icon: bank logo or account-type icon */}
                      {(() => {
                        const bank = account.bankCode
                          ? indianBanks.find(
                              (b) =>
                                b.shortName.toLowerCase() ===
                                account.bankCode!.toLowerCase(),
                            )
                          : null;
                        return bank ? (
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-gray-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={bank.logoPath}
                              alt={bank.name}
                              width={28}
                              height={28}
                              className="h-7 w-7 object-contain"
                            />
                          </div>
                        ) : (
                          <div
                            className="flex h-10 w-10 items-center justify-center rounded-lg"
                            style={{ backgroundColor: `${account.color}15` }}
                          >
                            <Icon
                              className="h-5 w-5"
                              style={{ color: account.color }}
                            />
                          </div>
                        );
                      })()}
                      <div>
                        <p className="font-medium text-gray-900">
                          {account.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {accountTypeLabels[account.type] ?? account.type}
                        </p>
                      </div>
                    </div>
                    {/* Right side: default badge + three-dot menu */}
                    <div className="flex items-center gap-1.5">
                      {account.isDefault && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                          <BadgeCheck className="h-3 w-3" />
                          Default
                        </span>
                      )}
                      {/* Three-dot menu */}
                      <div className="relative">
                        <button
                          id={`account-menu-${account._id}`}
                          aria-label="Account options"
                          onClick={(e) => {
                            e.stopPropagation();
                            setMenuOpenId(
                              menuOpenId === account._id ? null : account._id,
                            );
                          }}
                          className="flex h-7 w-7 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>
                        {menuOpenId === account._id && (
                          <>
                            {/* Click-outside overlay */}
                            <div
                              className="fixed inset-0 z-10"
                              onClick={(e) => {
                                e.stopPropagation();
                                setMenuOpenId(null);
                              }}
                            />
                            <div className="absolute right-0 top-8 z-20 w-36 rounded-lg border border-gray-100 bg-white py-1 shadow-lg">
                              <button
                                id={`edit-account-${account._id}`}
                                onClick={(e) => handleEdit(e, account)}
                                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                              >
                                <Pencil className="h-3.5 w-3.5 text-gray-400" />
                                Edit
                              </button>
                              <button
                                id={`delete-account-${account._id}`}
                                onClick={(e) => handleDeleteConfirm(e, account)}
                                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                                Delete
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Balance */}
                  <div className="mt-4">
                    <p
                      className={cn(
                        "text-xl font-bold",
                        account.balance >= 0 ? "text-gray-900" : "text-red-600",
                      )}
                    >
                      {formatCurrency(account.balance)}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSetDefault(account._id);
                      }}
                      className={cn(
                        "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                        account.isDefault ? "bg-blue-600" : "bg-gray-200",
                      )}
                      role="switch"
                      aria-checked={account.isDefault}
                      aria-label={`Set ${account.name} as default`}
                    >
                      <span
                        className={cn(
                          "pointer-events-none inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm ring-0 transition-transform",
                          account.isDefault
                            ? "translate-x-[18px]"
                            : "translate-x-[3px]",
                        )}
                      />
                    </button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Account detail modal */}
      <AccountDetailModal
        open={detailOpen}
        onOpenChange={setDetailOpen}
        account={selectedAccount}
      />
      <AddAccountModal open={modalOpen} onOpenChange={setModalOpen} />

      {/* Edit account modal */}
      <EditAccountModal
        open={editOpen}
        onOpenChange={setEditOpen}
        account={editAccount}
      />

      {/* Delete confirmation dialog */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-1 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                <Trash2 className="h-5 w-5 text-red-600" />
              </div>
              <h3 className="text-base font-semibold text-gray-900">
                Delete Account
              </h3>
            </div>
            <p className="mt-3 text-sm text-gray-500">
              Are you sure you want to delete{" "}
              <strong className="text-gray-800">{deleteTarget.name}</strong>?
              This action cannot be undone.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                id="cancel-delete-account"
                onClick={() => setDeleteTarget(null)}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                id="confirm-delete-account"
                onClick={handleDelete}
                disabled={deleteAccount.isPending}
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50 cursor-pointer"
              >
                {deleteAccount.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Deleting…
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
