import { MetaFunction } from "@remix-run/node";

import { useNavigate, useParams } from "@remix-run/react";

import Sidebar from "../ws/sidebar";
import { Button } from "~/components/ui/button";
import { ArrowLeft } from "lucide-react";

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
            <div className="max-w-screen-2xl md:p-2 mx-auto m-4">
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
  const navigate = useNavigate();

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <Button
          variant="ghost"
          size="icon"
          className="-left-1"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} strokeWidth={2} />
        </Button>
        <div>
          idd detail {params.id}
        </div>
        <div></div>
      </div>
    </div>
  )
}