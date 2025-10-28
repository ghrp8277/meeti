"use client";

import { useRouter } from "next/navigation";
import Header from "../_components/header";
import { PATH } from "@/app/constants";
import ProfileSection from "./_components/profile-section";

export default function Page() {
  const router = useRouter();
  const handleBack = () => {
    router.push(PATH.MY.ROOT);
  };

  return (
    <div className="px-20 bg-tin-grey-150 min-h-screen">
      <Header title="프로필" onBack={handleBack} className="!bg-transparent" />
      <div className="pt-20 pb-40">
        <ProfileSection />
      </div>
    </div>
  );
}
