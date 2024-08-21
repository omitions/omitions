import {
  ActionFunctionArgs,
  defer,
  json,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";

import Header from "~/components/header";

import { regenerateDash } from "~/utils/misc";
import { createTransaction, getTransactions } from "~/utils/cashflows.server";

import Sidebar from "../ws/sidebar";

import Page from "./page";

export const meta: MetaFunction = () => {
  return [
    { title: " | mybucks.today" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ params, request }: LoaderFunctionArgs) {
  let { searchParams } = new URL(request.url);

  let d = searchParams.get("d");
  let workspaceId = params.id ? regenerateDash(params.id).getTheLast() : null;

  if (!workspaceId || !d)
    return json({
      transactions: [],
      error: "Error loader",
    });

  let transactions = await getTransactions(request, workspaceId, d);

  return defer({
    transactions,
  });
}

export enum ActionType {
  CREATE_TRANSACTION = "CREATE_TRANSACTION",
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const formPayload = Object.fromEntries(formData);

  const _action = formPayload["_action"] as keyof typeof ActionType;

  switch (_action) {
    case ActionType.CREATE_TRANSACTION:
      return await createTransaction(formData, request);
    default:
      return {};
  }
};

export default function WorkspaceDay() {
  return (
    <div className="fixed left-0 top-0 h-full w-screen md:relative md:left-auto md:top-auto md:w-full">
      <div className="flex">
        <Sidebar workspaceCount={0} withoutMobile />
        <div className="relative h-full w-full md:ml-auto md:w-[calc(100%_-_var(--sidebar-width-xl))]">
          <div className="h-full w-full">
            <div className="fixed left-[var(--sidebar-width-all)] top-0 z-50 w-[calc(100%_-_var(--sidebar-width-all))] bg-background/80 backdrop-blur-sm">
              <Header />
            </div>
            <div className="mx-auto mt-[var(--header-height)] w-full max-w-screen-xl border-input">
              <Page />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
