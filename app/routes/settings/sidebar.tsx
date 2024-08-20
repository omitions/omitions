import { Link, LinkProps, useLocation } from "@remix-run/react";
import { icons, MenuIcon, XIcon } from "lucide-react";

import { ButtonLink } from "~/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "~/components/ui/sheet";

import { cn } from "~/lib/utils";

export default function SettingsSidebar({
  withoutMobile = false,
}: {
  withoutMobile?: boolean;
}) {
  return (
    <>
      <Desktop />
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
            <div className="flex flex-col gap-1">
              <SheetClose>
                <NavItem
                  title="Akun"
                  href="/settings"
                  iconName="UserRoundCog"
                  delay={150}
                />
              </SheetClose>
              <SheetClose>
                <NavItem
                  title="Billing"
                  href="/settings/billing"
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

function Desktop() {
  return (
    <div className="fixed left-[var(--sidebar-width)] hidden h-full w-full max-w-[var(--sidebar-width-xl)] border-r border-input bg-background/40 md:block">
      <div className="my-1 flex min-h-screen flex-col gap-8 py-6 md:px-3">
        <div className="flex items-center">
          <Link
            to="/ws/settings"
            className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0"
          >
            <h2 className="ml-4 text-xl font-bold">Pengaturan</h2>
          </Link>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <NavItem title="Edit Profil" href="/settings" iconName="User" />
            <NavItem
              title="Billing"
              href="/settings/billing"
              iconName="ReceiptText"
            />
          </div>
        </div>
      </div>
    </div>
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
        <Icon size={18} strokeWidth={isMatch ? 2 : 1.5} />
        <span>{title}</span>
      </div>
    </ButtonLink>
  );
}
