import { MetaFunction } from "@remix-run/node";

import SettingsSidebar from "../settings/sidebar";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="h-full mt-14 md:mt-0">
      <div className="flex">
        <SettingsSidebar />
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
  return (
    <div>
      index
    </div>
  )
}