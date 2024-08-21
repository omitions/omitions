import { CirclePlus, PencilLine, Trash2 } from "lucide-react";
import React from "react";

import CreateWallet from "~/components/create-wallet";
import RemoveWallet from "~/components/remove-wallet";
import { Button } from "~/components/ui/button";
import UpdateWallet from "~/components/update-wallet";
import { cn } from "~/lib/utils";

export default function Wallets() {
  return (
    <div className="flex flex-col gap-6">
      <div className="block md:hidden">
        <h4 className="text-[11px] text-muted-foreground">
          SEMUA WORKSPACE ANDA
        </h4>
      </div>
      <div className="hidden flex-col gap-0.5 md:flex">
        <h2 className="text-lg font-bold">Sumber Dana</h2>
        <p className="text-sm font-normal text-muted-foreground">
          Sumber dana dari setiap transaksi Anda
        </p>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
        <WalletItem />
        <ButtonCreateWallet />
      </div>
    </div>
  );
}

function WalletItem() {
  const [isActive, setIsActive] = React.useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <button
        onFocus={() => setIsActive(true)}
        className="h-full w-full justify-start rounded-lg border-transparent bg-white px-0 shadow-sm ring-offset-background hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-70 md:min-h-48 md:border md:border-input/30 md:p-5 md:hover:border-input"
      >
        <div className="flex h-full w-10/12 flex-col flex-wrap items-start justify-between md:w-full md:gap-1">
          <div className="flex flex-col items-start gap-0.5">
            <p className="text-wrap text-xs font-normal leading-relaxed text-muted-foreground md:text-sm">
              Saldo
            </p>
            <h4 className="text-base font-medium md:font-semibold">
              IDR 17.240.900
            </h4>
            <p className="text-wrap text-xs font-medium leading-relaxed md:text-sm">
              Bank JAGO {isActive ? "active" : "disabled"}
            </p>
          </div>
        </div>
      </button>
      <div
        className={cn(
          "absolute bottom-0 hidden w-full",
          isActive && "md:block",
        )}
      >
        <div className="relative mb-4 flex gap-2 px-4">
          <UpdateWallet actionType="UPDATEE__WE">
            <Button
              className="w-full gap-2 rounded-full bg-white px-0"
              variant="outline"
              onFocus={() => setIsActive(true)}
            >
              <PencilLine size={16} strokeWidth={2} />
              <span>Ubah</span>
            </Button>
          </UpdateWallet>
          <RemoveWallet actionType="">
            <div>
              <Button
                className="!h-11 !w-11 rounded-full px-0"
                variant="outline"
                size="icon"
                onFocus={() => setIsActive(true)}
              >
                <Trash2 size={20} strokeWidth={2} />
              </Button>
            </div>
          </RemoveWallet>
        </div>
      </div>
    </div>
  );
}

function ButtonCreateWallet() {
  return (
    <div className="relative rounded-lg shadow-sm hover:shadow-md">
      <CreateWallet actionType="HELLOO">
        <button className="h-full w-full justify-start rounded-lg border border-dashed border-input/30 bg-white px-0 shadow-sm ring-offset-background hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-70 md:min-h-48 md:p-5">
          <div className="flex h-full flex-col flex-wrap items-center justify-center gap-0.5 md:w-full md:gap-3">
            <CirclePlus size={24} strokeWidth={2} />
            <h3 className="text-xs font-medium md:text-sm">Buat dompet</h3>
          </div>
        </button>
      </CreateWallet>
    </div>
  );
}
