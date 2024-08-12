import { FetcherWithComponents } from "@remix-run/react";

import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { ArrowLeft, ArrowRight, XIcon } from "lucide-react";
import { CalendarDay } from "react-day-picker";

import { Button } from "~/components/ui/button";
import { SheetClose } from "~/components/ui/sheet";

import { cn } from "~/lib/utils";

import toIDR from "~/utils/currency";
import { TTransactions } from "~/utils/workspaces.server";

import CreateTransaction from "./create-transaction";
import { ActionType } from "./route";

export default function ListTransaction({
  day,
  workspaceId,
  workspaceName,
  transactions,
  fetcherProps
}: {
  day: CalendarDay,
  workspaceId: string,
  workspaceName: string,
  transactions: TTransactions[],
  fetcherProps: FetcherWithComponents<unknown>
}) {
  const date = day.date;

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
              fetcherProps={fetcherProps}
            />
          </div>
          <div className="flex gap-4 items-center justify-between px-3 relative">
            <div>
              <p className={cn("text-xs font-medium text-muted-foreground uppercase")}>{format(date, "EEEE", { locale: localeId })}</p>
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