export default function AppShell({ children }: React.HTMLAttributes<HTMLDivElement>) {
  const isAuthenticated = false

  if (!isAuthenticated) return <>{children}</>
  return <Shell>{children}</Shell>
}

function Shell({ children }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="bg-background h-full">
      <div className="flex">
        <div className="border-border bg-red-400 fixed z-50 hidden h-full w-full max-w-[var(--sidebar-width)] border-r md:block">
          {/* <Sidebar /> */}
          Sidebar
        </div>
        <div className="relative h-full w-full md:ml-auto md:w-[calc(100%_-_var(--sidebar-width))]">
          <div className="relative h-full w-full">
            <div className="mx-auto mt-[var(--header-height)] max-w-screen-2xl md:mt-0">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}