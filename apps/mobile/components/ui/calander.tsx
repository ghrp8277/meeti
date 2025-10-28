"use client";

import React from "react";
import {
  DateRange,
  DayPicker,
  Matcher,
  DayPickerProps,
  CalendarMonth,
} from "react-day-picker";
import dayjs from "dayjs";

interface SingleDateProps {
  mode: "single";
  onChangeDate: (_date: string) => void;
  value: string;
  disabled?: Matcher | Matcher[];
  fromDate?: Date;
  toDate?: Date;
}

const WEEK_DAYS = ["일", "월", "화", "수", "목", "금", "토"];

interface DateRangeProps {
  mode?: "range";
  onChangeDates: (_dates: { from: string; to: string }) => void;
  value: {
    from: string;
    to: string;
  };
  disabled?: Matcher | Matcher[];
  fromDate?: Date;
  toDate?: Date;
}

type Props = SingleDateProps | DateRangeProps;

const Calendar = (props: Props) => {
  const isSingleMode = props.mode === "single";
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const disabledDates: Matcher = { before: today };

  const allDisabled = props.disabled
    ? Array.isArray(props.disabled)
      ? [disabledDates, ...props.disabled]
      : [disabledDates, props.disabled]
    : disabledDates;

  const CustomCaption = ({ displayMonth }: { displayMonth: CalendarMonth }) => {
    const { date } = displayMonth;
    return (
      <div className="flex justify-start">
        <span className="text-lead-grey-800 text-base-bold">
          {date.getFullYear()}년 {date.getMonth() + 1}월
        </span>
      </div>
    );
  };

  const commonProps: DayPickerProps = {
    numberOfMonths: 12,
    weekStartsOn: 0 as 0,
    showOutsideDays: true,
    fromDate: props.fromDate,
    toDate: props.toDate,
    components: {
      MonthCaption: ({ calendarMonth }) => (
        <CustomCaption displayMonth={calendarMonth} />
      ),
    },
    className: "h-full",
    classNames: {
      nav: "hidden",
      months: "flex flex-col gap-y-sm w-[316px]",
      today: "[&>button]:bg-blue-grey-100",
      selected:
        "[&>button]:bg-primary [&>button]:text-white [&>button]:font-semibold",
      range_middle:
        "[&>button]:bg-primary-100 [&>button]:rounded-none [&>button]:w-full [&>button]:!text-primary [&>button:disabled]:!text-primary-300 [&>button]:font-semibold",
      range_start:
        "[&>button]:bg-primary [&>button]:!text-white [&>button:disabled]:bg-primary-300 [&>button]:font-semibold bg-gradient-to-r from-transparent from-50% to-primary-100 to-50%",
      range_end:
        "[&>button]:bg-primary [&>button]:!text-white [&>button:disabled]:bg-primary-300 [&>button]:font-semibold bg-gradient-to-l from-transparent from-50% to-primary-100 to-50%",
      disabled: "[&>button]:cursor-not-allowed",
      month_caption: "sr-only",
      weekdays: "sr-only",
      weekday: "w-9 first:text-error-500 bg-error-500",
      month: "space-y-xs p-xxs border-b border-blue-grey-200",
      month_grid: "w-full",
      week: "flex w-full h-[48px] items-center",
      day: "h-[40px] text-center w-full p-0 relative focus-within:relative [&:nth-child(7n+1)>button]:text-error-500 [&:nth-child(7n+1)>button:disabled]:text-error-300 [&>button:disabled]:text-blue-grey-400 [&>button]:data-[selected=true]:text-white",
      day_button:
        "size-[40px] rounded-full p-0 leading-none text-base text-lead-grey-800",
      outside:
        "[&>button]:text-blue-grey-400 [&:nth-child(7n+1)>button]:text-blue-grey-400 [&>button]:text-base [&>button]:data-[selected=true]:text-white",
    },
  };

  return (
    <div>
      <div className="w-full bg-white z-10 border-b border-blue-grey-200">
        <div className="w-[316px] mx-auto px-xxs h-[48px] flex flex-row">
          {WEEK_DAYS.map((day) => (
            <span
              key={day}
              className="w-full text-blue-grey-400 text-sm text-center grid place-items-center"
            >
              {day}
            </span>
          ))}
        </div>
      </div>
      <div className="max-h-[250px] min-[390px]:max-h-[500px] md:max-h-[500px] overflow-y-auto scrollbar-hide">
        <div className="w-[280px] md:w-[316px] mx-auto flex flex-col mt-sm">
          <div className="flex-1">
            {isSingleMode ? (
              <DayPicker
                mode="single"
                selected={props.value ? dayjs(props.value).toDate() : undefined}
                disabled={allDisabled}
                onSelect={(selected: Date | undefined) => {
                  if (selected) {
                    const formatted = dayjs(selected).format("YYYY-MM-DD");
                    props.onChangeDate(formatted);
                  }
                }}
                {...commonProps}
              />
            ) : (
              <DayPicker
                mode="range"
                selected={{
                  from: props.value.from
                    ? dayjs(props.value.from).toDate()
                    : undefined,
                  to: props.value.to
                    ? dayjs(props.value.to).toDate()
                    : undefined,
                }}
                disabled={allDisabled}
                onSelect={(range: DateRange | undefined, selected: Date) => {
                  const formatted = dayjs(selected).format("YYYY-MM-DD");
                  if (props.value.from && props.value.to) {
                    props.onChangeDates({ from: formatted, to: "" });
                  } else if (
                    props.value.from &&
                    dayjs(props.value.from).isBefore(formatted)
                  ) {
                    props.onChangeDates({ ...props.value, to: formatted });
                  } else if (
                    props.value.from &&
                    dayjs(props.value.from).isAfter(formatted)
                  ) {
                    props.onChangeDates({ from: formatted, to: "" });
                  }
                }}
                {...commonProps}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
