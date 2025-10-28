"use client";

import { Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { PATH } from "@/app/constants";

const SettingSection = () => {
  const router = useRouter();
  const handleSetting = () => {
    router.push(PATH.MY.SETTING);
  };

  return (
    <div className="px-20 flex flex-row items-center justify-end h-[50px]">
      <Settings
        width={24}
        height={24}
        strokeWidth={1.6}
        className="text-black cursor-pointer"
        onClick={handleSetting}
      />
    </div>
  );
};

export default SettingSection;
