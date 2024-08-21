import { MetaFunction } from "@remix-run/node";

import Header from "~/components/header";

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
          <div className="h-full w-full">
            <div className="fixed left-[var(--sidebar-width-all)] top-0 z-50 hidden w-[calc(100%_-_var(--sidebar-width-all))] md:block">
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
      <div className="flex flex-col gap-0.5">
        <h2 className="text-lg font-bold">Edit Profil</h2>
        <div>content</div>
      </div>
    </div>
  );
}
