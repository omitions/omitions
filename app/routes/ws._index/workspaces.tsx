import { Link, useLoaderData } from "@remix-run/react";

import { format } from "date-fns";
import {
  ArrowUpRight,
  CirclePlus,
  Ellipsis,
  PencilLine,
  PenLine,
  Trash,
  Trash2,
} from "lucide-react";
import React from "react";

import CreateWorkspace from "~/components/create-workspace";
import RemoveWorkspace from "~/components/remove-workspace";
import { Button, ButtonLink } from "~/components/ui/button";
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

import { cn } from "~/lib/utils";

import { ActionType } from "../ws/route";
import { loader } from "./route";

export default function Workspaces() {
  const { workspaces } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col gap-6">
      <div className="block md:hidden">
        <h4 className="text-[11px] text-muted-foreground">
          SEMUA WORKSPACE ANDA
        </h4>
      </div>
      <div className="hidden flex-col gap-0.5 md:flex">
        <h2 className="text-lg font-bold">Spaces</h2>
        <p className="text-sm font-normal text-muted-foreground">
          Semua catatan keuangan Anda ada disini
        </p>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {workspaces.map((item) => (
          <WorkspaceItem key={item._id} {...item} />
        ))}
        <ButtonCreateWorkspace />
      </div>
    </div>
  );
}

function WorkspaceItem({ _id, name, description }: TWorkspaces) {
  const [isActive, setIsActive] = React.useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <ButtonLink
        variant="transparent"
        to={
          "/ws/" +
          `${generateDash(name)}-${_id}` +
          `?d=${format(new Date().setDate(new Date().getDate() - 1), "yyyy-MM")}`
        }
        onFocus={() => setIsActive(true)}
        prefetch="intent"
        className="h-full w-full justify-start rounded-lg border-transparent bg-white px-0 shadow-sm ring-offset-background hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-70 md:min-h-48 md:border md:border-input/30 md:p-5 md:hover:border-input"
      >
        <div className="flex h-full w-10/12 flex-col flex-wrap items-start justify-between md:w-full md:gap-1">
          <div className="flex flex-col items-start gap-0.5">
            <h4 className="text-base font-medium md:font-semibold">
              {name.length > 30 ? `${name.substring(0, 30)}..` : name}
            </h4>
            <p className="text-wrap text-xs font-normal leading-relaxed text-muted-foreground md:text-sm">
              {description.length > 60
                ? `${description.substring(0, 60)}..`
                : description}
            </p>
          </div>
        </div>
      </ButtonLink>
      <div className="absolute right-0 top-1 block rotate-90 md:hidden">
        <MoreMenu _id={_id} name={name} description={description} />
      </div>
      <div
        className={cn(
          "absolute bottom-0 hidden w-full",
          isActive && "md:block",
        )}
      >
        <div className="relative mb-4 flex gap-2 px-4">
          <UpdateWorkspace
            actionType={ActionType.UPDATE_WORKSPACES}
            workspaceName={name}
            workspaceDescription={description}
            workspaceId={_id}
          >
            <Button
              className="w-full gap-2 rounded-full bg-white px-0"
              variant="outline"
              onFocus={() => setIsActive(true)}
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
            <div>
              <Button
                className="!h-11 !w-11 rounded-full px-0"
                variant="outline"
                size="icon"
                onFocus={() => setIsActive(true)}
              >
                <Trash2 size={20} strokeWidth={2} />
              </Button>
            </div>
          </RemoveWorkspace>
        </div>
      </div>
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
    <div className="relative rounded-lg shadow-sm hover:shadow-md">
      <CreateWorkspace actionType={ActionType.CREATE_WORKSPACES}>
        <button className="h-full w-full justify-start rounded-lg border border-dashed border-input/30 bg-white px-0 shadow-sm ring-offset-background hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-70 md:min-h-48 md:p-5">
          <div className="flex h-full flex-col flex-wrap items-center justify-center gap-0.5 md:w-full md:gap-3">
            <CirclePlus size={24} strokeWidth={2} />
            <h3 className="text-xs font-medium md:text-sm">Buat workspace</h3>
          </div>
        </button>
      </CreateWorkspace>
    </div>
  );
}
