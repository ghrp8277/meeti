"use client";

import { cn } from "@/lib/utils";

interface TabButtonProps {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

const TabButton = ({
  children,
  isActive = false,
  onClick,
  className,
}: TabButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-row justify-center items-center px-14 py-8 gap-10",
        "w-auto h-9 rounded-full transition-all",
        "text-sm font-medium leading-[140%] tracking-[-0.6px]",
        isActive
          ? "bg-black text-white font-semibold"
          : "bg-tin-grey-200 text-tin-grey-700",
        className
      )}
    >
      {children}
    </button>
  );
};

export default TabButton;
