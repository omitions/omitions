import { json, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";

import Header from "~/components/header";

import { getWorkspaces } from "~/utils/workspaces.server";

import CreateWallet from "~/components/create-wallet";
import CreateWorkspace from "~/components/create-workspace";

import { ActionType } from "../ws/route";
import WorkspaceSidebar from "../ws/sidebar";
import Wallets from "./wallets";
import Workspaces from "./workspaces";

export const meta: MetaFunction = () => {
  return [{ title: "Workspaces | mybucks.today" }];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const workspaces = await getWorkspaces(request);
  return json({ workspaces });
};

export default function Index() {
  const [searchParams] = useSearchParams();

  const openWorkspace = searchParams.get("open-create-workspace");
  const openWallet = searchParams.get("open-create-wallet");

  return (
    <div className="flex">
      <WorkspaceSidebar />
      <div className="relative h-full w-full md:ml-auto md:w-[calc(100%_-_var(--sidebar-width-xl))]">
        <div className="h-full w-full">
          <div className="fixed left-[var(--sidebar-width-all)] top-0 z-50 hidden w-[calc(100%_-_var(--sidebar-width-all))] md:block">
            <Header />
          </div>
          <div className="mx-auto mt-[var(--header-height)] w-full max-w-[2800px] border-input/50">
            <Page />
            <CreateWorkspace
              actionType={ActionType.CREATE_WORKSPACES}
              open={openWorkspace === "1"}
            />
            <CreateWallet actionType="HELLOO" open={openWallet === "1"} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Page() {
  return (
    <div className="m-5 flex min-h-[calc(97.7vh_-_var(--header-height))] flex-col gap-10 rounded-2xl md:gap-14 md:bg-white md:px-4 md:py-4 md:shadow-sm">
      <Wallets />
      <Workspaces />
    </div>
  );
}
