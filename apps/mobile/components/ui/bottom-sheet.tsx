"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { cn } from "@/lib/utils";
import { useScrollLock } from "@/hooks/use-scroll-lock";

interface BottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

const BottomSheet = ({
  open,
  onOpenChange,
  children,
  className,
}: BottomSheetProps) => {
  useScrollLock(open);

  return (
    <DrawerPrimitive.Root
      open={open}
      onOpenChange={onOpenChange}
      direction="bottom"
    >
      <DrawerPrimitive.Portal>
        <DrawerPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50" />
        <DrawerPrimitive.Content
          className={cn(
            "fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl",
            "max-w-[375px] mx-auto",
            "max-h-[80vh] overflow-hidden",
            className
          )}
        >
          <DrawerPrimitive.Title className="sr-only">
            Bottom Sheet
          </DrawerPrimitive.Title>
          <div className="flex flex-col h-full">
            <div className="flex justify-center py-3">
              <div className="w-10 h-1 bg-tin-grey-500 rounded-full" />
            </div>
            <div className="flex-1 overflow-y-auto px-4 pb-4">{children}</div>
          </div>
        </DrawerPrimitive.Content>
      </DrawerPrimitive.Portal>
    </DrawerPrimitive.Root>
  );
};

interface BottomSheetHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const BottomSheetHeader = ({ children, className }: BottomSheetHeaderProps) => {
  return (
    <div className={cn("px-4 py-4 border-b border-tin-grey-300", className)}>
      {children}
    </div>
  );
};

interface BottomSheetTitleProps {
  children: React.ReactNode;
  className?: string;
}

const BottomSheetTitle = ({ children, className }: BottomSheetTitleProps) => {
  return (
    <h3 className={cn("text-lg font-semibold text-lead-grey-800", className)}>
      {children}
    </h3>
  );
};

interface BottomSheetContentProps {
  children: React.ReactNode;
  className?: string;
}

const BottomSheetContent = ({
  children,
  className,
}: BottomSheetContentProps) => {
  return <div className={cn("px-4 py-4", className)}>{children}</div>;
};

interface BottomSheetFooterProps {
  children: React.ReactNode;
  className?: string;
}

const BottomSheetFooter = ({ children, className }: BottomSheetFooterProps) => {
  return (
    <div
      className={cn(
        "px-4 py-4 border-t border-tin-grey-300 bg-tin-grey-150",
        className
      )}
    >
      {children}
    </div>
  );
};

export {
  BottomSheet,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetContent,
  BottomSheetFooter,
};
