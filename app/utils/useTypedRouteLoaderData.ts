import { useRouteLoaderData } from "@remix-run/react";
import type { SerializeFrom } from "@remix-run/node";
import { loader as rootLoader } from "~/root";

type Loaders = {
  root: typeof rootLoader;
};

export function useTypedRouteLoaderData<T extends keyof Loaders>(route: T) {
  return useRouteLoaderData(route) as SerializeFrom<Loaders[T]>;
}
