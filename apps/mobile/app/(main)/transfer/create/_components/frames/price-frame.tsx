import Checkbox from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

export default function PriceFrame() {
  const [saleCount, setSaleCount] = useState<string>("");
  const [salePrice, setSalePrice] = useState<string>("");
  const [sameSeat, setSameSeat] = useState<boolean>(false);
  const [underDoublePrice, setUnderDoublePrice] = useState<boolean>(false);
  const [underOriginalPrice, setUnderOriginalPrice] = useState<boolean>(false);
  const [underHalfPrice, setUnderHalfPrice] = useState<boolean>(false);

  const handleSaleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSaleCount(e.target.value);
  };

  const handleSalePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSalePrice(e.target.value);
  };

  const handleSameSeatChange = (checked: boolean) => {
    setSameSeat(checked);
  };

  const handleUnderDoublePriceChange = (checked: boolean) => {
    setUnderDoublePrice(checked);
  };

  const handleUnderOriginalPriceChange = (checked: boolean) => {
    setUnderOriginalPrice(checked);
  };

  const handleUnderHalfPriceChange = (checked: boolean) => {
    setUnderHalfPrice(checked);
  };

  return (
    <div className="flex flex-col gap-20 p-20">
      <div className="flex flex-col gap-10">
        <Input
          label="판매 수"
          placeholder="판매 수량을 입력해주세요."
          full
          required
          value={saleCount}
          onChange={handleSaleCountChange}
        />
        {/* 연석 */}
        <div className="flex flex-row gap-6">
          <Checkbox checked={sameSeat} onChange={handleSameSeatChange} />
          <div className="text-sm text-black">연석</div>
        </div>
      </div>

      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-10">
          {/* 장당 판매 금액 */}
          <Input
            label="장당 판매 금액"
            placeholder="판매 금액을 입력해주세요."
            full
            required
            value={salePrice}
            onChange={handleSalePriceChange}
          />

          <div className="bg-tin-grey-200 rounded-[8px] py-8 px-14 flex flex-row justify-between items-center">
            <div className="text-xxs font-semibold text-black">
              판매 금액별로 수수료와 혜택이 달라져요
            </div>

            <div className="flex flex-row items-center cursor-pointer">
              <div className="text-xxs text-black">혜택 보기</div>
              <ChevronRight
                className="w-12 h-12 text-black"
                strokeWidth={1.6}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-6">
          <Checkbox
            checked={underDoublePrice}
            onChange={handleUnderDoublePriceChange}
          />
          <div className="text-sm text-black">정가의 2배 이하 판매</div>
        </div>
        <div className="flex flex-row gap-6">
          <Checkbox
            checked={underOriginalPrice}
            onChange={handleUnderOriginalPriceChange}
          />
          <div className="text-sm text-black">정가 양도</div>
        </div>
        <div className="flex flex-row gap-6">
          <Checkbox
            checked={underHalfPrice}
            onChange={handleUnderHalfPriceChange}
          />
          <div className="text-sm text-black">정가 이하</div>
        </div>
      </div>
    </div>
  );
}
