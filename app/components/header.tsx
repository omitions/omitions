import { BookOpenText, Search } from "lucide-react";

import { SearchDialog } from "~/components/search";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";

export default function Header() {
  return (
    <div className="mx-auto flex h-[var(--header-height)] max-w-screen-xl items-center justify-between px-5">
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
            className="!h-11 w-full justify-start gap-3 bg-white px-5"
          >
            <Search size={17} strokeWidth={2.5} />
            <span className="text-sm font-normal text-muted-foreground">
              Cari apapun..
            </span>
          </Button>
        </SearchDialog>
      </div>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}
