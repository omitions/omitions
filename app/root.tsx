import { json, LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import Navbar from "./components/navbar";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/toaster";

import { sessionStorage } from "./utils/auth.server";

import "react-day-picker/style.css";
import "./globals.css";

export const links: LinksFunction = () => [];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie"),
  );
  const isAuth = !!session.get("user");
  return json({ isAuth });
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1.0, viewport-fit=cover"
        />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <Toaster />
        <script src="https://unpkg.com/@material-tailwind/html@latest/scripts/ripple.js"></script>
      </body>
    </html>
  );
}

export default function App() {
  return (
    <main>
      <TooltipProvider delayDuration={300}>
        <Outlet />
      </TooltipProvider>
      <div className="fixed bottom-0 block md:hidden">
        <Navbar />
      </div>
    </main>
  );
}
