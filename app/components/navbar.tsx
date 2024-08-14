import { Link, useLocation, useRouteLoaderData } from "@remix-run/react";

import { icons } from "lucide-react";

import { cn } from "~/lib/utils";
import { type loader as rootLoader } from "~/root";

const routeMatcher = ["ws", "settings", "search", "dash"];

export default function Navbar() {
  const rootData = useRouteLoaderData<typeof rootLoader>("root");

  const location = useLocation();
  const isMatch = routeMatcher.includes(location.pathname.split("/")[1]);

  if (!rootData?.isAuth || !isMatch)
    return <div className="block md:hidden"></div>;
  return (
    <div className="block h-16 w-screen border-t border-border/50 shadow-2xl md:hidden">
      <div className="flex h-full w-full gap-1 bg-white">
        <Navigation href="/ws" iconName="ScrollText" title="Beranda" />
        <Navigation href="/dash" iconName="Telescope" title="Analisa" />
        <Navigation href="/settings" iconName="Settings" title="Pengaturan" />
      </div>
    </div>
  );
}

function Navigation({
  href,
  iconName,
  title,
}: {
  href: string;
  iconName: keyof typeof icons;
  title: string;
}) {
  const location = useLocation();
  const isMatch = location.pathname.split("/")[1].includes(href?.split("/")[1]);

  // eslint-disable-next-line import/namespace
  const Icon = icons[iconName];

  return (
    <Link
      to={href}
      className="relative flex h-full w-full justify-center overflow-hidden"
    >
      <button
        className="middle center absolute -top-8 flex h-32 w-full flex-col items-center justify-center gap-1 rounded-full transition-all"
        data-ripple-dark="true"
      >
        <Icon
          size={22}
          strokeWidth={1.5}
          color={isMatch ? "#1ad55f" : "currentColor"}
        />
        <span className={cn("text-[11px]", isMatch && "text-[#1ad55f]")}>
          {title}
        </span>
      </button>
    </Link>
  );
}
