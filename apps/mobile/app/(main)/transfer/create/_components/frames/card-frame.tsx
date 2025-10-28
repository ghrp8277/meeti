import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function CardFrame() {
  return (
    <div className="flex flex-col gap-20 p-20">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row">
            <label className="text-sm-semibold text-black">
              정산•취소 수수료 카드 등록
            </label>
            <span className="bg-brand-red-500 rounded-full w-4 h-4 inline-block ml-1 align-text-top"></span>
          </div>
          <Button full variant="outline">
            <div className="flex flex-row gap-8 items-center justify-center">
              <div className="text-black text-base font-bold">카드 등록</div>
              <Plus
                width={20}
                height={20}
                strokeWidth={1.6}
                className="text-black"
                stroke="currentColor"
                fill="currentColor"
              />
            </div>
          </Button>
        </div>
        <div className="text-s text-lead-grey-800">정책 내용 요약</div>
      </div>
    </div>
  );
}
