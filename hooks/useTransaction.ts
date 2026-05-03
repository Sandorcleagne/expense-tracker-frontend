// hooks/useTransactions.ts
import {
  CreateTransactionParams,
  TransactionParams,
  transactionService,
} from "@/lib/api/services/transactionService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useTransactions(params?: TransactionParams) {
  return useQuery({
    queryKey: ["transactions", params],
    queryFn: async () => {
      const res = await transactionService.getAll(params);
      return res.data;
    },
  });
}

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTransactionParams) =>
      transactionService.createTransaction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
}
