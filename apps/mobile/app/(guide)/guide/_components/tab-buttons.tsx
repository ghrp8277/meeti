import { map } from "lodash-es";
import TabButton from "@/components/ui/tab-button";

interface Tab {
  id: string;
  label: string;
}

interface TabButtonsProps {
  tabs: Tab[];
  activeTabId: string;
  onTabClick: (tabId: string) => void;
}

export default function TabButtons({
  tabs,
  activeTabId,
  onTabClick,
}: TabButtonsProps) {
  return (
    <>
      {map(tabs, (tab) => (
        <TabButton
          key={tab.id}
          isActive={activeTabId === tab.id}
          onClick={() => onTabClick(tab.id)}
        >
          {tab.label}
        </TabButton>
      ))}
    </>
  );
}
