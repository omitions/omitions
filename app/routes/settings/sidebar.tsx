import { Link, LinkProps, useLocation } from '@remix-run/react';
import { icons } from 'lucide-react';

import { ButtonLink } from '~/components/ui/button';

import { cn } from '~/lib/utils';

export default function HomeSidebar() {
  return (
    <div className="fixed left-[var(--sidebar-width)] hidden h-ful w-full max-w-[var(--sidebar-width-xl)] md:block border-r border-border">
      <div className="px-4 py-6 my-1 flex flex-col gap-8 min-h-screen">
        <div className="flex items-center">
          <Link
            to="/ws"
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 rounded-sm"
          >
            <h2 className="text-xl mx-2 font-bold">Pengaturan</h2>
          </Link>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <NavItem
              title="Akun"
              href="/settings"
              iconName="UserRoundCog"
            />
            <NavItem
              title="Billing"
              href="/settings/billing"
              iconName="ReceiptText"
            />
          </div>
        </div>
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
  href?: string
  prefetch?: LinkProps['prefetch']
  iconName: keyof typeof icons
  title: string
  disabled?: boolean
}) {
  const location = useLocation()

  const isMatch = location.pathname === href

  // eslint-disable-next-line import/namespace
  const Icon = icons[iconName]

  return (
    <ButtonLink
      disabled={disabled}
      href={href}
      prefetch={prefetch}
      variant="ghost"
      size="sm"
      className={cn(
        'w-full justify-start gap-3 text-sm hover:bg-primary/20 rounded-full px-4',
        isMatch && "bg-primary/20",
      )}
    >

      <Icon
        size={18}
        strokeWidth={isMatch ? 2.5 : 2}
      />
      <span>{title}</span>
    </ButtonLink>
  )
}