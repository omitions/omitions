import { MetaFunction } from "@remix-run/node";

import Sidebar from "../ws/sidebar";
import { Link } from "@remix-run/react";

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
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <CardComp />
    </div>
  )
}

function CardComp() {
  return (
    <Link to="/ws/:id" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 rounded-xl">
      <div className="border w-full rounded-xl p-4 flex flex-col gap-1.5 cursor-pointer bg-background">
        <h4 className="text-lg font-semibold">Keuangan Bulanan</h4>
        <p className="text-sm font-medium text-muted-foreground">Unlock premium features and help us build the future of the Read.cv.</p>
      </div>
    </Link>
  )
}