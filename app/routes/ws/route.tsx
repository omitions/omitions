import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import Sidebar from "~/components/sidebar";

import { auth } from "~/utils/auth.server";
import { createWorkspaces } from "~/utils/workspaces.server";

export enum FormType {
  CREATE_WORKSPACES = 'CREATE_WORKSPACES',
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const email = await auth.isAuthenticated(request, {
    failureRedirect: "/",
  });
  return json({ email });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const formPayload = Object.fromEntries(formData);

  const _action = formPayload['_action'] as keyof typeof FormType;

  switch (_action) {
    case FormType.CREATE_WORKSPACES:
      await createWorkspaces(formData, request)
      return "success"
    default:
      return {}
  }
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
            <div className="mx-auto mt-[var(--header-height)] max-w-screen-2xl md:mt-0 px-4">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}