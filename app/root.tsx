import { json, LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import Navbar from "./components/navbar";

import { sessionStorage } from "./utils/auth.server";

import "./globals.css";

export const links: LinksFunction = () => [];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  const isAuth = !!session.get("user")
  return json({ isAuth });
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/@material-tailwind/html@latest/styles/material-tailwind.css"
        />
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
