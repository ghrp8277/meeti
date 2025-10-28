import CategorySection from "../_components/category-section";
import HeaderSection from "../_components/header-section";
import RegisterProductButton from "./_components/register-product-button";
import TabSection from "../_components/tab-section";
import BottomNavigationBar from "@/app/components/bottom-navigation-bar";

export default function TransferPage() {
  return (
    <div>
      <HeaderSection />
      <TabSection />
      <CategorySection />
      <RegisterProductButton />
      <BottomNavigationBar />
    </div>
  );
}
