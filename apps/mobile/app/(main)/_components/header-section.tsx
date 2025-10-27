import { Search } from "lucide-react";

export default function HeaderSection() {
  return (
    <div className="flex flex-row justify-between items-center px-20 h-[50px]">
      <div className="flex flex-row gap-6">
        <div className="text-lead-grey-200 text-md font-bold">
          안전하고 합리적인 거래
        </div>
      </div>
      <Search className="w-24 h-24 cursor-pointer" />
    </div>
  );
}
