"use client";

import RegisterFrame from "./register-frame";
import { useRouter } from "next/navigation";
import { PATH } from "@/app/constants";

export default function CancelFeeCardSection() {
  const router = useRouter();
  const handleRegister = () => {
    router.push(PATH.MY.CARD.CREATE);
  };

  return (
    <RegisterFrame
      title="취소 수수료 카드 등록"
      onRegister={handleRegister}
      buttonChildren={
        <div className="text-tin-grey-1000 text-base-bold">
          상품 등록 시 카드 등록이 가능해요.
        </div>
      }
      description="거래 확정 후 티켓을 전달하지 않거나 잘못 전달한 경우, 해당 카드로 취소 수수료가 부과됩니다. (정상 거래 시 부과되지 않음.)"
    />
  );
}
