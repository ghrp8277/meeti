"use client";

import { useMutation } from "@tanstack/react-query";
import { verifyPhoneCode } from "../actions";

export function usePhoneCodeVerification() {
  return useMutation({
    mutationFn: ({
      phoneNumber,
      code,
    }: {
      phoneNumber: string;
      code: string;
    }) => verifyPhoneCode(phoneNumber, code),
    onSuccess: (data) => {
      console.log(data.message);
    },
    onError: (error) => {
      console.error("인증번호 확인 실패:", error);
    },
  });
}
