"use client";

import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { PATH } from "@/app/constants";

export default function TabSection() {
  const router = useRouter();
  const pathname = usePathname();

  const activeTab = pathname.includes("/transfer") ? "transfer" : "companion";

  const handleTabChange = (tab: "transfer" | "companion") => {
    switch (tab) {
      case "transfer":
        router.push(PATH.TRANSFER.ROOT);
        break;
      case "companion":
        router.push(PATH.COMPANION.ROOT);
        break;
    }
  };

  return (
    <div className="flex flex-row px-20 text-xl h-[29px]">
      <button
        onClick={() => handleTabChange("transfer")}
        className={cn(
          "pr-12 border-r border-tin-grey-500",
          activeTab === "transfer" ? "text-black" : "text-tin-grey-700"
        )}
      >
        양도
      </button>
      <button
        onClick={() => handleTabChange("companion")}
        className={cn(
          "px-12",
          activeTab === "companion" ? "text-black" : "text-tin-grey-700"
        )}
      >
        동행
      </button>
    </div>
  );
}
