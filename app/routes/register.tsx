import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, json, Link, useActionData } from "@remix-run/react";

import { Button, ButtonLink } from "~/components/ui/button";
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

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

type ActionError = { message: string } | undefined | null;
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const fullName = formData.get("fullName");
  const email = formData.get("email");
  const password = formData.get("password");

  const fetched = await fetch("https://api.mybucks.today/users/register", {
    method: "POST",
    body: JSON.stringify({
      email,
      fullname: fullName,
      password
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resp = await fetched.json()
  if (!resp.id || resp.message === "User already exists") {
    const error = { message: "Akun dengan email tersebut telah terdaftar" } as ActionError;
    return json({ error, success: false });
  }

  return json({ error: null as ActionError, success: true });
}

export default function Register() {
  const actionData = useActionData<typeof action>();

  if (actionData?.success) return <RedirectPage />
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
            <CardTitle className="text-xl">Buat akun baru</CardTitle>
            <CardDescription>
              Nikmati kemudahan mencatat keuangan Anda
            </CardDescription>
          </CardHeader>
          <Form action="." method="post">
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input id="name" type="text" name="fullName" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" name="email" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Kata Sandi</Label>
                <Input id="password" type="password" name="password" required />
              </div>
              {actionData?.error ? <div className="text-sm text-red-500">{actionData?.error?.message}</div> : null}
            </CardContent>
            <CardFooter>
              <Button className="w-full" size="lg">Daftar Sekarang</Button>
            </CardFooter>
          </Form>
        </Card>
        <div>
          <p className="text-sm">
            <span className="text-muted-foreground">Sudah memiliki akun?{" "}</span>
            <Link to="/">
              <span className="text-primary-foreground font-bold">Masuk di sini</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

function RedirectPage() {
  return (
    <div className="flex items-center h-screen use-matter bg-background">
      <div className="w-full flex flex-col items-center gap-6 md:gap-8">
        <div className="flex flex-col items-center justify-center">
          <img src="/assets/success.png" className="w-[600px]" alt="" />
          <h2 className="text-xl ml-2 font-bold">Selesai</h2>
          <p className="text-center text-sm max-w-sm">Pendaftaran selesai, silahkan klik tombol dibawah ini untuk masuk ke akunmu!</p>
        </div>
        <div>
          <ButtonLink className="w-full" size="lg" to="/">Ke halaman log in</ButtonLink>
        </div>
      </div>
    </div>
  )
}