import { json, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { ArrowUpRight, Ellipsis, PenLine, Trash } from "lucide-react";

import RemoveWorkspace from "~/components/remove-workspace";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "~/components/ui/dropdown-menu";
import UpdateWorkspace from "~/components/update-workspace";

import { generateDash } from "~/utils/misc";
import { getWorkspaces, type TWorkspaces } from "~/utils/workspaces.server";

import { ActionType } from "../ws/route";
import Sidebar from "../ws/sidebar";

export const meta: MetaFunction = () => {
  return [
    { title: "Workspaces | mybucks.today" }
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const workspaces = await getWorkspaces(request)
  return json({ workspaces });
};

export default function Index() {
  const { workspaces } = useLoaderData<typeof loader>();

  return (
    <div className="h-full mt-14 md:mt-0">
      <div className="flex">
        <Sidebar workspaceCount={workspaces?.length} />
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
  const { workspaces } = useLoaderData<typeof loader>();

  if (!workspaces.length) return <p>Belum ada data</p>
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-5 md:gap-6">
      <div className="block md:hidden">
        <h4 className="text-[11px] text-muted-foreground">SEMUA WORKSPACE ANDA</h4>
      </div>
      {workspaces.map((item) => (
        <CardComp
          key={item._id}
          {...item}
        />
      ))}
    </div>
  )
}

function CardComp({
  _id,
  name,
  description
}: TWorkspaces) {
  return (
    <div className="relative">
      <div className="hidden md:block bottom-3 left-6 peer absolute">
        <MoreMenu
          _id={_id}
          name={name}
          description={description}
        />
      </div>
      <div className="block md:hidden top-1 right-0 absolute rotate-90">
        <MoreMenu
          _id={_id}
          name={name}
          description={description}
        />
      </div>
      <Link
        to={"/ws/" + `${generateDash(name)}-${_id}`}
        prefetch="intent"
        className="rounded-2xl"
      >
        <div
          className="
            w-full h-full md:min-h-40 justify-start rounded-2xl
            px-0 md:px-6 md:py-6
            ring-offset-background
            md:focus-visible:outline-none md:focus-visible:ring-2 md:focus-visible:ring-ring md:focus-visible:ring-offset-0
            md:hover:border-primary md:hover:ring-2 md:hover:ring-primary/30
            border-transparent md:border md:border-input
            md:peer-hover:border-primary md:peer-hover:ring-2 md:peer-hover:ring-primary/30
          "
        >
          <div className="w-10/12 md:w-full flex flex-col flex-wrap gap-0.5 md:gap-1">
            <h4 className="text-sm font-medium md:font-semibold">
              {name.length > 30
                ? `${name.substring(0, 30)}..`
                : name}
            </h4>
            <p className="text-xs md:text-sm font-normaltext-muted-foreground leading-relaxed text-wrap">
              {description.length > 90
                ? `${description.substring(0, 90)}..`
                : description}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}

function MoreMenu({ _id, name, description }: Pick<TWorkspaces, "_id" | "name" | "description">) {
  return (
    <DropdownMenu modal>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
        >
          <Ellipsis size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={0}
        align="start"
        className="w-40"
      >
        <DropdownMenuItem asChild>
          <UpdateWorkspace
            actionType={ActionType.UPDATE_WORKSPACES}
            workspaceName={name}
            workspaceDescription={description}
            workspaceId={_id}
          >
            <Button
              size="sm"
              variant="ghost"
              className="w-full justify-start text-xs md:text-sm px-2 gap-3 font-medium rounded-sm"
            >
              <PenLine size={16} strokeWidth={2} />
              Ubah
            </Button>
          </UpdateWorkspace>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to={"/ws/" + _id} className="flex gap-3">
            <ArrowUpRight size={16} strokeWidth={2} />
            Buka
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <RemoveWorkspace
            actionType={ActionType.REMOVE_WORKSPACES}
            workspaceName={name}
            workspaceId={_id}
          >
            <Button
              size="sm"
              variant="ghost"
              className="
                w-full h-8 justify-start text-xs md:text-sm px-2 gap-3 font-medium rounded-sm text-red-500
                hover:bg-red-100 hover:ring-2 hover:ring-red-500 
                focus-visible:ring-red-500 focus-visible:bg-red-100
              "
            >
              <Trash size={16} strokeWidth={2} />
              Hapus
            </Button>
          </RemoveWorkspace>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}