import { FetcherWithComponents, Link, useParams } from "@remix-run/react";
import { format } from "date-fns";

import { DayButtonProps } from "react-day-picker";

import { cn } from "~/lib/utils";

import { generateDash, regenerateDash } from "~/utils/misc";

export default function DayButton({
  className,
  children,
  day,
}: DayButtonProps & {
  fetcherProps: FetcherWithComponents<unknown>;
}) {
  const date = day.date;
  const isToday = day.dateLib.isSameDay(new Date(date), new Date());

  const params = useParams();
  const _id = params.id ? regenerateDash(params.id).getTheLast() : "";
  const name = params.id ? regenerateDash(params.id).withoutTheLast() : "-";

  return (
    <Link
      to={
        "/ws/day/" +
        `${generateDash(name)}-${_id}` +
        `?d=${format(new Date(date), "yyyy-MM-dd")}`
      }
      prefetch="intent"
      className={cn(
        className,
        "flex h-fit w-full items-start justify-start",
        isToday && "bg-background",
      )}
    >
      <div className="relative flex h-full w-full flex-col gap-1.5">
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
        <div className="absolute top-10 h-full w-full">
          {/* content here */}
        </div>
      </div>
    </Link>
  );
}
