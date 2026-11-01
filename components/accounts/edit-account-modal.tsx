"use client";

import { useEffect, useState } from "react";
import {
  FileText,
  Tag,
  IndianRupeeIcon,
  ChevronDown,
  Building2,
  Loader2,
} from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "../ui/input";
import { indianBanks } from "@/lib/utils/bank-list";
import { useUpdateAccount } from "@/hooks/useAccounts";
import { toast } from "sonner";
import { Account } from "@/types";

interface EditAccountModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  account: Account | null;
}

const accountTypes = [
  { value: "SAVINGS", label: "Savings" },
  { value: "CURRENT", label: "Current" },
  { value: "CREDIT_CARD", label: "Credit Card" },
  { value: "CASH", label: "Cash" },
  { value: "WALLET", label: "Wallet" },
];

const EditAccountModal = ({
  open,
  onOpenChange,
  account,
}: EditAccountModalProps) => {
  const updateAccount = useUpdateAccount();

  const [accountName, setAccountName] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [type, setType] = useState("");
  const [balance, setBalance] = useState<number | string>("");
  const [bankOpen, setBankOpen] = useState(false);

  useEffect(() => {
    if (account) {
      setAccountName(account.name ?? "");
      setBankCode(account.bankCode ?? "");
      setType(account.type?.toUpperCase() ?? "");
      setBalance(account.balance ?? "");
    }
  }, [account]);

  const selectedBank =
    indianBanks.find(
      (b) => b.shortName.toLowerCase() === bankCode.toLowerCase(),
    ) ?? null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!account) return;

    // Only include fields that have actually changed
    const changes: Parameters<typeof updateAccount.mutate>[0] = {
      accountId: account._id,
    };
    if (accountName !== (account.name ?? "")) changes.name = accountName;
    if (type !== (account.type?.toUpperCase() ?? "")) changes.type = type;
    if (Number(balance) !== account.balance) changes.balance = Number(balance);
    if (bankCode !== (account.bankCode ?? "")) changes.bankCode = bankCode;

    updateAccount.mutate(
      changes,
      {
        onSuccess: () => {
          toast.success("Account updated successfully!");
          setTimeout(() => onOpenChange(false), 1000);
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || "Failed to update account",
          );
        },
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Account</DialogTitle>
          <DialogDescription>
            Update the details for <strong>{account?.name}</strong>.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Account Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              Account Name
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Kotak Savings Account.."
                className="pl-9"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Bank Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              Bank Name
            </label>
            <Popover open={bankOpen} onOpenChange={setBankOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  id="edit-bank-picker-trigger"
                  aria-haspopup="listbox"
                  aria-expanded={bankOpen}
                  className="flex h-9 w-full items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-sm shadow-sm transition-colors hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {selectedBank ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={selectedBank.logoPath}
                        alt={selectedBank.name}
                        width={20}
                        height={20}
                        className="h-5 w-5 flex-shrink-0 rounded object-contain"
                      />
                      <span className="flex-1 text-left text-gray-800">
                        {selectedBank.name}
                      </span>
                    </>
                  ) : (
                    <>
                      <Building2 className="h-4 w-4 flex-shrink-0 text-gray-400" />
                      <span className="flex-1 text-left text-gray-400">
                        Select a Bank
                      </span>
                    </>
                  )}
                  <ChevronDown
                    className={`h-4 w-4 flex-shrink-0 text-gray-400 transition-transform duration-200 ${
                      bankOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="p-2"
                align="start"
                style={{ width: "var(--radix-popover-trigger-width)" }}
              >
                <div
                  className="grid grid-cols-2 gap-1.5 overflow-y-scroll overscroll-contain"
                  style={{ maxHeight: "14rem" }}
                >
                  {indianBanks.map((bank) => (
                    <button
                      key={bank.id}
                      type="button"
                      role="option"
                      aria-selected={
                        bankCode.toLowerCase() === bank.shortName.toLowerCase()
                      }
                      onClick={() => {
                        setBankCode(bank.shortName);
                        setBankOpen(false);
                      }}
                      className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-medium transition-all hover:bg-gray-50 ${
                        bankCode.toLowerCase() === bank.shortName.toLowerCase()
                          ? "bg-blue-50 ring-2 ring-blue-500"
                          : "border border-gray-100"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={bank.logoPath}
                        alt={bank.name}
                        width={28}
                        height={28}
                        className="h-7 w-7 flex-shrink-0 rounded-md object-contain"
                      />
                      <span className="truncate leading-tight text-gray-700">
                        {bank.name}
                      </span>
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Account Type */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              Account Type
            </label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <select
                className="flex h-9 w-full appearance-none rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select a type
                </option>
                {accountTypes.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Balance */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Balance</label>
            <div className="relative">
              <IndianRupeeIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="number"
                min="0"
                placeholder="0"
                className="pl-9"
                value={balance}
                onChange={(e) => setBalance(Number(e.target.value))}
                onWheel={(e) => e.currentTarget.blur()}
                required
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-2">
            <DialogClose asChild>
              <button
                type="button"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
            </DialogClose>
            <button
              type="submit"
              disabled={updateAccount.isPending}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
              {updateAccount.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving…
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAccountModal;
