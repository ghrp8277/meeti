"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createSettlementAccount } from "../actions";
import { useAccountRegister } from "../_providers/account-register-provider";
import { PATH } from "@/app/constants";

export function useSettlementAccount() {
  const { reset } = useAccountRegister();
  const router = useRouter();

  return useMutation({
    mutationFn: createSettlementAccount,
    onSuccess: () => {
      reset();
      router.push(PATH.MY.CARD.ROOT);
    },
    onError: (error) => {
      console.error("정산 계좌 등록 실패:", error);
    },
  });
}
