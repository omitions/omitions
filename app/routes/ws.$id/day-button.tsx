import { FetcherWithComponents, Link, useSearchParams } from "@remix-run/react";

// import { format } from "date-fns";
import React from "react";
import { DayButtonProps } from "react-day-picker";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

import { cn } from "~/lib/utils";

import ListTransaction from "./list-transaction";
import { ButtonLink } from "~/components/ui/button";

export default function DayButton({
  className,
  children,
  day,
  fetcherProps,
}: DayButtonProps & {
  fetcherProps: FetcherWithComponents<unknown>;
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const date = day.date;
  const isToday = day.dateLib.isSameDay(new Date(date), new Date());

  const queryDate = searchParams.get("date") || 0;
  const [isOpen] = React.useState(+queryDate === date.getDate());

  return (
    <Link
      to="/ws/day/12"
      className={cn(
        className,
        "flex w-full items-start justify-start",
        isToday && "bg-background",
      )}
    >
      <div className="relative flex h-full w-full flex-col gap-1.5">
        <div className="mx-auto my-2 md:mx-0 md:px-2">
          <p
            className={cn(
              "flex h-7 w-7 items-center justify-center gap-1 rounded-full border-2 border-transparent text-[11px] font-medium md:text-xs md:font-medium",
              isToday && "bg-foreground text-white",
            )}
          >
            {children}
          </p>
        </div>
        <div className="absolute top-10 h-full w-full">
          {/* content here */}
        </div>
      </div>
    </Link>
  );

  if (!queryDate) return <></>;
  return (
    <Sheet
      open={isOpen}
      onOpenChange={(bool) => {
        if (!bool) {
          setSearchParams(
            (prev) => {
              prev.set("date", "0");
              return prev;
            },
            { preventScrollReset: true },
          );
        }
      }}
    >
      <SheetTrigger
        asChild
        // onClick={async () => {
        //   setSearchParams((prev) => {
        //     prev.set("date", format(new Date(date), "dd"));
        //     return prev;
        //   }, { preventScrollReset: true });
        // }}
      >
        <ButtonLink
          href="/ws/day/12"
          className={cn(
            className,
            "flex w-full items-start justify-start",
            isToday && "bg-background",
          )}
        >
          <div className="relative flex h-full w-full flex-col gap-1.5">
            <div className="mx-auto my-2 md:mx-0 md:px-2">
              <p
                className={cn(
                  "flex h-7 w-7 items-center justify-center gap-1 rounded-full border-2 border-transparent text-[11px] font-medium md:text-xs md:font-medium",
                  isToday && "bg-foreground text-white",
                )}
              >
                {children}
              </p>
            </div>
            <div className="absolute top-10 h-full w-full">
              {/* content here */}
            </div>
          </div>
        </ButtonLink>
      </SheetTrigger>
      <SheetContent className="w-full md:max-w-[450px]">
        <SheetTitle></SheetTitle>
        <ListTransaction day={day} fetcherProps={fetcherProps} />
      </SheetContent>
    </Sheet>
  );
}
