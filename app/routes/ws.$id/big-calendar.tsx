import { id as localeId } from "date-fns/locale";
import React from "react";
import { DayButtonProps, DayPicker } from "react-day-picker";

import DayButton from "./day-button";

export default function BigCalendar({
  isValid,
  month,
}: {
  isValid: boolean;
  month: Date;
  setMonth: React.Dispatch<React.SetStateAction<Date>>;
}) {
  if (!isValid) return <>Sorry</>;
  return (
    <div className="relative">
      <DayPicker
        hideNavigation
        showOutsideDays={false}
        onDayClick={(_) => _}
        month={month}
        weekStartsOn={0}
        locale={localeId}
        classNames={{
          root: "relative",

          month:
            "relative w-full h-full md:border-t md:border-input/50 md:px-4",
          months: "relative w-full h-full",
          month_grid: "mt-8 w-full max-h-[800px]",

          week: "relative",
          weekdays: "",
          weekday:
            "text-[10px] font-medium text-left pb-4 md:px-4 first:text-red-500 md:uppercase",

          caption_label: "hidden",
          day: "p-0 h-full border-transparent first:text-red-500",
          outside: "text-muted-foreground/50",
        }}
        components={{
          DayButton: (props: DayButtonProps) => <DayButton {...props} />,
        }}
      />
    </div>
  );
}
