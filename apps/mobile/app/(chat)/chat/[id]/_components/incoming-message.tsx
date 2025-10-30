"use client";

import Image from "next/image";

interface Props {
  name: string;
  message: string;
  time: string;
  avatarSrc?: string;
  label?: string;
}

function Avatar({ src }: { src?: string }) {
  return (
    <div className="relative w-[30px] h-[30px] shrink-0 rounded-full bg-tin-grey-300 overflow-hidden">
      {src && <Image src={src} alt="avatar" fill className="object-cover" />}
    </div>
  );
}

function NameLabel({ name, label }: { name: string; label?: string }) {
  return (
    <div className="flex flex-row items-center gap-[4px] min-w-0">
      <div className="text-sm-semibold text-black truncate max-w-[50%]">
        {name}
      </div>
      {label && (
        <div className="flex flex-row justify-center items-center px-[8px] py-[2px] gap-[4px] bg-violet-200 rounded-[4px]">
          <div className="text-[10px] font-semibold leading-[14px] text-violet-900">
            {label}
          </div>
        </div>
      )}
    </div>
  );
}

function Bubble({ text }: { text: string }) {
  return (
    <div className="inline-block px-[12px] py-[8px] rounded-[8px] bg-tin-grey-200 max-w-[80%]">
      <div className="text-sm text-black whitespace-pre-wrap break-words">
        {text}
      </div>
    </div>
  );
}

function Timestamp({ time }: { time: string }) {
  return <div className="text-xs text-tin-grey-900">{time}</div>;
}

export default function IncomingMessage({
  avatarSrc,
  name,
  label,
  message,
  time,
}: Props) {
  return (
    <div className="flex flex-row items-start gap-[11px] py-[4px] w-full">
      <Avatar src={avatarSrc} />
      <div className="flex flex-col items-start gap-[6px] flex-1 min-w-0">
        <NameLabel name={name} label={label} />
        <Bubble text={message} />
        <Timestamp time={time} />
      </div>
    </div>
  );
}
