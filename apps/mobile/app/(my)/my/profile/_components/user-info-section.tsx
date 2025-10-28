"use client";

import { useState } from "react";
import { ChevronUp } from "lucide-react";
import { map } from "lodash-es";
import { cn } from "@/lib/utils";

interface UserInfoField {
  label: string;
  value: string;
  isDimmed?: boolean;
}

const userInfoFields: UserInfoField[] = [
  { label: "이름", value: "양수경" },
  { label: "휴대폰 번호", value: "010-1111-1111" },
  { label: "생년월일", value: "1998-06-26" },
  { label: "성별", value: "여자" },
  { label: "가입 메일 주소", value: "aaaaa@gmail.com", isDimmed: true },
];

interface EditButtonProps {
  isExpanded: boolean;
  onClick: () => void;
}

const EditButton = ({ isExpanded, onClick }: EditButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-row gap-6 items-center cursor-pointer"
    >
      <div className="text-md-semibold text-lead-grey-100 underline">수정</div>
      <ChevronUp
        width={16}
        height={16}
        strokeWidth={1.6}
        className={cn(
          "text-tin-grey-700 transition-transform",
          isExpanded ? "rotate-180" : ""
        )}
      />
    </button>
  );
};

interface InfoFieldProps {
  field: UserInfoField;
}

const InfoField = ({ field }: InfoFieldProps) => {
  return (
    <div className="flex flex-row justify-between items-center py-8">
      <div className="text-sm-semibold text-tin-grey-700">{field.label}</div>
      <div
        className={cn(
          "text-base",
          field.isDimmed ? "text-lead-grey-100" : "text-black"
        )}
      >
        {field.value}
      </div>
    </div>
  );
};

interface InfoFieldsProps {
  fields: UserInfoField[];
  isVisible: boolean;
}

const InfoFields = ({ fields, isVisible }: InfoFieldsProps) => {
  return (
    <div
      className={cn(
        "overflow-hidden transition-all duration-300 ease-out",
        isVisible
          ? "max-h-[1000px] opacity-100 animate-slide-down"
          : "max-h-0 opacity-0 animate-slide-up"
      )}
    >
      {map(fields, (field, index) => (
        <InfoField key={index} field={field} />
      ))}
    </div>
  );
};

export default function UserInfoSection() {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="p-20 border border-tin-grey-200 rounded-[12px] flex flex-col gap-6 bg-white">
      <div className="flex flex-row justify-between items-center py-4">
        <div className="text-base-bold text-black">내 정보</div>
        <EditButton isExpanded={isExpanded} onClick={handleToggle} />
      </div>

      <InfoFields fields={userInfoFields} isVisible={isExpanded} />
    </div>
  );
}
