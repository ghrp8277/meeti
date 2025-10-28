"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  range: string;
  backgroundColor: string;
}

const tabs: Tab[] = [
  {
    id: "36.5-40",
    label: "36.5 - 40",
    range: "36.5 - 40점",
    backgroundColor: "bg-violet-200",
  },
  {
    id: "40-50",
    label: "40-50",
    range: "40-50점",
    backgroundColor: "bg-violet-300",
  },
  {
    id: "51-80",
    label: "51-80",
    range: "51-80점",
    backgroundColor: "bg-violet-400",
  },
  {
    id: "81-100",
    label: "81-100",
    range: "81-100점",
    backgroundColor: "bg-violet-500",
  },
];

const TabButton = ({
  tab,
  isActive,
  onClick,
}: {
  tab: Tab;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex-1 flex flex-row justify-center items-center rounded-t-lg transition-all",
        isActive ? "h-[58px] py-18" : "h-[44px] py-12",
        tab.backgroundColor
      )}
    >
      <span
        className={cn(
          "text-violet-800 font-bold text-center",
          isActive ? "text-base" : "text-sm"
        )}
      >
        {tab.label}
      </span>
    </button>
  );
};

const ScoreBadge = ({ text }: { text: string }) => {
  return (
    <div className="flex flex-row justify-center items-center px-10 py-4 gap-10 bg-violet-600 rounded-full">
      <span className="text-white text-md-bold">{text}</span>
    </div>
  );
};

const ExposureRightItem = ({
  icon,
  label,
  count,
}: {
  icon: React.ReactNode;
  label: string;
  count: string;
}) => {
  return (
    <div className="flex flex-row justify-between items-center py-6">
      <div className="flex flex-row items-center gap-6">
        {icon}
        <span className="text-sm-medium text-black">{label}</span>
      </div>
      <span className="text-base-bold text-violet-700">{count}</span>
    </div>
  );
};

const TipCard = ({ title, items }: { title: string; items: string[] }) => {
  return (
    <div className="bg-violet-300 rounded-xl px-20 py-10">
      <div className="flex flex-row justify-center items-center py-8">
        <span className="text-violet-600 text-md-bold">{title}</span>
      </div>
      {items.map((item, index) => (
        <div
          key={index}
          className="flex flex-row justify-center items-center py-4"
        >
          <span className="text-sm-medium text-black">{item}</span>
        </div>
      ))}
    </div>
  );
};

const WarningCard = ({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: string[];
}) => {
  return (
    <div className="bg-violet-400 rounded-xl px-20 py-10">
      <div className="flex flex-row justify-center items-center pt-8 pb-4">
        <span className="text-violet-800 text-md-bold">{title}</span>
      </div>
      <div className="flex flex-row justify-center items-center pb-4">
        <span className="text-xs-medium text-violet-800">{subtitle}</span>
      </div>
      {items.map((item, index) => (
        <div
          key={index}
          className="flex flex-row justify-center items-center py-4"
        >
          <span className="text-sm-medium text-black">{item}</span>
        </div>
      ))}
    </div>
  );
};

export default function TabSection() {
  const [activeTab, setActiveTab] = useState("36.5-40");

  const currentTab = tabs.find((tab) => tab.id === activeTab) || tabs[0];

  const tipItems = [
    "동행을 완료할 때마다 1점 상승해요.",
    "반반티켓을 이용할 때마다 2점 상승해요.",
    "동행이 끝나고 후기를 작성하거나 받으면 0.5점 상승해요.",
    "정가 또는 정가 이하 티켓 양도시 1점 상승해요.",
  ];

  const warningItems = [
    "동행 노쇼 시 상대방이 신고하면 점수가 2점 떨어져요.",
    "반반티켓 판매 후 취소 시 취소수수료와 점수가 1점 떨어져요.",
  ];

  const TicketIcon = () => (
    <div className="w-4 h-4 relative">
      <div className="absolute inset-[18.75%] border-[1.6px] border-black" />
    </div>
  );

  return (
    <div className="flex flex-col pt-[30px]">
      <div className="flex flex-row justify-center items-end px-20 h-[58px]">
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            tab={tab}
            isActive={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          />
        ))}
      </div>

      <div
        className={`flex flex-col items-center px-20 py-20 gap-12 ${currentTab.backgroundColor} min-h-[524px]`}
      >
        <ScoreBadge text={currentTab.range} />

        <div className="w-full bg-white rounded-xl px-20 py-10">
          <ExposureRightItem
            icon={<TicketIcon />}
            label="동행글 우선 노출권"
            count="6개"
          />
          <ExposureRightItem
            icon={<TicketIcon />}
            label="양도글 우선 노출권"
            count="6개"
          />
        </div>

        <TipCard title="점수 올리는 TIP!" items={tipItems} />

        <WarningCard
          title="이렇게 하면 점수가 떨어져요"
          subtitle="36.5점 미만은 신뢰도가 떨어질 수 있으니 매너를 지켜주세요."
          items={warningItems}
        />
      </div>
    </div>
  );
}
