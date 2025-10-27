"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PATH } from "@/app/constants";
import Image from "next/image";

export default function Page() {
  const router = useRouter();

  const handleEmailLogin = () => {
    router.push(PATH.LOGIN.EMAIL);
  };

  const handleGoogleLogin = () => {
    console.log("Google 로그인");
  };

  const handleKakaoLogin = () => {
    console.log("카카오 로그인");
  };

  return (
    <div className="flex flex-col gap-80 justify-center min-h-screen">
      <div className="flex flex-col gap-12">
        <div className="text-lead-grey-500 text-xl text-center">
          티켓 거래<span className="font-semibold">부터</span> 동행
          <span className="font-semibold">까지</span>,
          <br />
          <span className="font-semibold">모두 안전하게</span>
        </div>
      </div>

      <div className="flex flex-col gap-40">
        <div className="flex flex-col gap-10">
          <Button variant="outline" full onClick={handleKakaoLogin}>
            <div className="flex flex-row gap-8 items-center justify-center">
              <Image
                src="/sns/kakao/login.svg"
                alt="kakao"
                width={16}
                height={16}
              />
              <div className="text-md font-medium">카카오 로그인</div>
            </div>
          </Button>
          <Button variant="outline" full onClick={handleGoogleLogin}>
            <div className="flex flex-row gap-8 items-center justify-center">
              <Image
                src="/sns/google/login.svg"
                alt="google"
                width={16}
                height={16}
              />
              <div className="text-md font-medium">구글로 로그인</div>
            </div>
          </Button>
        </div>
        <div className="flex flex-col gap-20">
          <Button variant="default" full onClick={handleEmailLogin}>
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
      </div>
    </div>
  );
}
