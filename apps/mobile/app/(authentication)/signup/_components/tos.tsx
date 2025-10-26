"use client";

import type { Tos } from "../../../types/tos.type";
import { useSignupTos } from "../_hooks/useSignupTos";
import { ChevronRight } from "lucide-react";
import { map, every } from "lodash-es";
import Checkbox from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useSignupStore } from "../_stores/signup-store";

function AllAgreeSection({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="bg-tin-grey-200 rounded-[12px] px-[20px] py-[12px]">
      <div className="flex flex-row gap-[10px]">
        <Checkbox checked={checked} onChange={onChange} size="sm" />
        <span className="text-lg text-black">전체 동의</span>
      </div>
    </div>
  );
}

function TosItem({
  item,
  checked,
  onChange,
}: {
  item: Tos;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="px-[20px] py-[8px] flex flex-row justify-between">
      <div className="flex flex-row gap-[6px]">
        <Checkbox checked={checked} onChange={onChange} size="sm" />
        <span className="text-sm-medium text-black">
          {item.isRequired ? "(필수)" : ""} {item.title}
        </span>
      </div>
      <ChevronRight className="w-5 h-5 text-black" />
    </div>
  );
}

function TosList({
  tos,
  agreedItems,
  onItemChange,
}: {
  tos: Tos[];
  agreedItems: number[];
  onItemChange: (id: number) => void;
}) {
  return (
    <div>
      {map(tos, (item) => (
        <TosItem
          key={item.id}
          item={item}
          checked={agreedItems.includes(item.id)}
          onChange={() => onItemChange(item.id)}
        />
      ))}
    </div>
  );
}

export default function Tos({ onNext }: { onNext: () => void }) {
  const { data: response } = useSignupTos();
  const tos: Tos[] = response?.data || [];
  const { agreedItems, addAgreedItem, removeAgreedItem, setAgreedItems } =
    useSignupStore();

  const safeAgreedItems = Array.isArray(agreedItems) ? agreedItems : [];
  const allAgreed = every(tos, ({ id }) => safeAgreedItems.includes(id));

  const requiredTos = tos.filter((item) => item.isRequired);
  const allRequiredAgreed = every(requiredTos, ({ id }) =>
    safeAgreedItems.includes(id)
  );

  const handleAllAgree = () => {
    if (allAgreed) {
      setAgreedItems([]);
    } else {
      setAgreedItems(map(tos, "id"));
    }
  };

  const handleItemAgree = (id: number) => {
    if (safeAgreedItems.includes(id)) {
      removeAgreedItem(id);
    } else {
      addAgreedItem(id);
    }
  };

  const handleNext = () => {
    if (allRequiredAgreed) {
      onNext();
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-screen pt-[20px] pb-[40px]">
      <div className="flex flex-col gap-4">
        <AllAgreeSection checked={allAgreed} onChange={handleAllAgree} />
        <TosList
          tos={tos}
          agreedItems={safeAgreedItems}
          onItemChange={handleItemAgree}
        />
      </div>
      <Button
        variant="default"
        full
        onClick={handleNext}
        disabled={!allRequiredAgreed}
      >
        인증하러 가기
      </Button>
    </div>
  );
}
