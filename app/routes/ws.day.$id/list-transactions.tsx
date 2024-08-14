import { useLoaderData } from "@remix-run/react";

import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpLeft,
  IterationCcw,
  IterationCw,
  PencilLine,
  SquareArrowOutUpRight,
} from "lucide-react";

import toIDR from "~/utils/currency";
import { TTransactions } from "~/utils/transactions.server";

import { cn } from "~/lib/utils";

import { loader } from "./route";

export default function ListTransactions() {
  const { transactions } = useLoaderData<typeof loader>();

  return (
    <div>
      <div className="flex flex-col divide-y">
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
    <div className="relative flex h-full cursor-pointer items-center gap-6 overflow-hidden pl-8 first:rounded-t-2xl last:rounded-b-2xl hover:shadow-md">
      <p className="w-full max-w-48 whitespace-nowrap text-sm font-semibold text-black">
        {description}
      </p>
      <p className="whitespace-nowrap text-xs font-normal text-muted-foreground">
        Olympics pictograms serve as universal symbols that bridge language
        barriers.
      </p>
      <div className="flex w-full justify-end">
        <h4
          className={cn(
            "text-sm font-bold",
            type === "cash_in" && "text-primary",
          )}
        >
          <span>{type === "cash_in" ? "+" : "-"}</span>
          <span> </span>
          <span>{toIDR(amount)}</span>
        </h4>
      </div>
      <p className="text-xs font-normal text-muted-foreground">
        {date_time.split(" ")[1]}
      </p>
      <div className="shadow-left ml-4 flex h-full items-center gap-2 px-4 py-3">
        <div className="h-full w-full rounded-lg border border-border bg-white p-2">
          <PencilLine size={14} strokeWidth={3} />
        </div>
        <div className="h-full w-full rounded-lg border border-primary/30 bg-primary/10 p-2">
          <SquareArrowOutUpRight size={14} strokeWidth={3} />
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
    _id: "66ba26e4786c228fd276e732",
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
