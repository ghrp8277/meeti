"use client";

import Header from "../_components/header";
import { useRouter } from "next/navigation";
import { PATH } from "@/app/constants";
import Divider from "@/components/ui/divider";
import SettlementAccountSection from "./_components/settlement-account-section";
import CancelFeeCardSection from "./_components/cancel-fee-card-section";
import DescriptionSection from "./_components/description-section";

export default function Page() {
  const router = useRouter();
  const handleBack = () => {
    router.push(PATH.MY.ROOT);
  };

  return (
    <div className="flex flex-col relative min-h-screen">
      <div className="px-20">
        <Header title="카드 등록" onBack={handleBack} />
        <SettlementAccountSection />
      </div>
      <Divider />
      <div className="px-20">
        <CancelFeeCardSection />
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <DescriptionSection />
      </div>
    </div>
  );
}
