"use client";

import { useMutation } from "@tanstack/react-query";
import { sendPhoneVerification } from "../actions";

export function usePhoneVerification() {
  return useMutation({
    mutationFn: sendPhoneVerification,
    onSuccess: (data) => {
      console.log(data.message);
    },
    onError: (error) => {
      console.error("인증번호 발송 실패:", error);
    },
  });
}
