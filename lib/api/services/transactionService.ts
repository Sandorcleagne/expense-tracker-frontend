import api from "../axiosInstance";
export interface TransactionParams {
  type?: string;
  status?: string;
  limit?: number;
  skip?: number;
}
export interface CreateTransactionParams {
  type: string;
  amount: number;
  accountId: string;
  description: string;
  category: string;
  status: string;
  transactionDate: string;
}
export const transactionService = {
  getAll: (params?: TransactionParams) =>
    api.get("/transactions/get-all-transactions", { params }),
  createTransaction: (data: CreateTransactionParams) =>
    api.post("/transactions/create-transaction", data),
};
