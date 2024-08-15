import { useLoaderData } from "@remix-run/react";

import { ArrowUp, MoveHorizontal, Plus, Wallet } from "lucide-react";

import toIDR from "~/utils/currency";
import { TTransactions } from "~/utils/transactions.server";

import { cn } from "~/lib/utils";

import { loader } from "./route";

export default function ListTransactions() {
  const { transactions } = useLoaderData<typeof loader>();

  return (
    <div>
      <div className="flex flex-col divide-y divide-input">
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
          <p className="py-6 text-center text-sm">Belum Ada Transakasi</p>
        )}
      </div>
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
    <div className="relative flex h-full cursor-pointer items-center justify-between gap-4 overflow-hidden p-4 hover:shadow-md">
      <div className="flex items-center gap-4">
        <div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background">
            {type === "cash_out" && <ArrowUp size={20} strokeWidth={2} />}
            {type === "cash_in" && <Plus size={20} strokeWidth={2} />}
            {type === "invoice" && <MoveHorizontal size={20} strokeWidth={2} />}
          </div>
        </div>
        <div className="flex flex-col gap-0.5">
          <h3 className="w-full max-w-48 whitespace-nowrap text-base font-semibold">
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
          <div className="rounded-full bg-background p-2">
            <Wallet
              size={18}
              className="stroke-muted-foreground"
              strokeWidth={2}
            />
          </div>
          <p className="text-sm font-medium text-muted-foreground">Bank JAGO</p>
        </div>
      </div>
    </div>
  );
}

const data: TTransactions[] = [
  {
    _id: "66ba242a786c228fd276e730",
    amount: 19500,
    date_time: "2024-08-14 12:30",
    description: "QR Bayar",
    loop_count: 1,
    loop_type: "daily",
    type: "cash_out",
    workspaces_id: "66a001309c21ba93639358d3",
  },
  {
    _id: "66ba269f786c228fd276e731",
    amount: 5600,
    date_time: "2024-08-14 12:40",
    description: "QR Bayar",
    loop_count: 1,
    loop_type: "daily",
    type: "cash_out",
    workspaces_id: "66a001309c21ba93639358d3",
  },
  {
    _id: "66ba26e4786c228fd276e734",
    amount: 7500,
    date_time: "2024-08-11 12:50",
    description: "QR Bayar",
    loop_count: 1,
    loop_type: "daily",
    type: "cash_out",
    workspaces_id: "66a001309c21ba93639358d3",
  },
  {
    _id: "66ba26e4786c228fd276e732",
    amount: 7500,
    date_time: "2024-08-11 12:50",
    description: "QR Bayar",
    loop_count: 1,
    loop_type: "daily",
    type: "invoice",
    workspaces_id: "66a001309c21ba93639358d4",
  },
  {
    _id: "66ba2846786c228fd276e733",
    amount: 7800000,
    date_time: "2024-09-30 12:45",
    description: "Gajian",
    loop_count: 1,
    loop_type: "daily",
    type: "cash_in",
    workspaces_id: "66a001309c21ba93639358d3",
  },
  {
    _id: "66ba28b7786c228fd276e734",
    amount: 56900,
    date_time: "2024-09-30 01:42",
    description: "QR Bayar",
    loop_count: 1,
    loop_type: "daily",
    type: "cash_out",
    workspaces_id: "66a001309c21ba93639358d3",
  },
  {
    _id: "66ba28ed786c228fd276e735",
    amount: 5500,
    date_time: "2024-09-30 12:02",
    description: "QR Bayar",
    loop_count: 1,
    loop_type: "daily",
    type: "cash_out",
    workspaces_id: "66a001309c21ba93639358d3",
  },
];
