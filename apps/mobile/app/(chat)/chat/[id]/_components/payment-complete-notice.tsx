"use client";

import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaymentCompleteNoticeProps {
  className?: string;
  name?: string;
}

function NoticeIcon() {
  return (
    <div className="relative w-[16px] h-[16px]">
      <Bell
        width={16}
        height={16}
        strokeWidth={1.5}
        className="text-yellow-500 fill-yellow-500"
        fill="currentColor"
      />
    </div>
  );
}

function NoticeMessage({ name }: { name: string }) {
  return (
    <span className="text-sm-medium text-yellow-1000">
      {name}님이 결제를 완료했어요.
    </span>
  );
}

function NoticeContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-[4px] w-full px-[24px] py-[10px] bg-yellow-200 rounded-[8px]">
      <div className="flex flex-row items-center gap-[5px] h-[20px]">
        {children}
      </div>
    </div>
  );
}

export default function PaymentCompleteNotice({
  className,
  name = "김철수",
}: PaymentCompleteNoticeProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-[10px] pt-[8px] w-full",
        className
      )}
    >
      <NoticeContainer>
        <NoticeIcon />
        <NoticeMessage name={name} />
      </NoticeContainer>
    </div>
  );
}
