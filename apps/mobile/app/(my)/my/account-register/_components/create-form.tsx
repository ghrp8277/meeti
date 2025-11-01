import { Input } from "@/components/ui/input";
import { useMemo } from "react";
import flatMap from "lodash-es/flatMap";
import find from "lodash-es/find";
import get from "lodash-es/get";
import BankSelect from "./bank-select";
import PhoneVerification from "./phone-verification";
import AccountNumberInput from "./account-number-input";
import { useBanks } from "../_hooks/useBanks";
import { useAccountRegister } from "../_providers/account-register-provider";

export default function CreateForm() {
  const {
    accountHolder,
    bankId,
    accountNumber,
    phoneNumber,
    setAccountHolder,
    setBankId,
    setAccountNumber,
    setPhoneNumber,
    setIsPhoneVerified,
  } = useAccountRegister();

  const { data } = useBanks();

  const bankName = useMemo(() => {
    if (!bankId) return "";
    const allBanks = flatMap(
      data?.pages ?? [],
      (page) => get(page, "data.data", []) ?? []
    );
    const bank = find(allBanks, (b) => b.id.toString() === bankId);
    return get(bank, "name", "");
  }, [bankId, data]);

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

  return (
    <div className="flex flex-col gap-20 p-20">
      <Input
        label="예금주"
        placeholder="예금주를 입력해주세요."
        full
        value={accountHolder}
        onChange={handleAccountHolderChange}
      />
      <BankSelect label="은행 선택" onBankChange={setBankId} error={false} />
      <AccountNumberInput
        value={accountNumber}
        onChange={handleAccountNumberChange}
        bank={bankName}
        disabled={!bankId}
      />
      <PhoneVerification
        phoneNumber={phoneNumber}
        onPhoneNumberChange={setPhoneNumber}
        onVerificationComplete={setIsPhoneVerified}
      />
    </div>
  );
}
