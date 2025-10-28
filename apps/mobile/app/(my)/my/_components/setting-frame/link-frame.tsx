import { ChevronRight } from "lucide-react";

export default function LinkFrame() {
  return (
    <div className="bg-white rounded-[12px] border border-tin-grey-200 py-12">
      <div className="px-20">
        <div className="py-14 flex flex-row justify-between items-center cursor-pointer">
          <div className="text-lead-grey-800 text-md">공지사항</div>
          <ChevronRight
            width={16}
            height={16}
            strokeWidth={1.6}
            className="text-lead-grey-700"
          />
        </div>

        <div className="py-14 flex flex-row justify-between items-center cursor-pointer">
          <div className="text-lead-grey-800 text-md">고객센터</div>
          <ChevronRight
            width={16}
            height={16}
            strokeWidth={1.6}
            className="text-lead-grey-700"
          />
        </div>

        <div className="py-14 flex flex-row justify-between items-center cursor-pointer">
          <div className="text-lead-grey-800 text-md">자주 묻는 질문</div>
          <ChevronRight
            width={16}
            height={16}
            strokeWidth={1.6}
            className="text-lead-grey-700"
          />
        </div>

        <div className="py-14 flex flex-row justify-between items-center cursor-pointer">
          <div className="text-lead-grey-800 text-md">약관 및 정책</div>
          <ChevronRight
            width={16}
            height={16}
            strokeWidth={1.6}
            className="text-lead-grey-700"
          />
        </div>
      </div>
    </div>
  );
}
