"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  size?: "sm" | "md";
  type?: "square" | "round";
  disabled?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "w-5 h-5",
  md: "w-6 h-6",
};

const iconSizeClasses = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
};

export default function Checkbox({
  checked,
  onChange,
  size = "sm",
  type = "square",
  disabled = false,
  className = "",
}: CheckboxProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <div
      className={cn(
        "relative cursor-pointer transition-all duration-200",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={cn("relative", sizeClasses[size])}>
        <div
          className={cn(
            "absolute inset-0 border-2 transition-all duration-200",
            type === "round" ? "rounded-full" : "rounded",
            checked ? "bg-black border-black" : "bg-white/50 border-gray-300",
            isHovered && !checked && "border-gray-400"
          )}
        />

        {checked && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Check
              className={cn(iconSizeClasses[size], "text-white stroke-2")}
            />
          </div>
        )}
      </div>
    </div>
  );
}
