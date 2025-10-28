import { map } from "lodash-es";
import { cn } from "@/lib/utils";

interface PointHistoryItem {
  date: string;
  description: string;
  amount: number;
  type: "earn" | "use";
}

const pointHistoryData: PointHistoryItem[] = [
  {
    date: "25.12.12",
    description: "티켓 취소 포인트 반환",
    amount: 210,
    type: "earn",
  },
  {
    date: "25.12.12",
    description: "양도 티켓 구매 사용",
    amount: 210,
    type: "use",
  },
  {
    date: "25.12.12",
    description: "티켓 취소 포인트 반환",
    amount: 210,
    type: "earn",
  },
  {
    date: "25.12.12",
    description: "티켓 취소 포인트 반환",
    amount: 210,
    type: "earn",
  },
  {
    date: "25.12.12",
    description: "양도 티켓 구매 사용",
    amount: 210,
    type: "use",
  },
];

interface SectionTitleProps {
  title: string;
}

const SectionTitle = ({ title }: SectionTitleProps) => {
  return (
    <div className="pt-14">
      <div className="text-tin-grey-800 text-sm-semibold">{title}</div>
    </div>
  );
};

interface PointAmountProps {
  amount: number;
  type: "earn" | "use";
}

const PointAmount = ({ amount, type }: PointAmountProps) => {
  const displayText = type === "earn" ? `${amount} P 적립` : `-${amount} P`;
  const colorClass =
    type === "earn" ? "text-brand-red-500" : "text-lead-grey-100";

  return (
    <div className={cn("text-sm-semibold", colorClass)}>{displayText}</div>
  );
};

interface PointHistoryItemProps {
  item: PointHistoryItem;
}

const PointHistoryItem = ({ item }: PointHistoryItemProps) => {
  return (
    <div className="flex flex-row justify-between items-center py-12">
      <div className="flex flex-row gap-6">
        <div className="text-tin-grey-800 text-sm">{item.date}</div>
        <div className="text-black text-sm-medium">{item.description}</div>
      </div>
      <PointAmount amount={item.amount} type={item.type} />
    </div>
  );
};

interface PointHistoryListProps {
  items: PointHistoryItem[];
}

const PointHistoryList = ({ items }: PointHistoryListProps) => {
  return (
    <>
      {map(items, (item, index) => (
        <PointHistoryItem key={index} item={item} />
      ))}
    </>
  );
};

export default function PointHistorySection() {
  return (
    <div className="px-20">
      <SectionTitle title="포인트 내역" />
      <PointHistoryList items={pointHistoryData} />
    </div>
  );
}
