import * as React from "react"
import {
  DayPicker,
  type DayButtonProps
} from "react-day-picker"
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, ChevronsRight, Plus } from "lucide-react"

import { addMonths, format, subMonths } from "date-fns"
import { id as localeId } from "date-fns/locale"

import { cn } from "~/lib/utils"

import toIDR from "~/utils/currency"

import { Button } from "./ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger
} from "./ui/sheet"


export type CalendarProps = React.ComponentProps<typeof DayPicker>

export default function BigCalendar() {
  const [month, setMonth] = React.useState(new Date());

  return (
    <div className="relative">
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
            day: "relative p-0 md:h-full border-transparent md:border-border first:border-l border-r border-t last:text-red-500",
            day_button: "md:h-full hover:rounded-xl md:min-h-[180px] max-h-[180px] border border-transparent hover:border-primary",
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
        <h4 className="text-sm font-semibold">{format(month, "MMMM yyyy", { locale: localeId })}</h4>
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
    <Sheet modal={false}>
      <SheetTrigger asChild>
        <div
          role="button"
          className={cn(className, "flex items-start justify-start")}
        >
          <div className="flex flex-col gap-1.5 h-full w-full relative">
            <div className="mx-auto md:mx-0 md:px-4 mt-2">
              <p
                className={cn(
                  "h-8 w-8 md:h-6 flex items-center gap-1 rounded-full text-[11px] md:text-xs font-medium md:font-semibold",
                  isToday && "md:w-full bg-primary justify-center md:text-white"
                )}
              >
                <span>
                  {children}
                </span>
                {children === "1" && (
                  <span className="hidden md:block">
                    {format(date, "MMM", { locale: localeId })}
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent className="w-full md:w-[42vw] md:max-w-[640px]">
        <div className="relative min-h-screen">
          <div className="sticky w-full px-6 top-0 right-0 flex flex-col gap-2">
            <div className="py-3">
              <Button
                variant="default"
                className="w-fit px-3.5 h-16 fixed bottom-12 shadow-lg hover:bg-primary right-12 rounded-xl text-sm font-semibold gap-2"
              >
                <Plus size={18} strokeWidth={2} />
                <span>Buat transaksi</span>
              </Button>
              <div className="flex gap-4 items-center relative">
                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    className="w-full"
                    size="icon"
                    tooltip="Tutup"
                  >
                    <ChevronsRight
                      size={18}
                      strokeWidth={2.5}
                    />
                  </Button>
                </SheetClose>
                <p className="text-base font-semibold">{format(date, "d MMMM yyyy", { locale: localeId })}</p>
              </div>
            </div>
          </div>
          <div className="h-screen py-6 px-8 flex flex-col gap-6 overflow-scroll">
            <div className="flex flex-col divide-y border rounded-2xl px-6 py-1 mb-52">
              <Transaction
                type="cash_in"
                amount={24000000}
                description="Bonus ditransfer menggunakan Livin Mandiri ke norek 12000249276552"
                title="Transfer"
                dateTime="12:06"
              />
              <Transaction
                type="cash_out"
                amount={1890024}
                title="QR Bayar"
                description="Bayar hutang ke Martin"
                dateTime="12:42"
              />
              <Transaction
                type="cash_out"
                amount={9508900}
                title="Beli monitor"
                description="Monitor merek samsung 12inc untuk kerja dirumah (WFH)"
                dateTime="17:20"
              />
              <Transaction
                type="cash_in"
                amount={24000000}
                description="Bonus ditransfer menggunakan Livin Mandiri ke norek 12000249276552"
                title="Transfer"
                dateTime="12:06"
              />
              <Transaction
                type="cash_out"
                amount={1890024}
                title="QR Bayar"
                description="Bayar hutang ke Martin"
                dateTime="12:42"
              />
              <Transaction
                type="cash_out"
                amount={9508900}
                title="Beli monitor"
                description="Monitor merek samsung 12inc untuk kerja dirumah (WFH)"
                dateTime="17:20"
              />
              <Transaction
                type="cash_in"
                amount={24000000}
                description="Bonus ditransfer menggunakan Livin Mandiri ke norek 12000249276552"
                title="Transfer"
                dateTime="12:06"
              />
              <Transaction
                type="cash_out"
                amount={1890024}
                title="QR Bayar"
                description="Bayar hutang ke Martin"
                dateTime="12:42"
              />
              <Transaction
                type="cash_out"
                amount={9508900}
                title="Beli monitor"
                description="Monitor merek samsung 12inc untuk kerja dirumah (WFH)"
                dateTime="17:20"
              />
              <Transaction
                type="cash_in"
                amount={24000000}
                description="Bonus ditransfer menggunakan Livin Mandiri ke norek 12000249276552"
                title="Transfer"
                dateTime="12:06"
              />
              <Transaction
                type="cash_out"
                amount={1890024}
                title="QR Bayar"
                description="Bayar hutang ke Martin"
                dateTime="12:42"
              />
              <Transaction
                type="cash_out"
                amount={9508900}
                title="Beli monitor"
                description="Monitor merek samsung 12inc untuk kerja dirumah (WFH)"
                dateTime="17:20"
              />
              <Transaction
                type="cash_in"
                amount={24000000}
                description="Bonus ditransfer menggunakan Livin Mandiri ke norek 12000249276552"
                title="Transfer"
                dateTime="12:06"
              />
              <Transaction
                type="cash_out"
                amount={1890024}
                title="QR Bayar"
                description="Bayar hutang ke Martin"
                dateTime="12:42"
              />
              <Transaction
                type="cash_out"
                amount={9508900}
                title="Beli monitor"
                description="Monitor merek samsung 12inc untuk kerja dirumah (WFH)"
                dateTime="17:20"
              />
              <Transaction
                type="cash_in"
                amount={24000000}
                description="Bonus ditransfer menggunakan Livin Mandiri ke norek 12000249276552"
                title="Transfer"
                dateTime="12:06"
              />
              <Transaction
                type="cash_out"
                amount={1890024}
                title="QR Bayar"
                description="Bayar hutang ke Martin"
                dateTime="12:42"
              />
              <Transaction
                type="cash_out"
                amount={9508900}
                title="Beli monitor"
                description="Monitor merek samsung 12inc untuk kerja dirumah (WFH)"
                dateTime="17:20"
              />
            </div>
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
    <div className="flex items-start gap-6 py-4">
      <div className="w-fit mt-1.5">
        <div className={cn("rounded-full h-7 w-7 flex items-center justify-center shadow-3xl border-2", type === "cash_in" && "border-primary text-primary")}>
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
      </div>
      <div className="flex gap-4 items-start justify-between w-full">
        <div className="flex flex-col w-full">
          <p className="text-xs text-muted-foreground font-normal">{dateTime}</p>
          <p className="text-base font-semibold text-black">{title}</p>
          <p className="text-sm text-muted-foreground font-normal">{description}</p>
        </div>
        <div className="mt-1.5 w-full flex justify-end">
          <h4 className={cn("text-base font-bold", type === "cash_in" && "text-primary")}>
            <span>{type === "cash_in" ? "+" : "-"}</span>
            <span>{" "}</span>
            <span>{toIDR(amount)}</span>
          </h4>
        </div>
      </div>
    </div>
  )
}