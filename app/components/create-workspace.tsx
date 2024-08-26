import { Form, useSearchParams } from "@remix-run/react";

import React from "react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { Textarea } from "~/components/ui/textarea";

export default function CreateWorkspace({
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
      key="create-workspace"
    >
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent withCloseButton className="sm:max-w-lg">
        <SheetHeader className="px-4 md:px-8">
          <SheetTitle>Buat Workspace Baru</SheetTitle>
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
              placeholder="Masukkan nama workspace"
            />
            <Textarea
              name="description"
              required
              placeholder="Masukkan deskripsi workspace"
            />
          </div>
          <Button type="submit">Buat Workspace</Button>
          <input type="hidden" name="_action" value={actionType} />
        </Form>
      </SheetContent>
    </Sheet>
  );
}
