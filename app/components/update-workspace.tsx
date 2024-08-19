import { Form } from "@remix-run/react";

import React from "react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Textarea } from "./ui/textarea";

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
        <SheetHeader>
          <SheetTitle>Ubah Workspace Baru</SheetTitle>
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
              defaultValue={workspaceName}
              variant="ghost"
              placeholder="Nama"
            />
            <Textarea
              name="description"
              required
              defaultValue={workspaceDescription}
              variant="ghost"
              placeholder="Deskripsi"
            />
          </div>
          <Button type="submit" variant="secondary">
            Buat Workspace
          </Button>
          <input type="hidden" name="_action" value={actionType} />
          <input type="hidden" name="_id" value={workspaceId} />
        </Form>
      </SheetContent>
    </Sheet>
  );
}
