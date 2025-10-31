"use client";

import { Input } from "@/components/ui/input";

function formatAccountNumber(value: string, bank: string, prevValue: string) {
  const numbers = value.replace(/\D/g, "");

  if (!bank || numbers.length === 0) return numbers;

  if (numbers.length > 20) return prevValue;

  if (bank.includes("KB국민은행") || bank.includes("NH농협은행")) {
    if (numbers.length <= 6) return numbers;
    if (numbers.length <= 12)
      return `${numbers.slice(0, 6)}-${numbers.slice(6)}`;
    return `${numbers.slice(0, 6)}-${numbers.slice(6, 11)}-${numbers.slice(11)}`;
  }

  if (bank.includes("신한은행")) {
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6)
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6)}`;
  }

  if (bank.includes("우리은행") || bank.includes("하나은행")) {
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 11)
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 10)}-${numbers.slice(10)}`;
  }

  if (bank.includes("IBK기업은행")) {
    if (numbers.length <= 6) return numbers;
    return `${numbers.slice(0, 6)}-${numbers.slice(6)}`;
  }

  if (bank.includes("카카오뱅크") || bank.includes("토스뱅크")) {
    if (numbers.length <= 4) return numbers;
    return `${numbers.slice(0, 4)}-${numbers.slice(4)}`;
  }

  return numbers;
}

interface AccountNumberInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  bank: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
}

export default function AccountNumberInput({
  label = "계좌번호",
  placeholder = "계좌번호를 입력해주세요.",
  value,
  onChange,
  bank,
  error = false,
  helperText,
  disabled = false,
}: AccountNumberInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatAccountNumber(e.target.value, bank, value);
    const syntheticEvent = {
      ...e,
      target: { ...e.target, value: formattedValue },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(syntheticEvent);
  };

  return (
    <Input
      label={label}
      placeholder={placeholder}
      full
      value={value}
      onChange={handleChange}
      error={error}
      helperText={helperText}
      disabled={disabled}
    />
  );
}
