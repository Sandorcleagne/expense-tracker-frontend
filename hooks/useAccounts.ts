import { accountService } from "@/lib/api/services/accountService";
import { useQuery } from "@tanstack/react-query";
import { Account, ApiResponse } from "@/types";

export function useAccounts() {
  return useQuery<ApiResponse<Account[]>>({
    queryKey: ["accounts"],
    queryFn: async () => {
      const res = await accountService.getAllAccounts();
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

