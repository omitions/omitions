import { Command, Search } from "lucide-react";

import { SearchDialog } from "~/components/search";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button, ButtonLink } from "~/components/ui/button";
import { DropdownMenuSeparator } from "~/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

export default function Header() {
  return (
    <div className="hidden h-[var(--header-height)] justify-center md:flex">
      <div className="mx-[6px] flex w-full max-w-[2800px] items-center justify-between bg-background px-4">
        <div></div>
        <div className="w-full max-w-lg">
          <SearchDialog withoutK={true}>
            <Button
              size="sm"
              variant="outline"
              className="relative !h-10 w-full justify-start gap-2 bg-white px-5 hover:border-foreground/30 hover:shadow-sm hover:ring-0"
            >
              <Search
                size={18}
                strokeWidth={2.5}
                className="text-muted-foreground"
              />
              <span className="text-sm font-medium text-muted-foreground">
                Telusuri
              </span>
              <span className="absolute right-5 flex items-center gap-1">
                <kbd className="pointer-events-none inline-flex h-5 w-5 select-none place-content-center items-center gap-1 rounded border bg-muted font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                  <Command size={10} strokeWidth={2} />
                </kbd>
                <kbd className="pointer-events-none inline-flex h-5 w-5 select-none place-content-center items-center gap-1 rounded border bg-muted font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                  <span className="text-xs">K</span>
                </kbd>
              </span>
            </Button>
          </SearchDialog>
        </div>
        <div className="flex items-center gap-4">
          <Account />
        </div>
      </div>
    </div>
  );
}

function Account() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src="" alt="@shadcn" />
          <AvatarFallback>OP</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent
        className="mr-2 w-60 border-none bg-transparent shadow-none"
        align="center"
        sideOffset={2}
      >
        <div className="flex flex-col rounded-xl border border-input/50 bg-white p-2 shadow-md">
          <p className="my-2 ml-2 text-xs font-medium text-muted-foreground">
            omiputra@gmail.com
          </p>
          <DropdownMenuSeparator />
          <ButtonLink
            href="/settings"
            variant="ghost"
            size="sm"
            className="w-full justify-start rounded-md border px-2 font-medium"
          >
            Akun
          </ButtonLink>
          <ButtonLink
            href="/settings/billing"
            variant="ghost"
            size="sm"
            className="w-full justify-start rounded-md border px-2 font-medium"
          >
            Langganan
          </ButtonLink>
          <DropdownMenuSeparator />
          <ButtonLink
            href="/logout"
            variant="ghost"
            prefetch="none"
            size="sm"
            className="w-full justify-start rounded-md border px-2 font-medium text-red-500"
          >
            Keluar
          </ButtonLink>
        </div>
      </PopoverContent>
    </Popover>
  );
}
