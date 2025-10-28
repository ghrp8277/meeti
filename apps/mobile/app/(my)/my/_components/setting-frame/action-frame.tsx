"use client";

import {
  ChevronRight,
  CircleParking,
  Clock4,
  CreditCard,
  Handbag,
  PencilLine,
  ReceiptText,
  LucideIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { PATH } from "@/app/constants";
import { map } from "lodash-es";

interface ActionIconProps {
  icon: LucideIcon;
  badge?: number;
}

const ActionIcon = ({ icon: Icon, badge }: ActionIconProps) => {
  return (
    <div className="relative">
      <Icon width={24} height={24} strokeWidth={1.6} className="text-black" />
      {badge && (
        <div className="absolute w-[16px] h-[16px] left-[15px] top-[-4px] bg-brand-red-500 rounded-full flex items-center justify-center">
          <span className="text-[10px] font-semibold text-white">{badge}</span>
        </div>
      )}
    </div>
  );
};

interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  badge?: number;
  onClick?: () => void;
}

const ActionButton = ({ icon, label, badge, onClick }: ActionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col gap-4 items-center cursor-pointer"
    >
      <ActionIcon icon={icon} badge={badge} />
      <div className="text-xs text-lead-grey-800">{label}</div>
    </button>
  );
};

interface ActionMenuData {
  icon: LucideIcon;
  label: string;
  badge?: number;
}

const actionMenuData: ActionMenuData[] = [
  { icon: ReceiptText, label: "판매 내역" },
  { icon: Handbag, label: "구매 내역", badge: 1 },
  { icon: PencilLine, label: "작성한 글" },
  { icon: Clock4, label: "최근 본 글" },
];

interface ActionButtonsProps {
  items: ActionMenuData[];
}

const ActionButtons = ({ items }: ActionButtonsProps) => {
  return (
    <div className="py-16 flex flex-row justify-between items-center px-20">
      {map(items, (item, index) => (
        <ActionButton
          key={index}
          icon={item.icon}
          label={item.label}
          badge={item.badge}
        />
      ))}
    </div>
  );
};

interface MenuItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
  isDimmed?: boolean;
  onClick?: () => void;
}

const MenuItem = ({
  icon: Icon,
  label,
  value,
  isDimmed = false,
  onClick,
}: MenuItemProps) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-row justify-between items-center py-14 cursor-pointer"
    >
      <div className="flex flex-row gap-4">
        <Icon width={20} height={20} strokeWidth={1.6} className="text-black" />
        <div className="text-md text-lead-grey-800">{label}</div>
      </div>
      <div className="flex flex-row gap-4 items-center">
        <div
          className={`text-sm-semibold ${isDimmed ? "text-lead-grey-100" : "text-lead-grey-800"}`}
        >
          {value}
        </div>
        <ChevronRight
          width={16}
          height={16}
          strokeWidth={1.6}
          className="text-tin-grey-700"
        />
      </div>
    </div>
  );
};

interface MenuItemsProps {
  items: Array<{
    icon: LucideIcon;
    label: string;
    value: string;
    isDimmed?: boolean;
    onClick?: () => void;
  }>;
}

const MenuItems = ({ items }: MenuItemsProps) => {
  return (
    <div className="flex flex-col px-20 pt-8 pb-14">
      {map(items, (item, index) => (
        <MenuItem key={index} {...item} />
      ))}
    </div>
  );
};

export default function ActionFrame() {
  const router = useRouter();

  const handlePoint = () => {
    router.push(PATH.MY.POINT);
  };

  const menuItems = [
    { icon: CircleParking, label: "포인트", value: "0P", onClick: handlePoint },
    { icon: CreditCard, label: "카드 등록", value: "미등록", isDimmed: true },
  ];

  return (
    <div className="bg-white rounded-[12px] border border-tin-grey-200">
      <ActionButtons items={actionMenuData} />
      <MenuItems items={menuItems} />
    </div>
  );
}
