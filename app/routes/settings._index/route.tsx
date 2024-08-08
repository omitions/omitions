import { MetaFunction } from "@remix-run/node";

import SettingsSidebar from "../settings/sidebar";

export const meta: MetaFunction = () => {
  return [
    { title: "Edit profil | mybucks.today" },
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
            <div className="mx-auto mt-[var(--header-height)] max-w-screen-2xl md:mt-0 min-h-screen border-input">
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
    <div className="pl-3 py-6 my-1">
      <div className="flex flex-col gap-8 max-w-screen-md">
        <h2 className="text-xl font-bold">Edit Profil</h2>
        <div>
          content
        </div>
      </div>
    </div>
  )
}