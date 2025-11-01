"use client";

import some from "lodash-es/some";
import { Input } from "@/components/ui/input";

function formatAccountNumber(value: string, bank: string, prevValue: string) {
  const numbers = value.replace(/\D/g, "");

  if (!bank || numbers.length === 0 || numbers.length > 20)
    return numbers.length > 20 ? prevValue : numbers;

  const bankPatterns = [
    {
      pattern: ["KB국민은행", "NH농협은행"],
      format: (n: string) => {
        if (n.length <= 6) return n;
        if (n.length <= 12) return `${n.slice(0, 6)}-${n.slice(6)}`;
        return `${n.slice(0, 6)}-${n.slice(6, 11)}-${n.slice(11)}`;
      },
    },
    {
      pattern: ["신한은행"],
      format: (n: string) => {
        if (n.length <= 3) return n;
        if (n.length <= 6) return `${n.slice(0, 3)}-${n.slice(3)}`;
        return `${n.slice(0, 3)}-${n.slice(3, 6)}-${n.slice(6)}`;
      },
    },
    {
      pattern: ["우리은행", "하나은행"],
      format: (n: string) => {
        if (n.length <= 3) return n;
        if (n.length <= 11) return `${n.slice(0, 3)}-${n.slice(3)}`;
        return `${n.slice(0, 3)}-${n.slice(3, 10)}-${n.slice(10)}`;
      },
    },
    {
      pattern: ["IBK기업은행"],
      format: (n: string) => {
        if (n.length <= 6) return n;
        return `${n.slice(0, 6)}-${n.slice(6)}`;
      },
    },
    {
      pattern: ["카카오뱅크", "토스뱅크"],
      format: (n: string) => {
        if (n.length <= 4) return n;
        return `${n.slice(0, 4)}-${n.slice(4)}`;
      },
    },
  ];

  const matchingPattern = bankPatterns.find((bp) =>
    some(bp.pattern, (p) => bank.includes(p))
  );

  return matchingPattern ? matchingPattern.format(numbers) : numbers;
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
