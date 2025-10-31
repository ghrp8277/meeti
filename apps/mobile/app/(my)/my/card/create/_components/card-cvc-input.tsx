"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface CvcLabelProps {
  label: string;
}

function CvcLabel({ label }: CvcLabelProps) {
  return <label className="text-sm-semibold text-black">{label}</label>;
}

interface CvcFieldProps {
  id: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  error: boolean;
}

function CvcField({
  id,
  value,
  placeholder,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  error,
}: CvcFieldProps) {
  return (
    <div className="relative">
      <input
        id={id}
        type="text"
        inputMode="numeric"
        maxLength={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        className={cn(
          "w-[62px] h-[45px] text-center text-md border-b border-tin-grey-500",
          "outline-none focus:border-black",
          error && "border-brand-red-500"
        )}
        placeholder={placeholder}
        pattern="[0-9]*"
      />
    </div>
  );
}

interface CardCvcInputProps {
  label?: string;
  onCvcChange: (cvc: string) => void;
  error?: boolean;
}

export default function CardCvcInput({
  label = "CVC",
  onCvcChange,
  error = false,
}: CardCvcInputProps) {
  const [cvc, setCvc] = useState("");

  const handleChange = (value: string) => {
    if (!/^\d*$/.test(value)) return;
    if (value.length > 3) return;

    setCvc(value);

    if (onCvcChange) {
      onCvcChange(value);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <CvcLabel label={label} />
      <CvcField
        id="cvc"
        value={cvc}
        placeholder="숫자 3자리"
        onChange={handleChange}
        onFocus={() => {}}
        onBlur={() => {}}
        onKeyDown={() => {}}
        error={error}
      />
    </div>
  );
}
