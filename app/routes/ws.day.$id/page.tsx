import {
  Link,
  useFetcher,
  useLoaderData,
  useNavigate,
  useParams,
  useSearchParams,
} from "@remix-run/react";

import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { ArrowLeft, ChevronLeft } from "lucide-react";

import CreateTransaction from "~/components/create-transaction";
import { Button } from "~/components/ui/button";

import { WorkspaceIcon } from "~/utils/icons";
import { generateDash, regenerateDash } from "~/utils/misc";

import List from "./list";
import { loader } from "./route";

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
    <div className="m-5 flex gap-4 rounded-2xl bg-white shadow-sm">
      <div className="flex-1">
        <div className="z-50 flex h-14 w-full items-center justify-start bg-white px-6 md:hidden md:px-0">
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
  const [searchParams, setSearchParams] = useSearchParams();

  const workspaceId = params.id ? regenerateDash(params.id).getTheLast() : "";
  const workspaceName = params.id
    ? regenerateDash(params.id).withoutTheLast()
    : "-";

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

  let prevDate, nextDate;

  if (date) {
    prevDate = new Date(date);
    prevDate.setDate(prevDate.getDate() - 1);

    nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
  }
  if (!date || !prevDate || !nextDate) return <></>;
  return (
    <div className="flex flex-col gap-6 md:gap-0">
      <div className="fixed z-50 w-[calc(100%_-_var(--sidebar-width-all)_-_40px)] max-w-[2800px] rounded-t-2xl border-b border-input/50 bg-white pt-6">
        <div className="flex items-start justify-between md:px-6">
          <div className="hidden flex-col gap-2 md:flex">
            <BackButton />
            <h2 className="text-lg font-bold">
              {format(new Date(date), "EEEE dd, MMMM yyyy", {
                locale: localeId,
              })}
            </h2>
            <Link
              to={
                "/ws/" +
                `${generateDash(workspaceName)}-${workspaceId}` +
                `?d=${format(new Date().setDate(new Date().getDate() - 1), "yyyy-MM")}`
              }
              className="flex items-center gap-2.5"
            >
              <WorkspaceIcon />
              <h3 className="text-base font-medium underline">
                {title.length > 35 ? `${title.substring(0, 35)}..` : title}
              </h3>
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1 md:gap-2">
              <Button
                size="sm"
                variant="ghost"
                className="!h-10 gap-2 p-0 px-5 hover:font-semibold"
                onClick={() => {
                  setSearchParams(
                    (prev) => {
                      prev.set(
                        "d",
                        `${format(new Date(prevDate), "yyyy-MM-dd")}`,
                      );
                      return prev;
                    },
                    { preventScrollReset: true },
                  );
                }}
              >
                <span>{new Date(prevDate).getDate()}</span>
                <span>Sebelumnya</span>
              </Button>
              <Button size="sm" variant="secondary" className="!h-10 !w-10 p-0">
                {new Date(date).getDate()}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="!h-10 gap-2 p-0 px-5 hover:font-semibold"
                onClick={() => {
                  setSearchParams(
                    (prev) => {
                      prev.set(
                        "d",
                        `${format(new Date(nextDate), "yyyy-MM-dd")}`,
                      );
                      return prev;
                    },
                    { preventScrollReset: true },
                  );
                }}
              >
                <span>Berikutnya</span>
                <span>{new Date(nextDate).getDate()}</span>
              </Button>
            </div>
          </div>
        </div>
        <Header />
      </div>
      <div className="mt-[calc(138px_+_var(--header-height))]">
        <List />
      </div>
    </div>
  );
}

function Header() {
  const { transactions } = useLoaderData<typeof loader>();

  const [searchParams] = useSearchParams();
  const fetcher = useFetcher({ key: "create-transaction" });

  const date = new Date(searchParams.get("d")?.toString() || "") ?? new Date();

  if (!date) return <></>;
  return (
    <div className="flex items-end justify-between gap-3 pb-6 md:px-6 md:pt-6">
      <div>
        <p className="text-xs font-semibold uppercase text-muted-foreground">
          Transaksi
        </p>
      </div>
      {transactions?.length ? (
        <div className="flex items-center gap-3">
          <CreateTransaction date={date} fetcher={fetcher} />
        </div>
      ) : (
        <div className="h-10"></div>
      )}
    </div>
  );
}
