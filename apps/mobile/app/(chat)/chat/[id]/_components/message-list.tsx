"use client";

import IncomingMessage from "./incoming-message";
import OutgoingMessage from "./outgoing-message";
import PaymentCompleteNotice from "./payment-complete-notice";
import SystemNotice from "./system-notice";
import TransferPendingCard from "./transfer-pending-card";
import RecruitmentClosedNotice from "./recruitment-closed-notice";

export default function MessageList() {
  return (
    <div className="flex flex-col w-full">
      {/* 상대가 보낸 메시지들 */}
      <IncomingMessage
        name="이땡땡"
        label="등급?"
        message="안녕하세요"
        time="1일 전"
      />
      <IncomingMessage
        name="이땡땡"
        label="등급?"
        message="안녕하세요요안녕하세요안녕하세요"
        time="1일 전"
      />

      {/* 시스템 알림 */}
      <SystemNotice message="최민지님이 들어왔어요." />
      <SystemNotice message="이땡땡님이 나갔어요." />

      {/* 내가 보낸 메시지들 */}
      <OutgoingMessage message="ㅇㅇ" time="5분 전" />
      <OutgoingMessage
        message="안녕하세요요안녕하세요안녕하세요안녕하세요요안녕하세요안녕하세요안녕하세요요안녕하세요안녕하세요안녕하세요요안녕하세요안녕하세요"
        time="1분 전"
      />

      <TransferPendingCard
        timestampLabel="1분 전"
        onClickCta={() => console.log("결제 현황 보기")}
      />

      <PaymentCompleteNotice name="아이이" />
      <PaymentCompleteNotice name="아이이" />

      <RecruitmentClosedNotice />
    </div>
  );
}
