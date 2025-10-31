"use client";

import RegisterFrame from "./register-frame";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { PATH } from "@/app/constants";

export default function SettlementAccountSection() {
  const router = useRouter();
  const handleRegister = () => {
    router.push(PATH.MY.ACCOUNT_REGISTER);
  };

  return (
    <RegisterFrame
      title="정산 계좌 등록"
      onRegister={handleRegister}
      buttonChildren={
        <div className="flex flex-row items-center justify-center gap-8">
          <div className="text-black text-base-bold">계좌 등록</div>
          <Plus
            width={16}
            height={16}
            strokeWidth={1.6}
            className="text-black"
            stroke="currentColor"
            fill="currentColor"
          />
        </div>
      }
      description="상품 판매 후 구매 확정이 이루어지면 등록된 해당 계좌로 입급됩니다."
    />
  );
}
