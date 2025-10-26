"use client";

import { useRouter } from "next/navigation";
import Header from "../_components/header";
import Tos from "./_components/tos";
import Mobile from "./_components/mobile";
import Form from "./_components/form";
import { useMemo } from "react";
import { useSignupStore } from "./_stores/signup-store";

export default function Page() {
  const router = useRouter();
  const { currentStep, setCurrentStep } = useSignupStore();

  const handleNextStep = () => {
    if (currentStep === 0) {
      setCurrentStep(1);
    } else if (currentStep === 1) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    if (currentStep === 1) {
      setCurrentStep(0);
    } else if (currentStep === 2) {
      setCurrentStep(1);
    } else {
      router.back();
    }
  };

  const title = useMemo(() => {
    const titles = {
      0: "약관 동의",
      1: "휴대폰 번호 인증",
      2: "필수 정보",
    };
    return titles[currentStep as keyof typeof titles];
  }, [currentStep]);

  return (
    <div>
      <Header title={title} onBack={handleBack} />
      {currentStep === 0 ? (
        <Tos onNext={handleNextStep} />
      ) : currentStep === 1 ? (
        <Mobile onNext={handleNextStep} />
      ) : (
        <Form />
      )}
    </div>
  );
}
