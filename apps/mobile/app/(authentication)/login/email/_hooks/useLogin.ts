import { useMutation } from "@tanstack/react-query";
import { login } from "../actions";

export function useLogin() {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log("로그인 성공:", data.data.accessToken);
    },
    onError: (error) => {
      console.error("로그인 실패:", error);
    },
  });
}
