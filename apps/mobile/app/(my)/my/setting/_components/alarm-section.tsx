import { Switch } from "@/components/ui/switch";
import { ChevronRight } from "lucide-react";

export default function AlarmSection() {
  return (
    <div className="flex flex-col gap-6 px-20">
      <div className="text-tin-grey-700 text-xs-semibold">알림 설정</div>
      <div className="flex flex-col">
        <div className="py-14 flex flex-row justify-between items-center">
          <div className="flex flex-col">
            <div className="text-base text-black">필수 공지 알림</div>
            <div className="text-xs text-lead-grey-100">
              구매 및 발권 알림을 앱 푸쉬로 안내드려요
            </div>
          </div>
          <Switch />
        </div>

        <div className="py-14 flex flex-row justify-between items-center">
          <div className="flex flex-col">
            <div className="text-base text-black">정가/정가 이하 티켓 알림</div>
            <div className="text-xs text-lead-grey-100">
              정가 또는 정가 이하의 티켓이 등록되면 알려드려요
            </div>
          </div>
        </div>

        <div className="pb-12 flex flex-row justify-between items-center">
          <div className="flex flex-col">
            <div className="text-sm-semibold text-black">스포츠</div>
            <div className="flex flex-row items-center cursor-pointer">
              <div className="text-sm text-tin-grey-700">세부 설정</div>
              <ChevronRight
                width={16}
                height={16}
                strokeWidth={1.6}
                className="text-tin-grey-700"
              />
            </div>
          </div>
          <Switch />
        </div>

        <div className="py-12 flex flex-row justify-between items-center">
          <div className="flex flex-col">
            <div className="text-sm-semibold text-black">콘서트</div>
          </div>
          <Switch />
        </div>

        <div className="py-12 flex flex-row justify-between items-center">
          <div className="flex flex-col">
            <div className="text-sm-semibold text-black">뮤지컬/공연</div>
          </div>
          <Switch />
        </div>

        <div className="py-14 flex flex-row justify-between items-center">
          <div className="flex flex-col">
            <div className="text-base text-black">헤택 정보 수신</div>
            <div className="text-xs text-lead-grey-100">
              이벤트 소식과 공지 등을 앱 푸시와 문자로 안내드려요
            </div>
          </div>
          <Switch />
        </div>
      </div>
    </div>
  );
}
