import { Form } from "@remix-run/react";

import { Plus, ArrowRight, ArrowLeft, FileInput } from "lucide-react";
import { NumericFormat } from 'react-number-format';

import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";

import { cn } from "~/lib/utils";

import { Button, buttonVariants } from "./ui/button";
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
import React from "react";

export default function CreateTransacation({ date }: { date: Date }) {
  const [isAddDescription, setIsAddDescription] = React.useState(false);
  const [loopType, setLoopType] = React.useState("none");
  const [timeValue, setTimeValue] = React.useState<string>("00:00");

  const refDescription = React.useRef(null);

  const handleTimeChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const time = e.target.value;
    setTimeValue(time);
  };

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
          <div className="flex flex-col gap-5">
            <Input
              type="text"
              name="name"
              required
              placeholder="Tambahkan judul transaksi"
              variant="ghost"
              className="text-base font-medium text-black placeholder:font-normal"
            />
            <Textarea
              ref={refDescription}
              name="description"
              required
              onBlur={(v) => {
                if (!v.currentTarget.value) setIsAddDescription(false);
              }}
              placeholder="Tambahkan deskripsi"
              className={cn("text-black placeholder:font-normal", !isAddDescription && "hidden")}
            />
            {!isAddDescription && (
              <Button
                variant="outline"
                className="w-fit"
                size="sm"
                onClick={() => {
                  setIsAddDescription(true);
                  setTimeout(() => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    refDescription.current?.focus();
                  }, 200);
                }}
              >
                Tambahkan deskripsi
              </Button>
            )}
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
            <div className="flex flex-col gap-2">
              <p className="text-sm">Tambahkan waktu atau atur perulangan</p>
              <div className="border rounded-lg shadow-sm p-4 flex flex-col gap-2">
                <label className={cn(buttonVariants({ variant: "ghost" }), "w-fit flex gap-1 px-3")}>
                  <span>{format(date, "d MMMM yyyy", { locale: localeId })}</span>
                  <span>:</span>
                  <input type="time" value={timeValue} onChange={handleTimeChange} />
                </label>
                <div className="flex items-center gap-4">
                  <Select
                    defaultValue="none"
                    value={loopType}
                    onValueChange={(v) => setLoopType(v)}
                  >
                    <SelectTrigger className="w-fit text-black">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">
                        <span>Tidak berulang</span>
                      </SelectItem>
                      <SelectItem value="daily">
                        <span>Harian</span>
                      </SelectItem>
                      <SelectItem value="weekly">
                        <span>Mingguan</span>
                      </SelectItem>
                      <SelectItem value="monthly">
                        <span>Bulanan</span>
                      </SelectItem>
                      <SelectItem value="annual">
                        <span>Setiap tahun</span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {loopType != "none" && (
                    <NumericFormat
                      max={40}
                      name="loop_type"
                      prefix="x"
                      allowLeadingZeros
                      allowNegative={false}
                      placeholder="Ulangi berapa kali? maksimal 40 kali ya.."
                      className={cn(
                        inputVariants({ variant: "ghost" }),
                        "text-black placeholder:font-normal"
                      )}
                    />
                  )}
                </div>
              </div>
            </div>
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
