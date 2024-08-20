import { BookOpenText, Search } from "lucide-react";

import { SearchDialog } from "~/components/search";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";

export default function Header() {
  return (
    <div className="px-6 h-[var(--header-height)] flex items-center justify-between max-w-screen-xl mx-auto">
      <div>
        <Button size="sm" variant="outline" className="gap-2">
          <BookOpenText size={16} strokeWidth={2.5} />
          <span>Pelajari</span>
        </Button>
      </div>
      <div className="max-w-sm w-full">
        <SearchDialog>
          <Button size="sm" variant="outline" className="w-full h-10 gap-2">
            <Search size={14} strokeWidth={2.5} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-normal">
              Cari apapun, atau tekan command + K
            </span>
          </Button>
        </SearchDialog>
      </div>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  )
}