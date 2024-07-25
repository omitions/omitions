import {
  Link,
  useLocation,
  useRouteLoaderData
} from "@remix-run/react";

import { icons } from "lucide-react";

import { cn } from "~/lib/utils";
import { type loader as rootLoader } from "~/root";

const routeMatcher = ["ws", "settings", "search", "dash"];

export default function Navbar() {
  const rootData = useRouteLoaderData<typeof rootLoader>("root");

  const location = useLocation();
  const isMatch = routeMatcher.includes(location.pathname.split("/")[1]);

  if (!rootData?.isAuth || !isMatch) return <div className="block md:hidden"></div>
  return (
    <div className="block md:hidden border-t border-border/50 shadow-2xl h-20 w-screen">
      <div className="flex gap-1 h-full w-full bg-white">
        <Navigation
          href="/ws"
          iconName="ScrollText"
          title="Beranda"
        />
        <Navigation
          href="/dash"
          iconName="Telescope"
          title="Analisa"
        />
        <Navigation
          href="/search"
          iconName="Search"
          title="Cari"
        />
        <Navigation
          href="/settings"
          iconName="Settings"
          title="Pengaturan"
        />
      </div>
    </div>
  )
}

function Navigation({
  href,
  iconName,
  title
}: {
  href: string
  iconName: keyof typeof icons
  title: string
}) {
  const location = useLocation();
  const isMatch = location.pathname.split("/")[1].includes(href?.split("/")[1]);

  // eslint-disable-next-line import/namespace
  const Icon = icons[iconName];

  return (
    <Link
      to={href}
      className="w-full h-full relative overflow-hidden"
    >
      <button
        className="
          middle center
          flex flex-col gap-1 justify-center items-center
          w-full h-28
          absolute
          -top-5
          rounded-full
          transition-all
        "
        data-ripple-dark="true"
      >
        <Icon
          size={18}
          strokeWidth={1.5}
          color={isMatch ? "#1ad55f" : "currentColor"}
        />
        <span className={cn("text-[10px]", isMatch && "text-[#1ad55f]")}>{title}</span>
      </button>
    </Link>
  )
}