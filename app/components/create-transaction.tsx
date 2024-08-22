import { useParams } from "@remix-run/react";

import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { Plus } from "lucide-react";
import React from "react";

import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

import { regenerateDash } from "~/utils/misc";

export default function CreateTransaction({ date }: { date: Date }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const params = useParams();

  const workspaceName = params.id
    ? regenerateDash(params.id).withoutTheLast()
    : "-";

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button size="sm" variant="secondary" className="flex gap-1.5">
          <Plus size={18} strokeWidth={2} />
          <span>Catat transaksi</span>
        </Button>
      </SheetTrigger>
      <SheetContent withCloseButton className="sm:max-w-lg">
        <SheetHeader>
          <SheetDescription className="font-medium">
            {workspaceName}
          </SheetDescription>
          <SheetTitle>
            Catat Transaksi{" "}
            {format(date, "EEEE dd, MMMM yyyy", { locale: localeId })}
          </SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
