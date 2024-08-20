import { Form } from "@remix-run/react";

import React from "react";
import { NumericFormat } from "react-number-format";

import { cn } from "~/lib/utils";

import { Button } from "./ui/button";
import { Input, inputVariants } from "./ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export default function CreateWallet({
  actionType,
  children,
}: {
  actionType: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent withCloseButton className="sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Buat Dompet Baru</SheetTitle>
        </SheetHeader>
        <Form
          action="/ws"
          method="post"
          className="flex flex-col gap-8 px-8"
          onSubmit={() => setIsOpen(false)}
        >
          <div className="flex flex-col gap-6">
            <Input
              type="text"
              name="name"
              required
              variant="ghost"
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
              className={cn(inputVariants({ variant: "ghost" }))}
            />
          </div>
          <Button type="submit">Buat Dompet</Button>
          <input type="hidden" name="_action" value={actionType} />
        </Form>
      </SheetContent>
    </Sheet>
  );
}
