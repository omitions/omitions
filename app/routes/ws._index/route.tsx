import { json, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { Ellipsis } from "lucide-react";

import RemoveWorkspace from "~/components/remove-workspace";
import { Button, ButtonLink } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "~/components/ui/dropdown-menu";

import { getWorkspaces, type TWorkspaces } from "~/utils/workspaces.server";

import { ActionType } from "../ws/route";
import Sidebar from "../ws/sidebar";
import UpdateWorkspace from "~/components/update-workspace";

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
    <div className="h-full">
      <div className="flex">
        <Sidebar workspaceCount={workspaces?.length} />
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
  const { workspaces } = useLoaderData<typeof loader>();

  if (!workspaces.length) return <p>Belum ada data</p>
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
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
      <div className="bottom-3 md:bottom-4 z-50 right-6 peer absolute">
        <MoreMenu
          _id={_id}
          name={name}
          description={description}
        />
      </div>
      <ButtonLink
        to={"/ws/" + _id}
        variant="outline"
        className="
          w-full min-h-32 justify-start px-6 pt-8 pb-16 rounded-2xl bg-transparent
          peer-hover:border-primary peer-hover:ring-2 peer-hover:ring-primary/30
        "
      >
        <div>
          <h4 className="text-base font-semibold">
            {name.length > 30
              ? `${name.substring(0, 30)}..`
              : name}
          </h4>
          <p className="text-sm font-medium text-muted-foreground text-wrap">
            {description.length > 60
              ? `${description.substring(0, 60)}..`
              : description}
          </p>
        </div>
      </ButtonLink>
    </div>
  )
}

function MoreMenu({ _id, name, description }: Pick<TWorkspaces, "_id" | "name" | "description">) {
  return (
    <DropdownMenu modal>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <Ellipsis size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={0}
        alignOffset={-34}
        align="end"
        className="w-36"
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
              className="w-full justify-start text-sm px-2 font-medium rounded-sm"
            >
              Ubah
            </Button>
          </UpdateWorkspace>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to={"/ws/" + _id}>
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
                w-full h-8 justify-start text-sm px-2 font-medium rounded-sm text-red-500
                hover:bg-red-100 hover:ring-2 hover:ring-red-500 
                focus-visible:ring-red-500 focus-visible:bg-red-100
              "
            >
              Hapus
            </Button>
          </RemoveWorkspace>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}