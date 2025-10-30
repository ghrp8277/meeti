"use client";

import { ArrowUp, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Props {
  onSubmit?: (value: string) => void;
  onCtaClick?: () => void;
}

function CtaButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-row justify-center items-center gap-[8px] px-[12px] h-[50px] w-full bg-brand-red-500 text-white text-base-bold rounded-t-[12px]"
    >
      <span className="text-base-bold text-white">반반티켓 전달하기</span>
      <BookOpen
        width={16}
        height={16}
        strokeWidth={1.6}
        className="text-white"
      />
    </button>
  );
}

function InputBar({
  value,
  onChange,
  onSend,
}: {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  placeholder?: string;
}) {
  const [isComposing, setIsComposing] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !isComposing) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="flex flex-row justify-center items-center gap-[10px] px-[20px] pb-[40px] pt-[8px] w-full bg-white">
      <div className="flex flex-row items-center justify-between gap-[8px] px-[16px] py-[12px] w-full bg-white border border-tin-grey-500 rounded-[12px]">
        <input
          className="flex-1 min-w-0 outline-none text-[15px] leading-[21px] tracking-[-0.6px] placeholder:text-tin-grey-700"
          placeholder="메시지 입력"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
        />
        <button
          type="button"
          onClick={onSend}
          className={cn(
            "relative w-[28px] h-[28px] rounded-full flex items-center justify-center",
            value.trim().length > 0 ? "bg-brand-red-500" : "bg-tin-grey-700"
          )}
          disabled={value.trim().length === 0}
        >
          <ArrowUp
            width={12}
            height={12}
            strokeWidth={1.6}
            className="text-white"
          />
        </button>
      </div>
    </div>
  );
}

export default function ChatInput({ onSubmit, onCtaClick }: Props) {
  const [text, setText] = useState("");
  const handleSend = () => {
    if (!text.trim()) return;
    onSubmit?.(text.trim());
    setText("");
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-[4]">
        <div className="max-w-[375px] mx-auto w-full pb-[env(safe-area-inset-bottom)]">
          <CtaButton onClick={onCtaClick} />
          <InputBar value={text} onChange={setText} onSend={handleSend} />
        </div>
      </div>
      <div className="h-[calc(160px+env(safe-area-inset-bottom))]" />
    </>
  );
}
