import { BookOpenText, ChevronDown, Command, Search } from "lucide-react";

import { SearchDialog } from "~/components/search";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

export default function Header() {
  return (
    <div className="flex h-[var(--header-height)] justify-center">
      <div className="max-w-screen-3xl mx-[19px] flex w-full items-center justify-between bg-background/60 px-5 backdrop-blur-sm">
        <div>
          <Button size="sm" variant="outline" className="gap-2">
            <BookOpenText size={16} strokeWidth={2} />
            <span>Pelajari</span>
          </Button>
        </div>
        <div className="w-full max-w-sm">
          <SearchDialog withoutK={true}>
            <Button
              size="sm"
              variant="outline"
              className="relative !h-11 w-full justify-start gap-2 border-foreground/50 bg-white px-5 hover:border-foreground hover:shadow-sm hover:ring-0"
            >
              <Search
                size={18}
                strokeWidth={2.5}
                className="text-muted-foreground"
              />
              <span className="text-sm font-medium text-muted-foreground">
                Telusuri
              </span>
              <span className="absolute right-5 flex items-center gap-0.5">
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
          <Create />
          <Account />
        </div>
      </div>
    </div>
  );
}

function Create() {
  return (
    <Popover modal={false}>
      <PopoverTrigger asChild>
        <Button size="sm" className="gap-2" variant="secondary">
          <span>Baru</span>
          <ChevronDown size={16} strokeWidth={2} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56" align="center" sideOffset={12}>
        <Button
          variant="transparent"
          className="w-full rounded-md border border-red-500 p-0 font-medium"
        >
          Buat transaksi hari ini?
        </Button>
      </PopoverContent>
    </Popover>
  );
}

function Account() {
  return (
    <Popover modal={false}>
      <PopoverTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src="" alt="@shadcn" />
          <AvatarFallback>OP</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-56" align="end" sideOffset={12}>
        <Button
          variant="transparent"
          className="w-full rounded-md border border-red-500 p-0 font-medium"
        >
          Buat transaksi hari ini?
        </Button>
      </PopoverContent>
    </Popover>
  );
}
