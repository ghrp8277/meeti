"use client";

import Header from "../_components/header";
import { useRouter } from "next/navigation";
import { PATH } from "@/app/constants";
import MyPointSection from "./_components/my-point-section";
import PointHistorySection from "./_components/point-history-section";
import Divider from "@/components/ui/divider";

export default function Page() {
  const router = useRouter();
  const handleBack = () => {
    router.push(PATH.MY.ROOT);
  };

  return (
    <>
      <div className="px-20">
        <Header title="" onBack={handleBack} />
      </div>
      <MyPointSection />
      <Divider />
      <PointHistorySection />
    </>
  );
}
