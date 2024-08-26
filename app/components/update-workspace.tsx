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
  workspaceName,
  workspaceDescription,
  workspaceId,
}: {
  actionType: string;
  children: React.ReactNode;
  workspaceName: string;
  workspaceDescription: string;
  workspaceId: string;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent withCloseButton className="sm:max-w-lg">
        <SheetHeader className="px-4 md:px-8">
          <SheetTitle>Ubah Workspace</SheetTitle>
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
              defaultValue={workspaceName}
              // variant="ghost"
              placeholder="Masukkan nama workspace"
            />
            <Textarea
              name="description"
              required
              defaultValue={workspaceDescription}
              // variant="ghost"
              placeholder="Masukkan deskripsi workspace"
            />
          </div>
          <Button type="submit">Ubah Workspace</Button>
          <input type="hidden" name="_action" value={actionType} />
          <input type="hidden" name="_id" value={workspaceId} />
        </Form>
      </SheetContent>
    </Sheet>
  );
}
