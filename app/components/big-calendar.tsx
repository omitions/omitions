import * as React from "react"
import {
  DayPicker,
  type DayButtonProps
} from "react-day-picker"

import { useGesture } from '@use-gesture/react'

import { Lethargy } from 'lethargy-ts'
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

import { addMonths, format, subMonths } from "date-fns"
import { id as localeId } from "date-fns/locale"

import { Button } from "./ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger
} from "./ui/sheet"

import { cn } from "~/lib/utils"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

const lethargy = new Lethargy();

export default function BigCalendar() {
  const [month, setMonth] = React.useState(new Date());

  const nextMonth = addMonths(month, 1);
  const prevMonth = subMonths(month, 1);

  const bind = useGesture({
    onWheel: ({ event, first, memo: wait, direction }) => {
      if (!first) {
        const s = lethargy.check(event)
        if (s) {
          if (!wait) {
            const down = [0, -1];
            const up = [0, 1];
            const right = [1, 0];
            const left = [-1, 0];

            const dir = direction;

            const isGoToPrevMonth = (dir[0] === down[0] && dir[1] === down[1]) || (dir[0] === left[0] && dir[1] === left[1])
            const isGoToNextMonth = (dir[0] === up[0] && dir[1] === up[1]) || (dir[0] === right[0] && dir[1] === right[1])

            if (isGoToPrevMonth) {
              setMonth(prevMonth)
            }
            if (isGoToNextMonth) {
              setMonth(nextMonth)
            }
            return true
          }
        } else return false
      } else {
        return false
      }
    }
  })

  return (
    <div className="relative max-h-[300px]">
      <Header
        month={month}
        setMonth={setMonth}
      />
      <div {...bind()}>
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
            day_button: "w-full h-full hover:rounded-xl border border-transparent hover:border-primary",
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
    <div className="flex items-center justify-between px-2">
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
            <div className="mx-auto md:mx-0 md:px-4 mt-2">
              <p
                className={cn(
                  "h-6 w-6 flex items-center gap-1 justify-center rounded-full text-xs font-medium md:font-semibold",
                  isToday && "bg-primary text-white")
                }
              >
                {children === "1" ?
                  <span>
                    {format(date, "MMM", { locale: localeId })}
                  </span>
                  : null}
                <span>
                  {children}
                </span>
              </p>
            </div>
            {/* <div className="bg-primary/30 mx-2 px-1.5 py-0.5 rounded-sm flex flex-col">
              <span className="text-[10px] text-black font-bold">Rp7,210,000</span>
            </div>
            <div className="bg-red-500/30 mx-2 px-1.5 py-0.5 rounded-sm flex flex-col">
              <span className="text-[10px] text-black font-bold">Rp255.200</span>
            </div> */}
          </div>
        </div>
      </SheetTrigger>
      <SheetContent className="w-[420px]">
        <div className="relative">
          <div className="h-screen py-4 flex flex-col gap-4">
            <SheetTitle>
              {format(date, "d MMMM yyyy", { locale: localeId })}
            </SheetTitle>
            <div className="flex flex-col divide-y">
              <Transaction />
              <Transaction />
              <Transaction />
            </div>
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

function Transaction() {
  return (
    <div className="flex items-center gap-4 py-3">
      <div className="bg-primary/30 h-7 w-8 rounded-full flex items-center justify-center shadow-3xl">
        <ArrowRight
          size={15}
          strokeWidth={2.5}
        />
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col">
          <p className="text-[11px] text-muted-foreground font-medium">22:00</p>
          <p className="text-sm font-semibold">Payroll</p>
        </div>
        <div>
          <h4 className="text-sm font-bold text-primary">+Rp.14,000,000</h4>
        </div>
      </div>
    </div>
  )
}