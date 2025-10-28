"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { PATH } from "@/app/constants";
import { Home, BookOpen, MessageCircle, User } from "lucide-react";

interface NavigationItemProps {
  item: {
    id: string;
    label: string;
    icon: (isActive: boolean) => React.ReactNode;
  };
  isActive: boolean;
  onClick: () => void;
}

const NavigationItem = ({ item, isActive, onClick }: NavigationItemProps) => {
  return (
    <button
      onClick={onClick}
      className="flex-1 flex flex-col items-center justify-center gap-4"
    >
      <div className="flex items-center justify-center">
        {item.icon(isActive)}
      </div>
      <div
        className={`text-xxs-medium text-nowrap ${isActive ? "text-black" : "text-grey"}`}
      >
        {item.label}
      </div>
    </button>
  );
};

interface NavigationItemsProps {
  items: Array<{
    id: string;
    label: string;
    icon: (isActive: boolean) => React.ReactNode;
  }>;
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const NavigationItems = ({
  items,
  activeTab,
  onTabChange,
}: NavigationItemsProps) => {
  return (
    <div className="flex flex-row justify-around w-full">
      {items.map((item) => (
        <NavigationItem
          key={item.id}
          item={item}
          isActive={activeTab === item.id}
          onClick={() => onTabChange(item.id)}
        />
      ))}
    </div>
  );
};

const BottomNavigationBar = () => {
  const [activeTab, setActiveTab] = useState("transfer");
  const router = useRouter();

  const navigationItems = [
    {
      id: "transfer",
      label: "양도•동행",
      icon: (isActive: boolean) => (
        <div className="relative">
          <Home
            size={20}
            className={cn(isActive ? "text-black" : "text-tin-grey-700")}
          />
        </div>
      ),
    },
    {
      id: "guide",
      label: "가이드",
      icon: (isActive: boolean) => (
        <div className="relative">
          <BookOpen
            size={20}
            className={cn(isActive ? "text-black" : "text-tin-grey-700")}
          />
        </div>
      ),
    },
    {
      id: "chat",
      label: "채팅",
      icon: (isActive: boolean) => (
        <div className="relative">
          <MessageCircle
            size={20}
            className={cn(isActive ? "text-black" : "text-tin-grey-700")}
          />
          <div className="absolute w-[16px] h-[16px] left-[15px] top-[-4px] bg-brand-red-500 rounded-full flex items-center justify-center">
            <span className="text-[10px] font-semibold text-white">1</span>
          </div>
        </div>
      ),
    },
    {
      id: "my",
      label: "마이",
      icon: (isActive: boolean) => (
        <div className="relative">
          <User
            size={20}
            className={cn(isActive ? "text-black" : "text-tin-grey-700")}
          />
        </div>
      ),
    },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    switch (tabId) {
      case "my":
        router.push(PATH.MY.ROOT);
        break;
      case "transfer":
        router.push(PATH.TRANSFER.ROOT);
        break;
      default:
        break;
    }
  };

  return (
    <div className="fixed min-w-[375px] bottom-0 container h-[83px] z-[5] bg-white border-t-[0.333px] border-tin-grey-500">
      <div className="flex flex-row items-center justify-center h-full">
        <NavigationItems
          items={navigationItems}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </div>
    </div>
  );
};

export default BottomNavigationBar;
