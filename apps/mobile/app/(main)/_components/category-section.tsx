"use client";

import { useState } from "react";
import { map, first } from "lodash-es";
import { cn } from "@/lib/utils";
import { useCategories } from "../_hooks/useCategories";
import { useCategoryWithSubCategories } from "../_hooks/useCategoryWithSubCategories";
import { Category } from "@/app/types/category.type";

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

interface SubCategoryButtonProps {
  subCategory: { id: number; name: string };
  isSelected: boolean;
  onClick: (subCategoryId: number) => void;
}

const SubCategoryButton = ({
  subCategory,
  isSelected,
  onClick,
}: SubCategoryButtonProps) => {
  return (
    <div
      onClick={() => onClick(subCategory.id)}
      className={cn(
        "cursor-pointer",
        isSelected
          ? "text-md font-bold text-black"
          : "text-md font-semibold text-tin-grey-700"
      )}
    >
      {subCategory.name}
    </div>
  );
};

interface SubCategorySectionProps {
  selectedCategoryId: number | null;
  selectedSubCategoryId: number | null;
  onSubCategorySelect: (subCategoryId: number) => void;
}

const SubCategorySection = ({
  selectedCategoryId,
  selectedSubCategoryId,
  onSubCategorySelect,
}: SubCategorySectionProps) => {
  const { data } = useCategoryWithSubCategories(selectedCategoryId);
  const subCategories = data?.data?.subCategories || [];

  if (!selectedCategoryId || subCategories.length === 0) {
    return null;
  }

  const currentSelectedSubId =
    selectedSubCategoryId || first(subCategories)?.id || null;

  return (
    <div className="px-20 py-12 flex flex-row gap-10 bg-tin-grey-150">
      <div className="flex flex-row gap-16">
        {map(subCategories, (subCategory) => (
          <SubCategoryButton
            key={subCategory.id}
            subCategory={subCategory}
            isSelected={currentSelectedSubId === subCategory.id}
            onClick={onSubCategorySelect}
          />
        ))}
      </div>
    </div>
  );
};

const CategorySection = () => {
  const { data } = useCategories();
  const categories = data?.data || [];
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<
    number | null
  >(null);

  const currentSelectedId = selectedCategoryId || first(categories)?.id || null;

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
    setSelectedSubCategoryId(null);
  };

  const handleSubCategoryClick = (subCategoryId: number) => {
    setSelectedSubCategoryId(subCategoryId);
  };

  return (
    <>
      <div className="px-20 py-12 flex flex-row gap-6">
        {map(categories, (category) => (
          <CategoryButton
            key={category.id}
            category={category}
            isSelected={currentSelectedId === category.id}
            onClick={handleCategoryClick}
          />
        ))}
      </div>
      <SubCategorySection
        selectedCategoryId={currentSelectedId}
        selectedSubCategoryId={selectedSubCategoryId}
        onSubCategorySelect={handleSubCategoryClick}
      />
    </>
  );
};

export default CategorySection;
