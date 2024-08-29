import { Link, useParams, useSearchParams } from "@remix-run/react";

import { addMonths, format, subMonths } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

import { Button } from "~/components/ui/button";

import { regenerateDash } from "~/utils/misc";
import { WorkspaceIcon } from "~/utils/icons";

import BigCalendar from "./big-calendar";

export default function Page() {
  return (
    <div className="flex flex-col gap-5 rounded-2xl md:m-5 md:gap-14 md:bg-white md:shadow-sm">
      <Content />
    </div>
  );
}

function Content() {
  const params = useParams();
  const [searchParams] = useSearchParams();

  const workspaceId = params.id ? regenerateDash(params.id).getTheLast() : null;
  const title = params.id ? regenerateDash(params.id).withoutTheLast() : "-";

  const date = searchParams.get("d");
  const [month, setMonth] = React.useState(date ? new Date(date) : new Date());

  const BackButton = () => (
    <Link to="/ws" prefetch="intent" className="w-fit">
      <p className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <ArrowLeft size={18} strokeWidth={2} />
        <span>Kembali</span>
      </p>
    </Link>
  );

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between md:px-6 md:py-6">
        <div className="hidden flex-col gap-2 md:flex">
          <BackButton />
          <div className="flex gap-2.5">
            <WorkspaceIcon />
            <h2 className="text-lg font-bold">
              {title.length > 35 ? `${title.substring(0, 35)}..` : title}
            </h2>
          </div>
        </div>
        <div className="w-full px-4 md:w-fit md:px-0">
          <MonthNavigation month={month} setMonth={setMonth} />
        </div>
      </div>
      <BigCalendar
        month={month}
        setMonth={setMonth}
        isValid={!!title && !!workspaceId}
      />
    </div>
  );
}

function MonthNavigation({
  month,
  setMonth,
}: {
  month: Date;
  setMonth: React.Dispatch<React.SetStateAction<Date>>;
}) {
  const [, setSearchParams] = useSearchParams();

  const today = new Date();
  const nextMonth = addMonths(month, 1);
  const prevMonth = subMonths(month, 1);

  return (
    <div className="mt-20 flex items-center gap-6 md:mt-0">
      <h3 className="w-full text-lg font-bold md:text-base">
        {format(month, "MMMM yyyy", { locale: localeId })}
      </h3>
      <div className="flex w-fit items-center gap-2">
        <Button
          size="sm"
          variant="secondary"
          className=""
          onClick={() => {
            setMonth(today);
            setSearchParams(
              (prev) => {
                prev.set(
                  "d",
                  `${format(new Date(today).setDate(new Date().getDate() - 1), "yyyy-MM")}`,
                );
                return prev;
              },
              { preventScrollReset: true },
            );
          }}
        >
          Hari ini
        </Button>
        <Button
          variant="transparent"
          size="icon"
          onClick={() => {
            setMonth(prevMonth);
            setSearchParams(
              (prev) => {
                prev.set(
                  "d",
                  `${format(new Date(prevMonth).setDate(new Date().getDate() - 1), "yyyy-MM")}`,
                );
                return prev;
              },
              { preventScrollReset: true },
            );
          }}
        >
          <ChevronLeft size={20} strokeWidth={2} />
        </Button>
        <Button
          variant="transparent"
          size="icon"
          onClick={() => {
            setMonth(nextMonth);
            setSearchParams(
              (prev) => {
                prev.set(
                  "d",
                  `${format(new Date(nextMonth).setDate(new Date().getDate() - 1), "yyyy-MM")}`,
                );
                return prev;
              },
              { preventScrollReset: true },
            );
          }}
        >
          <ChevronRight size={20} strokeWidth={2} />
        </Button>
      </div>
    </div>
  );
}
