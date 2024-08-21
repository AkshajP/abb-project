import { login, signup } from "@/actions/supabase";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function SignupForm(props: { searchParams: { error: string } }) {
  return (
    <section className="flex w-full h-screen items-center justify-center bg-muted/50 ">
      <form>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your details below to signup to bidzone.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="name"
                placeholder="Akshaj P"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                placeholder="******"
                type="password"
                required
              />
            </div>

            {props.searchParams.error && (
              <p className="text-red-500 text-sm bg-red-200 p-2 rounded-md">
                {props.searchParams.error}
              </p>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full" formAction={signup}>
              Sign up
            </Button>
            <Separator dir="horizontal" />

            <Link href="/signin" className="text-muted-foreground text-sm">
              Already have an account?{" "}
              <span className="underline">Sign in</span>
            </Link>
          </CardFooter>
        </Card>
      </form>
    </section>
  );
}
