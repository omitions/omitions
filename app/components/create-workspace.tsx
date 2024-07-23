import { Form } from "@remix-run/react";
import { Plus } from "lucide-react";

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

export default function CreateWorkspace({ actionType }: { actionType: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="w-fit h-14 rounded-xl text-sm gap-2">
          <Plus size={18} strokeWidth={3} />
          <span>Buat workspaces</span>
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
        >
          <div className="flex flex-col gap-4">
            <Input
              type="text"
              name="title"
              required
              placeholder="Judul"
            />
            <Input
              type="text"
              name="description"
              required
              placeholder="Deskripsi"
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                size="sm"
              >
                Tutup
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="submit"
                size="sm"
              >
                Buat Sekarang
              </Button>
            </DialogClose>
          </DialogFooter>
          <input
            type="hidden"
            name="_action"
            value={actionType}
          />
        </Form>
      </DialogContent>
    </Dialog>
  )
}
