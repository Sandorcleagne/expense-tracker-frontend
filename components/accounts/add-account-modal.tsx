"use client";
import {
  FileText,
  Tag,
  IndianRupeeIcon,
  ChevronDown,
  Building2,
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
import { useState } from "react";
import { indianBanks } from "@/lib/utils/bank-list";
import { useCreateAccount } from "@/hooks/useAccounts";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface AddAccountModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const accountTypes = [
  { value: "SAVINGS", label: "Savings" },
  { value: "CURRENT", label: "Current" },
  { value: "CREDIT_CARD", label: "Credit Card" },
  { value: "CASH", label: "Cash" },
  { value: "WALLET", label: "Wallet" },
];

const AddAccountModal = ({ open, onOpenChange }: AddAccountModalProps) => {
  const createAccount = useCreateAccount();

  const [accountName, setAccountName] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [bankCode, setBankCode] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [balance, setBalance] = useState<number | string>("");
  const [bankOpen, setBankOpen] = useState(false);

  const selectedBank =
    indianBanks.find((b) => b.shortName === bankCode) ?? null;

  function resetForm() {
    setAccountName("");
    setAccountNumber("");
    setBankCode("");
    setType("");
    setBalance("");
    setBankOpen(false);
  }

  function handleOpenChange(value: boolean) {
    onOpenChange(value);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    createAccount.mutate(
      {
        name: accountName,
        type,
        balance: Number(balance),
        accountNumberLast4: accountNumber,
        bankCode: bankCode,
      },
      {
        onSuccess: () => {
          toast.success("Account added successfully!");
          setTimeout(() => {
            onOpenChange(false);
            resetForm();
          }, 1200);
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || "Failed to add account",
          );
        },
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Account</DialogTitle>
          <DialogDescription>
            Fill in the details below to record a new account.
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
                placeholder={"Kotak Savings Account.."}
                className="pl-9"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Bank Name — Radix Popover picker */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              Bank Name
            </label>
            <Popover open={bankOpen} onOpenChange={setBankOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  id="bank-picker-trigger"
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
                      aria-selected={bankCode === bank.shortName}
                      onClick={() => {
                        setBankCode(bank.shortName);
                        setBankOpen(false);
                      }}
                      className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-medium transition-all hover:bg-gray-50 ${
                        bankCode === bank.shortName
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

          {/* Account Number */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              Account Number (last 4 digits)
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="1234"
                className="pl-9"
                value={accountNumber}
                onChange={(e) =>
                  setAccountNumber(
                    e.target.value.replace(/\D/g, "").slice(0, 4),
                  )
                }
                maxLength={4}
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
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select a type
                </option>
                {accountTypes?.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
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
                step="0"
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
          <div className="flex items-center justify-end gap-2 pt-2 cursor-pointer">
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
              disabled={createAccount.isPending}
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer bg-blue-600"
            >
              {createAccount.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Account"
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAccountModal;
