import { useEffect, useRef } from "react";
import { find } from "lodash-es";

interface Tab {
  id: string;
  label: string;
}

interface UseHashNavigationProps {
  tabs: Tab[];
  setActiveTabId: (id: string) => void;
  scrollToSection: (id: string) => void;
}

export function useHashNavigation({
  tabs,
  setActiveTabId,
  scrollToSection,
}: UseHashNavigationProps) {
  const isInitialMountRef = useRef(true);

  useEffect(() => {
    const setFromHash = () => {
      const hash = typeof window !== "undefined" ? window.location.hash : "";
      if (!hash) {
        if (!isInitialMountRef.current) {
          setActiveTabId("meeti-intro");
        }
        return;
      }
      const id = hash.replace(/^#/, "");
      const matched = find(tabs, (t) => t.id === id);
      if (matched) {
        setActiveTabId(matched.id);
        if (isInitialMountRef.current) {
          scrollToSection(matched.id);
        }
      }
    };

    if (isInitialMountRef.current) {
      setFromHash();
      isInitialMountRef.current = false;
    }

    window.addEventListener("hashchange", setFromHash);
    return () => {
      window.removeEventListener("hashchange", setFromHash);
    };
  }, [tabs, setActiveTabId, scrollToSection]);
}
