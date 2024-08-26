import { useNavigate } from "@remix-run/react";
import { format } from "date-fns";

import {
  ArrowUp,
  Calculator,
  CirclePlus,
  Crown,
  Folder,
  GanttChart,
  Plus,
  ReceiptText,
  UserRound,
} from "lucide-react";
import * as React from "react";

import { Button } from "~/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import { WorkspaceIcon } from "~/utils/icons";
import { generateDash } from "~/utils/misc";

import { useTypedRouteLoaderData } from "~/utils/useTypedRouteLoaderData";

export function SearchDialog({
  children,
  withoutK = false,
}: {
  children: JSX.Element;
  withoutK?: boolean;
}) {
  const { workspaces } = useTypedRouteLoaderData("root");
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!withoutK) {
      const down = (e: KeyboardEvent) => {
        if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          setOpen((open) => !open);
        }
      };

      document.addEventListener("keydown", down);
      return () => document.removeEventListener("keydown", down);
    }
  }, []);

  return (
    <>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          onClick: () => setOpen(true),
        }),
      )}
      <CommandDialog open={open} onOpenChange={setOpen} key="search">
        <CommandInput placeholder="Telusuri spaces atau menu..." />
        <CommandList>
          <CommandEmpty>Tidak ditemukan</CommandEmpty>
          <CommandGroup heading="Spaces">
            {workspaces.map((props) => (
              <CommandItem
                key={props._id}
                asChild
                onSelect={() =>
                  navigate(
                    "/ws/" +
                      `${generateDash(props.name)}-${props._id}` +
                      `?d=${format(new Date().setDate(new Date().getDate() - 1), "yyyy-MM")}`,
                  )
                }
                className="h-full"
              >
                <Button
                  variant="transparent"
                  className="w-full items-center justify-start gap-3"
                >
                  <WorkspaceIcon />
                  <span>{props.name}</span>
                </Button>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Jalan Pintas">
            <CommandItem
              asChild
              onSelect={() => {
                navigate({
                  pathname: "/ws",
                  search: "?open-create-workspace=1",
                });
                setOpen(false);
              }}
            >
              <Button variant="transparent" className="w-full justify-start">
                <CirclePlus size={18} strokeWidth={2} className="mr-3" />
                <span>Buat Spaces</span>
              </Button>
            </CommandItem>
            <CommandItem
              asChild
              onSelect={() => {
                navigate({
                  pathname: "/ws",
                  search: "?open-create-wallet=1",
                });
                setOpen(false);
              }}
            >
              <Button variant="transparent" className="w-full justify-start">
                <CirclePlus size={18} strokeWidth={2} className="mr-3" />
                <span>Buat Dompet</span>
              </Button>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Menu">
            <CommandItem
              asChild
              onSelect={() => {
                navigate("/ws");
                setOpen(false);
              }}
            >
              <Button variant="transparent" className="w-full justify-start">
                <Folder size={18} strokeWidth={2} className="mr-3" />
                <span>Spaces</span>
              </Button>
            </CommandItem>
            <CommandItem
              asChild
              onSelect={() => {
                navigate("/settings/billing");
                setOpen(false);
              }}
            >
              <Button variant="transparent" className="w-full justify-start">
                <Crown size={18} strokeWidth={2} className="mr-3" />
                <span>Langganan</span>
              </Button>
            </CommandItem>
            <CommandItem
              asChild
              onSelect={() => {
                navigate("/settings");
                setOpen(false);
              }}
            >
              <Button variant="transparent" className="w-full justify-start">
                <UserRound size={18} strokeWidth={2} className="mr-3" />
                <span>Akun</span>
              </Button>
            </CommandItem>
            <CommandItem
              asChild
              onSelect={() => {
                navigate("/dash");
                setOpen(false);
              }}
            >
              <Button variant="transparent" className="w-full justify-start">
                <GanttChart size={18} strokeWidth={2} className="mr-3" />
                <span>Ringkasan</span>
              </Button>
            </CommandItem>
            <CommandItem
              asChild
              onSelect={() => {
                navigate("/dash");
                setOpen(false);
              }}
            >
              <Button variant="transparent" className="w-full justify-start">
                <Calculator size={18} strokeWidth={2} className="mr-3" />
                <span>Laporan</span>
              </Button>
            </CommandItem>
            <CommandItem
              asChild
              onSelect={() => {
                navigate("/ws");
                setOpen(false);
              }}
            >
              <Button variant="transparent" className="w-full justify-start">
                <Plus size={18} strokeWidth={2} className="mr-3" />
                <span>Pemasukan</span>
              </Button>
            </CommandItem>
            <CommandItem
              asChild
              onSelect={() => {
                navigate("/ws");
                setOpen(false);
              }}
            >
              <Button variant="transparent" className="w-full justify-start">
                <ArrowUp size={18} strokeWidth={2} className="mr-3" />
                <span>Pengeluaran</span>
              </Button>
            </CommandItem>
            <CommandItem
              asChild
              onSelect={() => {
                navigate("/ws");
                setOpen(false);
              }}
            >
              <Button variant="transparent" className="w-full justify-start">
                <ReceiptText size={18} strokeWidth={2} className="mr-3" />
                <span>Invoice</span>
              </Button>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
