import { createCookieSessionStorage } from "@remix-run/node";

import { Authenticator, AuthorizationError } from "remix-auth";
import { FormStrategy } from "remix-auth-form";

if (!process.env.SECRET) throw new Error("secret is required");

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

export const auth = new Authenticator<User>(sessionStorage);

auth.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email");
    const password = form.get("password");

    if (!password) throw new Error("Password is required");
    if (!email) throw new Error("Email is required");

    let resp = null;
    const fetched = await fetch("https://api.mybucks.today/users/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    resp = await fetched.json();

    if (resp.message === "Wrong password" || resp.message === "User not found")
      throw new AuthorizationError("Invalid credentials");
    return { ...resp.data };
  }),
);

export type User = {
  access_token: string;
  email?: string;
};
