"use client";

import Header from "../../_components/header";
import { useRouter } from "next/navigation";
import { PATH } from "@/app/constants";
import TitleSection from "./_components/title-section";
import ChargeExposureSection from "./_components/charge-exposure-section";
import TabSection from "./_components/tab-section";

export default function Page() {
  const router = useRouter();
  const handleBack = () => {
    router.push(PATH.MY.PROFILE);
  };
  return (
    <div className="px-20 min-h-screen flex flex-col justify-between">
      <div className="flex flex-col">
        <Header title="점수별 혜택" onBack={handleBack} />
        <TitleSection />
        <ChargeExposureSection />
      </div>
      <TabSection />
    </div>
  );
}
