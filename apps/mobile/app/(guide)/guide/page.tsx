"use client";

import BottomNavigationBar from "@/app/components/bottom-navigation-bar";
import Header from "@/app/components/header";
import TabSection from "./_components/tab-section";
import MeetiIntroSection from "./_components/meeti-intro-section";
import TransferSection from "./_components/transfer-section";
import HalfTicketSection from "./_components/half-ticket-section";
import Divider from "@/components/ui/divider";

export default function Page() {
  return (
    <div>
      <Header title="가이드" />
      <TabSection />
      <div className="py-16 flex flex-col">
        <MeetiIntroSection />
        <TransferSection />
        <Divider id="divider-transfer-half" />
        <HalfTicketSection />
      </div>
      <BottomNavigationBar />
    </div>
  );
}
