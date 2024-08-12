import { useFetcher } from "@remix-run/react";

import { id as localeId } from "date-fns/locale";
import React from "react";
import {
  DayButtonProps,
  DayPicker
} from "react-day-picker";

import DayButton from "./day-button";

export default function BigCalendar({
  isValid,
  month
}: {
  isValid: boolean,
  month: Date,
  setMonth: React.Dispatch<React.SetStateAction<Date>>
}) {
  const fetcher = useFetcher({ key: "create-transaction" });

  if (!isValid) return <>Sorry</>
  return (
    <div className="relative !overflow-hidden">
      <DayPicker
        hideNavigation
        showOutsideDays
        onDayClick={_ => _}
        month={month}
        weekStartsOn={0}
        locale={localeId}
        classNames={{
          root: "relative",

          month: "relative w-full mt-4",
          months: "relative w-full",
          month_grid: "mt-8 w-full max-h-[800px]",

          week: "relative p-0",
          weekdays: "flex absolute top-0 w-full",
          weekday: "flex-1 text-[10px] font-medium z-50 font-medium h-full py-2 flex items-center justify-center md:justify-start md:px-4 first:text-red-500 md:uppercase",

          caption_label: "border border-red-500 absolute right-0 hidden",
          day: "p-0 border-transparent md:border-input border-r last:border-r-transparent border-t first:text-red-500",
          day_button: "border h-full border-transparent",
          outside: "text-muted-foreground/50"
        }}
        components={{
          DayButton: (props: DayButtonProps) => (
            <DayButton
              {...props}
              fetcherProps={fetcher}
            />
          )
        }}
      />
    </div>
  )
}