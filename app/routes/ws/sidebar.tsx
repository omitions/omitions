import {
  Link,
  LinkProps,
  useLocation
} from '@remix-run/react';
import {
  icons,
  MenuIcon,
  XIcon
} from 'lucide-react';

import CreateWorkspace from '~/components/create-workspace';
import { ButtonLink } from '~/components/ui/button';
import { Progress } from '~/components/ui/progress';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger
} from '~/components/ui/sheet';

import { cn } from '~/lib/utils';

import { ActionType } from './route';

export default function WorkspaceSidebar({
  workspaceCount,
  withoutMobile = false
}: {
  workspaceCount: number,
  withoutMobile?: boolean,
}) {
  return (
    <>
      <Desktop workspaceCount={workspaceCount} />
      {!withoutMobile && <Mobile />}
    </>
  )
}

function Mobile() {
  return (
    <div className='flex md:hidden fixed top-0 left-0 h-14 px-4 justify-start items-center w-screen border-b border-border bg-white z-50'>
      <Sheet>
        <SheetTrigger asChild>
          <button
            className="
              middle center
              absolute
              flex justify-center items-center
              w-12 h-12
              rounded-full
              transition-all
            "
            data-ripple-dark="true"
          >
            <MenuIcon
              size={24}
              strokeWidth={2}
            />
          </button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="flex flex-col gap-6">
            <div>
              <SheetClose>
                <button
                  className="
                    middle center
                    flex justify-center items-center
                    w-12 h-12
                    rounded-full
                    transition-all
                  "
                  data-ripple-dark="true"
                >
                  <XIcon
                    size={24}
                    strokeWidth={2}
                  />
                </button>
              </SheetClose>
            </div>
            <CreateWorkspace actionType={ActionType.CREATE_WORKSPACES} />
            <div className="flex flex-col gap-1">
              <SheetClose>
                <NavItem
                  title="Workspaces"
                  href="/ws"
                  iconName="FileText"
                  delay={150}
                />
              </SheetClose>
              <SheetClose>
                <NavItem
                  title="Koleksi"
                  href="/ws/collections"
                  iconName="FolderOpen"
                  delay={150}
                />
              </SheetClose>
              <SheetClose>
                <NavItem
                  title="Pengingat"
                  href="/ws/collectionss"
                  iconName="AlarmClock"
                  delay={150}
                />
              </SheetClose>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

function Desktop({ workspaceCount }: { workspaceCount: number }) {
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
  delay
}: {
  href?: string
  prefetch?: LinkProps['prefetch']
  iconName: keyof typeof icons
  title: string
  disabled?: boolean,
  delay?: number
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
        'w-full justify-start gap-3 text-sm hover:bg-primary/20 rounded-full py-5 px-4',
        isMatch && "bg-primary/20 font-semibold",
      )}
    >
      <div className='flex items-center gap-3'>
        <Icon
          size={16}
          strokeWidth={isMatch ? 2.5 : 2}
        />
        <span>{title}</span>
      </div>
    </ButtonLink>
  )
}