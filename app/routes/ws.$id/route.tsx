import { MetaFunction } from "@remix-run/node";

import { useParams } from "@remix-run/react";

import Sidebar from "../ws/sidebar";

export const meta: MetaFunction = () => {
  return [
    { title: " | mybucks.today" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="h-full">
      <div className="flex">
        <Sidebar workspaceCount={0} />
        <div className="relative h-full w-full md:ml-auto md:w-[calc(100%_-_var(--sidebar-width-xl))]">
          <div className="relative h-full w-full">
            <div className="mx-auto mt-[var(--header-height)] max-w-screen-2xl md:mt-0 p-2">
              <Page />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Page() {
  const params = useParams();
  return (
    <div className="border flex justify-center">
      <div>
        idd detail {params.id}
      </div>
    </div>
  )
}