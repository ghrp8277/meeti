import { useEffect } from "react";

/**
 * 스크롤을 막고 복원하는 훅
 * @param isLocked - 스크롤을 막을지 여부
 */
export const useScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (isLocked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isLocked]);
};
