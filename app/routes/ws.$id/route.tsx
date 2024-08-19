import { defer, json, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";

import { getCalendar } from "~/utils/cashflows.server";
import { regenerateDash } from "~/utils/misc";

import Sidebar from "../ws/sidebar";

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
