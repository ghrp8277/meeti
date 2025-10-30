"use client";

import { BellOff, Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { PATH } from "@/app/constants";

function ChatAlarm({
  isOn,
  onToggle,
}: {
  isOn: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="w-full h-full flex items-center justify-center bg-tin-grey-300 cursor-pointer"
    >
      {isOn ? (
        <Bell
          className="text-tin-grey-700 fill-tin-grey-700"
          width={28}
          height={28}
          strokeWidth={1.6}
          fill="currentColor"
        />
      ) : (
        <BellOff
          className="text-tin-grey-700 fill-tin-grey-700"
          width={28}
          height={28}
          strokeWidth={1.6}
          fill="currentColor"
        />
      )}
    </button>
  );
}

function ChatAvatar() {
  return <div className="w-[50px] h-[50px] rounded-full bg-tin-grey-300" />;
}

function ChatContent({ isAlarmOn }: { isAlarmOn: boolean }) {
  return (
    <div className="flex flex-col gap-2 min-w-0">
      <div className="flex flex-row gap-4 min-w-0">
        <div className="text-md-medium text-black flex-1 min-w-0 truncate">
          아일릿 공연 동행하실 분 구해요!
        </div>
        <div className="text-md-medium text-lead-grey-100">10</div>
      </div>
      <div className="flex flex-row gap-2 items-center min-w-0">
        {isAlarmOn ? (
          <Bell
            className="text-lead-grey-100 fill-lead-grey-100"
            width={16}
            height={16}
            strokeWidth={1.6}
            fill="currentColor"
          />
        ) : (
          <BellOff
            className="text-lead-grey-100 fill-lead-grey-100"
            width={16}
            height={16}
            strokeWidth={1.6}
            fill="currentColor"
          />
        )}
        <div className="text-s text-lead-grey-100 flex-1 min-w-0 truncate">
          언제 가실래요?
        </div>
      </div>
    </div>
  );
}

function ChatMeta() {
  return (
    <div className="flex flex-col justify-between items-end self-stretch shrink-0">
      <div className="text-xs text-lead-grey-100">12:59</div>
      <div className="bg-brand-red-500 rounded-full py-2 px-6">
        <div className="text-xxs-semibold text-white">100</div>
      </div>
    </div>
  );
}

function SwipeableRow({
  actionWidth = 82,
  children,
  action,
  onTap,
}: {
  actionWidth?: number;
  children: React.ReactNode;
  action: React.ReactNode;
  onTap?: () => void;
}) {
  const [offset, setOffset] = useState(0);
  const clamp = (val: number) => Math.max(Math.min(val, 0), -actionWidth);
  const handlers = useSwipeable({
    onSwiping: ({ deltaX }) => setOffset(clamp(-deltaX)),
    onSwipedLeft: ({ absX }) =>
      setOffset(absX > actionWidth / 2 ? -actionWidth : 0),
    onSwipedRight: ({ absX }) =>
      setOffset(absX > actionWidth / 2 ? 0 : -actionWidth),
    onTap: () => {
      // Only treat as tap when row is closed
      if (offset === 0) onTap?.();
    },
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div className="relative w-full overflow-hidden select-none" {...handlers}>
      <div
        className="absolute right-0 top-0 h-full flex items-center"
        style={{ width: actionWidth }}
      >
        {action}
      </div>
      <div
        className="transition-transform duration-200 ease-out"
        style={{ transform: `translateX(${offset}px)` }}
      >
        {children}
      </div>
    </div>
  );
}

function ChatItem() {
  const [isAlarmOn, setIsAlarmOn] = useState(false);
  const handleToggleAlarm = () => setIsAlarmOn((v) => !v);
  const router = useRouter();
  const handleClick = () => {
    router.push(PATH.CHAT.ID.replace(":id", "1"));
  };
  return (
    <SwipeableRow
      action={<ChatAlarm isOn={isAlarmOn} onToggle={handleToggleAlarm} />}
      onTap={handleClick}
    >
      <div className="flex flex-row items-center gap-8 w-full py-16 px-20 bg-white cursor-pointer hover:bg-tin-grey-200">
        <div className="flex flex-row items-center justify-between w-full gap-10">
          <ChatAvatar />
          <div className="flex flex-row gap-10 flex-1 min-w-0 justify-between w-full ">
            <ChatContent isAlarmOn={isAlarmOn} />
            <ChatMeta />
          </div>
        </div>
      </div>
    </SwipeableRow>
  );
}

export default function ChatListSection() {
  return (
    <div className="flex flex-col w-full">
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
    </div>
  );
}
