import Link from "next/link";
import { Mail } from "lucide-react";
import { Container } from "@/components/container";

export const metadata = { title: "Check your email" };

export default async function SignupConfirmPage(props: PageProps<"/signup/confirm">) {
  const { email } = await props.searchParams;
  const displayEmail = typeof email === "string" ? email : null;

  return (
    <section className="bg-ink text-fg-inverse min-h-[70vh] flex items-center">
      <Container size="narrow" className="py-20">
        <div className="space-y-6">
          <div className="size-12 rounded-full bg-brand/20 flex items-center justify-center">
            <Mail className="size-6 text-brand" />
          </div>
          <div className="space-y-3">
            <h1 className="display-md text-fg-inverse-strong">Check your email</h1>
            <p className="text-lg text-fg-inverse/80">
              {displayEmail ? (
                <>
                  We sent a confirmation link to{" "}
                  <span className="text-fg-inverse-strong font-medium">{displayEmail}</span>.
                </>
              ) : (
                "We sent a confirmation link to your email address."
              )}
            </p>
            <p className="text-fg-inverse/60">
              Click the link in the email to activate your account, then you&apos;ll be taken
              through a short setup step to personalize your experience.
            </p>
          </div>
          <div className="space-y-2 pt-2">
            <p className="text-sm text-fg-inverse/50">
              Didn&apos;t get it? Check your spam folder. The email comes from{" "}
              <span className="text-fg-inverse/70">noreply@mail.axonome.org</span>.
            </p>
            <p className="text-sm text-fg-inverse/50">
              Already confirmed?{" "}
              <Link
                href="/login"
                className="text-brand underline underline-offset-2 hover:text-brand-hover"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
