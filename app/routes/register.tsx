import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, json, Link, useActionData, useFetcher } from "@remix-run/react";

import { Button, ButtonLink } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export const meta: MetaFunction = () => {
  return [
    { title: "Registrasi | mybucks.today" },
    { name: "description", content: "" },
  ];
};

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
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resp = await fetched.json();
  if (resp.message === "User already exists") {
    return json({
      error: {
        message: "Akun dengan email tersebut telah terdaftar",
      },
      success: false,
    });
  }

  return json({ error: { message: "" }, success: true });
}

export default function Register() {
  const actionData = useActionData<typeof action>();

  if (actionData?.success) return <RedirectPage />;
  return (
    <div className="mx-auto mb-24 flex min-h-screen w-screen overflow-y-scroll lg:overflow-auto">
      <div className="flex w-full items-center justify-center p-5">
        <RegisterForm />
      </div>
    </div>
  );
}

function RegisterForm() {
  const actionData = useActionData<typeof action>();

  return (
    <Form
      action="."
      method="post"
      className="flex w-full flex-col gap-8 lg:max-w-[354px]"
    >
      <header className="flex flex-col gap-0.5">
        <div className="mb-20 block lg:hidden">logo</div>
        <span className="text-4xl font-semibold">Daftar</span>
        <span className="text-sm font-normal text-muted-foreground">
          Nikmati kemudahan mencatat keuangan Anda.
        </span>
      </header>
      <div className="flex w-full flex-col gap-4">
        <div className="grid w-full items-center gap-2.5">
          <Label htmlFor="name">Nama Lengkap</Label>
          <Input
            id="name"
            type="text"
            name="fullName"
            required
            placeholder="Masukkan nama lengkap Anda"
          />
        </div>
        <div className="grid w-full items-center gap-2.5">
          <Label htmlFor="email">Alamat Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            required
            placeholder="Masukkan email Anda"
          />
        </div>
        <div className="grid w-full items-center gap-2.5">
          <Label htmlFor="password">Kata Sandi</Label>
          <Input
            id="password"
            type="password"
            name="password"
            required
            placeholder="Masukkan kata sandi"
          />
        </div>
        {actionData?.error.message ? (
          <div className="text-sm text-red-500">
            {actionData?.error?.message}
          </div>
        ) : null}
      </div>
      <footer className="flex w-full flex-col gap-8">
        <div>
          <Button size="lg" className="w-full" type="submit">
            Daftar Sekarang
          </Button>
          <div className="mt-6 text-center">
            <Link to="/" className="w-fit">
              <span className="text-sm font-normal">Sudah memiliki akun?</span>
              <span> </span>
              <span className="text-sm font-bold">Masuk di sini</span>
            </Link>
          </div>
        </div>
      </footer>
    </Form>
  );
}

function RedirectPage() {
  return (
    <div className="flex h-screen items-center">
      <div className="flex w-full flex-col items-center gap-6 md:gap-8">
        <div className="flex flex-col items-center justify-center">
          <img src="/assets/success.png" className="w-[600px]" alt="" />
          <h2 className="ml-2 text-lg font-bold">Selesai</h2>
          <p className="max-w-sm text-center text-sm">
            Pendaftaran selesai, silahkan klik tombol dibawah ini untuk masuk ke
            akunmu!
          </p>
        </div>
        <div>
          <ButtonLink className="w-full" size="lg" to="/">
            Ke halaman log in
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
