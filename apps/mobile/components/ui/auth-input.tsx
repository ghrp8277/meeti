import { forwardRef, useState, useEffect, useRef } from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  full?: boolean;
  showTimer?: boolean;
  timerSeconds?: number;
  onTimerEnd?: () => void;
  onConfirmClick?: () => void;
  isVerified?: boolean;
  helperText?: string;
  onTimeExpired?: () => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      error = false,
      full = false,
      showTimer = false,
      timerSeconds = 180,
      onTimerEnd,
      isVerified = false,
      helperText,
      onTimeExpired,
      className,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [remainingTime, setRemainingTime] = useState(timerSeconds);
    const [isTimeExpired, setIsTimeExpired] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (!showTimer) return;

      setRemainingTime(timerSeconds);
      setIsTimeExpired(false);
    }, [showTimer, timerSeconds]);

    useEffect(() => {
      if (!showTimer || remainingTime <= 0) return;

      const timer = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            setIsTimeExpired(true);
            onTimerEnd?.();
            onTimeExpired?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }, [showTimer, remainingTime, onTimerEnd, onTimeExpired]);

    const formatTime = (seconds: number) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    };

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
      inputRef.current?.blur();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/[^\d]/g, "");
      if (onChange) {
        const event = {
          target: { value },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
    };

    return (
      <div className="flex flex-col gap-4">
        <div
          className={cn(
            "relative px-[16px] py-3 rounded-[12px] border transition-all duration-200",
            full ? "w-full" : "w-[364px]",
            "h-[45px] flex items-center cursor-text",
            error || isTimeExpired
              ? "border-brand-red-500 bg-brand-red-100"
              : isVerified
                ? "border-[#dfdfdf]"
                : isActive
                  ? "border-black"
                  : "border-tin-grey-500"
          )}
          onClick={() => {
            inputRef.current?.focus();
          }}
        >
          <div className="flex flex-row gap-4">
            <input
              ref={(node) => {
                inputRef.current = node;
                if (typeof ref === "function") {
                  ref(node);
                } else if (ref) {
                  ref.current = node;
                }
              }}
              type="text"
              value={value}
              onChange={handleInputChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              maxLength={6}
              disabled={isVerified}
              className={cn(
                "w-[52px] h-full text-md font-normal",
                "placeholder:text-blue-grey-500 text-black",
                "border-none outline-none bg-transparent",
                isVerified && "cursor-not-allowed opacity-50",
                className
              )}
              {...props}
            />
            {/* Clear Button */}
            {hasValue && !isVerified && (
              <button
                type="button"
                onClick={handleClear}
                className="w-[20px] h-[20px] bg-tin-grey-300 rounded-full hover:bg-gray-300 transition-colors flex items-center justify-center"
              >
                <X className="w-3 h-3 text-blue-grey-500" strokeWidth={1.6} />
              </button>
            )}
          </div>

          {/* Timer Display */}
          {showTimer && (
            <div className="absolute right-16 top-1/2 -translate-y-1/2 text-sm-medium text-error-600">
              {formatTime(remainingTime)}
            </div>
          )}
        </div>

        {(error || isTimeExpired) && (
          <p className="text-s text-brand-red-500 break-words leading-relaxed">
            {isTimeExpired
              ? "입력시간이 초과되었습니다. 인증번호를 다시 전송해 주세요."
              : helperText ||
                "인증번호가 일치하지 않습니다. 확인 후 다시 시도해 주세요."}
          </p>
        )}
      </div>
    );
  }
);

export function AuthInput({
  error,
  showTimer,
  timerSeconds,
  onTimerEnd,
  onConfirmClick,
  isVerified = false,
  helperText,
  onTimeExpired,
  value,
  ...props
}: InputProps) {
  const isComplete = value && value.toString().length === 6;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4 h-[45px]">
        <div className="flex-1">
          <Input
            error={error}
            full
            showTimer={showTimer}
            timerSeconds={timerSeconds}
            onTimerEnd={onTimerEnd}
            isVerified={isVerified}
            helperText={helperText}
            onTimeExpired={onTimeExpired}
            value={value}
            {...props}
          />
        </div>

        {!isVerified ? (
          <Button
            variant="tertiary"
            className="!h-[45px] !w-[89px]"
            disabled={!isComplete}
            onClick={onConfirmClick}
          >
            확인
          </Button>
        ) : (
          <div className="w-[89px] flex flex-row gap-2 justify-center items-center">
            <div className="text-xs-medium text-black">인증완료</div>
            <Check className="w-3 h-3 text-blue-500" strokeWidth={1.6} />
          </div>
        )}
      </div>
    </div>
  );
}
