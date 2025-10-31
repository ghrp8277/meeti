export default function DescriptionSection() {
  return (
    <div className="p-20 bg-tin-grey-200">
      <ul className="list-disc list-outside pl-20 space-y-10 text-xs text-tin-grey-700 marker:text-tin-grey-700">
        <li>
          거래 확정 후 티켓을 전달하지 않거나 잘못 전달한 경우, 취소 수수료가
          부과됩니다. (정상 거래 시 부과되지 않음.)
        </li>
        <li>
          카드 등록 시 본인 확인을 위해 1,000원이 임시 결제되며, 승인 후 즉시
          취소 처리됩니다.
        </li>
        <li>
          결제 정보 오류로 인해 결제가 되지 않을 경우 별도 고지 없이 지속적으로
          재결제를 시도할 수 있습니다.
        </li>
      </ul>
    </div>
  );
}
