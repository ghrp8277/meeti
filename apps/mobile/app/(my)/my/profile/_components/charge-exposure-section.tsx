interface ValueDisplayProps {
  number: number;
  unit: string;
}

const ValueDisplay = ({ number, unit }: ValueDisplayProps) => {
  return (
    <div className="flex flex-row items-center gap-0">
      <div className="text-lg text-black">{number}</div>
      <div className="text-sm-medium text-black">{unit}</div>
    </div>
  );
};

interface ChargeItemProps {
  label: string;
  primaryNumber: number;
  primaryUnit: string;
  secondaryNumber: number;
  secondaryUnit: string;
}

const ChargeItem = ({
  label,
  primaryNumber,
  primaryUnit,
  secondaryNumber,
  secondaryUnit,
}: ChargeItemProps) => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 flex-1 h-[44px]">
      <div className="text-xs-medium text-lead-grey-100">{label}</div>
      <div className="flex flex-row justify-center items-center gap-6">
        <ValueDisplay number={primaryNumber} unit={primaryUnit} />
        <div className="w-0 h-[10.15px] border border-tin-grey-500" />
        <ValueDisplay number={secondaryNumber} unit={secondaryUnit} />
      </div>
    </div>
  );
};

export default function ChargeExposureSection() {
  return (
    <div className="flex flex-row items-center py-12 h-[68px] bg-white border border-tin-grey-200 rounded-[12px]">
      <ChargeItem
        label="내 수수료"
        primaryNumber={10}
        primaryUnit="%"
        secondaryNumber={5}
        secondaryUnit="%"
      />
      <div className="w-0 h-[24px] border border-tin-grey-500" />
      <ChargeItem
        label="우선 노출권"
        primaryNumber={3}
        primaryUnit="개"
        secondaryNumber={3}
        secondaryUnit="개"
      />
    </div>
  );
}
