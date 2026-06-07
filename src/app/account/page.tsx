import { redirect } from "next/navigation";
import { Container } from "@/components/container";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { DISEASES } from "@/lib/diseases";
import { AccountForm } from "./account-form";
import { SignOutButton } from "./sign-out-button";
import { DeleteAccountButton } from "./delete-account-button";

export const metadata = { title: "Account" };

export default async function AccountPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/account");

  const { data: profile } = await supabase
    .from("profiles")
    .select("name, role, disease")
    .eq("id", user.id)
    .maybeSingle();

  return (
    <Container size="narrow" className="py-12 space-y-10">
      <header className="space-y-2">
        <h1 className="display-md">Account</h1>
        <p className="text-fg-muted">Signed in as {user.email}.</p>
      </header>

      <section className="space-y-4">
        <h2 className="font-display font-semibold text-xl">Your focus</h2>
        <AccountForm
          diseases={DISEASES.map((d) => ({ slug: d.slug, name: d.name }))}
          initialName={profile?.name ?? ""}
          initialRole={profile?.role ?? ""}
          initialDisease={profile?.disease ?? ""}
        />
      </section>

      <section className="space-y-4 pt-6 border-t border-border">
        <h2 className="font-display font-semibold text-xl">Session</h2>
        <SignOutButton />
      </section>

      <section className="space-y-4 pt-6 border-t border-border">
        <div>
          <h2 className="font-display font-semibold text-xl">Delete account</h2>
          <p className="text-sm text-fg-muted mt-1">
            Permanently removes your account, profile, and all saved pages. Cannot be undone.
          </p>
        </div>
        <DeleteAccountButton />
      </section>
    </Container>
  );
}
