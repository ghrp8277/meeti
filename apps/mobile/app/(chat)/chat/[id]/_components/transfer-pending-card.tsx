"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
  className?: string;
  timestampLabel?: string;
  onClickCta?: () => void;
}

function TicketBadge() {
  return (
    <div className="absolute right-[8px] top-[6px] rotate-[4.72deg] w-[44px] h-[36px]">
      <Image
        src="/chat/ticket.svg"
        alt="ticket"
        fill
        className="object-contain"
      />
      <span className="absolute inset-0 flex items-center justify-center text-[8px] font-semibold leading-[20px] tracking-[-0.6px] text-white -rotate-[23deg]">
        TICKET
      </span>
    </div>
  );
}

function Header() {
  return (
    <div className="relative box-border flex flex-row items-center gap-[10px] px-[12px] py-[16px] w-full h-[51px] bg-brand-red-200 border border-brand-red-300 rounded-t-[8px] isolate">
      <span className="text-base-semibold text-brand-red-500">
        반반티켓 전달중
      </span>
      <TicketBadge />
    </div>
  );
}

function InfoBox() {
  return (
    <div className="flex flex-row items-center justify-center gap-[10px] px-[8px] py-[8px] w-full bg-tin-grey-200 rounded-[8px]">
      <span className="text-xs text-lead-grey-100">
        발권 정보 전송은 아래{" "}
        <span className="text-xs-bold">결제 현황 보기</span> 또는
        <br />
        <span className="text-xs-bold">마이페이지 → 판매 내역 → 결제완료</span>
        에서 가능해요.
      </span>
    </div>
  );
}

function Body({ onClickCta }: { onClickCta?: () => void }) {
  return (
    <div className="box-border flex flex-col items-start gap-[12px] px-[12px] py-[16px] w-full h-auto bg-white border border-tin-grey-500 rounded-b-[20px]">
      <div className="flex flex-col items-start gap-[8px] w-full">
        <div className="flex flex-col w-full">
          <span className="text-sm-medium text-black">
            반반티켓 결제 요청중이에요!
          </span>
          <span className="text-sm text-lead-grey-100">
            결제가 완료되면 발권 정보를 전달해 주세요.
          </span>
        </div>

        <InfoBox />
      </div>

      <button
        type="button"
        onClick={onClickCta}
        className="flex flex-row items-center justify-center gap-[8px] px-[12px] h-[42px] w-full bg-brand-red-100 rounded-[12px] hover:bg-brand-red-200 transition-colors"
      >
        <span className="text-md-semibold text-brand-red-500">
          결제 현황 보기
        </span>
      </button>
    </div>
  );
}

export default function TransferPendingCard({
  className,
  timestampLabel,
  onClickCta,
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-row items-center justify-end px-0 py-[4px] gap-[10px] w-full",
        className
      )}
    >
      <div className="flex flex-col items-end gap-[6px] w-[269px]">
        <div className="flex flex-col items-start w-full">
          <Header />
          <Body onClickCta={onClickCta} />
        </div>
        {timestampLabel && (
          <div className="text-xs text-tin-grey-900 text-center">
            {timestampLabel}
          </div>
        )}
      </div>
    </div>
  );
}
