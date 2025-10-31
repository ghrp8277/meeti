"use client";

import Header from "../../_components/header";
import { useRouter } from "next/navigation";
import { PATH } from "@/app/constants";
import CreateForm from "./_components/create-form";
import RegisterSection from "./_components/register-section";

export default function Page() {
  const router = useRouter();
  const handleBack = () => {
    router.push(PATH.MY.CARD.ROOT);
  };

  return (
    <div className="flex flex-col relative min-h-screen">
      <div className="px-20">
        <Header title="정보 입력" onBack={handleBack} />
        <CreateForm />
      </div>
      <RegisterSection />
    </div>
  );
}
