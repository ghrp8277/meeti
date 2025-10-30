"use client";

import { useEffect, useState } from "react";
import BottomNavigationBar from "@/app/components/bottom-navigation-bar";
import Header from "@/app/components/header";
import TabSection from "./_components/tab-section";
import MeetiIntroSection from "./_components/meeti-intro-section";
import TransferSection from "./_components/transfer-section";
import HalfTicketSection from "./_components/half-ticket-section";

export default function Page() {
  const [activeTab, setActiveTab] = useState<string>("meeti-intro");

  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    if (!hash) return;
    const id = hash.replace(/^#/, "");
    if (["meeti-intro", "transfer", "half-ticket"].includes(id)) {
      setActiveTab(id);
    }
  }, []);

  return (
    <div>
      <Header title="가이드" />
      <TabSection onTabChange={setActiveTab} />
      <div className="py-16">
        {activeTab === "meeti-intro" && <MeetiIntroSection />}
        {activeTab === "transfer" && <TransferSection />}
        {activeTab === "half-ticket" && <HalfTicketSection />}
      </div>
      <BottomNavigationBar />
    </div>
  );
}
