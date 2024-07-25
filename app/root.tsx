import { json, LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import Navbar from "./components/navbar";

import { auth, sessionStorage } from "./utils/auth.server";

import "./globals.css";

export const links: LinksFunction = () => [
  {
    rel: 'preload',
    as: 'font',
    href: '/fonts/Matter-Medium.woff2',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    as: 'font',
    href: '/fonts/Matter-Regular.woff2',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    as: 'font',
    href: '/fonts/Matter-SemiBold.woff2',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
  {
    rel: "stylesheet",
    href: "https://unpkg.com/@material-tailwind/html@latest/styles/material-tailwind.css",
  }
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await auth.isAuthenticated(request);
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie"),
  );
  const isAuth = !!session.get("user")
  return json({ isAuth });
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <script src="https://unpkg.com/@material-tailwind/html@latest/scripts/ripple.js"></script>
      </body>
    </html>
  );
}

export default function App() {
  return (
    <main>
      <Outlet />
      <div className="block md:hidden fixed bottom-0">
        <Navbar />
      </div>
    </main>
  );
}
