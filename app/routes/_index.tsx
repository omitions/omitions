import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction
} from "@remix-run/node";
import {
  json,
  Link,
  useFetcher,
  useLoaderData,
} from "@remix-run/react";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { auth, sessionStorage } from "~/utils/auth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Log in | mybucks" },
    { name: "description", content: "Welcome to Remix!" },
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
  const { error } = useLoaderData<typeof loader>();

  const fetcher = useFetcher();
  const loading = fetcher.state == "submitting" || fetcher.state === "loading";

  return (
    <div className="flex items-center h-screen use-matter bg-background">
      <div className="w-full flex flex-col items-center gap-6 md:gap-8">
        <div>
          <h2 className="text-4xl font-bold text-primary">
            mybucks
          </h2>
        </div>
        <Card className="w-[90%] max-w-sm md:min-w-sm mx-auto">
          <CardHeader>
            <CardTitle className="text-xl">Log in ke akun kamu</CardTitle>
            <CardDescription>
              Nikmati kemudahan mencatat keuangan Anda
            </CardDescription>
          </CardHeader>
          <fetcher.Form action="." method="post">
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  isError={!!error}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Kata Sandi</Label>
                <Input
                  id="password"
                  type="password"
                  isError={!!error}
                  name="password"
                />
                {error ? <div className="text-sm text-red-500">{error.message}</div> : null}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                size="lg"
                disabled={loading}
                loading={loading}
              >
                Masuk
              </Button>
            </CardFooter>
          </fetcher.Form>
        </Card>
        <div>
          <p className="text-sm">
            <span className="text-muted-foreground">Belum memiliki akun?{" "}</span>
            <Link to="/register">
              <span className="text-primary-foreground font-bold">Daftar</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}