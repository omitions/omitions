import { LinkProps, useLocation } from '@remix-run/react';

import { icons } from 'lucide-react';

import { Button, ButtonLink } from '~/components/ui/button';

import { cn } from '~/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

export default function Sidebar() {
  return (
    <div className="px-2 py-4 gap-1 flex flex-col justify-between h-full">
      <div></div>
      <div className="flex flex-col items-center gap-2">
        <NavItem
          href="/dash"
          iconName="Telescope"
          title="Analisa"
        />
        <NavItem
          href="/ws"
          iconName="ScrollText"
          title="Beranda"
        />
        <NavItem
          href="/searchs"
          iconName="Search"
          title="Cari apapun"
        />
        <NavItem
          href="/settings"
          iconName="Settings"
          title="Pengaturan"
        />
      </div>
      <div>
        <NavItem
          href="/logout"
          iconName="LogOut"
          title="Keluar"
        />
      </div>
    </div>
  )
}

function NavItem({
  href,
  prefetch,
  iconName,
  title,
  disabled,
}: {
  href: string
  prefetch?: LinkProps['prefetch']
  iconName: keyof typeof icons
  title: string
  disabled?: boolean
}) {
  const location = useLocation();
  const isMatch = location.pathname.split("/")[1].includes(href?.split("/")[1]);

  // eslint-disable-next-line import/namespace
  const Icon = icons[iconName];

  const Comp = href ? ButtonLink : Button
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Comp
            disabled={disabled}
            href={href}
            prefetch={prefetch}
            variant="ghost"
            className={cn(
              'justify-center hover:bg-primary/20 h-9 w-9 rounded-full p-2',
              isMatch && "bg-primary/20",
            )}
          >
            <Icon
              size={18}
              strokeWidth={isMatch ? 2.5 : 2}
            />
          </Comp>
        </TooltipTrigger>
        <TooltipContent
          align="center"
          side="right"
          sideOffset={3}
        >
          <p className={cn(isMatch ? "font-semibold" : "font-medium")}>{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}