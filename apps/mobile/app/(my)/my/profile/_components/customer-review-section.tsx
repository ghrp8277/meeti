import { ChevronRight } from "lucide-react";
import { map } from "lodash-es";

interface CustomerReviewItemProps {
  content: string;
}

function CustomerReviewItem({ content }: CustomerReviewItemProps) {
  return (
    <div className="bg-tin-grey-200 rounded-[12px] py-8 px-12">
      <div className="text-sm-medium text-lead-grey-100 truncate">
        {content}
      </div>
    </div>
  );
}

function CustomerReviewList() {
  const customerReviewItems: CustomerReviewItemProps[] = [
    {
      content: "후기 내용 1",
    },
    {
      content: "후기 내용 2",
    },
    {
      content: "긴 후기 내용 300자 정도 들어가는 후기 내용 테스트 글자 ",
    },
  ];
  return (
    <div className="flex flex-col gap-8">
      {map(customerReviewItems, (item) => (
        <CustomerReviewItem key={item.content} content={item.content} />
      ))}
    </div>
  );
}

export default function CustomerReviewSection() {
  return (
    <div className="rounded-[12px] bg-white border border-tin-grey-200 p-20 flex flex-col gap-12">
      <div className="flex flex-row justify-between items-center">
        <div className="text-black text-base-bold">받은 후기</div>
        <div className="flex flex-row gap-4 items-center cursor-pointer">
          <div className="text-sm-semibold text-lead-grey-100">30개</div>
          <ChevronRight
            width={16}
            height={16}
            strokeWidth={1.6}
            className="text-tin-grey-700"
          />
        </div>
      </div>

      <CustomerReviewList />
    </div>
  );
}
