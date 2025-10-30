"use client";

import Header from "@/app/components/header";
import { useRouter } from "next/navigation";
import { PATH } from "@/app/constants";
import { useParams } from "next/navigation";
import MessageList from "./_components/message-list";
import TransferSummary from "./_components/transfer-summary";
import ChatInput from "./_components/chat-input";

export default function Page() {
  const { id } = useParams();
  const router = useRouter();

  const handleBack = () => {
    router.push(PATH.CHAT.ROOT);
  };
  return (
    <>
      <div className="flex flex-col px-20">
        <Header title="채팅" onBack={handleBack} />
        <TransferSummary
          ticketsLabel="티켓 2장 보유"
          place="고척스카이돔"
          dateTime="2025.10.30 14:00"
          members="4/5명"
          onClick={() => {}}
        />
        <MessageList />
      </div>
      <ChatInput
        onSubmit={(val) => console.log(val)}
        onCtaClick={() => console.log("cta")}
      />
    </>
  );
}
