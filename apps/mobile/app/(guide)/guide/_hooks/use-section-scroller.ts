import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";

interface UseSectionScrollerProps {
  onScrollStart?: () => void;
  onScrollEnd?: () => void;
}

export function useSectionScroller({
  onScrollStart,
  onScrollEnd,
}: UseSectionScrollerProps = {}) {
  const router = useRouter();
  const pathname = usePathname();

  const scrollToSection = useCallback(
    (sectionId: string, updateUrl: boolean = true) => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      onScrollStart?.();

      // 헤더 높이(50px) + 탭 섹션 높이(약 60px) = 110px
      // 추가 여유 공간을 위해 120px 사용
      const offset = 50;
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + window.pageYOffset;
      const offsetPosition = elementTop - offset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth",
      });

      if (updateUrl) {
        router.replace(`${pathname}#${sectionId}`, { scroll: false });
      }

      setTimeout(() => {
        onScrollEnd?.();
      }, 300);
    },
    [onScrollStart, onScrollEnd, router, pathname]
  );

  return { scrollToSection };
}
