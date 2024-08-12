import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  MetaFunction,
  redirect
} from "@remix-run/node";
import { Link, useLoaderData, useNavigate, useParams, useSearchParams } from "@remix-run/react";

import {
  addMonths,
  subMonths,
  format
} from "date-fns";
import { id as localeId } from "date-fns/locale";
import { ArrowLeft, ChevronLeft } from "lucide-react";

import { Button } from "~/components/ui/button";

import { generateDash, regenerateDash } from "~/utils/misc";
import { createTransaction, getTransactions, TTransactions } from "~/utils/workspaces.server";

import React from "react";
import Sidebar from "../ws/sidebar";
import BigCalendar from "./big-calendar";

export enum ActionType {
  CREATE_TRANSACTION = 'CREATE_TRANSACTION',
}

export async function loader({ params, request }: LoaderFunctionArgs) {
  const { searchParams } = new URL(request.url);

  const d = searchParams.get("d");
  const date = searchParams.get("date");
  const workspaceId = params.id ? regenerateDash(params.id).getTheLast() : null;

  if (!workspaceId || !d || !date) return json({
    workspaceName: "-",
    error: "Error loader",
    transactions: []
  })

  let transactions = null;
  if (+date) {
    transactions = await getTransactions(request, workspaceId, d, date)
  }

  return json({
    workspaceName: params.id ? regenerateDash(params.id).withoutTheLast() : "-",
    transactions
  });
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const formPayload = Object.fromEntries(formData);

  const _action = formPayload['_action'] as keyof typeof ActionType;
  const workspace_name = formData.get("workspace_name");
  const workspaces_id = formData.get("workspaces_id");
  const date_time = formData.get("date_time");

  switch (_action) {
    case ActionType.CREATE_TRANSACTION:
      await createTransaction(formData, request);

      if (!date_time || typeof date_time != "string" || !workspace_name) return {}
      return redirect("/ws/" + `${generateDash(workspace_name.toString())}-${workspaces_id}` + `?d=${new Date(date_time.toString()).getFullYear()}-${format(new Date(date_time.toString()).setDate(new Date().getDate() - 1), "MM")}&date=${format(new Date(date_time.toString()), "dd")}`)
    default:
      return {}
  }
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data?.workspaceName + " | mybucks.today" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="h-full fixed left-0 top-0 md:top-auto md:left-auto md:relative w-screen md:w-full overflow-hidden">
      <div className="flex">
        <Sidebar
          workspaceCount={0}
          withoutMobile
        />
        <div className="relative h-full w-full md:ml-auto md:w-[calc(100%_-_var(--sidebar-width-xl))]">
          <div className="relative h-full w-full">
            <div className="mx-auto mt-[var(--header-height)] max-w-screen-2xl md:mt-0 border-input">
              <Page />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Page() {
  const navigate = useNavigate();

  const BackButton = () => (
    <Button
      variant="ghost"
      size="icon"
      className=""
      onClick={() => navigate(-1)}
    >
      <ChevronLeft
        size={24}
        strokeWidth={2}
      />
    </Button>
  )

  return (
    <div className="flex min-h-screen gap-4">
      <div className="flex-1">
        <div className='flex md:hidden h-14 w-full justify-start px-4 md:px-0 items-center bg-white z-50'>
          <BackButton />
        </div>
        <Content />
      </div>
    </div>
  )
}

function Content() {
  const { transactions } = useLoaderData<typeof loader>();

  const params = useParams();
  const [searchParams] = useSearchParams();

  const workspaceId = params.id ? regenerateDash(params.id).getTheLast() : null;
  const title = params.id ? regenerateDash(params.id).withoutTheLast() : "-";

  const date = searchParams.get("d");
  const [month, setMonth] = React.useState(date ? new Date(date) : new Date());

  const BackButton = () => (
    <Link to="/ws" prefetch="intent" className="w-fit">
      <p className="text-sm flex items-center gap-2 text-muted-foreground font-normal">
        <ArrowLeft
          size={18}
          strokeWidth={1.5}
        />
        <span>Kembali</span>
      </p>
    </Link>
  );

  return (
    <div className="md:pl-3 py-6 my-1">
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <div className="hidden md:flex flex-col gap-0.5">
            <BackButton />
            <h2 className="text-xl font-bold">
              {title.length > 35
                ? `${title.substring(0, 35)}..`
                : title}
            </h2>
            <h4 className="text-base font-semibold">{format(month, "MMMM yyyy", { locale: localeId })}</h4>
          </div>
          <MonthNavigation
            month={month}
            setMonth={setMonth}
          />
        </div>
        <BigCalendar
          month={month}
          setMonth={setMonth}
          isValid={!!title && !!workspaceId}
          workspaceId={workspaceId ?? ""}
          transactions={transactions as TTransactions[]}
        />
      </div>
    </div>
  )
}

function MonthNavigation({
  month,
  setMonth
}: {
  month: Date,
  setMonth: React.Dispatch<React.SetStateAction<Date>>
}) {
  const [, setSearchParams] = useSearchParams();

  const today = new Date();
  const nextMonth = addMonths(month, 1);
  const prevMonth = subMonths(month, 1);

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={() => {
          setMonth(prevMonth)
          setSearchParams((prev) => {
            prev.set("d", `${new Date(prevMonth).getFullYear()}-${format(new Date(prevMonth).setDate(new Date().getDate() - 1), "MM")}`);
            return prev;
          }, { preventScrollReset: true });
        }}
      >
        <span>Sebelumnya</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setMonth(today)}
      >
        Hari ini
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={() => {
          setMonth(nextMonth)
          setSearchParams((prev) => {
            prev.set("d", `${new Date(nextMonth).getFullYear()}-${format(new Date(nextMonth).setDate(new Date().getDate() - 1), "MM")}`);
            return prev;
          }, { preventScrollReset: true });
        }}
      >
        <span>Selanjutnya</span>
      </Button>
    </div>
  )
}