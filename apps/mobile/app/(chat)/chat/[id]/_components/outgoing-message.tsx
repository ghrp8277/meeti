"use client";

interface Props {
  message: string;
  time: string;
}

function Bubble({ text }: { text: string }) {
  return (
    <div className="inline-block px-[12px] py-[8px] bg-tin-grey-400 rounded-[8px]">
      <div className="text-sm text-black whitespace-pre-wrap break-words text-left">
        {text}
      </div>
    </div>
  );
}

function Timestamp({ time }: { time: string }) {
  return <div className="text-xs text-tin-grey-900">{time}</div>;
}

export default function OutgoingMessage({ message, time }: Props) {
  return (
    <div className="flex flex-row justify-end py-[4px] w-full">
      <div className="flex flex-col items-end gap-[6px] max-w-full">
        <Bubble text={message} />
        <Timestamp time={time} />
      </div>
    </div>
  );
}
