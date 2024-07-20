import { LinkProps, useLocation } from '@remix-run/react';

import { icons } from 'lucide-react';

import { Button, ButtonLink } from '~/components/ui/button';

import { cn } from '~/lib/utils';

export default function Sidebar() {
  return (
    <div className="p-2 gap-1 flex flex-col justify-between h-full">
      <div></div>
      <div className="flex flex-col gap-1">
        <NavItem
          href="/ws"
          iconName="House"
          title="Beranda"
        />
        <NavItem
          href="/searchs"
          iconName="Search"
          title="Cari"
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
          title="Pengaturan"
        />
      </div>
    </div>
  )
}

function NavItem({
  href,
  prefetch,
  iconName,
  // title,
  disabled,
}: {
  href: string
  prefetch?: LinkProps['prefetch']
  iconName: keyof typeof icons
  title: string
  disabled?: boolean
}) {
  const location = useLocation()

  const isMatch = location.pathname.split("/")[1].includes(href?.split("/")[1])

  // eslint-disable-next-line import/namespace
  const Icon = icons[iconName]

  const Comp = href ? ButtonLink : Button
  return (
    <Comp
      disabled={disabled}
      href={href}
      prefetch={prefetch}
      variant="ghost"
      className={cn(
        'w-full justify-center hover:bg-primary/20 rounded-full p-2',
        isMatch && "bg-primary/20",
      )}
    >
      <Icon
        size={16}
        strokeWidth={isMatch ? 3 : 2}
      />
    </Comp>
  )
}