import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import Footer from "~/components/footer";
import RootSidebar from "~/components/sidebar";

import { auth } from "~/utils/auth.server";
import {
  createWorkspace,
  removeWorkspace,
  updateWorkspace,
} from "~/utils/workspaces.server";

export enum ActionType {
  CREATE_WORKSPACES = "CREATE_WORKSPACES",
  REMOVE_WORKSPACES = "REMOVE_WORKSPACES",
  UPDATE_WORKSPACES = "UPDATE_WORKSPACES",
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await auth.isAuthenticated(request, { failureRedirect: "/" });
  return json({});
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const formPayload = Object.fromEntries(formData);

  const _action = formPayload["_action"] as keyof typeof ActionType;

  switch (_action) {
    case ActionType.CREATE_WORKSPACES:
      return await createWorkspace(formData, request);
    case ActionType.UPDATE_WORKSPACES:
      return await updateWorkspace(formData, request);
    case ActionType.REMOVE_WORKSPACES:
      return await removeWorkspace(formData, request);
    default:
      return {};
  }
};

export default function Shell() {
  return (
    <div className="flex">
      <div className="fixed z-50 hidden h-full w-full max-w-[var(--sidebar-width)] bg-secondary md:block">
        <RootSidebar />
      </div>
      <div className="relative h-full w-full md:ml-auto md:w-[calc(100%_-_var(--sidebar-width))]">
        <div className="mx-auto overflow-hidden pb-24 md:pb-0">
          <Outlet />
          <div className="ml-[var(--sidebar-width-all)] hidden w-[calc(100%_-_var(--sidebar-width-all))] pb-12 pt-8 md:block">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
