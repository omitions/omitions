import { MetaFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";

import { ChevronLeft } from "lucide-react";

import { Button } from "~/components/ui/button";
import BigCalendar from "~/components/big-calendar";

import Sidebar from "../ws/sidebar";

export const meta: MetaFunction = () => {
  return [
    { title: " | mybucks.today" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="h-full fixed left-0 top-0 md:top-auto md:left-auto md:relative w-screen md:w-full">
      <div className="flex">
        <Sidebar
          workspaceCount={0}
          withoutMobile
        />
        <div className="relative h-full w-full md:ml-auto md:w-[calc(100%_-_var(--sidebar-width-xl))]">
          <div className="relative h-full w-full">
            <div className="max-w-screen-2xl md:p-2 mx-auto">
              <Page />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Page() {
  const navigate = useNavigate();

  return (
    <div>
      <div className='flex h-14 w-full justify-start px-4 md:px-0 items-center bg-white z-50'>
        <Button
          variant="ghost"
          size="icon"
          className=""
          onClick={() => navigate(-1)}
        >
          <ChevronLeft
            size={24}
            strokeWidth={2}
          />
        </Button>
      </div>
      <div className="border border-red-500">
        <Content />
      </div>
    </div>
  )
}

function Content() {
  // const params = useParams();
  // params.id
  return (
    <div>
      <BigCalendar />
    </div>
  )
}