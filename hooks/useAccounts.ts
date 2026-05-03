import { accountService } from "@/lib/api/services/accountService";
import { useQuery } from "@tanstack/react-query";

export function useAccounts() {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const res = await accountService.getAllAccounts();
      return res.data;
    },
  });
}
