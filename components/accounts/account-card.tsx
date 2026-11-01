"use client";

import { useState } from "react";
import {
  Landmark,
  CreditCard,
  Wallet2,
  BadgeCheck,
  Banknote,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Account } from "@/types";
import { indianBanks } from "@/lib/utils/bank-list";
import { cn } from "@/lib/utils";

// ── shared lookup maps ────────────────────────────────────────────────────────
const accountTypeIcons: Record<string, typeof Landmark> = {
  savings: Landmark,
  current: Landmark,
  credit_card: CreditCard,
  wallet: Wallet2,
  cash: Banknote,
};

export const accountTypeLabels: Record<string, string> = {
  savings: "Savings Account",
  current: "Current Account",
  credit_card: "Credit Card",
  wallet: "Digital Wallet",
  cash: "Cash",
};

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

// ── component ─────────────────────────────────────────────────────────────────
interface AccountCardProps {
  account: Account;
  onOpenDetail: (account: Account) => void;
  onEdit: (account: Account) => void;
  onDeleteConfirm: (account: Account) => void;
  onSetDefault: (accountId: string) => void;
}

export function AccountCard({
  account,
  onOpenDetail,
  onEdit,
  onDeleteConfirm,
  onSetDefault,
}: AccountCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const Icon = accountTypeIcons[account.type] ?? Landmark;

  const bank = account.bankCode
    ? indianBanks.find(
        (b) =>
          b.shortName.toLowerCase() === account.bankCode!.toLowerCase(),
      )
    : null;

  return (
    <Card
      className="cursor-pointer transition-shadow hover:shadow-md"
      onClick={() => onOpenDetail(account)}
    >
      <CardContent className="p-6">
        {/* ── Header row ──────────────────────────────────────────────── */}
        <div className="flex items-start justify-between">
          {/* Left: icon + name */}
          <div className="flex items-center gap-3">
            {bank ? (
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
                <Icon className="h-5 w-5" style={{ color: account.color }} />
              </div>
            )}
            <div>
              <p className="font-medium text-gray-900">{account.name}</p>
              <p className="text-xs text-gray-400">
                {accountTypeLabels[account.type] ?? account.type}
              </p>
            </div>
          </div>

          {/* Right: default badge + three-dot menu */}
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
                  setMenuOpen((prev) => !prev);
                }}
                className="flex h-7 w-7 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              >
                <MoreVertical className="h-4 w-4" />
              </button>

              {menuOpen && (
                <>
                  {/* Click-outside overlay */}
                  <div
                    className="fixed inset-0 z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpen(false);
                    }}
                  />
                  <div className="absolute right-0 top-8 z-20 w-36 rounded-lg border border-gray-100 bg-white py-1 shadow-lg">
                    <button
                      id={`edit-account-${account._id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpen(false);
                        onEdit(account);
                      }}
                      className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      <Pencil className="h-3.5 w-3.5 text-gray-400" />
                      Edit
                    </button>
                    <button
                      id={`delete-account-${account._id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpen(false);
                        onDeleteConfirm(account);
                      }}
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

        {/* ── Balance ─────────────────────────────────────────────────── */}
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

        {/* ── Footer: default toggle ───────────────────────────────────── */}
        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSetDefault(account._id);
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
                account.isDefault ? "translate-x-[18px]" : "translate-x-[3px]",
              )}
            />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
