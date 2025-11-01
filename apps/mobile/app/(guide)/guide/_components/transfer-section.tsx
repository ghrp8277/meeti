import GuideSection from "./guide-section";

export default function TransferSection() {
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

  return (
    <div id="transfer" className="flex flex-col scroll-mt-[100px]">
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
    </div>
  );
}
