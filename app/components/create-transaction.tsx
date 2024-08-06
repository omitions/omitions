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
import { Textarea } from "./ui/textarea";

export default function CreateTransacation() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="w-fit px-3.5 h-16 shadow-lg hover:bg-primary rounded-xl text-sm font-semibold gap-2"
        >
          <Plus size={18} strokeWidth={2} />
          <span>Buat transaksi</span>
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
              name="name"
              required
              placeholder="Nama"
            />
            <Textarea
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
              >
                Tutup
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="submit"
              >
                Buat Sekarang
              </Button>
            </DialogClose>
          </DialogFooter>
          <input
            type="hidden"
            name="_action"
          // value={actionType}
          />
        </Form>
      </DialogContent>
    </Dialog>
  )
}
