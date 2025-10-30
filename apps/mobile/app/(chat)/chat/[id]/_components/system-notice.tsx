"use client";

interface Props {
  message: string;
}

export default function SystemNotice({ message }: Props) {
  return (
    <div className="flex flex-col items-center justify-center pt-[8px] w-full">
      <div className="inline-flex items-center justify-center rounded-full bg-tin-grey-600 px-[14px] py-[4px]">
        <span className="text-xxs-medium text-white">{message}</span>
      </div>
    </div>
  );
}
