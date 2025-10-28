import {
  BottomSheet,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetContent,
} from "@/components/ui/bottom-sheet";
import Calendar from "@/components/ui/calander";
import { Calendar as CalendarIcon } from "lucide-react";

interface CalendarBottomSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export const CalendarBottomSheet = ({
  isOpen,
  onOpenChange,
  selectedDate,
  onDateChange,
}: CalendarBottomSheetProps) => {
  return (
    <BottomSheet open={isOpen} onOpenChange={onOpenChange}>
      <BottomSheetHeader>
        <BottomSheetTitle>날짜 선택</BottomSheetTitle>
      </BottomSheetHeader>
      <BottomSheetContent>
        <Calendar
          mode="single"
          value={selectedDate}
          onChangeDate={onDateChange}
        />
      </BottomSheetContent>
    </BottomSheet>
  );
};

interface TestButtonProps {
  onClick: () => void;
}

export const TestButton = ({ onClick }: TestButtonProps) => {
  return (
    <div className="flex flex-col gap-4">
      <label className="text-sm-semibold text-black">
        날짜 및 시간
        <span className="bg-brand-red-500 rounded-full w-4 h-4 inline-block ml-1 align-text-top"></span>
      </label>
      <div
        onClick={onClick}
        className="border border-tin-grey-500 px-16 py-3 rounded-[12px] flex flex-row justify-between items-center h-[45px] cursor-pointer"
      >
        <div className="text-md text-tin-grey-700">
          날짜 및 시간을 선택해 주세요.
        </div>
        <CalendarIcon
          className="text-tin-grey-800"
          width={20}
          height={20}
          color="currentColor"
          fill="white"
        />
      </div>
    </div>
  );
};
