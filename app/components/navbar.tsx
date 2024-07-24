import { Link } from "@remix-run/react";
import { icons } from "lucide-react";

export default function Navbar() {
  return (
    <div className="border-t h-24 w-screen">
      <div className="flex gap-8 h-full w-full bg-background">
        <Navigation
          href="/ws"
          iconName="House"
        />
        <Navigation
          href="/ws"
          iconName="LineChart"
        />
        <Navigation
          href="/ws"
          iconName="Search"
        />
      </div>
    </div>
  )
}

function Navigation({
  href,
  iconName
}: {
  href: string
  iconName: keyof typeof icons
}) {
  // eslint-disable-next-line import/namespace
  const Icon = icons[iconName];

  return (
    <button
      className="
        middle none
        flex justify-center items-start pt-5
        w-full h-full
        transition-all
      "
      data-ripple-light="true"
    >
      <Link to={href}>
        <Icon size={22} />
      </Link>
    </button>
  )
}