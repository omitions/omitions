import { MetaFunction } from "@remix-run/node";

import Sidebar from "../ws/sidebar";

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
          <div className="relative h-full w-full min-h-screen">
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
    <div className="grid grid-cols-4 gap-4">
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  )
}

function Card() {
  return (
    <div className="border w-full rounded-lg p-4 cursor-pointer">
      <h4>Title</h4>
      <p>Descript</p>
    </div>
  )
}