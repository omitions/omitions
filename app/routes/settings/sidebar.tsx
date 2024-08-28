import { Link } from "@remix-run/react";

import { MenuIcon, XIcon } from "lucide-react";

import NavItem from "~/components/navigation-item";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

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
    <div className="fixed left-0 top-0 z-50 flex h-14 w-screen items-center justify-start border-b border-input bg-background px-4 md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <button
            className="middle center absolute flex h-12 w-12 items-center justify-center rounded-full transition-all"
            data-ripple-dark="true"
          >
            <MenuIcon size={24} strokeWidth={2} />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="max-w-[250px] bg-background px-4">
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
                <NavItem title="Privasi" iconName="ShieldCheck" delay={150} />
              </SheetClose>
              <SheetClose>
                <NavItem title="Laporkan Masalah" iconName="Info" />
              </SheetClose>
              <SheetClose>
                <NavItem title="Preferensi" iconName="Settings2" />
              </SheetClose>
              <p className="mb-1.5 ml-4 mt-6 text-xs font-medium text-muted-foreground">
                Mengenai akun Anda
              </p>
              <SheetClose>
                <NavItem
                  title="Langganan"
                  href="/settings/billing"
                  iconName="Crown"
                />
              </SheetClose>
              <SheetClose>
                <NavItem title="Akun" href="/settings" iconName="UserRound" />
              </SheetClose>
              <SheetClose>
                <NavItem title="Keamanan Akun" iconName="Lock" />
              </SheetClose>
              <p className="mb-1.5 ml-4 mt-6 text-xs font-medium text-muted-foreground">
                Lainnya
              </p>
              <SheetClose>
                <NavItem title="Sampah" iconName="Trash2" />
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
    <div className="fixed left-[var(--sidebar-width)] hidden h-full w-full max-w-[var(--sidebar-width-xl)] md:block">
      <div className="my-1 flex min-h-screen flex-col justify-between pb-6 pt-5 md:pl-3">
        <div className="flex flex-col gap-6">
          <div className="flex items-center">
            <Link
              to="/ws/settings"
              className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0"
            >
              <h2 className="mx-4 text-lg font-bold">Pengaturan</h2>
            </Link>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <NavItem title="Privasi" iconName="ShieldCheck" />
              <NavItem title="Laporkan Masalah" iconName="Info" />
              <NavItem title="Preferensi" iconName="Settings2" />
              <p className="mb-1.5 ml-4 mt-6 text-xs font-medium text-muted-foreground">
                Mengenai akun Anda
              </p>
              <NavItem
                title="Langganan"
                href="/settings/billing"
                iconName="Crown"
              />
              <NavItem title="Akun" href="/settings" iconName="UserRound" />
              <NavItem title="Keamanan Akun" iconName="Lock" />
              <p className="mb-1.5 ml-4 mt-6 text-xs font-medium text-muted-foreground">
                Lainnya
              </p>
              <NavItem title="Sampah" iconName="Trash2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
