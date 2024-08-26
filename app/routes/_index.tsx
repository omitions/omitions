import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { json, Link, useFetcher, useLoaderData } from "@remix-run/react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

import { auth, sessionStorage } from "~/utils/auth.server";
import { MybucksLogo } from "~/utils/icons";

export const meta: MetaFunction = () => {
  return [
    { title: "Log In | mybucks.today" },
    { name: "description", content: "" },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  await auth.authenticate("form", request, {
    successRedirect: "/ws",
    failureRedirect: "/",
  });
};

type LoaderError = { message: string } | null;
export const loader = async ({ request }: LoaderFunctionArgs) => {
  await auth.isAuthenticated(request, { successRedirect: "/ws" });
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie"),
  );
  const error = session.get(auth.sessionErrorKey) as LoaderError;
  return json({ error });
};

export default function Login() {
  return (
    <div className="mx-auto mb-24 flex min-h-screen w-screen overflow-y-scroll lg:overflow-auto">
      <div className="flex w-full items-center justify-center p-5">
        <LoginForm />
      </div>
    </div>
  );
}

function LoginForm() {
  const { error } = useLoaderData<typeof loader>();

  const fetcher = useFetcher();
  const loading = fetcher.state == "submitting" || fetcher.state === "loading";

  return (
    <fetcher.Form
      action="."
      method="post"
      className="flex w-full flex-col gap-8 lg:max-w-[354px]"
    >
      <header className="flex flex-col gap-2">
        <div className="mb-20 w-fit lg:hidden">
          <MybucksLogo />
        </div>
        <div className="fixed left-12 top-12 hidden lg:block">
          <MybucksLogo />
        </div>
        <span className="text-4xl font-semibold">Log In</span>
        <span className="text-sm font-normal text-muted-foreground">
          Welcome back! silakan masukkan detail Anda.
        </span>
      </header>
      <div className="flex w-full flex-col gap-4">
        <div className="grid w-full items-center gap-2.5">
          <Label htmlFor="email">Alamat Email</Label>
          <Input
            name="email"
            required
            type="email"
            id="email"
            placeholder="Masukkan email Anda"
          />
        </div>
        <div className="grid w-full items-center gap-2.5">
          <Label htmlFor="password">Kata Sandi</Label>
          <Input
            required
            name="password"
            type="password"
            id="password"
            placeholder="Masukkan kata sandi Anda"
          />
          {error ? (
            <div className="text-sm text-red-500">{error.message}</div>
          ) : null}
        </div>
      </div>
      <footer className="flex w-full flex-col gap-8">
        <div>
          <Button
            size="lg"
            className="w-full"
            type="submit"
            disabled={loading}
            loading={loading}
          >
            Masuk
          </Button>
          <div className="mt-6 text-center">
            <Link to="/register" className="w-fit">
              <span className="text-sm font-normal">Tidak memiliki akun?</span>
              <span> </span>
              <span className="text-sm font-bold">Daftar</span>
            </Link>
          </div>
        </div>
      </footer>
    </fetcher.Form>
  );
}
