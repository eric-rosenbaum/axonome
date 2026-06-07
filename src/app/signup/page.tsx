import Link from "next/link";
import { Container } from "@/components/container";
import { SignupForm } from "./signup-form";

export const metadata = { title: "Create an account" };

export default function SignupPage() {
  return (
    <Container size="narrow" className="py-20">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="display-md">Create your account</h1>
          <p className="text-fg-muted">
            Free, with one short setup step. Your account lets us tailor what you see to the
            disease that matters most to you.
          </p>
        </div>

        <SignupForm />

        <p className="text-sm text-fg-muted">
          Already have an account?{" "}
          <Link href="/login" className="text-brand underline underline-offset-2">
            Sign in
          </Link>
          .
        </p>
      </div>
    </Container>
  );
}
