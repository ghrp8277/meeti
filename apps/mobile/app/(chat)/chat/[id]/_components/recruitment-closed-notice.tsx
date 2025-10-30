"use client";

import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

function NoticeContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-[10px] pt-[8px] w-full",
        className
      )}
    >
      <div className="flex flex-col items-center justify-center px-[14px] py-[8px] w-auto bg-brand-red-100 rounded-[8px]">
        {children}
      </div>
    </div>
  );
}

function Title() {
  return (
    <div className="text-xxs-bold text-brand-red-500 text-center">
      인원 모집이 종료되었어요.
    </div>
  );
}

function Subtitle() {
  return (
    <div className="text-xxs text-brand-red-500 text-center">
      더이상 새로운 인원이 들어오지 않아요.
    </div>
  );
}

export default function RecruitmentClosedNotice({ className }: Props) {
  return (
    <NoticeContainer className={className}>
      <Title />
      <Subtitle />
    </NoticeContainer>
  );
}
