import HeaderSection from "../_components/header-section";
import TabSection from "../_components/tab-section";
import BottomNavigationBar from "@/app/components/bottom-navigation-bar";

export default function CompanionPage() {
  return (
    <div>
      <HeaderSection />
      <TabSection />
      <div className="px-20 py-12 text-center">
        <h2 className="text-xl font-semibold text-black mb-4">동행 페이지</h2>
        <p className="text-tin-grey-700">동행 관련 기능이 여기에 표시됩니다.</p>
      </div>
      <BottomNavigationBar />
    </div>
  );
}
