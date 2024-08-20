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
    <div className="mt-14 h-full md:mt-0">
      <div className="flex">
        <SettingsSidebar />
        <div className="relative h-full w-full md:ml-auto md:w-[calc(100%_-_var(--sidebar-width-xl))]">
          <div className="relative h-full w-full">
            <div className="mx-auto mt-[var(--header-height)] min-h-screen w-full max-w-screen-xl border-input md:mt-0">
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
    <div className="py-6 md:px-5">
      <div className="flex max-w-screen-md flex-col gap-8">
        <h2 className="text-xl font-bold">Edit Profil</h2>
        <div>content</div>
      </div>
    </div>
  );
}
