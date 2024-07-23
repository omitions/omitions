import { json, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getWorkspaces, type TWorkspaces } from "~/utils/workspaces.server";

import Sidebar from "../ws/sidebar";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const list = await getWorkspaces(request)
  return json({ list });
};

export default function Index() {
  return (
    <div className="h-full">
      <div className="flex">
        <Sidebar />
        <div className="relative h-full w-full md:ml-auto md:w-[calc(100%_-_var(--sidebar-width-xl))]">
          <div className="relative h-full w-full">
            <div className="max-w-screen-2xl p-2 mx-auto m-4">
              <Page />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Page() {
  const { list } = useLoaderData<typeof loader>();

  if (!list.length) return <p>{JSON.stringify(list, null, 2)}</p>
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {list.map((item) => (
        <CardComp
          key={item._id}
          {...item}
        />
      ))}
    </div>
  )
}

function CardComp({ name, description }: TWorkspaces) {
  return (
    <Link
      to="/ws/:id"
      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 rounded-xl"
    >
      <div className="border w-full rounded-xl p-6 flex flex-col gap-1 cursor-pointer border-input bg-background">
        <h4 className="text-base font-semibold">{name}</h4>
        <p className="text-sm font-medium text-muted-foreground">{description}</p>
      </div>
    </Link>
  )
}