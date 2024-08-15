import {
  ActionFunctionArgs,
  defer,
  json,
  LoaderFunctionArgs,
  MetaFunction,
  redirect,
} from "@remix-run/node";

import { format } from "date-fns";

import { getCalendar } from "~/utils/cashflows.server";
import { generateDash, regenerateDash } from "~/utils/misc";
import { createTransaction } from "~/utils/transactions.server";

import Sidebar from "../ws/sidebar";

import Page from "./page";

export enum ActionType {
  CREATE_TRANSACTION = "CREATE_TRANSACTION",
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data?.workspaceName + " | mybucks.today" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ params, request }: LoaderFunctionArgs) {
  let { searchParams } = new URL(request.url);

  let d = searchParams.get("d");
  let workspaceId = params.id ? regenerateDash(params.id).getTheLast() : null;

  if (!workspaceId || !d)
    return json({
      workspaceName: "-",
      error: "Error loader",
      calendar: [],
    });

  let workspaceName = params.id
    ? regenerateDash(params.id).withoutTheLast()
    : "-";
  let calendar = await getCalendar(request, workspaceId, d);

  return defer({
    workspaceName,
    error: "",
    calendar,
  });
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const formPayload = Object.fromEntries(formData);

  const _action = formPayload["_action"] as keyof typeof ActionType;
  const workspace_name = formData.get("workspace_name");
  const workspaces_id = formData.get("workspaces_id");
  const date_time = formData.get("date_time");

  switch (_action) {
    case ActionType.CREATE_TRANSACTION:
      await createTransaction(formData, request);

      if (!date_time || typeof date_time != "string" || !workspace_name)
        return {};
      return redirect(
        "/ws/" +
          `${generateDash(workspace_name.toString())}-${workspaces_id}` +
          `?d=${new Date(date_time.toString()).getFullYear()}-${format(new Date(date_time.toString()).setDate(new Date().getDate() - 1), "MM")}`,
      );
    default:
      return {};
  }
};

export default function Index() {
  return (
    <div className="fixed left-0 top-0 h-full w-screen md:relative md:left-auto md:top-auto md:w-full">
      <div className="flex">
        <Sidebar workspaceCount={0} withoutMobile />
        <div className="relative h-full w-full md:ml-auto md:w-[calc(100%_-_var(--sidebar-width-xl))]">
          <div className="relative h-full w-full">
            <div className="mx-auto w-full max-w-screen-lg border-input md:mt-0">
              <Page />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
