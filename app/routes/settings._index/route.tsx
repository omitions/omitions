import { MetaFunction } from "@remix-run/node";

import Sidebar from "../settings/sidebar";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="h-full">
      <div className="flex">
        <div className="border-border fixed left-[var(--sidebar-width)] z-50 hidden h-ful w-full max-w-[var(--sidebar-width-xl)] border-r md:block">
          <Sidebar />
        </div>
        <div className="relative h-full w-full md:ml-auto md:w-[calc(100%_-_var(--sidebar-width-xl))]">
          <div className="relative h-full w-full min-h-screen">
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
  return (
    <div>
      index
    </div>
  )
}