import * as React from "react"
import {
  DayPicker,
  type DayButtonProps
} from "react-day-picker"

import { id as localeId } from "date-fns/locale"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger
} from "./ui/sheet"
import { Button } from "./ui/button"

import { cn } from "~/lib/utils"
import { format } from "date-fns"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

export default function BigCalendar({
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <div className="relative">
      <DayPicker
        showOutsideDays={showOutsideDays}
        onDayClick={(v) => {
          console.log('v >>> ', v)
        }}
        locale={localeId}
        classNames={{
          root: "relative",

          month: "relative w-full",
          months: "relative w-full",
          month_grid: "w-full h-[calc(100vh_-_40px)]",

          week: "h-6 relative p-0",
          weekdays: "flex absolute bottom-0 h-full w-full",
          weekday: "flex-1 text-[11px] font-medium h-full flex justify-center",

          nav: "hidden",
          caption_label: "hidden",
          day: "relative p-0",
          day_button: "w-full h-full border hover:border-primary",
          outside: "bg-background"
        }}
        components={{
          DayButton: (props: DayButtonProps) => <DayButton {...props} />,
        }}
        {...props}
      />
    </div>
  )
}

function DayButton(props: DayButtonProps) {
  const { className, children, day } = props;

  const date = day.date;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div
          role="button"
          className={cn(className, "flex items-start p-8 justify-start")}
        >
          <div className="flex flex-col justify-between h-full">
            <span className="text-[11px]">
              {children}
            </span>
            <div className="text-[10px] flex flex-col">
              <span className="text-primary">+Rp10.000</span>
              <span className="text-red-500">-Rp5.000</span>
            </div>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent className="w-[420px]">
        <div className="relative">
          <div className="h-screen">
            <p>content</p>
            <p>{format(date, "dd MMMM yyyy", { locale: localeId })}</p>
          </div>
          <div className="sticky w-full bottom-0 right-0 py-4 flex flex-col gap-2">
            <Button
              variant="default"
              className="w-full"
            >
              Buat Transaksi
            </Button>
            <SheetClose asChild>
              <Button
                variant="outline"
                className="w-full"
              >
                Tutup
              </Button>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}