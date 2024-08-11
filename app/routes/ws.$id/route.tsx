import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  MetaFunction,
  redirect
} from "@remix-run/node";
import { useLoaderData, useNavigate, useParams } from "@remix-run/react";

import { ArrowLeft, ChevronLeft } from "lucide-react";

import BigCalendar from "~/components/big-calendar";
import { Button, ButtonLink } from "~/components/ui/button";

import { generateDash, regenerateDash } from "~/utils/misc";
import { createTransaction, getTransactions, TTransactions } from "~/utils/workspaces.server";

import Sidebar from "../ws/sidebar";
import { format } from "date-fns";

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
            <div className="max-w-screen-2xl mx-auto">
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

  const workspaceId = params.id ? regenerateDash(params.id).getTheLast() : null;
  const title = params.id ? regenerateDash(params.id).withoutTheLast() : "-";

  const BackButton = () => (
    <ButtonLink
      variant="ghost"
      size="icon"
      href="/ws"
      prefetch="intent"
    >
      <ArrowLeft
        size={20}
        strokeWidth={2}
      />
    </ButtonLink>
  )

  return (
    <div className="flex flex-col gap-2">
      <div className="hidden md:flex items-center gap-4 py-3">
        <BackButton />
        <div>
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
      </div>
      <BigCalendar
        isValid={!!title && !!workspaceId}
        workspaceId={workspaceId ?? ""}
        transactions={transactions as TTransactions[]}
      />
    </div>
  )
}