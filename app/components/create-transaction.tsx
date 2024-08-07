import { Form } from "@remix-run/react";

// import React from "react";
import { Plus, ArrowRight, ArrowLeft, FileInput } from "lucide-react";
import { NumericFormat } from 'react-number-format';

import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";

import { cn } from "~/lib/utils";

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
import { Input, inputVariants } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/select";
// import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
// import { Calendar } from "./ui/calendar";

export default function CreateTransacation({ date }: { date: Date }) {
  // const [time, setTime] = React.useState<Date>();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="w-fit px-4 h-16 shadow-lg hover:bg-primary rounded-xl text-sm font-bold gap-2"
        >
          <Plus size={20} strokeWidth={2.5} />
          <span>Buat transaksi</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Buat transaksi pada tanggal  {format(date, "d MMMM yyyy", { locale: localeId })}</DialogTitle>
        </DialogHeader>
        <Form
          action="/ws"
          method="post"
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-6">
            <Input
              type="text"
              name="name"
              required
              placeholder="Tambahkan judul transaksi"
              variant="ghost"
              className="text-base font-medium text-black placeholder:font-normal"
            />
            {/* <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={time}
                  onSelect={setTime}
                />
              </PopoverContent>
            </Popover> */}
            <Select>
              <SelectTrigger className="w-full text-black">
                <SelectValue placeholder="Tipe transaksi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="invoice">
                  <div className="flex gap-2">
                    <FileInput size={18} strokeWidth={1.5} />
                    <span>Invoice</span>
                  </div>
                </SelectItem>
                <SelectItem value="cash_in">
                  <div className="flex gap-2">
                    <ArrowRight size={18} strokeWidth={1.5} />
                    <span>Pemasukan</span>
                  </div>
                </SelectItem>
                <SelectItem value="cash_out">
                  <div className="flex gap-2">
                    <ArrowLeft size={18} strokeWidth={1.5} />
                    <span>Pengeluaran</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <Textarea
              name="description"
              required
              placeholder="Tambahkan deskripsi transaksi"
              className="text-black placeholder:font-normal"
            />
            <NumericFormat
              thousandSeparator="."
              decimalSeparator=","
              name="amount"
              allowLeadingZeros
              allowNegative={false}
              placeholder="Nominal"
              prefix="Rp"
              className={cn(
                inputVariants({ variant: "ghost" }),
                "text-xl font-bold text-black placeholder:font-normal"
              )}
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
