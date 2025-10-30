import Header from "@/app/components/header";
import BottomNavigationBar from "@/app/components/bottom-navigation-bar";
import NoData from "./_components/no-data";
import ChatListSection from "./_components/chat-list-section";

export default function Page() {
  return (
    <div className="flex flex-col">
      <Header title="채팅" />
      {/* <NoData /> */}
      <ChatListSection />
      <BottomNavigationBar />
    </div>
  );
}
