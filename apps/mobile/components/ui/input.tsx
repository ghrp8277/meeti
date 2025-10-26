"use client";

import { useState, forwardRef } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: boolean;
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

    const hasValue =
      value !== undefined &&
      value !== null &&
      value.toString().trim().length > 0;
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
      <div className="flex flex-col gap-4">
        {label && (
          <label className="text-sm-semibold text-black">
            {label}
            {required && (
              <span className="bg-brand-red-500 rounded-full w-4 h-4 inline-block ml-1 align-text-top"></span>
            )}
          </label>
        )}

        <div
          className={cn(
            "relative px-[16px] py-3 rounded-[12px] border border-black transition-all duration-200",
            full ? "w-full" : "w-[364px]",
            "h-[45px] flex items-center",
            props.disabled
              ? "bg-tin-grey-200 border-[#dfdfdf]"
              : error
                ? "border-brand-red-500 bg-brand-red-100"
                : isActive
                  ? "border-black"
                  : "border-tin-grey-500"
          )}
        >
          <input
            ref={ref}
            type={inputType}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn(
              "w-full h-full text-[15px] leading-[21px] tracking-[-0.6px] font-normal",
              "placeholder:text-blue-grey-500 text-black",
              "border-none outline-none bg-transparent",
              hasValue || (showPasswordToggle && type === "password")
                ? "pr-[24px]"
                : "pr-0",
              className
            )}
            {...props}
          />

          {/* Clear Button */}
          {hasValue && !showPasswordToggle && type !== "password" && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-[16px] top-1/2 -translate-y-1/2 w-[20px] h-[20px] bg-tin-grey-300 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
            >
              <X className="w-3 h-3 text-blue-grey-500" strokeWidth={1.6} />
            </button>
          )}

          {/* Password Toggle Button */}
          {showPasswordToggle && type === "password" && (
            <div className="flex flex-row gap-8">
              {hasValue && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="w-[20px] h-[20px] bg-tin-grey-300 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                >
                  <X className="w-3 h-3 text-blue-grey-500" strokeWidth={1.6} />
                </button>
              )}

              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="w-5 h-5 flex items-center justify-center"
              >
                {isPasswordVisible ? (
                  <EyeOff className="w-5 h-5 text-[#64748B]" />
                ) : (
                  <Eye className="w-5 h-5 text-[#64748B]" />
                )}
              </button>
            </div>
          )}
        </div>

        {helperText && (
          <p className="text-s text-brand-red-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
export type { InputProps };
