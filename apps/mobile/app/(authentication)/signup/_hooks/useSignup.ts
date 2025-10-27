import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createUser } from "../actions";
import { useSignupStore } from "../_stores/signup-store";

export function useSignup() {
  const { resetAllState } = useSignupStore();
  const router = useRouter();

  return useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      resetAllState();
      router.push("/login");
    },
    onError: (error) => {
      console.error("회원가입 실패:", error);
    },
  });
}
