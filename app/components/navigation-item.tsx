import { LinkProps, useLocation } from "@remix-run/react";

import { icons } from "lucide-react";

import { ButtonLink } from "~/components/ui/button";

import { cn } from "~/lib/utils";

export default function NavItem({
  href,
  prefetch,
  iconName,
  title,
  disabled,
  delay,
}: {
  href?: string;
  prefetch?: LinkProps["prefetch"];
  iconName: keyof typeof icons;
  title: string;
  disabled?: boolean;
  delay?: number;
}) {
  const location = useLocation();
  const isMatch = location.pathname === href;

  // eslint-disable-next-line import/namespace
  const Icon = icons[iconName];

  return (
    <ButtonLink
      disabled={disabled}
      href={href}
      prefetch={prefetch}
      delay={delay}
      variant="ghost"
      size="sm"
      className={cn(
        "w-full justify-start gap-3 rounded-full px-4 py-3 text-sm font-medium",
        isMatch &&
          "border border-black bg-primary/30 font-bold hover:bg-primary/30",
      )}
    >
      <div className="flex items-center gap-3">
        <Icon size={18} strokeWidth={isMatch ? 2.5 : 2} />
        <span>{title}</span>
      </div>
    </ButtonLink>
  );
}
