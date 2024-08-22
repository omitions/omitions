import { useParams } from "@remix-run/react";

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
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

import { regenerateDash } from "~/utils/misc";

import { cn } from "~/lib/utils";

export default function CreateTransaction({ date }: { date: Date }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [trxType, setTrxType] = React.useState<string | undefined>(undefined);

  const params = useParams();

  const workspaceName = params.id
    ? regenerateDash(params.id).withoutTheLast()
    : "-";

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button size="sm" variant="secondary" className="flex gap-1.5">
          <Plus size={18} strokeWidth={2} />
          <span>Catat transaksi</span>
        </Button>
      </SheetTrigger>
      <SheetContent withCloseButton className="sm:max-w-lg">
        <SheetHeader>
          <SheetDescription className="font-medium">
            {workspaceName}
          </SheetDescription>
          <SheetTitle>
            Catat Transaksi{" "}
            {format(date, "EEEE dd, MMMM yyyy", { locale: localeId })}
          </SheetTitle>
        </SheetHeader>
        <div className="mx-8 flex flex-col gap-4">
          <Input
            type="text"
            name="description"
            required
            placeholder="Tambahkan judul transaksi"
            className="placeholder:font-normal"
          />
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
          <Select>
            <SelectTrigger className="w-full gap-1 text-black">
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
      </SheetContent>
    </Sheet>
  );
}
