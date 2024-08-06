import { json, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useNavigate, useParams } from "@remix-run/react";

import { ArrowLeft, ChevronLeft } from "lucide-react";

import { Button } from "~/components/ui/button";
import BigCalendar from "~/components/big-calendar";

import { regenerateDash } from "~/utils/misc";

import Sidebar from "../ws/sidebar";

export async function loader({ params }: LoaderFunctionArgs) {
  return json({
    workspaceName: params.id ? regenerateDash(params.id).withoutTheLast() : "-",
  });
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data?.workspaceName + " | mybucks.today" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="h-full fixed left-0 top-0 md:top-auto md:left-auto md:relative w-screen md:w-full overflow-hidden">
      <div className="flex">
        <Sidebar
          workspaceCount={0}
          withoutMobile
        />
        <div className="relative h-full w-full md:ml-auto md:w-[calc(100%_-_var(--sidebar-width-xl))]">
          <div className="relative h-full w-full">
            <div className="max-w-screen-2xl mx-auto">
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

  const BackButton = () => (
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
  )

  return (
    <div className="flex min-h-screen mb-32 gap-4">
      <div className="flex-1">
        <div className='flex md:hidden h-14 w-full justify-start px-4 md:px-0 items-center bg-white z-50'>
          <BackButton />
        </div>
        <Content />
      </div>
    </div>
  )
}

function Content() {
  const navigate = useNavigate();
  const params = useParams();

  // const workspaceId = params.id ? regenerateDash(params.id).getTheLast() : null;
  const title = params.id ? regenerateDash(params.id).withoutTheLast() : "-";

  const BackButton = () => (
    <Button
      variant="ghost"
      size="icon"
      className=""
      onClick={() => navigate(-1)}
    >
      <ArrowLeft
        size={20}
        strokeWidth={2}
      />
    </Button>
  )

  return (
    <div className="flex flex-col gap-2">
      <div className="hidden md:flex items-center gap-4 py-3">
        <BackButton />
        <div>
          <h4 className="text-xl font-semibold">{title}</h4>
        </div>
      </div>
      <BigCalendar />
    </div>
  )
}