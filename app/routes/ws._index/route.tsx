import { json, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getWorkspaces } from "~/utils/workspaces.server";

import Wallets from "./wallets";
import Workspaces from "./workspaces";

import Sidebar from "../ws/sidebar";
import Header from "../ws/header";

export const meta: MetaFunction = () => {
  return [{ title: "Workspaces | mybucks.today" }];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const workspaces = await getWorkspaces(request);
  return json({ workspaces });
};

export default function Index() {
  const { workspaces } = useLoaderData<typeof loader>();

  return (
    <div className="mt-14 h-full md:mt-0">
      <div className="flex">
        <Sidebar workspaceCount={workspaces?.length} />
        <div className="relative h-full w-full md:ml-auto md:w-[calc(100%_-_var(--sidebar-width-xl))]">
          <div className="h-full w-full">
            <div className="z-50 bg-white/70 backdrop-blur-sm w-[calc(100%_-_var(--sidebar-width-all))] fixed left-[var(--sidebar-width-all)] top-0">
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

function Page() {
  return (
    <div className="flex flex-col gap-14 py-6 md:px-6">
      <Wallets />
      <Workspaces />
    </div>
  );
}
