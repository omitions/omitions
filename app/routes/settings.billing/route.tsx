import { MetaFunction } from "@remix-run/node";

import Header from "~/components/header";

import SettingsSidebar from "../settings/sidebar";

export const meta: MetaFunction = () => {
  return [
    { title: "Billing | mybucks.today" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Billing() {
  return (
    <div className="flex">
      <SettingsSidebar />
      <div className="relative h-full w-full md:ml-auto md:w-[calc(100%_-_var(--sidebar-width-xl))]">
        <div className="h-full w-full">
          <div className="fixed left-[var(--sidebar-width-all)] top-0 z-50 hidden w-[calc(100%_-_var(--sidebar-width-all))] md:block">
            <Header />
          </div>
          <div className="mx-auto mt-[var(--header-height)] w-full max-w-[2800px] border-input/50">
            <Page />
          </div>
        </div>
      </div>
    </div>
  );
}

function Page() {
  return (
    <div className="m-5 flex min-h-[calc(97.7vh_-_var(--header-height))] flex-col gap-5 rounded-2xl md:gap-14 md:bg-white md:px-4 md:py-4 md:shadow-sm">
      <div className="flex flex-col gap-0.5">
        <h2 className="text-lg font-bold">Billing</h2>
        <div>content</div>
      </div>
    </div>
  );
}
