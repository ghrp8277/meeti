import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

interface Tab {
  id: string;
  label: string;
}

interface UseScrollSectionDetectorProps {
  tabs: Tab[];
  initialActiveTabId?: string;
}

export function useScrollSectionDetector({
  tabs,
  initialActiveTabId = "meeti-intro",
}: UseScrollSectionDetectorProps) {
  const [activeTabId, setActiveTabId] = useState<string>(initialActiveTabId);
  const router = useRouter();
  const pathname = usePathname();
  const isScrollingRef = useRef(false);
  const activeTabIdRef = useRef(activeTabId);

  useEffect(() => {
    activeTabIdRef.current = activeTabId;
  }, [activeTabId]);

  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingRef.current) return;

      const scrollPosition = window.scrollY + 50; // 헤더 + 탭 높이 고려

      // 각 섹션의 위치 계산
      const meetiIntroElement = document.getElementById("meeti-intro");
      const transferElement = document.getElementById("transfer");
      const divider = document.getElementById("divider-transfer-half");
      const halfTicketElement = document.getElementById("half-ticket");

      let activeSectionId: string | null = null;

      if (meetiIntroElement && transferElement) {
        const meetiIntroBottom =
          meetiIntroElement.getBoundingClientRect().bottom + window.scrollY;
        const transferTop =
          transferElement.getBoundingClientRect().top + window.scrollY;

        if (scrollPosition < meetiIntroBottom) {
          activeSectionId = "meeti-intro";
        } else if (divider && halfTicketElement) {
          // 디바이더 위치 계산
          const dividerTop =
            divider.getBoundingClientRect().top + window.scrollY;

          if (scrollPosition < dividerTop) {
            // 디바이더 이전 = 양도 섹션
            activeSectionId = "transfer";
          } else {
            // 디바이더 이후 = 동행 섹션
            activeSectionId = "half-ticket";
          }
        } else if (scrollPosition >= transferTop) {
          activeSectionId = "transfer";
        }
      }

      if (activeSectionId && activeTabIdRef.current !== activeSectionId) {
        setActiveTabId(activeSectionId);
        router.replace(`${pathname}#${activeSectionId}`, { scroll: false });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // 초기 실행
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname, router]);

  return { activeTabId, setActiveTabId, isScrollingRef };
}
