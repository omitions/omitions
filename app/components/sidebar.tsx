import { LinkProps, useLocation } from "@remix-run/react";

import { icons } from "lucide-react";

import { Button, ButtonLink } from "~/components/ui/button";

import { cn } from "~/lib/utils";

import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { CommandDialogDemo } from "./search";

export default function Sidebar() {
  return (
    <div className="mt-1 flex h-full flex-col justify-between gap-1 px-2 pb-4 pt-5">
      <div className="flex flex-col items-center gap-2.5">
        <NavItem href="/dash" iconName="Telescope" title="Analisa" />
        <NavItem href="/ws" iconName="ScrollText" title="Beranda" />
        <CommandDialogDemo>
          <NavItem iconName="Search" title="Cari apapun.." />
        </CommandDialogDemo>
        <NavItem href="/settings" iconName="Settings" title="Pengaturan" />
      </div>
      <div></div>
      <div>
        <NavItem href="/logout" iconName="LogOut" title="Keluar" />
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
            "h-9 w-9 justify-center rounded-full p-2 hover:bg-primary/20",
            isMatch && "bg-primary/20",
          )}
          {...props}
        >
          <Icon size={18} strokeWidth={isMatch ? 2.5 : 2} />
        </Comp>
      </TooltipTrigger>
      <TooltipContent align="center" side="right" sideOffset={3}>
        <p className={cn(isMatch ? "font-medium" : "font-medium")}>{title}</p>
        {iconName === "Search" && (
          <p className="mt-1 text-xs text-muted-foreground">
            Tekan{" "}
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </p>
        )}
      </TooltipContent>
    </Tooltip>
  );
}
