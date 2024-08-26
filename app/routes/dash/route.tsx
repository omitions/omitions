import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import Footer from "~/components/footer";
import RootSidebar from "~/components/sidebar";

import { auth } from "~/utils/auth.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await auth.isAuthenticated(request, { failureRedirect: "/" });
  return json({});
};

export default function Shell() {
  return (
    <div className="flex">
      <div className="fixed z-50 hidden h-full w-full max-w-[var(--sidebar-width)] bg-secondary md:block">
        <RootSidebar />
      </div>
      <div className="relative h-full w-full md:ml-auto md:w-[calc(100%_-_var(--sidebar-width))]">
        <div className="mx-auto overflow-hidden">
          <Outlet />
          <div className="ml-[var(--sidebar-width-all)] hidden w-[calc(100%_-_var(--sidebar-width-all))] pb-12 pt-8 md:block">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
