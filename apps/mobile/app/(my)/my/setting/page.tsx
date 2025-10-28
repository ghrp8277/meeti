"use client";

import { useRouter } from "next/navigation";
import Header from "../_components/header";
import { PATH } from "@/app/constants";
import AlarmSection from "./_components/alarm-section";
import UserActionSection from "./_components/user-action-section";

export default function Page() {
  const router = useRouter();
  const handleBack = () => {
    router.push(PATH.MY.ROOT);
  };

  return (
    <>
      <div className="px-20">
        <Header title="설정" onBack={handleBack} />
      </div>
      <div className="flex flex-col gap-6 py-20">
        <AlarmSection />
        <div className="w-full h-[8px] bg-tin-grey-200" />
        <UserActionSection />
      </div>
    </>
  );
}
