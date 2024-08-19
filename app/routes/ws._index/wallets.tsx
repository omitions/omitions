import { CirclePlus, Trash2 } from "lucide-react";
import React from "react";

import CreateWallet from "~/components/create-wallet";
import { Button } from "~/components/ui/button";
import UpdateWallet from "~/components/update-wallet";

export default function Wallets() {
  return (
    <div className="flex flex-col gap-8">
      <div className="block md:hidden">
        <h4 className="text-[11px] text-muted-foreground">
          SEMUA WORKSPACE ANDA
        </h4>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 xl:grid-cols-3">
        <WalletItem />
        <ButtonCreateWallet />
      </div>
    </div>
  );
}

function WalletItem() {
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
          <UpdateWallet actionType="UPDATEE__WE">
            <Button
              className="w-full rounded-full bg-white"
              variant="outline"
              onMouseEnter={() => setIsHover(true)}
            >
              Ubah Bank JAGO
            </Button>
          </UpdateWallet>
          <div>
            <Button
              className="!h-11 !w-11 rounded-full"
              variant="outline"
              size="icon"
              onMouseEnter={() => setIsHover(true)}
            >
              <Trash2 size={20} strokeWidth={2} />
            </Button>
          </div>
        </div>
      </div>
      <div className="h-full rounded-lg">
        <div
          data-state={isHover ? "open" : "closed"}
          className="h-full w-full justify-start rounded-lg border-transparent bg-white px-0 ring-offset-background md:min-h-44 md:border md:border-input md:px-6 md:py-6 md:hover:bg-background/50 md:data-[state=open]:bg-background/50"
        >
          <div className="flex h-full w-10/12 flex-col flex-wrap justify-between md:w-full md:gap-1">
            <div className="flex flex-col gap-0.5">
              <p className="text-wrap text-xs font-normal leading-relaxed text-muted-foreground md:text-sm">
                Saldo
              </p>
              <h4 className="text-base font-medium md:font-semibold">
                IDR 80.900
              </h4>
            </div>
            <p className="text-wrap text-xs font-medium leading-relaxed md:text-sm md:font-bold">
              Bank JAGO
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ButtonCreateWallet() {
  return (
    <div className="relative overflow-hidden">
      <CreateWallet actionType="HELLOO">
        <button className="h-full w-full justify-start rounded-lg border border-dashed px-0 ring-offset-background md:min-h-44 md:px-6 md:py-6">
          <div className="flex h-full flex-col flex-wrap items-center justify-center gap-0.5 md:w-full md:gap-3">
            <CirclePlus size={24} strokeWidth={2} />
            <h3 className="text-xs font-semibold md:text-sm">Buat dompet</h3>
          </div>
        </button>
      </CreateWallet>
    </div>
  );
}
