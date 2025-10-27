"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCategoryWithSubCategories } from "../actions";
import { SubCategoryResponse } from "@/app/types/category.type";

export function useCategoryWithSubCategories(categoryId: number | null) {
  return useQuery<SubCategoryResponse>({
    queryKey: ["category", categoryId],
    queryFn: () => fetchCategoryWithSubCategories(categoryId!),
    enabled: !!categoryId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
