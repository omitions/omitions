import { useFetcher, useLoaderData, useSearchParams } from "@remix-run/react";

import { ArrowUp, Plus, ReceiptText, Wallet } from "lucide-react";

import CreateTransaction from "~/components/create-transaction";

import { TTransactions } from "~/utils/cashflows.server";
import toIDR from "~/utils/currency";

import { cn } from "~/lib/utils";

import { loader } from "./route";

export default function List() {
  const { transactions } = useLoaderData<typeof loader>();

  const fetcher = useFetcher({ key: "create-transaction" });
  const [searchParams] = useSearchParams();

  const data = transactions as TTransactions[];
  const date = new Date(searchParams.get("d")?.toString() || "") ?? new Date();

  if (!date) return <></>;
  return (
    <div className="flex flex-col">
      {data?.length ? (
        data.map((props) => (
          <Transaction
            key={props._id}
            type={props.type}
            amount={props.amount}
            description={props.description}
            date_time={props.date_time}
          />
        ))
      ) : (
        <div className="mt-6 flex h-[400px] items-center justify-center rounded-lg border border-dashed border-input">
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="flex flex-col gap-1">
              <h3 className="text-center text-base font-semibold">
                Data kosong
              </h3>
              <p className="max-w-sm text-center text-sm">
                Belum memiliki catatan transaksi, silahkan klik tombol dibawah
                ini untuk memulai menulis transaksi Anda..
              </p>
            </div>
            <CreateTransaction
              date={date}
              // actionType="CREATE_TRANSACTION"
              // fetcher={fetcher}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function Transaction({
  type,
  amount,
  description,
  date_time,
}: Pick<TTransactions, "type" | "amount" | "description" | "date_time">) {
  return (
    <div className="relative flex h-full cursor-pointer items-center justify-between gap-4 overflow-hidden border border-transparent px-6 py-4 last:rounded-b-2xl hover:border-input hover:shadow-md">
      <div className="flex items-center gap-4">
        <div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
            {type === "cash_out" && <ArrowUp size={20} strokeWidth={2} />}
            {type === "cash_in" && <Plus size={20} strokeWidth={2} />}
            {type === "invoice" && <ReceiptText size={20} strokeWidth={2} />}
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="w-full max-w-48 whitespace-nowrap text-sm font-bold">
            {description}
          </h3>
          <p className="whitespace-nowrap text-sm font-normal text-muted-foreground">
            {type === "cash_in" && "Pemasukan"}
            {type === "cash_out" && "Pengeluaran"}
            {type === "invoice" && "Invoice"}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-end gap-0.5">
          <p className="text-xs font-normal text-muted-foreground">
            {date_time.split(" ")[1]}
          </p>
          <h3
            className={cn(
              "text-base font-bold",
              type === "cash_in" && "text-primary",
            )}
          >
            <span>{type === "cash_in" ? "+" : "-"}</span>
            <span> </span>
            <span>{toIDR(amount)}</span>
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-secondary p-2">
            <Wallet
              size={18}
              strokeWidth={2}
              className="stroke-muted-foreground"
            />
          </div>
          <p className="text-sm font-medium text-muted-foreground">Bank JAGO</p>
        </div>
      </div>
    </div>
  );
}
