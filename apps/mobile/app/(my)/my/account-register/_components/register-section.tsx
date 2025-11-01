"use client";

import every from "lodash-es/every";
import { Button } from "@/components/ui/button";
import DescriptionSection from "./description-section";
import { useAccountRegister } from "../_providers/account-register-provider";
import { useSettlementAccount } from "../_hooks/useSettlementAccount";

export default function RegisterSection() {
  const { accountHolder, bankId, accountNumber, phoneNumber, isPhoneVerified } =
    useAccountRegister();
  const { mutate: createAccount, isPending } = useSettlementAccount();

  const handleRegister = () => {
    if (!isFormValid) return;

    createAccount({
      accountHolder,
      bankId: Number(bankId),
      accountNumber,
      mobile: phoneNumber,
    });
  };

  const isFormValid = every([
    accountHolder.length > 0,
    bankId.length > 0,
    accountNumber.length > 0,
    phoneNumber.length > 0,
    isPhoneVerified,
  ]);

  return (
    <div className="absolute bottom-0 left-0 right-0">
      <DescriptionSection />
      <div className="py-20 pb-40 px-20 flex flex-col gap-4">
        <Button
          full
          variant="default"
          onClick={handleRegister}
          disabled={!isFormValid || isPending}
        >
          저장
        </Button>
      </div>
    </div>
  );
}
