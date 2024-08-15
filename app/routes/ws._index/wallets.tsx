import { Link } from "@remix-run/react";

import { format } from "date-fns";
import { Plus } from "lucide-react";
import React from "react";

import { Button } from "~/components/ui/button";

import { generateDash } from "~/utils/misc";
import { TWorkspaces } from "~/utils/workspaces.server";

export default function Wallets() {
  return (
    <div className="flex flex-col gap-8">
      <div className="block md:hidden">
        <h4 className="text-[11px] text-muted-foreground">
          SEMUA WORKSPACE ANDA
        </h4>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-4 xl:grid-cols-3">
        <WalletItem _id="asala" name="Mandiri" description="nono" user_id="123" />
        <CreateWallet />
      </div>
    </div>
  );
}

function WalletItem({ _id, name, description }: TWorkspaces) {
  const [isHover, setIsHover] = React.useState(false);

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div
        data-state={isHover ? "open" : "closed"}
        className="absolute z-50 hidden w-full data-[state=closed]:-bottom-[80px] data-[state=open]:bottom-0 data-[state=open]:duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 md:block"
      >
        <div className="relative mb-4 flex gap-4 px-4">
          <Button
            className="w-full rounded-full bg-white"
            variant="outline"
            onMouseEnter={() => setIsHover(true)}
          >
            Ubah Bank JAGO
          </Button>
        </div>
      </div>
      <Link
        to={
          "/ws/" +
          `${generateDash(name)}-${_id}` +
          `?d=${new Date().getFullYear()}-${format(new Date().setDate(new Date().getDate() - 1), "MM")}`
        }
        prefetch="intent"
        className="rounded-2xl"
      >
        <div
          data-state={isHover ? "open" : "closed"}
          className="h-full w-full justify-start rounded-2xl border-transparent bg-white px-0 ring-offset-background md:min-h-40 md:border md:border-input md:px-6 md:py-6 md:hover:bg-background/50 md:data-[state=open]:bg-background/50"
        >
          <div className="flex w-10/12 h-full flex-col justify-between flex-wrap gap-0.5 md:w-full md:gap-1">
            <div>
              <p className="text-wrap text-xs font-normal leading-relaxed text-muted-foreground md:text-sm">
                Saldo
              </p>
              <h4 className="text-lg font-medium md:font-semibold">
                IDR 80.900
              </h4>
            </div>
            <p className="text-wrap text-xs font-medium leading-relaxed md:text-sm">
              Bank JAGO
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

function CreateWallet() {
  return (
    <div className="relative overflow-hidden">
      <button className="h-full w-full justify-start rounded-2xl dashed-line-border bg-white px-0 ring-offset-background md:min-h-40 md:px-6 md:py-6 md:bg-background/50 md:data-[state=open]:bg-background/50">
        <div className="flex items-center h-full flex-col justify-center flex-wrap gap-0.5 md:w-full md:gap-3">
          <Plus size={20} strokeWidth={2.5} />
          <h3 className="text-sm font-bold">Buat dompet</h3>
        </div>
      </button>
    </div>
  );
}