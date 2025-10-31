import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import BankSelect from "./bank-select";
import PhoneVerification from "./phone-verification";
import AccountNumberInput from "./account-number-input";
import { useBanks } from "../_hooks/useBanks";

export default function CreateForm() {
  const [bankId, setBankId] = useState<string>("");
  const [accountHolder, setAccountHolder] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isPhoneVerified, setIsPhoneVerified] = useState<boolean>(false);

  const { data } = useBanks();
  const allBanks = data?.pages.flatMap((page) => page.data.data) ?? [];

  const bankName = useMemo(() => {
    if (!bankId) return "";
    const bank = allBanks.find((b) => b.id.toString() === bankId);
    return bank?.name || "";
  }, [bankId, allBanks]);

  const handleBankChange = (selectedBankId: string) => {
    setBankId(selectedBankId);
  };

  const handleAccountHolderChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAccountHolder(e.target.value);
  };

  const handleAccountNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAccountNumber(e.target.value);
  };

  const handlePhoneNumberChange = (phone: string) => {
    setPhoneNumber(phone);
  };

  const handleVerificationComplete = (verified: boolean) => {
    setIsPhoneVerified(verified);
  };

  return (
    <div className="flex flex-col gap-20 p-20">
      <Input
        label="예금주"
        placeholder="예금주를 입력해주세요."
        full
        value={accountHolder}
        onChange={handleAccountHolderChange}
      />
      <BankSelect
        label="은행 선택"
        onBankChange={handleBankChange}
        error={false}
      />
      <AccountNumberInput
        value={accountNumber}
        onChange={handleAccountNumberChange}
        bank={bankName}
        disabled={!bankId}
      />
      <PhoneVerification
        phoneNumber={phoneNumber}
        onPhoneNumberChange={handlePhoneNumberChange}
        onVerificationComplete={handleVerificationComplete}
      />
    </div>
  );
}
