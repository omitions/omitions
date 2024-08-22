import { Form } from "@remix-run/react";

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
          <SheetTitle>Buat Workspace Baru</SheetTitle>
          <SheetDescription></SheetDescription>
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
              placeholder="Masukkan nama workspace"
            />
            <Textarea
              name="description"
              required
              variant="ghost"
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
