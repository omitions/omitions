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
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";

export default function RemoveWallet({
  actionType,
  children,
}: {
  actionType: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  // const [confirmationText, setConfirmationText] = React.useState("");

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Hapus Workspace</DialogTitle>
        </DialogHeader>
        <Form
          action="/ws"
          method="post"
          className="flex flex-col gap-6"
          onSubmit={() => setIsOpen(false)}
        >
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-muted-foreground text-red-500">
              Apakah Anda yakin? ketikan nama dompet  untuk menkonfirmasi.
            </p>
            <Input
              type="text"
              name="title"
              required
              variant="destructive"
            // onChange={(v) => setConfirmationText(v.target.value)}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="ghost">
                Batalkan
              </Button>
            </DialogClose>
            <Button
              type="submit"
              variant="destructive"
            >
              Konfirmasi
            </Button>
          </DialogFooter>
          <input type="hidden" name="_action" value={actionType} />
        </Form>
      </DialogContent>
    </Dialog>
  );
}
