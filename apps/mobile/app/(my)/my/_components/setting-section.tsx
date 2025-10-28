import { Settings } from "lucide-react";

const SettingSection = () => {
  return (
    <div className="px-20 flex flex-row items-center justify-end h-[50px]">
      <Settings
        width={24}
        height={24}
        strokeWidth={1.6}
        className="text-black cursor-pointer"
      />
    </div>
  );
};

export default SettingSection;
