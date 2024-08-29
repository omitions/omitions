import { Link, useLocation, useRouteLoaderData } from "@remix-run/react";

import { icons, Search } from "lucide-react";

import { cn } from "~/lib/utils";
import { type loader as rootLoader } from "~/root";

import { SearchDialog } from "./search";

const routeMatcher = ["ws", "settings", "search", "dash"];

export default function Navbar() {
  const rootData = useRouteLoaderData<typeof rootLoader>("root");

  const location = useLocation();
  const isMatch = routeMatcher.includes(location.pathname.split("/")[1]);

  if (!rootData?.isAuth || !isMatch)
    return <div className="block md:hidden"></div>;
  return (
    <div className="block h-16 w-[80vw] rounded-full border border-border/50 bg-white/50 shadow-2xl backdrop-blur-md md:hidden">
      <div className="flex h-full w-full p-1.5">
        <Navigation href="/ws" title="Beranda" />
        <Navigation href="/dash" title="Analisa" />
        <SearchDialog>
          <div className="relative flex h-full w-full justify-center overflow-hidden">
            <button
              className={cn(
                "middle center flex h-full w-full flex-col items-center justify-center gap-1.5 rounded-full transition-all",
              )}
              data-ripple-dark="true"
            >
              <span className="text-sm font-medium">Cari</span>
            </button>
          </div>
        </SearchDialog>
      </div>
    </div>
  );
}

function Navigation({ href, title }: { href: string; title: string }) {
  const location = useLocation();
  const isMatch = location.pathname.split("/")[1].includes(href?.split("/")[1]);

  return (
    <Link
      to={href}
      className="relative flex h-full w-full justify-center overflow-hidden"
    >
      <button
        className={cn(
          "middle center flex h-full w-full flex-col items-center justify-center gap-1.5 rounded-full border border-transparent transition-all",
          isMatch && "border-input bg-secondary",
        )}
        data-ripple-dark="true"
      >
        <span className={cn("text-sm font-medium", isMatch && "font-semibold")}>
          {title}
        </span>
      </button>
    </Link>
  );
}
