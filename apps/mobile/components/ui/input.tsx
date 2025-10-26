"use client";

import { useState, forwardRef } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: boolean;
  showClearButton?: boolean;
  showPasswordToggle?: boolean;
  required?: boolean;
  full?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error = false,
      showClearButton = false,
      showPasswordToggle = false,
      required = false,
      full = false,
      className,
      type = "text",
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const inputType =
      showPasswordToggle && type === "password"
        ? isPasswordVisible
          ? "text"
          : "password"
        : type;

    const hasValue = value && value.toString().length > 0;
    const isActive = isFocused || hasValue;

    const handleClear = () => {
      if (onChange) {
        const event = {
          target: { value: "" },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
    };

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-sm font-medium text-black">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn(
              "h-[45px] px-4 py-3 rounded-[12px] border transition-all duration-200",
              full ? "w-full" : "w-[364px]",
              "text-[15px] leading-[21px] tracking-[-0.6px] font-normal",
              "placeholder:text-[#A5A5A5] text-black",
              isActive
                ? "border-black"
                : error
                  ? "border-red-500"
                  : "border-[#DFDFDF]",
              className
            )}
            {...props}
          />

          {/* Clear Button */}
          {showClearButton && hasValue && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 bg-[#EFEFEF] rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
            >
              <X className="w-3 h-3 text-[#787878]" strokeWidth={1.6} />
            </button>
          )}

          {/* Password Toggle Button */}
          {showPasswordToggle && type === "password" && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center"
            >
              {isPasswordVisible ? (
                <EyeOff className="w-5 h-5 text-[#64748B]" />
              ) : (
                <Eye className="w-5 h-5 text-[#64748B]" />
              )}
            </button>
          )}
        </div>

        {helperText && <p className="text-sm text-[#A5A5A5]">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
export type { InputProps };
