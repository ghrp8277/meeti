"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchBanks } from "../actions";

export function useBanks() {
  return useInfiniteQuery({
    queryKey: ["banks"],
    queryFn: ({ pageParam = 1 }) =>
      fetchBanks({ page: pageParam, take: 10, order: "ASC" }),
    getNextPageParam: (lastPage) => {
      const meta = lastPage.data.meta;
      if (meta.hasNextPage) {
        return meta.currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
