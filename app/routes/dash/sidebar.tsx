import { Link, LinkProps, useLocation } from '@remix-run/react';
import {
  icons,
  MenuIcon,
  XIcon
} from 'lucide-react';

import { ButtonLink } from '~/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger
} from '~/components/ui/sheet';

import { cn } from '~/lib/utils';

export default function SettingsSidebar({
  withoutMobile = false
}: {
  withoutMobile?: boolean,
}) {
  return (
    <>
      <Desktop />
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
            <div className="flex flex-col">
              <SheetClose>
                <NavItem
                  title="Akun"
                  href="/settings"
                  iconName="UserRoundCog"
                  delay={150}
                />
              </SheetClose>
              <SheetClose>
                <NavItem
                  title="Billing"
                  href="/settings/billing"
                  iconName="ReceiptText"
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

function Desktop() {
  return (
    <div className="fixed left-[var(--sidebar-width)] hidden h-ful w-full max-w-[var(--sidebar-width-xl)] md:block">
      <div className="px-3 py-6 my-1 flex flex-col gap-8 min-h-screen">
        <div className="flex items-center">
          <Link
            to="/ws/settings"
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 rounded-sm"
          >
            <h2 className="text-xl mx-2 font-medium">Analisa</h2>
          </Link>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col">
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
        'w-full justify-start gap-3 text-sm rounded-full py-3 px-4',
        isMatch && "bg-primary/20 hover:bg-primary/20 font-medium",
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