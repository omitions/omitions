import { Outlet } from "@remix-run/react";

export default function Shell() {
  return (
    <div>
      <div>
        sidebar
      </div>
      <Outlet />
    </div>
  )
}