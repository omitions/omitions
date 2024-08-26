import { defer, json, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";

import Header from "~/components/header";

import { getCalendar } from "~/utils/cashflows.server";
import { regenerateDash } from "~/utils/misc";

import WorkspaceSidebar from "../ws/sidebar";

import Page from "./page";

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

export default function Index() {
  return (
    <div className="flex">
      <WorkspaceSidebar workspaceCount={0} />
      <div className="relative h-full w-full md:ml-auto md:w-[calc(100%_-_var(--sidebar-width-xl))]">
        <div className="h-full w-full">
          <div className="fixed left-[var(--sidebar-width-all)] top-0 z-50 hidden w-[calc(100%_-_var(--sidebar-width-all))] md:block">
            <Header />
          </div>
          <div className="mx-auto mt-[var(--header-height)] w-full max-w-[2800px] border-input">
            <Page />
          </div>
        </div>
      </div>
    </div>
  );
}
