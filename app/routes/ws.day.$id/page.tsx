import { useNavigate, useParams, useSearchParams } from "@remix-run/react";

import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import {
  ArrowLeft,
  ChevronLeft,
  Filter,
  Plus,
  ReceiptText,
} from "lucide-react";

import { Button } from "~/components/ui/button";

import { regenerateDash } from "~/utils/misc";

import ListTransactions from "./list-transactions";

export default function Page() {
  const navigate = useNavigate();

  const BackButton = () => (
    <Button
      variant="ghost"
      size="icon"
      className=""
      onClick={() => navigate(-1)}
    >
      <ChevronLeft size={24} strokeWidth={2} />
    </Button>
  );

  return (
    <div className="flex min-h-screen gap-4">
      <div className="flex-1">
        <div className="z-50 flex h-14 w-full items-center justify-start bg-white px-4 md:hidden md:px-0">
          <BackButton />
        </div>
        <Content />
      </div>
    </div>
  );
}

function Content() {
  const navigation = useNavigate();
  const params = useParams();
  const [searchParams] = useSearchParams();

  const date = searchParams.get("d");
  const title = params.id ? regenerateDash(params.id).withoutTheLast() : "-";

  const BackButton = () => (
    <button onClick={() => navigation(-1)}>
      <p className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <ArrowLeft size={18} strokeWidth={2} />
        <span>Kembali</span>
      </p>
    </button>
  );

  if (!date) return <></>;
  return (
    <div className="my-1 py-6 md:pl-3">
      <div className="flex flex-col gap-8">
        <div className="flex items-start justify-between">
          <div className="hidden flex-col gap-2 md:flex">
            <BackButton />
            <h2 className="text-xl font-bold">
              {format(new Date(date), "d MMMM yyyy", { locale: localeId })}
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <h3 className="text-base font-medium">
              {title.length > 35 ? `${title.substring(0, 35)}..` : title}
            </h3>
          </div>
        </div>
        <div className="divide-y divide-input">
          <Header />
          <ListTransactions />
        </div>
      </div>
    </div>
  );
}

function Header() {
  const [searchParams] = useSearchParams();

  const date = searchParams.get("d");

  if (!date) return <></>;
  return (
    <div className="flex items-end justify-between gap-3 pb-6">
      <div>
        <p className="text-xs font-semibold uppercase text-muted-foreground">
          {format(date, "EEEE", { locale: localeId })}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button size="sm" variant="secondary" className="flex gap-1.5">
          <Filter size={18} strokeWidth={2} />
          <span>Filters</span>
        </Button>
        <Button size="sm" variant="secondary" className="flex gap-1.5">
          <Plus size={18} strokeWidth={2} />
          <span>Catat transaksi</span>
        </Button>
      </div>
    </div>
  );
}
