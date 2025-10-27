import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createUser } from "../actions";
import { useSignupStore } from "../_stores/signup-store";
import { PATH } from "@/app/constants";

export function useSignup() {
  const { resetAllState } = useSignupStore();
  const router = useRouter();

  return useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      resetAllState();
      router.push(PATH.LOGIN.ROOT);
    },
    onError: (error) => {
      console.error("회원가입 실패:", error);
    },
  });
}
