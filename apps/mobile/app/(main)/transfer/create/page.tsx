"use client";

import HeaderSection from "./_components/header-section";
import { useRouter } from "next/navigation";
import EventFrame from "./_components/frames/event-frame";
import OptionFrame from "./_components/frames/option-frame";
import PriceFrame from "./_components/frames/price-frame";
import CardFrame from "./_components/frames/card-frame";

export default function Page() {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  return (
    <div>
      <HeaderSection title="상품 등록" onBack={handleBack} />
      <EventFrame />
      <div className="w-full h-[8px] bg-tin-grey-200" />
      <OptionFrame />
      <div className="w-full h-[8px] bg-tin-grey-200" />
      <PriceFrame />
      <div className="w-full h-[8px] bg-tin-grey-200" />
      <CardFrame />
      <div className="w-full h-[8px] bg-tin-grey-200" />
    </div>
  );
}
