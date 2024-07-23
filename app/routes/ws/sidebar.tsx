import {
  Form,
  Link,
  LinkProps,
  useLocation
} from '@remix-run/react';
import { icons, Plus } from 'lucide-react';

import { Button, ButtonLink } from '~/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '~/components/ui/dialog';
import { Input } from '~/components/ui/input';
import { Progress } from '~/components/ui/progress';

import { cn } from '~/lib/utils';

import { FormType } from './route';

export default function HomeSidebar() {
  return (
    <div className="fixed left-[var(--sidebar-width)] z-50 hidden h-ful w-full max-w-[var(--sidebar-width-xl)] md:block border-r border-border">
      <div className="px-4 py-6 my-1 flex flex-col justify-between min-h-screen">
        <div className='flex flex-col gap-8'>
          <div className="flex items-center">
            <h2 className="text-xl ml-2 font-bold">Beranda</h2>
          </div>
          <div className="flex flex-col gap-6">
            <CreateWorkspace />
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
        <SidebarFooter />
      </div>
    </div>
  )
}

function SidebarFooter() {
  return (
    <Link
      to="/ws/:id"
      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 rounded-xl"
    >
      <div className="border w-full rounded-xl px-4 py-6 flex flex-col gap-3 cursor-pointer border-input bg-background">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold">4/10 Workspace</h4>
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

function CreateWorkspace() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="w-fit h-14 rounded-xl text-sm gap-2">
          <Plus size={18} strokeWidth={3} />
          <span>Buat workspace</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Workspace Baru</DialogTitle>
        </DialogHeader>
        <Form action="/ws" method="post" className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <Input
              type="text"
              name="title"
              required
              placeholder="Judul"
            />
            <Input
              type="text"
              name="description"
              required
              placeholder="Deskripsi"
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                size="sm"
              >
                Tutup
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="submit"
                size="sm"
              >
                Buat Sekarang
              </Button>
            </DialogClose>
          </DialogFooter>
          <input
            type="hidden"
            name="_action"
            value={FormType.CREATE_WORKSPACES}
          />
        </Form>
      </DialogContent>
    </Dialog>
  )
}
