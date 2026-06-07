import Link from "next/link";
import { Container } from "@/components/container";
import { LoginForm } from "./login-form";

export const metadata = { title: "Sign in" };

export default async function LoginPage({
  searchParams,
}: PageProps<"/login">) {
  const { next } = await searchParams;
  const nextStr = typeof next === "string" ? next : "/";

  return (
    <Container size="narrow" className="py-20">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="display-md">Welcome back</h1>
          <p className="text-fg-muted">
            Sign in to your Axonome account to pick up where you left off.
          </p>
        </div>

        <LoginForm next={nextStr} />

        <p className="text-sm text-fg-muted">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-brand underline underline-offset-2">
            Create one
          </Link>
          .
        </p>
      </div>
    </Container>
  );
}
