import { LinkProps, useLocation } from '@remix-run/react';
import { icons, Plus } from 'lucide-react';
import { Button, ButtonLink } from '~/components/ui/button';
import { cn } from '~/lib/utils';

export default function HomeSidebar() {
  return (
    <div className="px-4 py-6 my-1 flex flex-col gap-8 min-h-screen">
      <div>
        <h2 className="text-xl ml-2 font-bold">Beranda</h2>
      </div>
      <div className="flex flex-col gap-4">
        <Button size="sm" variant="outline" className="w-fit h-11 gap-2">
          <Plus size={16} strokeWidth={3} />
          <span>Buat Workspace</span>
        </Button>
        <div className="flex flex-col gap-1">
          <NavItem
            title="Workspace"
            href="/ws"
            iconName="FileText"
          />
          <NavItem
            title="Koleksi"
            href="/ws/collections"
            iconName="FolderOpen"
          />
          <NavItem
            title="Pengingat"
            href="/ws/collectionss"
            iconName="AlarmClock"
          />
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