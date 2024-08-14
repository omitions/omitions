import { useNavigate, useParams } from "@remix-run/react";
import { MetaFunction } from "@remix-run/node";

import { ArrowLeft, ChevronLeft } from "lucide-react";

import { Button } from "~/components/ui/button";

import { regenerateDash } from "~/utils/misc";

import Sidebar from "../ws/sidebar";

export const meta: MetaFunction = () => {
  return [
    { title: " | mybucks.today" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function WorkspaceDay() {
  return (
    <div className="fixed left-0 top-0 h-full w-screen md:relative md:left-auto md:top-auto md:w-full">
      <div className="flex">
        <Sidebar workspaceCount={0} withoutMobile />
        <div className="relative h-full w-full md:ml-auto md:w-[calc(100%_-_var(--sidebar-width-xl))]">
          <div className="relative h-full w-full">
            <div className="mx-auto border-input md:mt-0">
              <Page />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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
      <ChevronLeft size={24} strokeWidth={2} />
    </Button>
  );

  return (
    <div className="flex min-h-screen gap-4">
      <div className="flex-1">
        <div className="z-50 flex h-14 w-full items-center justify-start bg-white px-4 md:hidden md:px-0">
          <BackButton />
        </div>
        <Content />
      </div>
    </div>
  );
}

function Content() {
  const navigation = useNavigate();
  const params = useParams();
  const title = params.id ? regenerateDash(params.id).withoutTheLast() : "-";

  const BackButton = () => (
    <button onClick={() => navigation(-1)}>
      <p className="flex items-center gap-2 text-sm font-normal text-muted-foreground">
        <ArrowLeft size={18} strokeWidth={1} />
        <span>Kembali</span>
      </p>
    </button>
  );

  return (
    <div className="my-1 py-6 md:pl-3">
      <div className="flex flex-col gap-8">
        <div className="flex items-start justify-between">
          <div className="hidden flex-col gap-0.5 md:flex">
            <BackButton />
            <h2 className="text-2xl font-bold">
              {title.length > 35 ? `${title.substring(0, 35)}..` : title}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
