import { useMutation } from "@tanstack/react-query";
import { createUser } from "../actions";
import { useSignupStore } from "../_stores/signup-store";

export function useSignup() {
  const { resetAllState } = useSignupStore();

  return useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      console.log("회원가입 성공:", data.message);
      resetAllState();
    },
    onError: (error) => {
      console.error("회원가입 실패:", error);
    },
  });
}
