import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "@remix-run/react";

import { addMonths, format, subMonths } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

import { Button } from "~/components/ui/button";

import { regenerateDash } from "~/utils/misc";
import { WorkspaceIcon } from "~/utils/icons";

import BigCalendar from "./big-calendar";

export default function Page() {
  const navigate = useNavigate();

  const BackButton = () => (
    <Button
      variant="ghost"
      size="icon"
      className=""
      onClick={() => navigate(-1)}
    >
      <ChevronLeft size={24} strokeWidth={2} />
    </Button>
  );

  return (
    <div className="m-5 flex flex-col gap-5 rounded-2xl md:gap-14 md:bg-white md:shadow-sm">
      <div className="flex-1">
        <div className="z-50 flex h-14 w-full items-center justify-start md:hidden md:bg-white">
          <BackButton />
        </div>
        <Content />
      </div>
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
    <div className="flex flex-col gap-6 md:gap-0">
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
        <div>
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
    <div className="flex items-center gap-6">
      <h3 className="text-base font-bold">
        {format(month, "MMMM yyyy", { locale: localeId })}
      </h3>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
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
          variant="ghost"
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
          variant="ghost"
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
