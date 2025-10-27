import TabSection from "./_components/tab-section";
import BottomNavigationBar from "@/app/components/bottom-navigation-bar";
import HeaderSection from "./_components/header-section";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-col container">
      <HeaderSection />
      <TabSection />
      {children}
      <BottomNavigationBar />
    </div>
  );
}
