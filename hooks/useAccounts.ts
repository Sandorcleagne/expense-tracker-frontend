import {
  accountService,
  createAccountParams,
  updateAccountParams,
} from "@/lib/api/services/accountService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

export function useCreateAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: createAccountParams) =>
      accountService?.createAccount(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
}

export function useUpdateAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: updateAccountParams) =>
      accountService.updateAccount(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
}

export function useDeleteAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => accountService.deleteAccount(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
}
