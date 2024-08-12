import {
  FetcherWithComponents,
  useSearchParams
} from "@remix-run/react";

import { format } from "date-fns";
import React from "react";
import { DayButtonProps } from "react-day-picker";

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "~/components/ui/sheet";

import { cn } from "~/lib/utils";

import ListTransaction from "./list-transaction";

export default function DayButton({
  className,
  children,
  day,
  fetcherProps
}: DayButtonProps & {
  fetcherProps: FetcherWithComponents<unknown>
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const date = day.date;
  const isToday = day.dateLib.isSameDay(new Date(date), new Date());

  const queryDate = searchParams.get('date') || 0;
  const [isOpen] = React.useState(+queryDate === date.getDate());

  if (!queryDate) return <></>
  return (
    <Sheet
      open={isOpen}
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
        onClick={async () => {
          setSearchParams((prev) => {
            prev.set("date", format(new Date(date), "dd"));
            return prev;
          }, { preventScrollReset: true });
        }}
      >
        <button
          className={cn(
            className,
            "flex items-start w-full justify-start",
            isToday && "bg-background"
          )}
        >
          <div className="flex relative flex-col gap-1.5 h-full w-full">
            <div className="mx-auto md:mx-0 md:px-2 my-2">
              <p className={cn(
                "h-7 w-7 flex items-center border-2 border-transparent gap-1 justify-center rounded-full text-[11px] md:text-xs font-medium md:font-medium",
                isToday && "bg-foreground text-white"
              )}>
                {children}
              </p>
            </div>
            <div className="w-full h-full absolute top-10">
              {/* content here */}
            </div>
          </div>
        </button>
      </SheetTrigger>
      <SheetContent className="w-full md:max-w-[450px]">
        <SheetTitle></SheetTitle>
        <ListTransaction
          day={day}
          fetcherProps={fetcherProps}
        />
      </SheetContent>
    </Sheet>
  )
}