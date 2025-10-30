"use client";

import Header from "@/app/components/header";
import { useRouter } from "next/navigation";
import { PATH } from "@/app/constants";
import { useParams } from "next/navigation";
export default function Page() {
  const { id } = useParams();
  const router = useRouter();

  const handleBack = () => {
    router.push(PATH.CHAT.ROOT);
  };
  return (
    <div className="flex flex-col px-20">
      <Header title="채팅" onBack={handleBack} />
    </div>
  );
}
