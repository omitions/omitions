import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import Navbar from "~/components/navbar";

import Sidebar from "~/components/sidebar";

import { auth } from "~/utils/auth.server";
import {
  createWorkspace,
  updateWorkspace,
  removeWorkspace,
} from "~/utils/workspaces.server";

export enum ActionType {
  CREATE_WORKSPACES = 'CREATE_WORKSPACES',
  REMOVE_WORKSPACES = 'REMOVE_WORKSPACES',
  UPDATE_WORKSPACES = 'UPDATE_WORKSPACES',
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

  const _action = formPayload['_action'] as keyof typeof ActionType;

  switch (_action) {
    case ActionType.CREATE_WORKSPACES:
      return await createWorkspace(formData, request)
    case ActionType.UPDATE_WORKSPACES:
      return await updateWorkspace(formData, request)
    case ActionType.REMOVE_WORKSPACES:
      return await removeWorkspace(formData, request)
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
        <div className="block md:hidden fixed bottom-0">
          <Navbar />
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