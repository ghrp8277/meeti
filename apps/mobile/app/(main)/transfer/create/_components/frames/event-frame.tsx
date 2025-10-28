import { useCategories } from "@/app/(main)/_hooks/useCategories";
import { map } from "lodash-es";
import { Category } from "@/app/types/category.type";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface CategoryButtonProps {
  category: Category;
  isSelected: boolean;
  onClick: (categoryId: number) => void;
}

const CategoryButton = ({
  category,
  isSelected,
  onClick,
}: CategoryButtonProps) => {
  return (
    <div
      onClick={() => onClick(category.id)}
      className={cn(
        "rounded-full px-14 py-8 cursor-pointer transition-colors",
        isSelected ? "bg-black" : "bg-tin-grey-200"
      )}
    >
      <div
        className={cn(
          "text-sm font-semibold",
          isSelected ? "text-white" : "text-lead-grey-100"
        )}
      >
        {category.name}
      </div>
    </div>
  );
};

const CategorySection = ({
  selectedCategoryId,
  onCategorySelect,
}: {
  selectedCategoryId: number | null;
  onCategorySelect: (categoryId: number) => void;
}) => {
  const { data } = useCategories();
  const categories = data?.data || [];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row">
        <div className="text-sm-semibold">카테고리</div>
        <span className="bg-brand-red-500 rounded-full w-4 h-4 inline-block ml-1 align-text-top"></span>
      </div>

      <div className="flex flex-row gap-6">
        {map(categories, (category) => (
          <CategoryButton
            key={category.id}
            category={category}
            isSelected={selectedCategoryId === category.id}
            onClick={onCategorySelect}
          />
        ))}
      </div>
    </div>
  );
};

const EventNameInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <Input
      label="공연명"
      placeholder="공연명을 입력해주세요."
      full
      required
      value={value}
      onChange={handleChange}
    />
  );
};

export default function EventFrame() {
  const [eventName, setEventName] = useState<string>("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
  };

  const handleEventNameChange = (value: string) => {
    setEventName(value);
  };

  return (
    <div className="flex flex-col gap-20 p-20">
      <CategorySection
        selectedCategoryId={selectedCategoryId}
        onCategorySelect={handleCategorySelect}
      />
      <EventNameInput value={eventName} onChange={handleEventNameChange} />
    </div>
  );
}
