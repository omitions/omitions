import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, Link, redirect } from "@remix-run/react";

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

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  let resp = null

  try {
    const fetched = await fetch("https://api.mybucks.today/users/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    resp = await fetched.json();
  } catch (error) {
    console.log('error', error);
    return {};
  }

  console.log('response', await resp);
  return redirect("/ws")
}


export default function Index() {
  return (
    <div className="flex items-center h-screen use-matter bg-background">
      <div className="w-full flex flex-col items-center gap-6 md:gap-8">
        <div>
          <h2 className="text-4xl font-bold text-primary">
            mybucks
          </h2>
        </div>
        <Card className="w-[90%] max-w-sm md:min-w-96 mx-auto">
          <CardHeader>
            <CardTitle className="text-xl">Log in ke akun kamu</CardTitle>
            <CardDescription>
              Nikmati kemudahan mencatat keuangan Anda
            </CardDescription>
          </CardHeader>
          <Form action="." method="post">
            <CardContent className="grid gap-3">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" name="email" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Kata Sandi</Label>
                <Input id="password" type="password" name="password" required />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" size="lg">
                Masuk
              </Button>
            </CardFooter>
          </Form>
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