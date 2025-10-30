"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import TabButton from "@/components/ui/tab-button";
import { map, some, find } from "lodash-es";

interface Tab {
  id: string;
  label: string;
}

const tabs: Tab[] = [
  { id: "meeti-intro", label: "밋티 소개" },
  { id: "transfer", label: "양도" },
  { id: "half-ticket", label: "반반티켓" },
];

interface TabSectionProps {
  initialActiveTabId?: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
}

const TabSection = ({
  initialActiveTabId = "meeti-intro",
  onTabChange,
  className,
}: TabSectionProps) => {
  const [activeTabId, setActiveTabId] = useState(initialActiveTabId);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const setFromHash = () => {
      const hash = typeof window !== "undefined" ? window.location.hash : "";
      if (!hash) return;
      const id = hash.replace(/^#/, "");
      const matched = find(tabs, (t) => t.id === id);
      if (!matched) return;
      setActiveTabId(matched.id);
      onTabChange?.(matched.id);
    };
    setFromHash();
    window.addEventListener("hashchange", setFromHash);
    return () => window.removeEventListener("hashchange", setFromHash);
  }, [onTabChange]);

  const handleTabClick = (tabId: string) => {
    setActiveTabId(tabId);
    onTabChange?.(tabId);
    router.replace(`${pathname}#${tabId}`, { scroll: false });
  };

  return (
    <div
      className={cn(
        "flex flex-row items-center px-20 py-12 pb-16 gap-6",
        "w-full bg-white",
        className
      )}
    >
      {map(tabs, (tab) => (
        <TabButton
          key={tab.id}
          isActive={activeTabId === tab.id}
          onClick={() => handleTabClick(tab.id)}
        >
          {tab.label}
        </TabButton>
      ))}
    </div>
  );
};

export default TabSection;
