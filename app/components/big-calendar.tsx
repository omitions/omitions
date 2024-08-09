import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  XIcon
} from "lucide-react";
import * as React from "react";
import {
  CalendarDay,
  DayPicker,
  type DayButtonProps
} from "react-day-picker";

import { useParams, useSearchParams } from "@remix-run/react";

import { addMonths, format, subMonths } from "date-fns";
import { id as localeId } from "date-fns/locale";

import { cn } from "~/lib/utils";

import toIDR from "~/utils/currency";

import { ActionType } from "~/routes/ws.$id/route";

import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger
} from "./ui/sheet";

import { regenerateDash } from "~/utils/misc";
import CreateTransaction from "./create-transaction";
import { TTransactions } from "~/utils/workspaces.server";

export type CalendarProps = React.ComponentProps<typeof DayPicker>

export default function BigCalendar({
  isValid,
  workspaceId,
  transactions
}: {
  isValid: boolean,
  workspaceId: string,
  transactions: TTransactions[]
}) {
  const [searchParams] = useSearchParams();

  const date = searchParams.get("d");
  const [month, setMonth] = React.useState(date ? new Date(date) : new Date());

  if (!isValid || !workspaceId) return <>Sorry</>
  return (
    <div className="relative overflow-hidden">
      <div className="flex">
        <div className="w-full">
          <Header
            month={month}
            setMonth={setMonth}
          />
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
              month_grid: "mt-8 w-full h-[calc(100vh_-_145px)]",

              week: "relative p-0 last:border-b",
              weekdays: "flex absolute top-0 w-full",
              weekday: "flex-1 text-[10px] font-medium z-50 font-medium h-full py-2 flex items-center justify-center md:justify-start md:px-4 first:text-red-500 md:uppercase",

              caption_label: "border border-red-500 absolute -top-11 right-0 hidden",
              day: "p-0 border-transparent md:border-border first:border-l border-r border-t first:text-red-500",
              day_button: "hover:rounded-2xl border h-full border-transparent hover:border-primary",
              outside: "text-muted-foreground/50"
            }}
            components={{
              DayButton: (props: DayButtonProps) => (
                <DayButton
                  {...props}
                  workspaceId={workspaceId}
                  transactions={transactions}
                />
              )
            }}
          />
        </div>
      </div>
    </div>
  )
}

function Header({ month, setMonth }: { month: Date, setMonth: React.Dispatch<React.SetStateAction<Date>> }) {
  const [, setSearchParams] = useSearchParams();

  const today = new Date();
  const nextMonth = addMonths(month, 1);
  const prevMonth = subMonths(month, 1);

  return (
    <div className="flex items-center justify-between px-4 md:px-2">
      <div>
        <h4 className="text-sm font-medium">{format(month, "MMMM yyyy", { locale: localeId })}</h4>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            setMonth(prevMonth)
            setSearchParams((prev) => {
              prev.set("d", `${new Date(prevMonth).getFullYear()}-${format(new Date(prevMonth).setDate(new Date().getDate() - 1), "MM")}`);
              return prev;
            }, { preventScrollReset: true });
          }}
        >
          <ChevronLeft
            size={18}
            strokeWidth={2}
          />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-sm font-medium"
          onClick={() => setMonth(today)}
        >
          Hari ini
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            setMonth(nextMonth)
            setSearchParams((prev) => {
              prev.set("d", `${new Date(nextMonth).getFullYear()}-${format(new Date(nextMonth).setDate(new Date().getDate() - 1), "MM")}`);
              return prev;
            }, { preventScrollReset: true });
          }}
        >
          <ChevronRight
            size={18}
            strokeWidth={2}
          />
        </Button>
      </div>
    </div>
  )
}

