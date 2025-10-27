import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import { every, isEmpty } from "lodash-es";
import { Button } from "@/components/ui/button";
import { useSignupStore } from "../_stores/signup-store";
import { useSignup } from "../_hooks/useSignup";

enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

function EmailInput({
  email,
  onEmailChange,
}: {
  email: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const hasLetter = /[a-zA-Z]/.test(email);
  const hasNumber = /[0-9]/.test(email);
  const isValid = every([
    email.length >= 4,
    email.length <= 20,
    hasLetter,
    hasNumber,
  ]);
  const isError = !isEmpty(email) && !isValid;

  let helperText: string | undefined;
  if (email.length > 0 && email.length < 4) {
    helperText = "아이디는 4자 이상 입력해주세요.";
  } else if (email.length > 20) {
    helperText = "아이디는 20자 이하로 입력해주세요.";
  } else if (email.length >= 4 && (!hasLetter || !hasNumber)) {
    helperText = "영문과 숫자 조합으로 입력해 주세요.";
  }

  return (
    <Input
      label="아이디"
      full
      required
      type="text"
      placeholder="아이디를 입력해주세요."
      maxLength={20}
      error={isError}
      helperText={helperText}
      value={email}
      onChange={onEmailChange}
    />
  );
}

function PasswordSection({
  password,
  passwordConfirm,
  onPasswordChange,
  onPasswordConfirmChange,
}: {
  password: string;
  passwordConfirm: string;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordConfirmChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const passwordValidation = useMemo(() => {
    const checks = [
      /[a-zA-Z]/.test(password),
      /[0-9]/.test(password),
      /[!@#$%^&*(),.?":{}|<>]/.test(password),
    ];
    const typeCount = checks.filter(Boolean).length;
    const isPasswordValid = every([
      password.length >= 8,
      password.length <= 20,
      typeCount >= 2,
    ]);

    const isPasswordConfirmDisabled = !isPasswordValid;
    const isPasswordMatch = Boolean(
      isPasswordValid && passwordConfirm && password === passwordConfirm
    );
    const isPasswordMismatch = Boolean(
      isPasswordValid && passwordConfirm && password !== passwordConfirm
    );

    return {
      isPasswordValid,
      isPasswordConfirmDisabled,
      isPasswordMatch,
      isPasswordMismatch,
    };
  }, [password, passwordConfirm]);

  const passwordHelperText = (() => {
    if (password.length > 0 && password.length < 8) {
      return "비밀번호는 8자 이상 입력해주세요.";
    } else if (password.length > 20) {
      return "비밀번호는 20자 이하로 입력해주세요.";
    } else if (password.length >= 8) {
      const checks = [
        /[a-zA-Z]/.test(password),
        /[0-9]/.test(password),
        /[!@#$%^&*(),.?":{}|<>]/.test(password),
      ];
      const typeCount = checks.filter(Boolean).length;
      if (typeCount < 2) {
        return "영문, 숫자, 특수문자 중 2가지 이상 조합해주세요.";
      }
    }
    return undefined;
  })();

  return (
    <>
      <Input
        label="비밀번호"
        full
        required
        showPasswordToggle
        type="password"
        placeholder="비밀번호를 입력해주세요."
        maxLength={20}
        error={password.length > 0 && !passwordValidation.isPasswordValid}
        helperText={passwordHelperText}
        value={password}
        onChange={onPasswordChange}
      />
      <Input
        label="비밀번호 재입력"
        full
        required
        showPasswordToggle
        type="password"
        placeholder="비밀번호를 한번 더 입력해주세요."
        maxLength={20}
        disabled={passwordValidation.isPasswordConfirmDisabled}
        error={passwordValidation.isPasswordMismatch}
        helperText={
          passwordValidation.isPasswordMismatch
            ? "비밀번호가 일치하지 않습니다."
            : undefined
        }
        value={passwordConfirm}
        onChange={onPasswordConfirmChange}
      />
    </>
  );
}

function NameInput({
  name,
  onNameChange,
}: {
  name: string;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const isValidKorean = /^[가-힣]+$/.test(name);
  const isValid = every([name.length >= 2, name.length <= 10, isValidKorean]);
  const isError = !isEmpty(name) && !isValid;

  let helperText: string | undefined;
  if (name.length > 0 && name.length < 2) {
    helperText = "이름은 2자 이상 입력해주세요.";
  } else if (name.length > 10) {
    helperText = "이름은 10자 이하로 입력해주세요.";
  } else if (name.length >= 2 && !isValidKorean) {
    helperText = "올바른 한글명을 입력해 주세요.";
  }

  return (
    <Input
      label="이름"
      full
      required
      type="text"
      placeholder="이름을 입력해주세요."
      maxLength={10}
      error={isError}
      helperText={helperText}
      value={name}
      onChange={onNameChange}
    />
  );
}

function BirthdayInput({
  birthday,
  onBirthdayChange,
}: {
  birthday: string;
  onBirthdayChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const formatBirthday = (value: string) => {
    const numbers = value.replace(/[^\d]/g, "");
    const parts = [
      numbers.slice(0, 4),
      numbers.slice(4, 6),
      numbers.slice(6, 8),
    ];
    return parts.filter(Boolean).join("-");
  };

  const isValidFormat = /^\d{4}-\d{2}-\d{2}$/.test(birthday);

  const validateBirthday = (dateStr: string) => {
    if (!isValidFormat) {
      return { isValid: false, message: "유효한 생년월일을 입력해 주세요." };
    }

    const [year, month, day] = dateStr.split("-").map(Number);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const age = currentYear - year;

    const validations = [
      {
        check: year >= 1900 && year <= currentYear,
        message: "1900년부터 현재년도까지 입력 가능합니다.",
      },
      {
        check: month >= 1 && month <= 12,
        message: "유효한 월을 입력해주세요.",
      },
      { check: day >= 1 && day <= 31, message: "유효한 일을 입력해주세요." },
      {
        check: new Date(year, month - 1, day).getDate() === day,
        message: "존재하지 않는 날짜입니다.",
      },
      {
        check: new Date(year, month - 1, day) <= currentDate,
        message: "미래 날짜는 입력할 수 없습니다.",
      },
      { check: age <= 120, message: "유효한 나이를 입력해주세요." },
    ];

    const failedValidation = validations.find((v) => !v.check);
    return failedValidation
      ? { isValid: false, message: failedValidation.message }
      : { isValid: true, message: undefined };
  };

  const validation = !isEmpty(birthday)
    ? validateBirthday(birthday)
    : { isValid: true, message: undefined };
  const isError = !isEmpty(birthday) && !validation.isValid;

  const helperText: string | undefined = validation.message;

  const handleBirthdayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatBirthday(e.target.value);
    onBirthdayChange({
      ...e,
      target: { ...e.target, value: formatted },
    });
  };

  return (
    <Input
      label="생년월일"
      full
      required
      type="text"
      placeholder="숫자만 입력해주세요."
      maxLength={10}
      error={isError}
      helperText={helperText}
      value={birthday}
      onChange={handleBirthdayChange}
    />
  );
}

function GenderInput({
  gender,
  onGenderChange,
}: {
  gender: Gender | "";
  onGenderChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const genderOptions = [
    { value: Gender.MALE, label: "남성" },
    { value: Gender.FEMALE, label: "여성" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <label className="text-sm-semibold text-black">
        성별
        <span className="bg-brand-red-500 rounded-full w-4 h-4 inline-block ml-1 align-text-top"></span>
      </label>
      <div className="flex flex-row gap-8">
        {genderOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`flex flex-row justify-center items-center px-3 py-3 gap-2 w-full h-[42px] rounded-[12px] transition-all duration-200 text-md-semibold font-pretendard ${
              gender === option.value
                ? "bg-lead-grey-800 text-white"
                : "bg-white border border-tin-grey-500 text-black"
            }`}
            onClick={() =>
              onGenderChange({
                target: { value: option.value },
              } as React.ChangeEvent<HTMLInputElement>)
            }
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
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

export default function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState<Gender | "">("");
  const { phoneNumber, agreedItems } = useSignupStore();
  const signupMutation = useSignup();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (passwordConfirm && e.target.value !== passwordConfirm) {
      setPasswordConfirm("");
    }
  };

  const handlePasswordConfirmChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirm(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value as Gender | "");
  };

  const handleBirthdayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthday(e.target.value);
  };

  const handleSignup = () => {
    if (!isFormValid) return;

    signupMutation.mutate({
      email,
      password,
      name,
      birthday,
      gender: gender as string,
      phoneNumber,
      agreedTosIds: agreedItems,
    });
  };

  const isFormValid = (() => {
    const emailValid = every([
      email.length >= 4,
      email.length <= 20,
      /[a-zA-Z]/.test(email),
      /[0-9]/.test(email),
    ]);

    const passwordValid = every([
      password.length >= 8,
      password.length <= 20,
      [
        /[a-zA-Z]/.test(password),
        /[0-9]/.test(password),
        /[!@#$%^&*(),.?":{}|<>]/.test(password),
      ].filter(Boolean).length >= 2,
    ]);

    const passwordMatch =
      passwordValid && passwordConfirm && password === passwordConfirm;

    const nameValid = every([
      name.length >= 2,
      name.length <= 10,
      /^[가-힣]+$/.test(name),
    ]);

    const birthdayValid = (() => {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(birthday)) return false;

      const [year, month, day] = birthday.split("-").map(Number);
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const age = currentYear - year;

      return every([
        year >= 1900 && year <= currentYear,
        month >= 1 && month <= 12,
        day >= 1 && day <= 31,
        new Date(year, month - 1, day).getDate() === day,
        new Date(year, month - 1, day) <= currentDate,
        age <= 120,
      ]);
    })();

    const genderValid = gender !== "";

    return every([
      emailValid,
      passwordMatch,
      nameValid,
      birthdayValid,
      genderValid,
    ]);
  })();

  return (
    <div className="h-full flex flex-col justify-between pt-[20px] pb-[40px]">
      <div className="flex flex-col gap-16">
        <EmailInput email={email} onEmailChange={handleEmailChange} />
        <PasswordSection
          password={password}
          passwordConfirm={passwordConfirm}
          onPasswordChange={handlePasswordChange}
          onPasswordConfirmChange={handlePasswordConfirmChange}
        />
        <NameInput name={name} onNameChange={handleNameChange} />
        <BirthdayInput
          birthday={birthday}
          onBirthdayChange={handleBirthdayChange}
        />
        <GenderInput gender={gender} onGenderChange={handleGenderChange} />
      </div>

      <NextButton
        onNext={handleSignup}
        disabled={!isFormValid || signupMutation.isPending}
      />
    </div>
  );
}
