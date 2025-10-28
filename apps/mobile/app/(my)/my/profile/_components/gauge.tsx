interface GaugeTooltipProps {
  value: number;
  fillEndPosition: number;
  tooltipLeft: number;
}

const GaugeTooltip = ({
  value,
  fillEndPosition,
  tooltipLeft,
}: GaugeTooltipProps) => {
  const pointerLeft = fillEndPosition - tooltipLeft - 6;

  return (
    <div
      className="relative flex flex-col items-center"
      style={{ width: "51px" }}
    >
      <div className="relative flex flex-row justify-center items-center px-10 py-4 bg-violet-600 rounded-full z-0 w-[51px] h-[29px]">
        <div className="text-white text-md-bold">{value}</div>
      </div>
      <div
        className="absolute w-[12px] h-[12px] bg-violet-600 rotate-45 rounded-[1px] z-[1]"
        style={{ top: "22px", left: `${pointerLeft}px` }}
      />
    </div>
  );
};

interface ProgressBarProps {
  value: number;
  maxValue: number;
  tooltipPosition: number;
}

const ProgressBar = ({
  value,
  maxValue,
  tooltipPosition,
}: ProgressBarProps) => {
  const percentage = (value / maxValue) * 100;
  const fillWidth = (295 * percentage) / 100;

  return (
    <div className="flex flex-col gap-2 w-[295px] h-[29px]">
      <div className="relative w-full h-[12px] bg-white rounded-full">
        <div
          className="h-full bg-violet-600 rounded-full"
          style={{ width: `${fillWidth}px` }}
        />
      </div>
      <div className="relative flex flex-row justify-between items-center w-full h-[15px]">
        <div className="text-xxs-medium text-violet-400">0</div>
        <div className="text-xxs-medium text-violet-400">100</div>
        <div
          className="absolute flex flex-row items-center gap-2"
          style={{ left: `${tooltipPosition - 5}px` }}
        >
          <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-b-[8px] border-l-transparent border-r-transparent border-b-violet-400" />
          <div className="text-xxs-medium text-violet-400">기본 점수</div>
        </div>
      </div>
    </div>
  );
};

interface GaugeProps {
  value: number;
  maxValue?: number;
}

export default function Gauge({ value = 36.5, maxValue = 100 }: GaugeProps) {
  const percentage = (value / maxValue) * 100;
  const fillEndPosition = (295 * percentage) / 100;
  const tooltipLeft = fillEndPosition - 25.5;
  const baseScorePosition = (295 * 36.5) / 100;

  return (
    <div className="relative flex flex-col items-center w-[295px] h-[66px] mx-auto">
      <div className="absolute top-0 z-10" style={{ left: `${tooltipLeft}px` }}>
        <GaugeTooltip
          value={value}
          fillEndPosition={fillEndPosition}
          tooltipLeft={tooltipLeft}
        />
      </div>
      <div className="absolute top-[37px]">
        <ProgressBar
          value={value}
          maxValue={maxValue}
          tooltipPosition={baseScorePosition}
        />
      </div>
    </div>
  );
}
