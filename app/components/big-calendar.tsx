import * as React from "react"
import {
  DayPicker,
  type DayButtonProps
} from "react-day-picker"
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

import { addMonths, format, subMonths } from "date-fns"
import { id as localeId } from "date-fns/locale"

import { cn } from "~/lib/utils"

import toIDR from "~/utils/currency"

import { Button } from "./ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger
} from "./ui/sheet"


export type CalendarProps = React.ComponentProps<typeof DayPicker>

export default function BigCalendar() {
  const [month, setMonth] = React.useState(new Date());

  return (
    <div className="relative max-h-[300px]">
      <Header
        month={month}
        setMonth={setMonth}
      />
      <div>
        <DayPicker
          showOutsideDays
          onDayClick={(v) => {
            console.log('v >>> ', v)
          }}
          month={month}
          hideNavigation
          locale={localeId}
          classNames={{
            root: "relative",

            month: "relative w-full mt-4",
            months: "relative w-full",
            month_grid: "mt-8 w-full h-[calc(100vh_-_180px)] max-h-[900px]",

            week: "relative p-0 last:border-b",
            weekdays: "flex absolute top-0 w-full",
            weekday: "flex-1 text-[10px] font-semibold z-50 font-medium h-full py-2 flex items-center justify-center md:justify-start md:px-4 last:text-red-500 md:uppercase",

            caption_label: "border border-red-500 absolute -top-11 right-0 hidden",
            day: "relative p-0 border-transparent md:border-border first:border-l border-r border-t last:text-red-500",
            day_button: "h-full hover:rounded-xl border border-transparent hover:border-primary",
            outside: "text-muted-foreground/50"
          }}
          components={{
            DayButton: (props: DayButtonProps) => (
              <DayButton {...props} />
            ),
          }}
        />
      </div>
    </div>
  )
}

function Header({ month, setMonth }: { month: Date, setMonth: React.Dispatch<React.SetStateAction<Date>> }) {
  const today = new Date();

  const nextMonth = addMonths(month, 1);
  const prevMonth = subMonths(month, 1);

  return (
    <div className="flex items-center justify-between px-4 md:px-2">
      <div>
        <h4 className="text-base font-semibold">{format(month, "MMMM yyyy", { locale: localeId })}</h4>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMonth(prevMonth)}
        >
          <ChevronLeft
            size={22}
            strokeWidth={2}
          />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-sm font-semibold"
          onClick={() => setMonth(today)}
        >
          Hari ini
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMonth(nextMonth)}
        >
          <ChevronRight
            size={22}
            strokeWidth={2}
          />
        </Button>
      </div>
    </div>
  )
}

function DayButton({ className, children, day, }: DayButtonProps) {
  const date = day.date;
  const isToday = day.dateLib.isSameDay(new Date(date), new Date())

  return (
    <Sheet modal={true}>
      <SheetTrigger asChild>
        <div
          role="button"
          className={cn(className, "flex items-start justify-start")}
        >
          <div className="flex flex-col gap-1.5 h-full w-full relative">
            <div className="mx-auto md:mx-0 md:px-2 mt-2">
              <p
                className={cn(
                  "h-8 w-8 md:h-6 md:w-6 flex items-center gap-1 justify-center rounded-full text-[11px] md:text-xs font-medium md:font-semibold",
                  isToday && "md:w-full bg-primary md:text-white",
                )}
              >
                {children === "1" && (
                  <span className="hidden md:block md:ml-6">
                    {format(date, "MMM", { locale: localeId })}
                  </span>
                )}
                <span>
                  {children}
                </span>
              </p>
            </div>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent className="w-full md:w-[600px]">
        <div className="relative min-h-screen">
          <div className="h-screen p-6 flex flex-col gap-6">
            <SheetTitle>
              {format(date, "d MMMM yyyy", { locale: localeId })}
            </SheetTitle>
            <div className="flex flex-col divide-y border rounded-xl px-6 py-2">
              <Transaction
                type="cash_in"
                amount={24000000}
                description="Bonus"
                title="Transfer"
                dateTime="15:00"
              />
              <Transaction
                type="cash_out"
                amount={1890024}
                title="QR Bayar"
                description="Bayar hutang ke Martin"
                dateTime="15:00"
              />
            </div>
          </div>
          <div
            className="sticky w-full p-6 bottom-0 right-0 flex flex-col gap-2"
            style={{ boxShadow: "0 4px 16px #0000001f" }}
          >
            <Button
              variant="default"
              className="w-full"
            >
              Buat Transaksiss
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

function Transaction({
  type,
  amount,
  description,
  title,
  dateTime
}: {
  type: "cash_in" | "cash_out",
  amount: number,
  description: string,
  title: string,
  dateTime: string
}) {
  return (
    <div className="flex items-center gap-4 py-3">
      <div className={cn("h-7 w-8 rounded-full flex items-center justify-center shadow-3xl border-2", type === "cash_in" && "border-primary text-primary")}>
        {type === "cash_in" ? (
          <ArrowRight
            size={15}
            strokeWidth={2.5}
          />
        ) : (
          <ArrowLeft
            size={15}
            strokeWidth={2.5}
          />
        )}
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col">
          <p className="text-[11px] text-muted-foreground font-normal">{dateTime}</p>
          <p className="text-sm font-semibold text-black">{title}</p>
          <p className="text-xs font-medium">{description}</p>
        </div>
        <div>
          <h4 className={cn("text-sm font-semibold", type === "cash_in" && "text-primary")}>
            <span>{type === "cash_in" ? "+" : "-"}</span>
            <span>{" "}</span>
            <span>{toIDR(amount)}</span>
          </h4>
        </div>
      </div>
    </div>
  )
}