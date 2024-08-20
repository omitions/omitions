import { BookOpenText, Search } from "lucide-react";

import { SearchDialog } from "~/components/search";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";

export default function Header() {
  return (
    <div className="mx-auto flex h-[var(--header-height)] max-w-screen-xl items-center justify-between px-6">
      <div>
        <Button size="sm" variant="outline" className="gap-2">
          <BookOpenText size={16} strokeWidth={2.5} />
          <span>Pelajari</span>
        </Button>
      </div>
      <div className="w-full max-w-sm">
        <SearchDialog withoutK={true}>
          <Button size="sm" variant="outline" className="h-10 w-full gap-2">
            <Search
              size={14}
              strokeWidth={2.5}
              className="text-muted-foreground"
            />
            <span className="text-xs font-normal text-muted-foreground">
              Cari apapun, atau tekan ⌘ + K
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
