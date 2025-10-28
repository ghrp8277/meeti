"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { PATH } from "@/app/constants";

export default function RegisterProductButton() {
  const router = useRouter();

  const handleRegisterProduct = () => {
    router.push(PATH.TRANSFER.CREATE);
  };

  return (
    <div
      className="fixed bottom-[100px] right-[calc(50%-375px/2+20px)] rounded-full bg-brand-red-500 text-white text-base font-semibold px-14 py-12 z-10 cursor-pointer"
      onClick={handleRegisterProduct}
    >
      <div className="flex flex-row items-center justify-center gap-2">
        상품 등록
        <Plus size={20} />
      </div>
    </div>
  );
}
