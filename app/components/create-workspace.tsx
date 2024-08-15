import { Form } from "@remix-run/react";
import { Plus } from "lucide-react";

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
import { Textarea } from "./ui/textarea";

export default function CreateWorkspace({
  actionType,
}: {
  actionType: string;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="h-16 w-fit gap-2 rounded-xl px-4 text-sm font-bold"
        >
          <Plus size={20} strokeWidth={2} />
          <span>Buat workspace</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Workspace Baru</DialogTitle>
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
              variant="ghost"
              placeholder="Nama"
            />
            <Textarea
              name="description"
              required
              variant="ghost"
              placeholder="Deskripsi"
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Tutup
              </Button>
            </DialogClose>
            <Button type="submit">Buat Sekarang</Button>
          </DialogFooter>
          <input type="hidden" name="_action" value={actionType} />
        </Form>
      </DialogContent>
    </Dialog>
  );
}
