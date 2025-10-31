import Image from "next/image";
import GuideSection from "./guide-section";
import Divider from "@/components/ui/divider";

export default function MeetiIntroSection() {
  // 양도 이미지
  const transferImages = [
    "/guide/meeti-intro/transfer/1.png",
    "/guide/meeti-intro/transfer/2.png",
    "/guide/meeti-intro/transfer/3.png",
    "/guide/meeti-intro/transfer/4.png",
    "/guide/meeti-intro/transfer/5.png",
  ];

  // 양도 수수료 할인 / 혜택 이미지
  const transferBenefitImages = [
    "/guide/meeti-intro/transfer-benefit/1.png",
    "/guide/meeti-intro/transfer-benefit/2.png",
    "/guide/meeti-intro/transfer-benefit/3.png",
  ];

  // 동행 이미지
  const companionImages = [
    "/guide/meeti-intro/companion/1.png",
    "/guide/meeti-intro/companion/2.png",
    "/guide/meeti-intro/companion/3.png",
    "/guide/meeti-intro/companion/4.png",
  ];

  // 반반티켓 이미지
  const halfTicketImages = [
    "/guide/meeti-intro/half-ticket/1.png",
    "/guide/meeti-intro/half-ticket/2.png",
    "/guide/meeti-intro/half-ticket/3.png",
    "/guide/meeti-intro/half-ticket/4.png",
    "/guide/meeti-intro/half-ticket/5.png",
    "/guide/meeti-intro/half-ticket/6.png",
    "/guide/meeti-intro/half-ticket/7.png",
  ];

  // 점수가 오를수록 수수료가 낮아져요 이미지
  const chargeImages = [
    "/guide/meeti-intro/charge/1.png",
    "/guide/meeti-intro/charge/2.png",
  ];

  return (
    <div className="flex flex-col">
      <div className="px-20">
        <Image
          src="/guide/meeti-intro/intro.png"
          alt="meeti-intro"
          className="w-full h-full"
          width={375}
          height={210}
        />
      </div>

      <GuideSection
        className="py-[50px] px-20 flex flex-col gap-8"
        badge="양도"
        title="에스크로 결제로 사기 걱정 NO"
        images={transferImages}
        bullets={[
          "결제 시 구매자는 취소가 불가능하며, 판매자는 취소 시 취소 수수료와 제재를 받을 수 있어요.",
          "공식 취소 또는 판매자의 일방적 취소 시 결제금은 모두 환불돼요.",
        ]}
      />

      <GuideSection
        className="flex flex-col gap-8 px-20 pb-[50px]"
        title="양도 시 가격별 수수료 할인 / 혜택"
        images={transferBenefitImages}
        bullets={[
          "정가 대비 판매금이 낮을수록 수수료가 내려가고 혜택이 제공돼요.",
        ]}
      />

      <Divider />

      <GuideSection
        className="py-[50px] px-20 flex flex-col gap-8"
        badge="동행"
        title="방을 만들고 원하는 사람들과 함께해요"
        images={companionImages}
        bullets={[
          "현재 참여중인 인원들만 지정하여 소통할 수 있어요.",
          "반반티켓 이용 시 일정 종료까지 방 나가기가 불가능해요.",
        ]}
      />

      <GuideSection
        className="flex flex-col gap-8 px-20 pb-[50px]"
        title="반반티켓으로 1/N, 노쇼 걱정 없이"
        images={halfTicketImages}
        bullets={[
          "반반티켓으로 결제가 묶여있어 약속을 파기하기 어려워요.",
          "반반티켓 이용 시 일정 종료까지 방 나가기가 불가능해요.",
          "반반티켓 결제 시 구매자는 취소가 불가능하며, 판매자는 취소 시 취소 수수료와 제재를 받을 수 있어요.",
          "공식 취소 또는 판매자의 일방적 취소 시 결제금은 모두 환불돼요.",
        ]}
      />

      <GuideSection
        className="flex flex-col gap-8 px-20 pb-[50px]"
        title="점수가 오를수록 수수료가 낮아져요"
        images={chargeImages}
        bullets={[
          "점수가 올라갈수록 수수료는 낮아지고 받을 수 있는 혜택은 많아져요.",
          "혜택과 수수료 반영률은 회사 정책에 따라 변경될 수 있어요.",
        ]}
      />
    </div>
  );
}
