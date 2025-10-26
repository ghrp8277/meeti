"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface TosContextType {
  agreedItems: Set<number>;
  setAgreedItems: (items: Set<number>) => void;
  addAgreedItem: (id: number) => void;
  removeAgreedItem: (id: number) => void;
  clearAgreedItems: () => void;
  isAllAgreed: (totalCount: number) => boolean;
}

const TosContext = createContext<TosContextType | undefined>(undefined);

export function TosProvider({ children }: { children: ReactNode }) {
  const [agreedItems, setAgreedItems] = useState<Set<number>>(new Set());

  const addAgreedItem = (id: number) => {
    setAgreedItems((prev) => new Set([...prev, id]));
  };

  const removeAgreedItem = (id: number) => {
    setAgreedItems((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const clearAgreedItems = () => {
    setAgreedItems(new Set());
  };

  const isAllAgreed = (totalCount: number) => {
    return agreedItems.size === totalCount;
  };

  const value: TosContextType = {
    agreedItems,
    setAgreedItems,
    addAgreedItem,
    removeAgreedItem,
    clearAgreedItems,
    isAllAgreed,
  };

  return <TosContext.Provider value={value}>{children}</TosContext.Provider>;
}

export function useTos() {
  const context = useContext(TosContext);
  if (context === undefined) {
    throw new Error("useTos must be used within a TosProvider");
  }
  return context;
}
