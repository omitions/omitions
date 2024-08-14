import { FetcherWithComponents, useLoaderData } from "@remix-run/react";

import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { ArrowLeft, ArrowRight, XIcon } from "lucide-react";
import { CalendarDay } from "react-day-picker";

import { Button } from "~/components/ui/button";
import { SheetClose } from "~/components/ui/sheet";

import { cn } from "~/lib/utils";

import toIDR from "~/utils/currency";
import { TTransactions } from "~/utils/transactions.server";

import CreateTransaction from "./create-transaction";
import { ActionType, loader } from "./route";

export default function ListTransaction({
  day,
  fetcherProps,
}: {
  day: CalendarDay;
  fetcherProps: FetcherWithComponents<unknown>;
}) {
  const { transactions } = useLoaderData<typeof loader>();

  const data = transactions as TTransactions[];
  const date = day.date;

  return (
    <div className="relative min-h-screen">
      <div className="sticky right-0 top-0 flex w-full flex-col gap-2 px-6">
        <div className="py-6">
          <div className="fixed bottom-12 right-12">
            <CreateTransaction
              date={date}
              actionType={ActionType.CREATE_TRANSACTION}
              fetcherProps={fetcherProps}
            />
          </div>
          <div className="relative flex items-center justify-between gap-4 px-3">
            <div>
              <p className="text-xs font-medium uppercase text-muted-foreground">
                {format(date, "EEEE", { locale: localeId })}
              </p>
              <p className="text-lg font-bold">
                {format(date, "d MMMM yyyy", { locale: localeId })}
              </p>
            </div>
            <SheetClose asChild>
              <Button
                variant="ghost"
                className="w-full"
                size="icon"
                tooltip="Tutup"
              >
                <XIcon size={20} strokeWidth={2.5} />
              </Button>
            </SheetClose>
          </div>
        </div>
      </div>
      <div className="flex h-screen flex-col gap-6 overflow-scroll px-8 py-2">
        <div className="mb-60 flex flex-col divide-y rounded-2xl border px-6 py-1">
          {data?.length ? (
            data.map((props) => (
              <Transaction
                key={props._id}
                type={props.type}
                amount={props.amount}
                description={props.description}
                date_time={props.date_time}
              />
            ))
          ) : (
            <p className="py-6 text-center text-sm">Belum Ada Transakasi</p>
          )}
        </div>
      </div>
    </div>
  );
}

function Transaction({
  type,
  amount,
  description,
  date_time,
}: Pick<TTransactions, "type" | "amount" | "description" | "date_time">) {
  return (
    <div className="flex items-start gap-6 py-4">
      <div className="mt-1.5 w-fit">
        <div
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-full border-2 shadow-3xl",
            type === "cash_in" && "border-primary text-primary",
          )}
        >
          {type === "cash_in" ? (
            <ArrowRight size={15} strokeWidth={2.5} />
          ) : (
            <ArrowLeft size={15} strokeWidth={2.5} />
          )}
        </div>
      </div>
      <div className="flex w-full items-start justify-between gap-4">
        <div className="flex w-full flex-col">
          <p className="text-xs font-normal text-muted-foreground">
            {date_time.split(" ")[1]}
          </p>
          <p className="text-sm font-medium text-black">{description}</p>
          {/* <p className="text-sm text-muted-foreground font-normal">{description}</p> */}
        </div>
        <div className="mt-1.5 flex w-full justify-end">
          <h4
            className={cn(
              "text-base font-bold",
              type === "cash_in" && "text-primary",
            )}
          >
            <span>{type === "cash_in" ? "+" : "-"}</span>
            <span> </span>
            <span>{toIDR(amount)}</span>
          </h4>
        </div>
      </div>
    </div>
  );
}
