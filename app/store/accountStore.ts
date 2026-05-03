import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Account {
  _id: string;
  name: string;
  type: "SAVING" | "CURRENT" | "CREDIT"; // add more as needed
  balance: number;
  isDefault: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface AccountStore {
  accounts: Account[];
  setAccounts: (accounts: Account[]) => void;
  addAccount: (account: Account) => void;
  removeAccount: (accountId: string) => void;
  updateAccount: (accountId: string, account: Account) => void;
}

export const useAccountStore = create<AccountStore>()(
  persist(
    (set) => ({
      accounts: [],
      setAccounts: (accounts: Account[]) => set({ accounts }),
      addAccount: (account: Account) =>
        set((state) => ({ accounts: [...state.accounts, account] })),
      removeAccount: (accountId: string) =>
        set((state) => ({
          accounts: state.accounts.filter((a) => a._id !== accountId),
        })),
      updateAccount: (accountId: string, account: Account) =>
        set((state) => ({
          accounts: state.accounts.map((a) =>
            a._id === accountId ? account : a,
          ),
        })),
    }),
    {
      name: "accounts-storage", // localStorage key name
    },
  ),
);
