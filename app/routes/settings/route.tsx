import { Outlet } from "@remix-run/react";
import Sidebar from "~/components/sidebar";

export default function Shell() {
  return (
    <div className="h-full">
      <div className="flex">
        <div className="border-border bg-background fixed z-50 hidden h-full w-full max-w-[var(--sidebar-width)] border-r md:block">
          <Sidebar />
        </div>
        <div className="relative h-full w-full md:ml-auto md:w-[calc(100%_-_var(--sidebar-width))]">
          <div className="relative h-full w-full">
            <div className="mx-auto mt-[var(--header-height)] max-w-screen-2xl md:mt-0">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}