"use client";

import type { Tos } from "../../../types/tos.type";
import { useSignupTos } from "../_hooks/useSignupTos";
import { ChevronRight } from "lucide-react";
import { map, every } from "lodash-es";
import Checkbox from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useTos } from "../_providers/tos-provider";

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
  agreedItems: Set<number>;
  onItemChange: (id: number) => void;
}) {
  return (
    <div>
      {map(tos, (item) => (
        <TosItem
          key={item.id}
          item={item}
          checked={agreedItems.has(item.id)}
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
    useTos();

  const allAgreed = every(tos, ({ id }) => agreedItems.has(id));

  const requiredTos = tos.filter((item) => item.isRequired);
  const allRequiredAgreed = every(requiredTos, ({ id }) => agreedItems.has(id));

  const handleAllAgree = () => {
    if (allAgreed) {
      setAgreedItems(new Set());
    } else {
      setAgreedItems(new Set(map(tos, "id")));
    }
  };

  const handleItemAgree = (id: number) => {
    if (agreedItems.has(id)) {
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
    <div className="flex flex-col gap-4">
      <AllAgreeSection checked={allAgreed} onChange={handleAllAgree} />
      <TosList
        tos={tos}
        agreedItems={agreedItems}
        onItemChange={handleItemAgree}
      />
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
