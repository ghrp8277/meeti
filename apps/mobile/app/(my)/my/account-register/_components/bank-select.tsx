"use client";

import { useEffect, useRef, useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBanks } from "../_hooks/useBanks";
import * as SelectPrimitive from "@radix-ui/react-select";

interface BankSelectProps {
  label?: string;
  onBankChange: (bank: string) => void;
  error?: boolean;
  value?: string;
}

function InfiniteScrollSelectViewport({
  children,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: {
  children: React.ReactNode;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}) {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
    });

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [handleIntersection]);

  return (
    <SelectPrimitive.Viewport className="p-4 max-h-[400px] overflow-y-auto">
      {children}
      {isFetchingNextPage && (
        <div className="py-4 text-center text-sm text-gray-500">로딩 중...</div>
      )}
      <div ref={loadMoreRef} className="h-1" />
    </SelectPrimitive.Viewport>
  );
}

export default function BankSelect({
  label = "은행 선택",
  onBankChange,
  error = false,
  value,
}: BankSelectProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useBanks();
  const allBanks = data?.pages.flatMap((page) => page.data.data) ?? [];

  return (
    <div className="flex flex-col gap-4">
      <label className="text-sm-semibold text-black">{label}</label>
      <Select value={value} onValueChange={onBankChange}>
        <SelectTrigger full error={error}>
          <SelectValue placeholder="선택" />
        </SelectTrigger>
        <SelectContent>
          <InfiniteScrollSelectViewport
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage ?? false}
            isFetchingNextPage={isFetchingNextPage}
          >
            {allBanks.map((bank) => (
              <SelectItem key={bank.id} value={bank.id.toString()}>
                {bank.name}
              </SelectItem>
            ))}
          </InfiniteScrollSelectViewport>
        </SelectContent>
      </Select>
    </div>
  );
}
