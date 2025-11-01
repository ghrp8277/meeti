"use client";

import { useCallback } from "react";
import { cn } from "@/lib/utils";
import { useScrollSectionDetector } from "../_hooks/use-scroll-section-detector";
import { useHashNavigation } from "../_hooks/use-hash-navigation";
import { useSectionScroller } from "../_hooks/use-section-scroller";
import { useStickyTab } from "../_hooks/use-sticky-tab";
import TabButtons from "./tab-buttons";

interface Tab {
  id: string;
  label: string;
}

const tabs: Tab[] = [
  { id: "meeti-intro", label: "밋티 소개" },
  { id: "transfer", label: "양도" },
  { id: "half-ticket", label: "동행" },
];

interface TabSectionProps {
  className?: string;
}

const TabSection = ({ className }: TabSectionProps) => {
  const { activeTabId, setActiveTabId, isScrollingRef } =
    useScrollSectionDetector({ tabs });

  const { isSticky, containerRef } = useStickyTab({ initialTop: 0 });

  const onScrollStart = useCallback(() => {
    isScrollingRef.current = true;
  }, [isScrollingRef]);

  const onScrollEnd = useCallback(() => {
    isScrollingRef.current = false;
  }, [isScrollingRef]);

  const { scrollToSection } = useSectionScroller({
    onScrollStart,
    onScrollEnd,
  });

  useHashNavigation({
    tabs,
    setActiveTabId,
    scrollToSection,
  });

  const handleTabClick = useCallback(
    (tabId: string) => {
      setActiveTabId(tabId);
      scrollToSection(tabId);
    },
    [setActiveTabId, scrollToSection]
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex flex-row items-center px-20 py-12 pb-16 gap-6",
        "w-full bg-white",
        isSticky && "sticky top-[0px] z-[4]",
        className
      )}
    >
      <TabButtons
        tabs={tabs}
        activeTabId={activeTabId}
        onTabClick={handleTabClick}
      />
    </div>
  );
};

export default TabSection;
