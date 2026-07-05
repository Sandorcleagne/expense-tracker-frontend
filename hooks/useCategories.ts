import { categoryService } from "@/lib/api/services/categoryService";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse, CategoriesResult } from "@/types";

export function useCategories() {
  return useQuery<ApiResponse<CategoriesResult>>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await categoryService.getCategories();
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}
