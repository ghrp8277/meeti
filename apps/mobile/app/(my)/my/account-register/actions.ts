import api from "@/lib/api";
import { BankPaginationResponse } from "@/app/types/bank.type";

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

export async function fetchBanks({
  page,
  take,
  order,
}: {
  page?: number;
  take?: number;
  order?: "ASC" | "DESC";
}): Promise<BankPaginationResponse> {
  const params = new URLSearchParams();
  if (page) params.append("page", page.toString());
  if (take) params.append("take", take.toString());
  if (order) params.append("order", order);

  const response = await api.get(`/banks?${params.toString()}`);

  return {
    success: response.success,
    data: response.data as BankPaginationResponse["data"],
  };
}

export async function createSettlementAccount(accountData: {
  accountHolder: string;
  bankId: number;
  accountNumber: string;
  mobile: string;
}): Promise<{
  success: boolean;
  message: string;
}> {
  const response = await api.post("/settlement-accounts", accountData);

  return {
    success: response.success,
    message: response.message || "정산 계좌가 등록되었습니다.",
  };
}
