"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { PATH } from "@/app/constants";

export default function NoData() {
  const router = useRouter();
  const handleGoToCompanion = () => {
    router.push(PATH.COMPANION.ROOT);
  };

  return (
    <div className="py-40 px-20 flex flex-col gap-14 items-center justify-center">
      <div className="text-xs-medium text-lead-grey-100 text-center">
        현재 존재하는 대화가 없어요.
        <br /> 동행을 구하고 대화를 시작해 보세요.
      </div>

      <Button full variant="secondary" onClick={handleGoToCompanion}>
        동행 구하러 가기
      </Button>
    </div>
  );
}
