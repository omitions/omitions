import { Form, useSearchParams } from "@remix-run/react";

import React from "react";
import { NumericFormat } from "react-number-format";

import { cn } from "~/lib/utils";

import { Button } from "~/components/ui/button";
import { Input, inputVariants } from "~/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

export default function CreateWallet({
  actionType,
  children,
  open,
}: {
  open?: boolean;
  actionType: string;
  children?: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = React.useState(open);
  const [_, setSearchParams] = useSearchParams();

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(bool) => {
        setSearchParams({});
        setIsOpen(bool);
      }}
    >
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent withCloseButton className="sm:max-w-lg">
        <SheetHeader className="px-4 md:px-8">
          <SheetTitle>Buat Dompet Baru</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <Form
          action="/ws"
          method="post"
          className="flex flex-col gap-8 px-4 md:px-8"
          onSubmit={() => setIsOpen(false)}
        >
          <div className="flex flex-col gap-4">
            <Input
              type="text"
              name="name"
              required
              // variant="ghost"
              placeholder="Masukkan nama dompet"
            />
            <NumericFormat
              thousandSeparator="."
              decimalSeparator=","
              name="amount"
              allowLeadingZeros
              allowNegative={false}
              placeholder="Saldo dompet Anda"
              prefix="IDR "
              className={cn(inputVariants({}))}
            />
          </div>
          <Button type="submit">Buat Dompet</Button>
          <input type="hidden" name="_action" value={actionType} />
        </Form>
      </SheetContent>
    </Sheet>
  );
}
