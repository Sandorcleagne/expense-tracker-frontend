import api from "../axiosInstance";
export interface TransactionParams {
  type?: string;
  status?: string;
  limit?: number;
  skip?: number;
}
export const transactionService = {
  getAll: (params?: TransactionParams) =>
    api.get("/transactions/get-all-transactions", { params }),
};
