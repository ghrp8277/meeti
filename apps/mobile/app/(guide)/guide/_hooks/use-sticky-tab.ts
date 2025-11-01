import { useEffect, useState, useRef } from "react";

interface UseStickyTabProps {
  initialTop?: number;
}

export function useStickyTab({ initialTop = 50 }: UseStickyTabProps = {}) {
  const [isSticky, setIsSticky] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const originalTopRef = useRef<number>(0);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    const updateOriginalTop = () => {
      if (containerRef.current && !isInitializedRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        originalTopRef.current = rect.top + window.scrollY;
        isInitializedRef.current = true;
      }
    };

    const handleScroll = () => {
      if (!containerRef.current) return;

      updateOriginalTop();

      const scrollY = window.scrollY;
      const threshold = originalTopRef.current - initialTop;

      if (scrollY >= threshold) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    updateOriginalTop();
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateOriginalTop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateOriginalTop);
    };
  }, [initialTop]);

  return { isSticky, containerRef };
}
