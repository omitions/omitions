import { Link, useLoaderData, useParams } from "@remix-run/react";

import { format } from "date-fns";
import { DayButtonProps } from "react-day-picker";

import { cn } from "~/lib/utils";

import toIDR from "~/utils/currency";
import { generateDash, regenerateDash } from "~/utils/misc";

import { loader } from "./route";

export default function DayButton({ children, day }: DayButtonProps) {
  const { calendar } = useLoaderData<typeof loader>();

  const date = day.date;
  const isToday = day.dateLib.isSameDay(new Date(date), new Date());

  const params = useParams();
  const _id = params.id ? regenerateDash(params.id).getTheLast() : "";
  const name = params.id ? regenerateDash(params.id).withoutTheLast() : "-";

  const dayDate = format(new Date(date), "yyyy-MM-dd");
  const data = calendar.find((v) => v?.date === dayDate);

  return (
    <Link
      to={"/ws/day/" + `${generateDash(name)}-${_id}` + `?d=${dayDate}`}
      prefetch="intent"
    >
      <div
        className={cn(
          "relative flex h-24 justify-center border border-transparent pt-2 md:h-32",
        )}
      >
        <p
          className={cn(
            "left-3 top-4 flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium md:absolute md:h-7 md:w-7 md:text-[11px] md:font-bold",
            isToday && "bg-foreground text-white",
          )}
        >
          {children}
        </p>
        <div className="absolute top-10 flex w-full flex-col gap-0.5 p-1">
          <div className="hidden overflow-hidden rounded-sm bg-primary/30 md:block">
            {data?.amount && (
              <div className="h-10 rounded-sm border border-foreground px-1.5 py-1">
                <p
                  className={cn(
                    "w-fit whitespace-nowrap text-[10px] font-bold text-foreground",
                    data?.amount < 0 && "text-red-500",
                  )}
                >
                  {typeof data?.amount == "number"
                    ? toIDR(+data?.amount).toString()
                    : null}
                </p>
                <p className="w-fit whitespace-nowrap text-[10px] font-medium text-foreground">
                  {data.count} Transaksi
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
