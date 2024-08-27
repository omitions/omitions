import { Link, useLoaderData, useParams } from "@remix-run/react";
import { format } from "date-fns";

import { DayButtonProps } from "react-day-picker";

import { cn } from "~/lib/utils";

import { generateDash, regenerateDash } from "~/utils/misc";
import { loader } from "./route";
import toIDR from "~/utils/currency";
import { ArrowRightLeft, ArrowUpRight, FilePen, Import } from "lucide-react";

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
    >
      <div className="relative h-20 border border-transparent md:h-28">
        <p
          className={cn(
            "left-3 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[11px] font-bold md:absolute",
            isToday && "bg-foreground text-white",
          )}
        >
          {children}
        </p>
        <div className="absolute bottom-0 flex w-full flex-col gap-0.5 p-1">
          <div className="rounded-md bg-primary/10">
            {data?.amount && (
              <div className="h-11 rounded-md border border-primary/30 px-2 py-1.5">
                <div className="flex items-center gap-1">
                  <Import size={13} strokeWidth={2.5} />
                  <p className="w-fit text-[10px] font-bold">
                    {typeof data?.amount == "number"
                      ? toIDR(+data?.amount)
                      : null}
                  </p>
                </div>
                <p className="mt-0.5 w-fit text-[10px] font-medium">
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
