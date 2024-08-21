import { json, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import Header from "~/components/header";

import { getWorkspaces } from "~/utils/workspaces.server";

import Wallets from "./wallets";
import Workspaces from "./workspaces";

import Sidebar from "../ws/sidebar";

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
            <div className="fixed left-[var(--sidebar-width-all)] top-0 z-50 hidden w-[calc(100%_-_var(--sidebar-width-all))] bg-background/80 backdrop-blur-sm md:block">
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
    <div className="m-5 flex min-h-[calc(97.5vh_-_var(--header-height))] flex-col gap-14 rounded-2xl bg-white py-6 shadow-sm md:px-6">
      <Wallets />
      <Workspaces />
    </div>
  );
}
