import { json, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { format } from "date-fns";
import { ArrowUpRight, Ellipsis, PenLine, Trash } from "lucide-react";

import RemoveWorkspace from "~/components/remove-workspace";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import UpdateWorkspace from "~/components/update-workspace";

import { generateDash } from "~/utils/misc";
import { getWorkspaces, type TWorkspaces } from "~/utils/workspaces.server";

import { ActionType } from "../ws/route";
import Sidebar from "../ws/sidebar";
import React from "react";
export const meta: MetaFunction = () => {
  return [{ title: "Workspaces | mybucks.today" }];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const workspaces = await getWorkspaces(request);
  return json({ workspaces });
};

export default function Index() {
  const { workspaces } = useLoaderData<typeof loader>();

  return (
    <div className="mt-14 h-full md:mt-0">
      <div className="flex">
        <Sidebar workspaceCount={workspaces?.length} />
        <div className="relative h-full w-full md:ml-auto md:w-[calc(100%_-_var(--sidebar-width-xl))]">
          <div className="relative h-full w-full">
            <div className="mx-auto mt-[var(--header-height)] max-w-screen-xl border-input md:mt-0">
              <Page />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Page() {
  const { workspaces } = useLoaderData<typeof loader>();

  if (!workspaces.length) return <p>Belum ada data</p>;
  return (
    <div className="my-1 py-6 md:pl-3">
      <div className="flex flex-col gap-8">
        <div className="block md:hidden">
          <h4 className="text-[11px] text-muted-foreground">
            SEMUA WORKSPACE ANDA
          </h4>
        </div>
        <div className="hidden flex-col gap-0.5 md:flex">
          <h2 className="text-xl font-bold">Workspaces</h2>
          <p className="text-sm font-normal text-muted-foreground">
            Semua catatan keuangan Anda ada disini
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-4 xl:grid-cols-3">
          {workspaces.map((item) => (
            <WorkspaceItem key={item._id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}

function WorkspaceItem({ _id, name, description }: TWorkspaces) {
  const [isHover, setIsHover] = React.useState(false);

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div
        data-state={isHover ? "open" : "closed"}
        className="absolute z-50 hidden w-full data-[state=closed]:-bottom-[80px] data-[state=open]:bottom-0 data-[state=open]:duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 md:block"
      >
        <div className="relative mb-4 flex gap-4 px-4">
          <UpdateWorkspace
            actionType={ActionType.UPDATE_WORKSPACES}
            workspaceName={name}
            workspaceDescription={description}
            workspaceId={_id}
          >
            <Button
              className="w-full rounded-full bg-white"
              variant="outline"
              onMouseEnter={() => setIsHover(true)}
            >
              Ubah
            </Button>
          </UpdateWorkspace>
          <RemoveWorkspace
            actionType={ActionType.REMOVE_WORKSPACES}
            workspaceName={name}
            workspaceId={_id}
          >
            <Button
              className="w-full rounded-full"
              variant="outline"
              onMouseEnter={() => setIsHover(true)}
            >
              Hapus
            </Button>
          </RemoveWorkspace>
        </div>
      </div>
      <div className="absolute right-0 top-1 block rotate-90 md:hidden">
        <MoreMenu _id={_id} name={name} description={description} />
      </div>
      <Link
        to={
          "/ws/" +
          `${generateDash(name)}-${_id}` +
          `?d=${new Date().getFullYear()}-${format(new Date().setDate(new Date().getDate() - 1), "MM")}`
        }
        prefetch="intent"
        className="rounded-2xl"
      >
        <div
          data-state={isHover ? "open" : "closed"}
          className="h-full w-full justify-start rounded-2xl border-transparent px-0 ring-offset-background md:min-h-56 md:border md:border-input md:px-6 md:py-6 md:hover:bg-background/50 md:data-[state=open]:bg-background/50"
        >
          <div className="flex w-10/12 flex-col flex-wrap gap-0.5 md:w-full md:gap-1">
            <h4 className="text-lg font-medium md:font-semibold">
              {name.length > 30 ? `${name.substring(0, 30)}..` : name}
            </h4>
            <p className="text-wrap text-xs font-normal leading-relaxed text-muted-foreground md:text-sm">
              {description.length > 130
                ? `${description.substring(0, 130)}..`
                : description}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

function MoreMenu({
  _id,
  name,
  description,
}: Pick<TWorkspaces, "_id" | "name" | "description">) {
  return (
    <DropdownMenu modal>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <Ellipsis size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={0} align="start" className="w-40">
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
              className="w-full justify-start gap-3 rounded-sm px-2 text-xs font-medium md:text-sm"
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
              className="h-8 w-full justify-start gap-3 rounded-sm px-2 text-xs font-medium text-red-500 hover:bg-red-100 hover:ring-2 hover:ring-red-500 focus-visible:bg-red-100 focus-visible:ring-red-500 md:text-sm"
            >
              <Trash size={16} strokeWidth={2} />
              Hapus
            </Button>
          </RemoveWorkspace>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
