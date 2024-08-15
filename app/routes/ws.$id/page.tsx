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
    <div className="flex min-h-screen gap-4">
      <div className="flex-1">
        <div className="z-50 flex h-14 w-full items-center justify-start bg-white px-4 md:hidden md:px-0">
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
    <div className="my-1 py-6 md:pl-3">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div className="hidden flex-col gap-0.5 md:flex">
            <BackButton />
            <h2 className="text-xl font-bold">
              {title.length > 35 ? `${title.substring(0, 35)}..` : title}
            </h2>
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
      <h3 className="text-base font-medium">
        {format(month, "MMMM yyyy", { locale: localeId })}
      </h3>
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          onClick={() => {
            setMonth(today);
            setSearchParams(
              (prev) => {
                prev.set(
                  "d",
                  `${new Date(today).getFullYear()}-${format(new Date(today).setDate(new Date().getDate() - 1), "MM")}`,
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
          className="gap-2"
          onClick={() => {
            setMonth(prevMonth);
            setSearchParams(
              (prev) => {
                prev.set(
                  "d",
                  `${new Date(prevMonth).getFullYear()}-${format(new Date(prevMonth).setDate(new Date().getDate() - 1), "MM")}`,
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
          className="gap-2"
          onClick={() => {
            setMonth(nextMonth);
            setSearchParams(
              (prev) => {
                prev.set(
                  "d",
                  `${new Date(nextMonth).getFullYear()}-${format(new Date(nextMonth).setDate(new Date().getDate() - 1), "MM")}`,
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
