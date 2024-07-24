import {
  Link,
  LinkProps,
  useLocation
} from '@remix-run/react';
import { icons } from 'lucide-react';

import CreateWorkspace from '~/components/create-workspace';
import { Progress } from '~/components/ui/progress';
import { ButtonLink } from '~/components/ui/button';

import { cn } from '~/lib/utils';

import { ActionType } from './route';

export default function WorkspaceSidebar({ workspaceCount }: { workspaceCount: number }) {
  return (
    <div className="fixed left-[var(--sidebar-width)] hidden h-ful w-full max-w-[var(--sidebar-width-xl)] md:block border-r border-input">
      <div className="px-4 py-6 my-1 flex flex-col justify-between min-h-screen">
        <div className='flex flex-col gap-8'>
          <div className="flex items-center">
            <Link
              to="/ws"
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 rounded-sm"
            >
              <h2 className="text-xl mx-2 font-bold">Beranda</h2>
            </Link>
          </div>
          <div className="flex flex-col gap-6">
            <CreateWorkspace actionType={ActionType.CREATE_WORKSPACES} />
            <div className="flex flex-col gap-1">
              <NavItem
                title="Workspaces"
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
        <SidebarFooter count={workspaceCount} />
      </div>
    </div>
  )
}

function SidebarFooter({ count }: { count: number }) {
  return (
    <Link
      to="/ws/:id"
      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 rounded-xl"
    >
      <div className="border w-full rounded-xl px-4 py-6 flex flex-col gap-3 cursor-pointer border-input bg-background">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-semibold">{count || 0}/10 Workspace</h4>
          <p className="text-xs font-medium text-muted-foreground">Gratis</p>
        </div>
        <Progress value={33} />
      </div>
    </Link>
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
  const location = useLocation();
  const isMatch = location.pathname === href;

  // eslint-disable-next-line import/namespace
  const Icon = icons[iconName];

  return (
    <ButtonLink
      disabled={disabled}
      href={href}
      prefetch={prefetch}
      variant="ghost"
      size="sm"
      className={cn(
        'w-full justify-start gap-3 text-sm hover:bg-primary/20 rounded-full py-5 px-4',
        isMatch && "bg-primary/20 font-semibold",
      )}
    >
      <Icon
        size={16}
        strokeWidth={isMatch ? 2.5 : 2}
      />
      <span>{title}</span>
    </ButtonLink>
  )
}