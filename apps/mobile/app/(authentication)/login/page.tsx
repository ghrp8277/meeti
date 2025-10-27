"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PATH } from "@/app/constants";
import Image from "next/image";

const createLoginHandler = (router: any, type: string) => {
  return () => {
    if (type === "email") {
      router.push(PATH.LOGIN.EMAIL);
    } else {
      console.log(`${type} 로그인`);
    }
  };
};

const LoginHeader = () => {
  return (
    <div className="flex flex-col gap-12 items-center">
      <Image src="/logo/logo.svg" alt="logo" width={100} height={100} />
      <div className="text-lead-grey-500 text-xl text-center">
        티켓 거래<span className="font-semibold">부터</span> 동행
        <span className="font-semibold">까지</span>,
        <br />
        <span className="font-semibold">모두 안전하게</span>
      </div>
    </div>
  );
};

const SocialLoginButton = ({
  onClick,
  iconSrc,
  alt,
  children,
}: {
  onClick: () => void;
  iconSrc: string;
  alt: string;
  children: React.ReactNode;
}) => {
  return (
    <Button variant="outline" full onClick={onClick}>
      <div className="flex flex-row gap-8 items-center justify-center">
        <Image src={iconSrc} alt={alt} width={16} height={16} />
        <div className="text-md font-medium">{children}</div>
      </div>
    </Button>
  );
};

const SocialLoginSection = ({
  onKakaoLogin,
  onGoogleLogin,
}: {
  onKakaoLogin: () => void;
  onGoogleLogin: () => void;
}) => {
  return (
    <div className="flex flex-col gap-10">
      <SocialLoginButton
        onClick={onKakaoLogin}
        iconSrc="/sns/kakao/login.svg"
        alt="kakao"
      >
        카카오 로그인
      </SocialLoginButton>
      <SocialLoginButton
        onClick={onGoogleLogin}
        iconSrc="/sns/google/login.svg"
        alt="google"
      >
        구글로 로그인
      </SocialLoginButton>
    </div>
  );
};

const EmailLoginSection = ({ onEmailLogin }: { onEmailLogin: () => void }) => {
  return (
    <div className="flex flex-col gap-20">
      <Button variant="default" full onClick={onEmailLogin}>
        이메일 로그인
      </Button>

      <div className="flex flex-row gap-8 items-center justify-center">
        <div className="text-lead-grey-100 text-sm-medium">
          아직 회원이 아니신가요?
        </div>
        <Link href="/signup">
          <div className="text-brand-red-500 text-sm-medium underline">
            회원가입
          </div>
        </Link>
      </div>
    </div>
  );
};

const LoginActions = ({
  onKakaoLogin,
  onGoogleLogin,
  onEmailLogin,
}: {
  onKakaoLogin: () => void;
  onGoogleLogin: () => void;
  onEmailLogin: () => void;
}) => {
  return (
    <div className="flex flex-col gap-40">
      <SocialLoginSection
        onKakaoLogin={onKakaoLogin}
        onGoogleLogin={onGoogleLogin}
      />
      <EmailLoginSection onEmailLogin={onEmailLogin} />
    </div>
  );
};

export default function Page() {
  const router = useRouter();

  const handleEmailLogin = createLoginHandler(router, "email");
  const handleGoogleLogin = createLoginHandler(router, "google");
  const handleKakaoLogin = createLoginHandler(router, "kakao");

  return (
    <div className="flex flex-col gap-80 justify-center min-h-screen">
      <LoginHeader />
      <LoginActions
        onKakaoLogin={handleKakaoLogin}
        onGoogleLogin={handleGoogleLogin}
        onEmailLogin={handleEmailLogin}
      />
    </div>
  );
}
