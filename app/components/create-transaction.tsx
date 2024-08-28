import { FetcherWithComponents, useParams } from "@remix-run/react";

import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { ArrowUp, Plus, ReceiptText } from "lucide-react";
import React from "react";
import { NumericFormat } from "react-number-format";

import { Button } from "~/components/ui/button";
import { Input, inputVariants } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";

import { cn } from "~/lib/utils";

import toIDR from "~/utils/currency";
import { WorkspaceIcon } from "~/utils/icons";
import { regenerateDash } from "~/utils/misc";

export default function CreateTransaction({
  date,
  fetcher,
  children,
}: {
  date: Date;
  fetcher: FetcherWithComponents<unknown>;
  children?: React.ReactNode;
}) {
  const [loopType, setLoopType] = React.useState("none");
  const [isOpen, setIsOpen] = React.useState(false);
  const [timeValue, setTimeValue] = React.useState<string>("00:00");
  const [trxType, setTrxType] = React.useState<string | undefined>(undefined);

  const handleTimeChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const time = e.target.value;
    setTimeValue(time);
  };

  const getLoopTypeString = (key: string) => {
    switch (key) {
      case "weekly":
        return {
          label: "minggu",
          loop: "Mingguan",
        };
      case "daily":
        return {
          label: "hari",
          loop: "Harian",
        };
      case "monthly":
        return {
          label: "bulan",
          loop: "Bulanan",
        };
      case "annual":
        return {
          label: "tahun",
          loop: "Tahunan",
        };
      default:
        return {
          label: "Tidak Ada",
          loop: "Tidak Berulang",
        };
    }
  };

  const params = useParams();

  const workspaceName = params.id
    ? regenerateDash(params.id).withoutTheLast()
    : "-";
  const workspaceId = params.id ? regenerateDash(params.id).getTheLast() : "";

  const isSubmitting =
    fetcher.state === "submitting" || fetcher.state === "loading";

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {children ?? (
          <Button
            size="sm"
            variant="secondary"
            className="flex !h-10 gap-1.5 px-5"
          >
            <Plus size={18} strokeWidth={2} />
            <span>Catat transaksi</span>
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="sm:max-w-lg">
        <SheetHeader className="flex-row gap-2.5 px-4 md:px-8">
          <div className="hidden md:block">
            <WorkspaceIcon />
          </div>
          <div>
            <SheetTitle className="">
              Catat Transaksi{" "}
              {format(date, "EEEE d, MMMM yyyy", { locale: localeId })}
            </SheetTitle>
            <SheetDescription>{workspaceName}</SheetDescription>
          </div>
        </SheetHeader>
        <fetcher.Form
          action="."
          method="post"
          key="create-transaction"
          className="flex flex-col gap-4"
          onSubmit={() => {
            setIsOpen(false);
          }}
        >
          <div className="px-4 md:px-8">
            <Input
              type="text"
              name="description"
              required
              placeholder="Tambahkan judul transaksi"
              className="placeholder:font-normal"
            />
          </div>
          <div className="px-4 md:px-8">
            <NumericFormat
              thousandSeparator="."
              decimalSeparator=","
              name="amount"
              allowLeadingZeros
              allowNegative={false}
              placeholder="Nominal"
              prefix="IDR "
              className={cn(inputVariants(), "placeholder:font-normal")}
            />
          </div>
          <div className="px-4 md:px-8">
            <Select value={trxType} onValueChange={(v) => setTrxType(v)}>
              <SelectTrigger className="w-full gap-1">
                <SelectValue placeholder="Tipe transaksi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash_in">
                  <div className="flex items-center gap-3">
                    <Plus size={16} strokeWidth={2} />
                    <span>Pemasukan</span>
                  </div>
                </SelectItem>
                <SelectItem value="cash_out">
                  <div className="flex items-center gap-3">
                    <ArrowUp size={16} strokeWidth={2} />
                    <span>Pengeluaran</span>
                  </div>
                </SelectItem>
                <SelectItem value="invoice">
                  <div className="flex items-center gap-3">
                    <ReceiptText size={16} strokeWidth={2} />
                    <span>Invoice</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mt-5 flex flex-col gap-2.5 px-4 md:px-8">
            <p className="text-sm font-semibold">Tambahkan Waktu</p>
            <Select
              defaultValue="none"
              value={loopType}
              onValueChange={(v) => setLoopType(v)}
            >
              <SelectTrigger
                className={cn(
                  "w-full rounded-lg",
                  loopType === "none" && "font-normal text-muted-foreground",
                )}
              >
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
                defaultValue={1}
                name="loop_count"
                prefix="Diulang "
                suffix={`x kedepan, setiap ${getLoopTypeString(loopType).label}`}
                allowLeadingZeros
                allowNegative={false}
                placeholder="Masukan pengulangan"
                className={cn(inputVariants({}), "")}
              />
            )}
            <div className="relative">
              <input
                id="trx-time"
                type="time"
                value={timeValue}
                onChange={handleTimeChange}
                className={cn(
                  "peer absolute bottom-0 right-2 top-0 z-50 bg-transparent text-sm font-medium text-foreground focus:outline-none",
                  timeValue === "00:00" && "font-normal text-muted-foreground",
                )}
              />
              <label
                htmlFor="trx-time"
                className={cn(
                  inputVariants({}),
                  "relative items-center gap-1 font-medium text-foreground peer-focus:border-primary peer-focus-visible:ring-2 peer-focus-visible:ring-primary/30",
                  timeValue === "00:00" && "font-normal text-muted-foreground",
                )}
              >
                <span>
                  {format(date, "d, MMMM yyyy", { locale: localeId })}
                </span>
              </label>
            </div>
          </div>
          <div className="mt-5 flex flex-col gap-2.5 px-4 md:px-8">
            <p className="text-sm font-semibold">Sumber Dana</p>
            <ToggleGroup type="single" className="flex flex-col gap-2">
              <SourceOfFund
                value="a"
                name="Bank JAG0"
                accountNumber={12000047824516}
                balance={17240900}
              />
            </ToggleGroup>
          </div>
          <SheetFooter className="z-50 flex w-full gap-2 px-4 md:gap-3 md:px-8">
            <SheetClose className="w-full" asChild>
              <Button type="button" variant="outline" className="md:w-[150px]">
                Batalkan
              </Button>
            </SheetClose>
            <Button
              type="submit"
              className="w-full"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              Buat Transaksi
            </Button>
          </SheetFooter>
          <input type="hidden" name="type" value={trxType} />
          <input type="hidden" name="loop_type" value={loopType} />
          <input
            type="hidden"
            name="date_time"
            value={`${format(new Date(date), "yyyy-MM-dd")} ${timeValue}`}
          />
          <input type="hidden" name="workspaces_id" value={workspaceId} />
          <input type="hidden" name="workspace_name" value={workspaceName} />
          <input type="hidden" name="_action" value="CREATE_TRANSACTION" />
        </fetcher.Form>
      </SheetContent>
    </Sheet>
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
      className="flex h-full w-full items-center justify-between gap-4 rounded-lg border border-input/50 bg-white p-4 data-[state=on]:border-foreground data-[state=on]:text-black"
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
