// hooks/useTransactions.ts
import {
  TransactionParams,
  transactionService,
} from "@/lib/api/services/transactionService";
import { useQuery } from "@tanstack/react-query";

export function useTransactions(params?: TransactionParams) {
  return useQuery({
    queryKey: ["transactions", params],
    queryFn: async () => {
      const res = await transactionService.getAll(params);
      console.log("transactions response", res);
      return res.data;
    },
  });
}
