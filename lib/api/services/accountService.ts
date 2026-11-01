import api from "../axiosInstance";

export interface createAccountParams {
  name: string;
  type: string;
  balance: number;
  accountNumberLast4: string;
  bankCode: string;
}

export interface updateAccountParams {
  accountId: string;
  name?: string;
  type?: string;
  balance?: number;
  bankCode?: string;
  accountNumberLast4?: string;
}

export const accountService = {
  getAllAccounts: () => api.get("/accounts/get-user-accounts"),
  createAccount: (data: createAccountParams) =>
    api.post("/accounts/create-account", data),
  updateAccount: (data: updateAccountParams) =>
    api.patch(`/accounts/update-account`, data),
  deleteAccount: (id: string) => api.patch(`/accounts/delete-account/${id}`),
};
