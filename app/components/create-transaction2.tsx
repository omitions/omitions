import {
  FetcherWithComponents,
  useParams,
  useSearchParams,
} from "@remix-run/react";

import { ArrowLeft, ArrowRight, FileInput, Plus } from "lucide-react";
import React from "react";
import { NumericFormat } from "react-number-format";

import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";

import toIDR from "~/utils/currency";
import { cn } from "~/lib/utils";

import { Button, buttonVariants } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input, inputVariants } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";

import { regenerateDash } from "~/utils/misc";

import { ActionType } from "../routes/ws.day.$id/route";

export default function CreateTransaction({
  date,
  actionType,
  fetcher,
  children,
}: {
  date: Date;
  actionType: keyof typeof ActionType;
  fetcher: FetcherWithComponents<unknown>;
  children: React.ReactNode;
}) {
  const [, setSearchParams] = useSearchParams();

  const params = useParams();
  const workspaceId = params.id ? regenerateDash(params.id).getTheLast() : "";
  const workspaceName = params.id
    ? regenerateDash(params.id).withoutTheLast()
    : "-";

  const [loopType, setLoopType] = React.useState("none");
  const [trxType, setTrxType] = React.useState<string | undefined>(undefined);
  const [timeValue, setTimeValue] = React.useState<string>("00:00");

  const handleTimeChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const time = e.target.value;
    setTimeValue(time);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            Buat transaksi pada tanggal{" "}
            {format(date, "d MMMM yyyy", { locale: localeId })}
          </DialogTitle>
        </DialogHeader>
        <fetcher.Form
          action="."
          key="create-transaction"
          method="post"
          className="mt-2 flex flex-col gap-6"
          onSubmit={() => {
            setSearchParams(
              (prev) => {
                prev.set("date", "0");
                return prev;
              },
              { preventScrollReset: true },
            );
          }}
        >
          <div className="flex flex-col gap-4">
            <Input
              type="text"
              name="description"
              required
              placeholder="Tambahkan judul transaksi"
              variant="ghost"
              className="text-base font-semibold text-black placeholder:font-normal"
            />
            <NumericFormat
              thousandSeparator="."
              decimalSeparator=","
              name="amount"
              allowLeadingZeros
              allowNegative={false}
              placeholder="Nominal"
              prefix="IDR "
              className={cn(
                inputVariants({ variant: "ghost" }),
                "text-base font-semibold text-black placeholder:font-normal",
              )}
            />
            <Select value={trxType} onValueChange={(v) => setTrxType(v)}>
              <SelectTrigger className="w-full text-black">
                <SelectValue placeholder="Tipe transaksi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="invoice">
                  <div className="flex gap-2">
                    <FileInput size={18} strokeWidth={2} />
                    <span>Invoice</span>
                  </div>
                </SelectItem>
                <SelectItem value="cash_in">
                  <div className="flex gap-2">
                    <ArrowRight size={18} strokeWidth={2} />
                    <span>Pemasukan</span>
                  </div>
                </SelectItem>
                <SelectItem value="cash_out">
                  <div className="flex gap-2">
                    <ArrowLeft size={18} strokeWidth={2} />
                    <span>Pengeluaran</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <div className="flex flex-col gap-0.5">
              <p className="text-sm">Tambahkan waktu atau atur perulangan</p>
              <div className="flex flex-col gap-4 rounded-lg border bg-secondary px-3 py-6 shadow-sm">
                <label
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "flex w-fit gap-1 bg-white px-3",
                  )}
                >
                  <span>
                    {format(date, "d MMMM yyyy", { locale: localeId })}
                  </span>
                  <span>:</span>
                  <input
                    type="time"
                    value={timeValue}
                    onChange={handleTimeChange}
                    className="bg-transparent"
                  />
                </label>
                <div className="flex items-center gap-4">
                  <Select
                    defaultValue="none"
                    value={loopType}
                    onValueChange={(v) => setLoopType(v)}
                  >
                    <SelectTrigger className="w-fit rounded-lg bg-white text-black">
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
                      maxLength={3}
                      name="loop_count"
                      prefix="x"
                      allowLeadingZeros
                      allowNegative={false}
                      placeholder="Masukan pengulangan"
                      className={cn(
                        inputVariants({ variant: "ghost" }),
                        "text-black placeholder:font-normal",
                      )}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-sm">Sumber rekening</p>
            <ToggleGroup
              type="single"
              className="flex flex-col gap-4 rounded-lg border bg-secondary px-3 py-6 shadow-sm"
            >
              <SourceOfFund
                value="a"
                name="Debit Mandiri"
                accountNumber={12000047824516}
                balance={179000900}
              />
              <SourceOfFund
                value="b"
                name="Debit BCA"
                accountNumber={6289580025}
                balance={10500000}
              />
            </ToggleGroup>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Batalkan
              </Button>
            </DialogClose>
            <Button type="submit">Buat Transaksi</Button>
          </DialogFooter>

          <input type="hidden" name="type" value={trxType} />
          <input type="hidden" name="loop_type" value={loopType} />
          <input
            type="hidden"
            name="date_time"
            value={`${format(new Date(date), "yyyy-MM-dd")} ${timeValue}`}
          />
          <input type="hidden" name="workspaces_id" value={workspaceId} />
          <input type="hidden" name="workspace_name" value={workspaceName} />
          <input type="hidden" name="_action" value={actionType} />
        </fetcher.Form>
      </DialogContent>
    </Dialog>
  );
}

function SourceOfFund({
  name,
  accountNumber,
  balance,
  value,
}: {
  name: string;
  accountNumber: number;
  balance: number;
  value: string;
}) {
  return (
    <ToggleGroupItem
      value={value}
      className="flex h-full w-full items-center justify-between gap-4 rounded-lg border-2 border-input/50 bg-white p-4 data-[state=on]:border-primary data-[state=on]:text-black"
    >
      <div className="flex flex-col text-left">
        <h3 className="text-sm font-semibold">{name}</h3>
        <p className="text-sm font-normal text-muted-foreground">
          {accountNumber}
        </p>
      </div>
      <div>
        <h2 className="text-sm font-bold">{toIDR(balance)}</h2>
      </div>
    </ToggleGroupItem>
  );
}
