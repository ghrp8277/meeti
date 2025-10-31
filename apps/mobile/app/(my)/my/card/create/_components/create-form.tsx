"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import CardPasswordInput from "./card-password-input";
import CardExpiryInput from "./card-expiry-input";
import CardCvcInput from "./card-cvc-input";

function formatCardNumber(value: string, prevValue: string) {
  const numbers = value.replace(/\D/g, "");
  if (numbers.length > 16) return prevValue;
  return numbers.match(/.{1,4}/g)?.join("-") || numbers;
}

function isValidCardNumber(cardNumber: string) {
  const numbers = cardNumber.replace(/\D/g, "");
  return numbers.length === 16;
}

function formatBirthDate(value: string, prevValue: string) {
  const numbers = value.replace(/\D/g, "");
  if (numbers.length > 8) return prevValue;

  if (numbers.length <= 4) return numbers;
  if (numbers.length <= 6) return `${numbers.slice(0, 4)}-${numbers.slice(4)}`;
  return `${numbers.slice(0, 4)}-${numbers.slice(4, 6)}-${numbers.slice(6)}`;
}

function CardNumberSection() {
  const [cardNumber, setCardNumber] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value, cardNumber);
    setCardNumber(formattedValue);

    if (formattedValue.length > 0) {
      setError(!isValidCardNumber(formattedValue));
    } else {
      setError(false);
    }
  };

  return (
    <Input
      label="카드 번호"
      placeholder="카드 번호를 입력해주세요."
      full
      value={cardNumber}
      onChange={handleCardNumberChange}
      error={error}
      helperText={error ? "카드 번호는 16자리 숫자여야 합니다." : ""}
    />
  );
}

function PasswordExpirySection() {
  const [password, setPassword] = useState<string>("");
  const [expiryMonth, setExpiryMonth] = useState<string>("");
  const [expiryYear, setExpiryYear] = useState<string>("");

  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
  };

  const handleExpiryChange = (month: string, year: string) => {
    setExpiryMonth(month);
    setExpiryYear(year);
  };

  return (
    <div className="flex flex-row gap-20">
      <CardPasswordInput
        label="비밀번호"
        onPasswordChange={handlePasswordChange}
        error={false}
      />
      <CardExpiryInput
        label="유효기간"
        onExpiryChange={handleExpiryChange}
        error={false}
      />
    </div>
  );
}

function CvcBirthDateSection() {
  const [cvc, setCvc] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");

  const handleCvcChange = (newCvc: string) => {
    setCvc(newCvc);
  };

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatBirthDate(e.target.value, birthDate);
    setBirthDate(formattedValue);
  };

  return (
    <div className="flex flex-row gap-20">
      <CardCvcInput label="CVC" onCvcChange={handleCvcChange} error={false} />
      <div className="flex-1">
        <Input
          label="생년월일"
          placeholder="생년월일을 입력해주세요."
          full
          value={birthDate}
          onChange={handleBirthDateChange}
          error={false}
        />
      </div>
    </div>
  );
}

export default function CreateForm() {
  return (
    <div className="flex flex-col gap-20 py-20">
      <CardNumberSection />
      <PasswordExpirySection />
      <CvcBirthDateSection />
    </div>
  );
}
