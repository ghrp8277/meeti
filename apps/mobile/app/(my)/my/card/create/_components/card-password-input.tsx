"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface PasswordLabelProps {
  label: string;
}

function PasswordLabel({ label }: PasswordLabelProps) {
  return <label className="text-sm-semibold text-black">{label}</label>;
}

interface PasswordFieldProps {
  id: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  showDots: boolean;
  error: boolean;
}

function PasswordField({
  id,
  value,
  placeholder,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  showDots,
  error,
}: PasswordFieldProps) {
  return (
    <div className="relative">
      <input
        id={id}
        type="text"
        inputMode="numeric"
        maxLength={2}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        className={cn(
          "w-[50px] h-[45px] text-center text-md border-b border-tin-grey-500",
          "outline-none focus:border-black",
          "placeholder:text-transparent",
          error && "border-brand-red-500"
        )}
        placeholder={placeholder}
        pattern="[0-9]*"
      />
      {showDots && (
        <div className="absolute inset-0 flex flex-row items-center justify-center gap-1 pointer-events-none">
          <div
            style={{ width: "8px", height: "8px" }}
            className="bg-black rounded-full"
          />
          <div
            style={{ width: "8px", height: "8px" }}
            className="bg-black rounded-full"
          />
        </div>
      )}
    </div>
  );
}

function PasswordDots() {
  return (
    <div className="flex flex-row items-center justify-center">
      <div
        style={{ width: "8px", height: "8px" }}
        className="bg-black rounded-full"
      />
      <div
        style={{ width: "8px", height: "8px", marginLeft: "4px" }}
        className="bg-black rounded-full"
      />
    </div>
  );
}

interface CardPasswordInputProps {
  label?: string;
  onPasswordChange: (password: string) => void;
  error?: boolean;
}

export default function CardPasswordInput({
  label = "비밀번호",
  onPasswordChange,
  error = false,
}: CardPasswordInputProps) {
  const [password, setPassword] = useState("");

  const handleChange = (value: string) => {
    if (!/^\d*$/.test(value)) return;
    if (value.length > 2) return;

    setPassword(value);

    if (onPasswordChange) {
      onPasswordChange(value);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <PasswordLabel label={label} />
      <div className="flex flex-row items-center gap-4">
        <PasswordField
          id="password"
          value={password}
          placeholder="11"
          onChange={handleChange}
          onFocus={() => {}}
          onBlur={() => {}}
          onKeyDown={() => {}}
          showDots={false}
          error={error}
        />
        <PasswordDots />
      </div>
    </div>
  );
}