function DayButton({
  className,
  children,
  day,
  workspaceId,
  transactions
}: DayButtonProps & {
  workspaceId: string,
  transactions: TTransactions[]
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const routeParams = useParams();

  const date = day.date;
  const isToday = day.dateLib.isSameDay(new Date(date), new Date());
  const workspaceName = routeParams.id ? regenerateDash(routeParams.id).withoutTheLast() : "-";

  const queryDate = searchParams.get('date');

  if (!queryDate) return <></>
  return (
    <Sheet
      open={+queryDate === date.getDate()}
      onOpenChange={(bool) => {
        if (!bool) {
          setSearchParams((prev) => {
            prev.set("date", "0");
            return prev;
          }, { preventScrollReset: true });
        }
      }}
    >
      <SheetTrigger
        asChild
        onClick={() => {
          setSearchParams((prev) => {
            prev.set("date", format(new Date(date), "dd"));
            return prev;
          }, { preventScrollReset: true });
        }}
      >
        <div
          role="button"
          className={cn(
            className,
            "flex items-start w-full justify-start",
            isToday && "bg-background"
          )}
        >
          <div className="flex flex-col gap-1.5 h-full w-full relative">
            <div className="mx-auto md:mx-0 md:px-2 mt-2">
              <p
                className={cn(
                  "h-8 w-8 flex items-center border-2 border-transparent gap-1 justify-center rounded-full text-[11px] md:text-xs font-medium md:font-medium",
                  isToday && "border-blue-400 bg-blue-100"
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
      <SheetContent className="w-full md:w-[45vw] md:max-w-[600px]">
        <SheetTitle></SheetTitle>
        <Content
          day={day}
          workspaceId={workspaceId}
          workspaceName={workspaceName}
          transactions={transactions}
        />
      </SheetContent>
    </Sheet>
  )
}

function Content({
  day,
  workspaceId,
  workspaceName,
  transactions
}: {
  day: CalendarDay,
  workspaceId: string,
  workspaceName: string,
  transactions: TTransactions[]
}) {
  const date = day.date;
  const isToday = day.dateLib.isSameDay(new Date(date), new Date());

  return (
    <div className="relative min-h-screen">
      <div className="sticky w-full px-6 top-0 right-0 flex flex-col gap-2">
        <div className="py-6">
          <div className="fixed bottom-12 right-12">
            <CreateTransaction
              date={date}
              workspaceId={workspaceId}
              workspaceName={workspaceName}
              actionType={ActionType.CREATE_TRANSACTION}
            />
          </div>
          <div className="flex gap-4 items-center justify-between px-3 relative">
            <div>
              <p className={cn("text-xs font-medium text-muted-foreground uppercase", isToday && "text-blue-400")}>{format(date, "EEEE", { locale: localeId })}</p>
              <p className="text-lg font-bold">{format(date, "d MMMM yyyy", { locale: localeId })}</p>
            </div>
            <SheetClose asChild>
              <Button
                variant="ghost"
                className="w-full"
                size="icon"
                tooltip="Tutup"
              >
                <XIcon
                  size={20}
                  strokeWidth={2.5}
                />
              </Button>
            </SheetClose>
          </div>
        </div>
      </div>
      <div className="h-screen py-2 px-8 flex flex-col gap-6 overflow-scroll">
        <div className="flex flex-col divide-y border rounded-2xl px-6 py-1 mb-60">
          {transactions.map((props) => (
            <Transaction
              key={props._id}
              type={props.type}
              amount={props.amount}
              description={props.description}
              date_time={props.date_time}
            />
          ))}
          {/* <Transaction
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
          /> */}
        </div>
      </div>
    </div>
  )
}

function Transaction({
  type,
  amount,
  description,
  date_time
}: Pick<TTransactions, "type" | "amount" | "description" | "date_time">) {
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
          <p className="text-xs text-muted-foreground font-normal">{date_time.split(" ")[1]}</p>
          <p className="text-base font-medium text-black">{description}</p>
          {/* <p className="text-sm text-muted-foreground font-normal">{description}</p> */}
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