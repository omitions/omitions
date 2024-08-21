import { BookOpenText, ChevronDown, Search } from "lucide-react";

import { SearchDialog } from "~/components/search";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";

export default function Header() {
  return (
    <div className="flex h-[var(--header-height)] justify-center">
      <div className="mx-[19px] flex w-full max-w-screen-xl items-center justify-between bg-background/60 px-5 backdrop-blur-sm">
        <div>
          <Button size="sm" variant="outline" className="gap-2">
            <BookOpenText size={16} strokeWidth={2.5} />
            <span>Pelajari</span>
          </Button>
        </div>
        <div className="w-full max-w-sm">
          <SearchDialog withoutK={true}>
            <Button
              size="sm"
              variant="outline"
              className="!h-11 w-full justify-start gap-2 border-black bg-white px-5"
            >
              <Search
                size={17}
                strokeWidth={2.5}
                className="text-muted-foreground"
              />
              <span className="text-sm font-medium text-muted-foreground">
                Telusuri
              </span>
            </Button>
          </SearchDialog>
        </div>
        <div className="flex items-center gap-6">
          <Button size="sm" className="gap-1">
            <span>Buat Transaksi</span>
            <ChevronDown size={16} strokeWidth={2.5} />
          </Button>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}
