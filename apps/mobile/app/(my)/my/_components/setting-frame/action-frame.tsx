import { ChevronRight, CircleParking, CreditCard } from "lucide-react";

export default function ActionFrame() {
  return (
    <div className="bg-white rounded-[12px] border border-tin-grey-200">
      <div className="py-16 flex flex-row justify-between items-center px-20">
        <div className="flex flex-col gap-4">
          <div className="text-xs text-lead-grey-800">판매 내역</div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-xs text-lead-grey-800">판매 내역</div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-xs text-lead-grey-800">판매 내역</div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-xs text-lead-grey-800">판매 내역</div>
        </div>
      </div>

      <div className="flex flex-col px-20 pt-8 pb-14">
        <div className="flex flex-row justify-between items-center py-14 cursor-pointer">
          <div className="flex flex-row gap-4">
            <CircleParking
              width={20}
              height={20}
              strokeWidth={1.6}
              className="text-black"
            />
            <div className="text-md text-lead-grey-800">포인트</div>
          </div>

          <div className="flex flex-row gap-4 items-center">
            <div className="text-sm-semibold text-lead-grey-800">0P</div>
            <ChevronRight
              width={16}
              height={16}
              strokeWidth={1.6}
              className="text-tin-grey-700"
            />
          </div>
        </div>

        <div className="flex flex-row justify-between items-center py-14 cursor-pointer">
          <div className="flex flex-row gap-4">
            <CreditCard
              width={20}
              height={20}
              strokeWidth={1.6}
              className="text-black"
            />
            <div className="text-md text-lead-grey-800">카드 등록</div>
          </div>

          <div className="flex flex-row gap-4 items-center">
            <div className="text-sm-semibold text-lead-grey-100">미등록</div>
            <ChevronRight
              width={16}
              height={16}
              strokeWidth={1.6}
              className="text-tin-grey-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
