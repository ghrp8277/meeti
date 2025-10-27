import TabSection from "./_components/tab-section";
import BottomNavigationBar from "@/app/components/bottom-navigation-bar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-col container">
      <TabSection />
      {children}
      <BottomNavigationBar />
    </div>
  );
}
