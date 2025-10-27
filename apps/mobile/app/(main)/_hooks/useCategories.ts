"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../actions";
import { CategoryResponse } from "@/app/types/category.type";

export function useCategories() {
  return useQuery<CategoryResponse>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
