import { Link } from "@remix-run/react";

import { MenuIcon, XIcon } from "lucide-react";

import NavItem from "~/components/navigation-item";
import { Progress } from "~/components/ui/progress";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

export default function WorkspaceSidebar({
  workspaceCount,
  withoutMobile = false,
}: {
  workspaceCount: number;
  withoutMobile?: boolean;
}) {
  return (
    <>
      <Desktop workspaceCount={workspaceCount} />
      {!withoutMobile && <Mobile />}
    </>
  );
}

function Mobile() {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-14 w-screen items-center justify-start border-b border-border bg-white px-4 md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <button
            className="middle center absolute flex h-12 w-12 items-center justify-center rounded-full transition-all"
            data-ripple-dark="true"
          >
            <MenuIcon size={24} strokeWidth={2} />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="px-4">
          <SheetHeader className="hidden">
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-6">
            <SheetClose asChild>
              <button
                className="middle center flex h-14 w-14 items-center justify-center rounded-full transition-all"
                data-ripple-dark="true"
              >
                <XIcon size={24} strokeWidth={2} />
              </button>
            </SheetClose>
            <div className="flex flex-col gap-1">
              <SheetClose>
                <NavItem
                  title="Spaces"
                  href="/ws"
                  iconName="Folder"
                  delay={150}
                />
              </SheetClose>
              <SheetClose>
                <NavItem title="Pemasukan" iconName="Plus" delay={150} />
              </SheetClose>
              <SheetClose>
                <NavItem
                  title="Pengeluaran"
                  href="/ws/expenses"
                  iconName="ArrowUp"
                  delay={150}
                />
              </SheetClose>
              <SheetClose>
                <NavItem
                  title="Invoice"
                  href="/ws/invoice"
                  iconName="ReceiptText"
                  delay={150}
                />
              </SheetClose>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function Desktop({ workspaceCount }: { workspaceCount: number }) {
  return (
    <div className="fixed left-[var(--sidebar-width)] hidden h-full w-full max-w-[var(--sidebar-width-xl)] md:block">
      <div className="my-1 flex min-h-screen flex-col justify-between pb-6 pt-5 md:pl-3">
        <div className="flex flex-col gap-6">
          <div className="flex items-center">
            <Link
              to="/ws"
              className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0"
            >
              <h2 className="mx-4 text-lg font-bold">Beranda</h2>
            </Link>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <NavItem title="Spaces" href="/ws" iconName="Folder" />
              <NavItem title="Pemasukan" iconName="Plus" />
              <NavItem
                title="Pengeluaran"
                href="/ws/expenses"
                iconName="ArrowUp"
              />
              <NavItem
                title="Invoice"
                href="/ws/invoice"
                iconName="ReceiptText"
              />
            </div>
          </div>
        </div>
        <SidebarFooter count={workspaceCount} />
      </div>
    </div>
  );
}

function SidebarFooter({ count }: { count: number }) {
  return (
    <Link
      to="/ws/:id"
      className="mx-2 rounded-2xl shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 md:mx-0"
    >
      <div className="flex w-full cursor-pointer flex-col gap-3 rounded-2xl bg-white px-4 py-8">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-medium">{count || 0}/10 Workspace</h4>
          <p className="text-xs font-medium text-muted-foreground">Gratis</p>
        </div>
        <Progress value={33} />
      </div>
    </Link>
  );
}
