import { Link, useLoaderData, useParams } from "@remix-run/react";
import { format } from "date-fns";

import { DayButtonProps } from "react-day-picker";

import { cn } from "~/lib/utils";

import { generateDash, regenerateDash } from "~/utils/misc";
import { loader } from "./route";
import toIDR from "~/utils/currency";

export default function DayButton({
  className,
  children,
  day,
}: DayButtonProps) {
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
      className={cn(
        className,
        "flex w-full rounded-xl md:h-[110px]",
        isToday && "bg-secondary",
      )}
    >
      <div className="relative flex h-full w-full flex-col gap-1">
        <div className="md:w-[140px]"></div>
        <div className="mx-auto my-2 md:mx-0 md:px-6">
          <p
            className={cn(
              "flex h-7 w-7 items-center justify-center gap-1 rounded-full border-2 border-transparent text-[11px] font-medium md:text-xs md:font-medium",
              isToday && "bg-foreground text-white",
            )}
          >
            {children}
          </p>
        </div>
        <div className="mx-auto my-2 hidden md:mx-0 md:block md:px-6">
          <p className="text-xs">
            {typeof data?.amount == "number" ? toIDR(+data?.amount) : null}
          </p>
          {data?.count && <p className="text-xs">{data?.count} Transaksi</p>}
        </div>
      </div>
    </Link>
  );
}
