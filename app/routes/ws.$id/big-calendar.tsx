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
    <div className="relative !overflow-hidden bg-white">
      <DayPicker
        hideNavigation
        showOutsideDays
        onDayClick={(_) => _}
        month={month}
        weekStartsOn={0}
        locale={localeId}
        classNames={{
          root: "relative overflow-scroll",

          month: "relative w-full",
          months: "relative w-full",
          month_grid: "mt-8 w-full max-h-[800px]",

          week: "relative",
          weekdays: "",
          weekday:
            "text-[10px] font-medium text-left pb-4 md:px-8 first:text-red-500 md:uppercase",

          caption_label: "border border-red-500 absolute right-0 hidden",
          day: "p-0 h-full border-transparent border-input/50 border-r last:border-r-transparent border-t first:text-red-500",
          day_button: "border h-full border-transparent hover:border-input/50",
          outside: "text-muted-foreground/50",
        }}
        components={{
          DayButton: (props: DayButtonProps) => <DayButton {...props} />,
        }}
      />
    </div>
  );
}
