"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ExpiryLabelProps {
  label: string;
}

function ExpiryLabel({ label }: ExpiryLabelProps) {
  return <label className="text-sm-semibold text-black">{label}</label>;
}

interface ExpirySelectProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  options: string[];
  error: boolean;
}

function ExpirySelect({
  value,
  onValueChange,
  placeholder,
  options,
  error,
}: ExpirySelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="flex-1" error={error}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

interface CardExpiryInputProps {
  label?: string;
  onExpiryChange: (month: string, year: string) => void;
  error?: boolean;
}

export default function CardExpiryInput({
  label = "유효기간",
  onExpiryChange,
  error = false,
}: CardExpiryInputProps) {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const months = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );
  const currentYear = new Date().getFullYear() % 100;
  const years = Array.from({ length: 20 }, (_, i) =>
    String(currentYear + i).padStart(2, "0")
  );

  const handleMonthChange = (value: string) => {
    setMonth(value);
    if (onExpiryChange && year) {
      onExpiryChange(value, year);
    }
  };

  const handleYearChange = (value: string) => {
    setYear(value);
    if (onExpiryChange && month) {
      onExpiryChange(month, value);
    }
  };

  return (
    <div className="flex flex-col gap-4 flex-1">
      <ExpiryLabel label={label} />
      <div className="flex flex-row items-center gap-12">
        <ExpirySelect
          value={month}
          onValueChange={handleMonthChange}
          placeholder="MM"
          options={months}
          error={error}
        />
        <ExpirySelect
          value={year}
          onValueChange={handleYearChange}
          placeholder="YY"
          options={years}
          error={error}
        />
      </div>
    </div>
  );
}
