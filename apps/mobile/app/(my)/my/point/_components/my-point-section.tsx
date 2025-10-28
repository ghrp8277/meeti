import { CircleParking } from "lucide-react";

export default function MyPointSection() {
  return (
    <div className="py-16 px-20">
      <div className="flex flex-row gap-2 items-center">
        <div className="text-tin-grey-800 text-sm-semibold">내 포인트</div>
        <CircleParking
          width={16}
          height={16}
          strokeWidth={1.6}
          className="text-tin-grey-800"
        />
      </div>

      <div className="text-2xl text-brand-red-500">1000 P</div>
    </div>
  );
}
