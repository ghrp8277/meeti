"use client";

import { Input } from "@/components/ui/input";
import Header from "../../_components/header";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Checkbox from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function Page() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [autoLogin, setAutoLogin] = useState(false);
  const [keepLogin, setKeepLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleAutoLoginChange = (checked: boolean) => {
    setAutoLogin(checked);
  };

  const handleKeepLoginChange = (checked: boolean) => {
    setKeepLogin(checked);
  };

  const handleLogin = async () => {
    if (!email || !password) return;

    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.ok) {
        router.push("/");
      } else {
        console.error("로그인 실패:", result?.error);
      }
    } catch (error) {
      console.error("로그인 에러:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container h-screen flex flex-col">
      <Header title="로그인" onBack={() => router.back()} />
      <div className="flex-1 h-full flex flex-col justify-between pt-[20px] pb-[40px]">
        <div className="flex flex-col gap-20">
          <div className="flex flex-col gap-16">
            <Input
              label="아이디"
              full
              required
              type="text"
              placeholder="아이디를 입력해주세요."
              value={email}
              onChange={handleEmailChange}
            />
            <Input
              label="비밀번호"
              full
              required
              type="password"
              showPasswordToggle
              placeholder="비밀번호를 입력해주세요."
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          <div className="flex flex-row gap-16">
            <div className="flex flex-row gap-4">
              <Checkbox checked={autoLogin} onChange={handleAutoLoginChange} />
              <div className="text-sm-medium text-lead-grey-800">
                자동 로그인
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <Checkbox checked={keepLogin} onChange={handleKeepLoginChange} />
              <div className="text-sm-medium text-lead-grey-800">
                로그인 유지
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-20">
          <Button
            variant="default"
            full
            onClick={handleLogin}
            loading={isLoading}
            disabled={!email || !password}
          >
            로그인
          </Button>

          <div className="flex flex-row justify-center">
            <div className="px-24 text-sm-medium text-lead-grey-800 border-r border-tin-grey-500">
              <Link href="/find/email">아이디 찾기</Link>
            </div>
            <div className="px-24 text-sm-medium text-lead-grey-800">
              <Link href="/find/password">비밀번호 찾기</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
