import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import Sidebar from "~/components/sidebar";
import { auth, sessionStorage } from "~/utils/auth.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const email = await auth.isAuthenticated(request, {
    failureRedirect: "/",
  });

  const session = await sessionStorage.getSession(
    request.headers.get("Cookie"),
  );

  console.log('session: ', session.get("user"));
  return json({ email });
};

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