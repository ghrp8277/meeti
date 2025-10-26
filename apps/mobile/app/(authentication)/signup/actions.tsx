import api from "../../../lib/api";
import { Tos } from "../../types/tos.type";

export async function fetchSignupTos(): Promise<{
  success: boolean;
  data: Tos[];
}> {
  const response = await api.get<Tos[]>("/tos/signup");

  return {
    success: response.success,
    data: response.data,
  };
}

export async function sendPhoneVerification(phoneNumber: string): Promise<{
  success: boolean;
  message: string;
}> {
  const response = await api.post("/auth/send-verification", {
    phoneNumber,
  });

  return {
    success: response.success,
    message: response.message || "인증번호가 발송되었습니다.",
  };
}

export async function verifyPhoneCode(
  phoneNumber: string,
  code: string
): Promise<{
  success: boolean;
  message: string;
}> {
  const response = await api.post("/auth/verify-code", {
    phoneNumber,
    code,
  });

  return {
    success: response.success,
    message: response.message || "인증이 완료되었습니다.",
  };
}

export async function createUser(userData: {
  email: string;
  password: string;
  name: string;
  birthday: string;
  gender: string;
  phoneNumber: string;
  agreedTosIds: number[];
}): Promise<{
  success: boolean;
  message: string;
}> {
  const response = await api.post("/users", userData);

  return {
    success: response.success,
    message: response.message || "회원가입이 완료되었습니다.",
  };
}
