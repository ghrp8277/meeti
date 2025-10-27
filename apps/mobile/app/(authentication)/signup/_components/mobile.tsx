import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { usePhoneVerification } from "../_hooks/usePhoneVerification";
import { usePhoneCodeVerification } from "../_hooks/usePhoneCodeVerification";
import { useSignupStore } from "../_stores/signup-store";
import {
  Dialog,
  DialogButton,
  DialogContent,
  DialogMessage,
} from "@/components/ui/dialog";
import { AuthInput } from "@/components/ui/auth-input";

function PhoneNumberInput({
  phoneNumber,
  onPhoneNumberChange,
  isError,
  helperText,
}: {
  phoneNumber: string;
  onPhoneNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isError: boolean;
  helperText?: string;
}) {
  return (
    <Input
      label="휴대폰 번호"
      full
      required
      error={isError}
      value={phoneNumber}
      onChange={onPhoneNumberChange}
      helperText={helperText}
    />
  );
}

function VerificationCodeInput({
  phoneNumber,
  onTimeExpired,
  onVerificationComplete,
}: {
  phoneNumber: string;
  onTimeExpired: () => void;
  onVerificationComplete: () => void;
}) {
  const [errorMessage, setErrorMessage] = useState("");
  const { authCode, setAuthCode, isVerified, setIsVerified } = useSignupStore();
  const phoneCodeVerificationMutation = usePhoneCodeVerification();

  const handleAuthCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthCode(e.target.value);
    setErrorMessage("");
  };

  const handleVerifyCode = () => {
    if (authCode.length !== 6) return;

    phoneCodeVerificationMutation.mutate(
      { phoneNumber, code: authCode },
      {
        onSuccess: () => {
          setIsVerified(true);
          setErrorMessage("");
          onVerificationComplete();
        },
        onError: (error: any) => {
          const message =
            error?.response?.data?.message ||
            "인증번호가 일치하지 않습니다. 확인 후 다시 시도해 주세요.";
          setErrorMessage(message);
        },
      }
    );
  };

  return (
    <AuthInput
      full
      showTimer={!isVerified}
      timerSeconds={180}
      value={authCode}
      onChange={handleAuthCodeChange}
      onTimerEnd={() => {
        console.log("timer ended");
      }}
      onTimeExpired={onTimeExpired}
      onConfirmClick={handleVerifyCode}
      isVerified={isVerified}
      error={!!errorMessage}
      helperText={errorMessage}
    />
  );
}

function VerificationButton({
  isComplete,
  isTimerExpired,
  showVerificationInput,
  isLoading,
  onSendVerification,
}: {
  isComplete: boolean;
  isTimerExpired: boolean;
  showVerificationInput: boolean;
  isLoading: boolean;
  onSendVerification: () => void;
}) {
  const isDisabled =
    !isComplete || (!isTimerExpired && showVerificationInput) || isLoading;

  return (
    <Button
      full
      size="sm"
      variant="secondary"
      loading={isLoading}
      disabled={isDisabled}
      onClick={onSendVerification}
    >
      {showVerificationInput ? "인증번호 재전송" : "인증번호 받기"}
    </Button>
  );
}

function NextButton({
  onNext,
  disabled,
}: {
  onNext: () => void;
  disabled: boolean;
}) {
  return (
    <Button full variant="default" onClick={onNext} disabled={disabled}>
      다음
    </Button>
  );
}

function PhoneVerificationDialog({ onClose }: { onClose: () => void }) {
  return (
    <Dialog>
      <DialogContent className="gap-20">
        <DialogMessage>
          입력해 주신 번호로
          <br />
          인증번호 전송이 완료되었어요.
        </DialogMessage>
        <DialogButton onClick={onClose}>확인</DialogButton>
      </DialogContent>
    </Dialog>
  );
}

export default function Mobile({ onNext }: { onNext: () => void }) {
  const {
    phoneNumber,
    setPhoneNumber,
    isVerified,
    setIsVerified,
    showVerificationInput,
    setShowVerificationInput,
    isTimerExpired,
    setIsTimerExpired,
  } = useSignupStore();

  const [showDialog, setShowDialog] = useState(false);
  const phoneVerificationMutation = usePhoneVerification();

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/[^\d]/g, "");

    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 7) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    } else if (numbers.length <= 11) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
    } else {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
    }
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  const handleSendVerification = () => {
    if (!isComplete) return;

    phoneVerificationMutation.mutate(phoneNumber.replace(/[^\d]/g, ""), {
      onSuccess: () => {
        if (!showVerificationInput) {
          setShowDialog(true);
        }
        setShowVerificationInput(true);
        setIsTimerExpired(false);
      },
    });
  };

  const numbers = phoneNumber.replace(/[^\d]/g, "");
  const isError = phoneNumber.length > 0 && numbers.length !== 11;
  const isComplete = numbers.length === 11;

  return (
    <div className="h-full flex flex-col justify-between pt-[20px] pb-[40px]">
      <div className="flex flex-col gap-20">
        <PhoneNumberInput
          phoneNumber={phoneNumber}
          onPhoneNumberChange={handlePhoneNumberChange}
          isError={isError}
          helperText={
            isError ? "휴대폰 번호를 정확히 입력해주세요." : undefined
          }
        />
        {showVerificationInput && (
          <VerificationCodeInput
            phoneNumber={phoneNumber.replace(/[^\d]/g, "")}
            onTimeExpired={() => setIsTimerExpired(true)}
            onVerificationComplete={() => setIsVerified(true)}
          />
        )}
        <VerificationButton
          isComplete={isComplete}
          isTimerExpired={isTimerExpired}
          showVerificationInput={showVerificationInput}
          isLoading={phoneVerificationMutation.isPending}
          onSendVerification={handleSendVerification}
        />
      </div>

      <NextButton onNext={onNext} disabled={!isVerified} />

      {showDialog && (
        <PhoneVerificationDialog onClose={() => setShowDialog(false)} />
      )}
    </div>
  );
}
