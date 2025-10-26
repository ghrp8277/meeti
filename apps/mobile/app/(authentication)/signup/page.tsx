"use client";

import { useRouter } from "next/navigation";
import Header from "../_components/header";
import Tos from "./_components/tos";
import Mobile from "./_components/mobile";
import { TosProvider } from "./_providers/tos-provider";
import { useState } from "react";

export default function Page() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<"tos" | "mobile">("tos");

  const handleNextStep = () => {
    setCurrentStep("mobile");
  };

  const handleBack = () => {
    if (currentStep === "mobile") {
      setCurrentStep("tos");
    } else {
      router.back();
    }
  };

  return (
    <TosProvider>
      <div>
        <Header
          title={currentStep === "tos" ? "약관 동의" : "휴대폰 번호 인증"}
          onBack={handleBack}
        />
        {currentStep === "tos" ? <Tos onNext={handleNextStep} /> : <Mobile />}
      </div>
    </TosProvider>
  );
}
