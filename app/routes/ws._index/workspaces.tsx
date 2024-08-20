import { Link, useLoaderData } from "@remix-run/react";

import { format } from "date-fns";
import React from "react";
import {
  ArrowUpRight,
  CirclePlus,
  Ellipsis,
  Pencil,
  PencilLine,
  PenLine,
  Trash,
  Trash2,
} from "lucide-react";

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
import { type TWorkspaces } from "~/utils/workspaces.server";

import { ActionType } from "../ws/route";
import { loader } from "./route";
import CreateWorkspace from "~/components/create-workspace";

export default function Workspaces() {
  const { workspaces } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col gap-5">
      <div className="block md:hidden">
        <h4 className="text-[11px] text-muted-foreground">
          SEMUA WORKSPACE ANDA
        </h4>
      </div>
      <div className="hidden flex-col gap-0.5 md:flex">
        <h2 className="text-xl font-bold">Spaces</h2>
        <p className="text-sm font-normal text-muted-foreground">
          Semua catatan keuangan Anda ada disini
        </p>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:grid-cols-4">
        {workspaces.map((item) => (
          <WorkspaceItem key={item._id} {...item} />
        ))}
        <ButtonCreateWorkspace />
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
        className="absolute z-40 hidden w-full data-[state=closed]:-bottom-[80px] data-[state=open]:bottom-0 data-[state=open]:duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 md:block"
      >
        <div className="relative mb-4 flex gap-4 px-4">
          <UpdateWorkspace
            actionType={ActionType.UPDATE_WORKSPACES}
            workspaceName={name}
            workspaceDescription={description}
            workspaceId={_id}
          >
            <Button
              className="w-full gap-2 rounded-full bg-white px-0"
              variant="outline"
              onMouseEnter={() => setIsHover(true)}
            >
              <PencilLine size={16} strokeWidth={2} />
              <span>Ubah</span>
            </Button>
          </UpdateWorkspace>
          <RemoveWorkspace
            actionType={ActionType.REMOVE_WORKSPACES}
            workspaceName={name}
            workspaceId={_id}
          >
            <Button
              className="w-full gap-2 rounded-full px-0"
              variant="outline"
              onMouseEnter={() => setIsHover(true)}
            >
              <Trash2 size={16} strokeWidth={2} />
              <span>Hapus</span>
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
          `?d=${format(new Date().setDate(new Date().getDate() - 1), "yyyy-MM")}`
        }
        prefetch="intent"
        className="relative rounded-lg"
      >
        <div
          data-state={isHover ? "open" : "closed"}
          className="h-full w-full justify-start rounded-lg border-transparent bg-white px-0 ring-offset-background md:min-h-44 md:border md:border-input md:p-5 md:hover:bg-background/50 md:data-[state=open]:bg-background/50"
        >
          <div className="flex w-10/12 flex-col flex-wrap gap-0.5 md:w-full md:gap-1">
            <h4 className="text-base font-medium md:font-bold">
              {name.length > 30 ? `${name.substring(0, 30)}..` : name}
            </h4>
            <p className="text-wrap text-xs font-normal leading-relaxed text-muted-foreground md:text-sm">
              {description.length > 60
                ? `${description.substring(0, 60)}..`
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

function ButtonCreateWorkspace() {
  return (
    <div className="relative overflow-hidden">
      <CreateWorkspace actionType={ActionType.CREATE_WORKSPACES}>
        <button className="h-full w-full justify-start rounded-lg border border-dashed border-input px-0 ring-offset-background md:min-h-44 md:px-6 md:py-6">
          <div className="flex h-full flex-col flex-wrap items-center justify-center gap-0.5 md:w-full md:gap-3">
            <CirclePlus size={24} strokeWidth={2} />
            <h3 className="text-xs font-medium md:text-sm">Buat workspace</h3>
          </div>
        </button>
      </CreateWorkspace>
    </div>
  );
}
