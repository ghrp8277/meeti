"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchSignupTos } from "../actions";
import { Tos } from "../../../types/tos.type";

export function useSignupTos() {
  return useQuery<{ success: boolean; data: Tos[] }>({
    queryKey: ["signup-tos"],
    queryFn: fetchSignupTos,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
