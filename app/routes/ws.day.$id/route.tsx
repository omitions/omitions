import { defer, json, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";

import { regenerateDash } from "~/utils/misc";
import { getTransactions } from "~/utils/transactions.server";

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

export default function WorkspaceDay() {
  return (
    <div className="fixed left-0 top-0 h-full w-screen md:relative md:left-auto md:top-auto md:w-full">
      <div className="flex">
        <Sidebar workspaceCount={0} withoutMobile />
        <div className="relative h-full w-full md:ml-auto md:w-[calc(100%_-_var(--sidebar-width-xl))]">
          <div className="relative h-full w-full">
            <div className="mx-auto border-input md:mt-0">
              <Page />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
