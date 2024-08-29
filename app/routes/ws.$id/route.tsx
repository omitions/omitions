import { defer, json, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";

import { getCalendar, TCalendar } from "~/utils/cashflows.server";
import { regenerateDash } from "~/utils/misc";

import WorkspaceSidebar from "./sidebar";
import Page from "./page";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data?.workspaceName + " - Mybucks" },
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
  let calendar: TCalendar[] = await getCalendar(request, workspaceId, d);

  return defer({
    workspaceName,
    error: "",
    calendar,
  });
}

export default function Index() {
  return (
    <div className="flex">
      <WorkspaceSidebar />
      <div className="relative h-full w-full md:ml-auto md:w-[calc(100%_-_var(--sidebar-width-xl))]">
        <div className="h-full w-full">
          <div className="mx-auto w-full max-w-[2800px] border-input/50">
            <Page />
          </div>
        </div>
      </div>
    </div>
  );
}
