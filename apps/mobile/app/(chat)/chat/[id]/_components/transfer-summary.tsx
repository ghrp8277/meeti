"use client";

import { Calendar, ChevronRight, MapPin, User } from "lucide-react";

interface Props {
  place: string;
  dateTime: string;
  members: string;
  ticketsLabel?: string;
  onClick?: () => void;
}

function LabelBadge({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center justify-center px-[8px] py-[2px] gap-[4px] bg-brand-red-100 rounded-[4px]">
      <span className="text-[10px] font-semibold leading-[14px] text-brand-red-500">
        {text}
      </span>
    </div>
  );
}

function DetailItem({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row items-center gap-[4px]">
      {icon}
      <span className="text-xs text-black">{children}</span>
    </div>
  );
}

function PinIcon() {
  return (
    <span className="relative inline-block w-[14px] h-[14px]">
      <MapPin
        width={14}
        height={14}
        strokeWidth={1.6}
        className="text-black fill-black"
        fill="currentColor"
      />
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[4px] h-[4px] rounded-full bg-white" />
    </span>
  );
}

function CalendarIcon() {
  return (
    <span className="relative inline-block w-[14px] h-[14px]">
      <Calendar
        width={14}
        height={14}
        strokeWidth={1.6}
        className="text-black fill-black"
        fill="currentColor"
      />
      <span className="absolute left-[2px] right-[2px] top-[4px] h-[1px] bg-white rounded-[1px]" />
    </span>
  );
}

function Card({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-start gap-[6px] p-[14px] w-full bg-white border border-brand-red-300 rounded-[12px]"
    >
      {children}
    </button>
  );
}

export default function TransferSummary({
  ticketsLabel = "",
  place,
  dateTime,
  members,
  onClick,
}: Props) {
  return (
    <div className="flex flex-col items-start gap-[10px] pb-[12px] w-full z-[1]">
      <Card onClick={onClick}>
        <div className="flex flex-row items-center justify-between gap-[6px] w-full">
          <LabelBadge text={ticketsLabel} />
          <ChevronRight
            width={16}
            height={16}
            strokeWidth={1.6}
            className="text-brand-red-300"
          />
        </div>

        <div className="flex flex-row items-center gap-[8px] w-full">
          <DetailItem icon={<PinIcon />}>{place}</DetailItem>
          <DetailItem icon={<CalendarIcon />}>{dateTime}</DetailItem>
          <DetailItem
            icon={
              <User
                width={14}
                height={14}
                strokeWidth={1.6}
                className="text-black fill-black"
                fill="currentColor"
              />
            }
          >
            {members}
          </DetailItem>
        </div>
      </Card>
    </div>
  );
}
