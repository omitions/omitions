import { Form } from "@remix-run/react";

import React from "react";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export default function UpdateWorkspace({
  actionType,
  children,
  workspaceName,
  workspaceDescription,
  workspaceId
}: {
  actionType: string,
  children: React.ReactNode,
  workspaceName: string,
  workspaceDescription: string,
  workspaceId: string
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Ubah <b>{workspaceName}</b> Workspace</DialogTitle>
        </DialogHeader>
        <Form
          action="/ws"
          method="post"
          className="flex flex-col gap-6"
          onSubmit={() => setIsOpen(false)}
        >
          <div className="flex flex-col gap-4">
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
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
              >
                Batalkan
              </Button>
            </DialogClose>
            <Button
              type="submit"
            >
              Ubah Sekarang
            </Button>
          </DialogFooter>
          <input
            type="hidden"
            name="_action"
            value={actionType}
          />
          <input
            type="hidden"
            name="_id"
            value={workspaceId}
          />
        </Form>
      </DialogContent>
    </Dialog>
  )
}
