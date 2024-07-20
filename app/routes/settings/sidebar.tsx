import { LinkProps, useLocation } from '@remix-run/react';
import { icons } from 'lucide-react';
import { ButtonLink } from '~/components/ui/button';
import { cn } from '~/lib/utils';

export default function HomeSidebar() {
  return (
    <div className="fixed left-[var(--sidebar-width)] z-50 hidden h-ful w-full max-w-[var(--sidebar-width-xl)] md:block">
      <div className="px-4 py-6 my-1 flex flex-col gap-8 min-h-screen">
        <div className="flex items-center">
          <h2 className="text-xl ml-2 font-bold">Pengaturan</h2>
        </div>
        <div className="flex flex-col gap-4">
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
        'w-full justify-start gap-2 hover:bg-primary/20 rounded-full px-4',
        isMatch && "bg-primary/20",
      )}
    >

      <Icon
        size={16}
        strokeWidth={isMatch ? 3 : 2}
      />
      <span>{title}</span>
    </ButtonLink>
  )
}