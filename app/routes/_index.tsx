import type { MetaFunction } from "@remix-run/node";

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

export default function Index() {
  return (
    <div className="flex items-center h-screen use-matter">
      <div className="w-full flex flex-col items-center gap-6 md:gap-8">
        <Card className="max-w-xs md:max-w-sm mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Log in ke akun kamu</CardTitle>
            <CardDescription>
              Nikmati kemudahan mencatat keuangan Anda
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" size="lg">Log in</Button>
          </CardFooter>
        </Card>
        <div>
          <p className="text-sm">
            <span className="text-muted-foreground">Belum memiliki akun?{" "}</span>
            <span className="text-primary-foreground font-medium">Daftar</span>
          </p>
        </div>
      </div>
    </div>
  )
}