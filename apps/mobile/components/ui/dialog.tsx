"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DialogProps {
  children: ReactNode;
  className?: string;
}

interface DialogContentProps {
  children: ReactNode;
  className?: string;
}

interface DialogMessageProps {
  children: ReactNode;
  className?: string;
}

interface DialogButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

function Dialog({ children, className }: DialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className={cn("relative", className)}>{children}</div>
    </div>
  );
}

function DialogContent({ children, className }: DialogContentProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center p-5 gap-5",
        "w-[300px]",
        "bg-white shadow-[0px_0px_8px_rgba(86,86,86,0.16)] rounded-[12px]",
        className
      )}
    >
      {children}
    </div>
  );
}

function DialogMessage({ children, className }: DialogMessageProps) {
  return (
    <div
      className={cn(
        "w-[260px]",
        "text-base font-bold leading-[140%] text-center tracking-[-0.6px]",
        "text-black",
        "flex-none order-0 self-stretch flex-grow-0",
        className
      )}
    >
      {children}
    </div>
  );
}

function DialogButton({ children, onClick, className }: DialogButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-row justify-center items-center p-3 gap-2",
        "w-[260px] h-[42px]",
        "bg-black rounded-[12px]",
        "flex-none order-1 self-stretch flex-grow-0",
        "text-[15px] font-semibold leading-[140%] tracking-[-0.6px]",
        "text-white",
        "hover:bg-lead-grey-600 transition-colors",
        className
      )}
    >
      {children}
    </button>
  );
}

export { Dialog, DialogContent, DialogMessage, DialogButton };
