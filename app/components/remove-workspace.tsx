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

export default function RemoveWorkspace({
  actionType,
  children,
  workspaceName,
  workspaceId
}: {
  actionType: string,
  children: React.ReactNode,
  workspaceName: string,
  workspaceId: string
}) {
  const [confirmationText, setConfirmationText] = React.useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Hapus Workspace</DialogTitle>
        </DialogHeader>
        <Form
          action="/ws"
          method="post"
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground font-semibold text-red-500">Ketikan nama workspace untuk konfirmasi.</p>
            <Input
              type="text"
              name="title"
              required
              isError
              onChange={(v) => setConfirmationText(v.target.value)}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
              >
                Batalkan
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="submit"
                size="sm"
                variant="destructive"
                disabled={confirmationText !== workspaceName}
              >
                Konfirmasi
              </Button>
            </DialogClose>
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
