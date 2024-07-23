import { json, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Ellipsis } from "lucide-react";


import { Button, ButtonLink } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "~/components/ui/dropdown-menu";

import { getWorkspaces, type TWorkspaces } from "~/utils/workspaces.server";

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
  return (
    <div className="h-full">
      <div className="flex">
        <Sidebar />
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
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
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
      <div className="bottom-2 z-50 right-4 peer absolute">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <Ellipsis size={18} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            sideOffset={0}
            align="center"
          >
            <DropdownMenuItem>Ubah</DropdownMenuItem>
            <DropdownMenuItem>Buka</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Hapus</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ButtonLink
        to={`/ws/${_id}`}
        variant="outline"
        className="
          w-full min-h-32 justify-start px-6 py-8 rounded-2xl bg-transparent
          peer-hover:border-primary peer-hover:ring-2 peer-hover:ring-primary/30
        "
      >
        <div>
          <h4 className="text-base font-semibold">{name}</h4>
          <p className="text-sm font-medium text-muted-foreground">{description}</p>
        </div>
      </ButtonLink>
    </div>
  )
}