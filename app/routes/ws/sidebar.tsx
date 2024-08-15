import { Link, LinkProps, useLocation } from "@remix-run/react";
import { icons, MenuIcon, XIcon } from "lucide-react";

import CreateWorkspace from "~/components/create-workspace";
import { ButtonLink } from "~/components/ui/button";
import { Progress } from "~/components/ui/progress";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "~/components/ui/sheet";

import { cn } from "~/lib/utils";

import { ActionType } from "./route";

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
        <SheetContent side="left">
          <div className="flex flex-col gap-6">
            <div>
              <SheetClose>
                <button
                  className="middle center flex h-12 w-12 items-center justify-center rounded-full transition-all"
                  data-ripple-dark="true"
                >
                  <XIcon size={24} strokeWidth={2} />
                </button>
              </SheetClose>
            </div>
            <CreateWorkspace actionType={ActionType.CREATE_WORKSPACES} />
            <div className="flex flex-col">
              <SheetClose>
                <NavItem
                  title="Workspaces"
                  href="/ws"
                  iconName="FileText"
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
    <div className="h-ful fixed left-[var(--sidebar-width)] hidden w-full max-w-[var(--sidebar-width-xl)] md:block">
      <div className="my-1 flex min-h-screen flex-col justify-between py-6 md:pl-3">
        <div className="flex flex-col gap-8">
          <div className="flex items-center">
            <Link
              to="/ws"
              className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0"
            >
              <h2 className="mx-2 text-xl font-bold">Beranda</h2>
            </Link>
          </div>
          <div className="flex flex-col gap-6">
            <CreateWorkspace actionType={ActionType.CREATE_WORKSPACES} />
            <div className="flex flex-col">
              <NavItem title="Workspaces" href="/ws" iconName="FileText" />
              <NavItem
                title="Dompet"
                href="/ws/wallet"
                iconName="WalletCards"
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
      className="mx-2 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0"
    >
      <div className="flex w-full cursor-pointer flex-col gap-3 rounded-xl border border-input bg-background px-4 py-6">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-medium">{count || 0}/10 Workspace</h4>
          <p className="text-xs font-medium text-muted-foreground">Gratis</p>
        </div>
        <Progress value={33} />
      </div>
    </Link>
  );
}

function NavItem({
  href,
  prefetch,
  iconName,
  title,
  disabled,
  delay,
}: {
  href?: string;
  prefetch?: LinkProps["prefetch"];
  iconName: keyof typeof icons;
  title: string;
  disabled?: boolean;
  delay?: number;
}) {
  const location = useLocation();
  const isMatch = location.pathname === href;

  // eslint-disable-next-line import/namespace
  const Icon = icons[iconName];

  return (
    <ButtonLink
      disabled={disabled}
      href={href}
      prefetch={prefetch}
      delay={delay}
      variant="ghost"
      size="sm"
      className={cn(
        "w-full justify-start gap-3 rounded-full px-4 py-3 text-sm font-medium",
        isMatch && "bg-primary/20 font-semibold hover:bg-primary/20",
      )}
    >
      <div className="flex items-center gap-2">
        <Icon size={18} strokeWidth={isMatch ? 2.5 : 2} />
        <span>{title}</span>
      </div>
    </ButtonLink>
  );
}
