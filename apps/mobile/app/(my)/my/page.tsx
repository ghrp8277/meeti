import BottomNavigationBar from "@/app/components/bottom-navigation-bar";
import SettingSection from "./_components/setting-section";
import ProfileSection from "./_components/profile-section";
import PointerInfoSection from "./_components/pointer-info-section";
import LinkFrame from "./_components/setting-frame/link-frame";
import ActionFrame from "./_components/setting-frame/action-frame";

export default function Page() {
  return (
    <div className="bg-tin-grey-150 min-h-screen">
      <SettingSection />
      <ProfileSection />
      <PointerInfoSection />
      <BottomNavigationBar />

      <div className="flex flex-col gap-8 px-20">
        <ActionFrame />
        <LinkFrame />
      </div>
    </div>
  );
}
