import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import RootSidebar from "~/components/sidebar";

import { auth } from "~/utils/auth.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await auth.isAuthenticated(request, { failureRedirect: "/" });
  return json({});
};

export default function Shell() {
  return (
    <div className="h-full">
      <div className="flex">
        <div className="fixed z-50 hidden h-full w-full max-w-[var(--sidebar-width)] border-r border-input md:block">
          <RootSidebar />
        </div>
        <div className="relative h-full w-full md:ml-auto md:w-[calc(100%_-_var(--sidebar-width))]">
          <div className="relative h-full w-full">
            <div className="mx-auto mt-[var(--header-height)] max-w-screen-2xl px-4 md:mt-0">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
