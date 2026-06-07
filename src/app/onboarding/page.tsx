import { redirect } from "next/navigation";
import { Container } from "@/components/container";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { DISEASES } from "@/lib/diseases";
import { OnboardingForm } from "./onboarding-form";

export const metadata = { title: "Get set up" };

export default async function OnboardingPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/onboarding");

  const { data: profile } = await supabase
    .from("profiles")
    .select("name, role, disease, onboarded_at")
    .eq("id", user.id)
    .maybeSingle();

  return (
    <Container size="narrow" className="py-16">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="display-md">Let&apos;s set up your space</h1>
          <p className="text-fg-muted">
            Three short questions. This is only used to tailor what you see — we don&apos;t share
            it with anyone, and you can change it anytime.
          </p>
        </div>

        <OnboardingForm
          diseases={DISEASES.map((d) => ({ slug: d.slug, name: d.name }))}
          initialName={profile?.name ?? ""}
          initialRole={profile?.role ?? ""}
          initialDisease={profile?.disease ?? ""}
        />
      </div>
    </Container>
  );
}
