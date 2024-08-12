import {
  FetcherWithComponents,
  useParams,
  useSearchParams
} from "@remix-run/react";

import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { DayButtonProps } from "react-day-picker";

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "~/components/ui/sheet";

import { cn } from "~/lib/utils";

import { regenerateDash } from "~/utils/misc";
import { TTransactions } from "~/utils/workspaces.server";

import ListTransaction from "./list-transaction";

export default function DayButton({
  className,
  children,
  day,
  workspaceId,
  transactions,
  fetcherProps
}: DayButtonProps & {
  workspaceId: string,
  transactions: TTransactions[],
  fetcherProps: FetcherWithComponents<unknown>
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const routeParams = useParams();

  const date = day.date;
  const isToday = day.dateLib.isSameDay(new Date(date), new Date());
  const workspaceName = routeParams.id ? regenerateDash(routeParams.id).withoutTheLast() : "-";

  const queryDate = searchParams.get('date');

  const fetcher = fetcherProps;

  if (!queryDate) return <></>
  return (
    <Sheet
      open={Number(queryDate) === Number(date.getDate()) && parseInt(queryDate) > 0 && fetcher.state === 'idle'}
      onOpenChange={(bool) => {
        if (!bool) {
          setSearchParams((prev) => {
            prev.set("date", "0");
            return prev;
          }, {});
        }
      }}
    >
      <SheetTrigger
        asChild
        onClick={() => {
          setSearchParams((prev) => {
            prev.set("date", format(new Date(date), "dd"));
            return prev;
          }, {});
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
          <div className="flex relative flex-col gap-1.5 h-full w-full">
            <div className="mx-auto md:mx-0 md:px-2 mt-2">
              <p
                className={cn(
                  "h-7 w-7 flex items-center border-2 border-transparent gap-1 justify-center rounded-md text-[11px] md:text-xs font-medium md:font-medium",
                  isToday && "bg-foreground text-white"
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
            <div className="w-full h-full absolute top-10">
              {/* content here */}
            </div>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent className="w-full md:w-[45vw] md:max-w-[600px]">
        <SheetTitle></SheetTitle>
        <ListTransaction
          day={day}
          workspaceId={workspaceId}
          workspaceName={workspaceName}
          transactions={transactions}
          fetcherProps={fetcherProps}
        />
      </SheetContent>
    </Sheet>
  )
}