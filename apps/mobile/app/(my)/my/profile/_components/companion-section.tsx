import { ChevronRight } from "lucide-react";

export default function CompanionSection() {
  return (
    <div className="rounded-[12px] bg-white border border-tin-grey-200 p-20 flex flex-row justify-between items-center">
      <div className="text-black text-base-bold">동행 완료</div>
      <div className="flex flex-row gap-4 items-center cursor-pointer">
        <div className="text-sm-semibold text-lead-grey-100">12회</div>
        <ChevronRight
          width={16}
          height={16}
          strokeWidth={1.6}
          className="text-tin-grey-700"
        />
      </div>
    </div>
  );
}
