import { json, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

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
          <div className="relative h-full w-full">
            <div className="mx-auto mt-[var(--header-height)] max-w-screen-xl border-input md:mt-0">
              <Page />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Page() {
  const { workspaces } = useLoaderData<typeof loader>();

  if (!workspaces.length) return <p>Belum ada data</p>;
  return (
    <div className="my-1 flex flex-col gap-12 py-6 md:pl-3">
      <Wallets />
      <Workspaces />
    </div>
  );
}
