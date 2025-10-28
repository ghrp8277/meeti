import { ChevronRight } from "lucide-react";

export default function PointerInfoSection() {
  return (
    <div className="pb-12 px-20">
      <div className="rounded-[12px] flex flex-row justify-between items-center py-12 px-20 bg-brand-red-100">
        <div className="text-brand-red-500 text-s-semibold">
          점수가 올라갈수록 수수료가 내려가요.
        </div>

        <div className="flex flex-row items-center cursor-pointer">
          <div className="text-s-semibold text-brand-red-400">점수 올리기</div>
          <ChevronRight
            width={16}
            height={16}
            strokeWidth={1.6}
            className="text-brand-red-400"
          />
        </div>
      </div>
    </div>
  );
}
