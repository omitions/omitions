import { LinkProps, useLocation } from "@remix-run/react";

import { Command, icons } from "lucide-react";

import { Button, ButtonLink } from "~/components/ui/button";

import { cn } from "~/lib/utils";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { SearchDialog } from "./search";

export default function Sidebar() {
  return (
    <div className="flex h-full flex-col justify-between gap-1 px-2 pb-4 pt-5">
      <div className="flex flex-col items-center gap-2">
        <RootNavItem href="/dash" iconName="FileBarChart2" title="Analisa" />
        <RootNavItem href="/ws" iconName="NotebookPen" title="Beranda" />
        <SearchDialog>
          <RootNavItem iconName="Search" title="Cari apapun.." />
        </SearchDialog>
        <RootNavItem href="/settings" iconName="Settings" title="Pengaturan" />
      </div>
      <div></div>
      <div className="flex flex-col items-center gap-2">
        <RootNavItem href="/trash" iconName="Trash2" title="Sampah" />
        <RootNavItem href="/logout" iconName="LogOut" title="Keluar" />
      </div>
    </div>
  );
}

function RootNavItem({
  href,
  prefetch,
  iconName,
  title,
  disabled,
  ...props
}: {
  href?: string;
  prefetch?: LinkProps["prefetch"];
  iconName: keyof typeof icons;
  title: string;
  disabled?: boolean;
}) {
  const location = useLocation();
  const isMatch = href
    ? location.pathname.split("/")[1].includes(href?.split("/")[1])
    : false;

  // eslint-disable-next-line import/namespace
  const Icon = icons[iconName];

  const Comp = href ? ButtonLink : Button;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Comp
          disabled={disabled}
          href={href}
          prefetch={prefetch}
          variant="ghost"
          className={cn(
            "h-9 w-9 justify-center rounded-full p-2 hover:bg-primary/30",
            isMatch && "border border-black bg-primary/30",
          )}
          {...props}
        >
          <Icon size={18} strokeWidth={isMatch ? 2.5 : 2} />
        </Comp>
      </TooltipTrigger>
      <TooltipContent align="center" side="right" sideOffset={8}>
        <p className={cn(isMatch ? "font-medium" : "font-medium")}>{title}</p>
        {iconName === "Search" && (
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
            Tekan{" "}
            <span className="flex items-center gap-0.5">
              <kbd className="pointer-events-none inline-flex h-5 w-5 select-none place-content-center items-center gap-1 rounded border bg-muted font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <Command size={10} strokeWidth={2} />
              </kbd>
              <kbd className="pointer-events-none inline-flex h-5 w-5 select-none place-content-center items-center gap-1 rounded border bg-muted font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">K</span>
              </kbd>
            </span>
          </p>
        )}
      </TooltipContent>
    </Tooltip>
  );
}
