import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Dashboard } from "@/components/dashboard/dashboard";

// Preserve static metadata from original home page
export const metadata = {
  title: "Axonome — Neurodegeneration Explained",
  description:
    "Explore Alzheimer's, Parkinson's, and other neurodegenerative diseases with Axonome, your resource for insights and updates.",
};

export default async function HomePage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Not logged in — show the original public landing page
  if (!user) {
    // Dynamically import to avoid pulling LandingPage into the auth bundle
    const { LandingPage } = await import("@/components/landing/landing-page");
    return <LandingPage />;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("name, role, disease, onboarded_at")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile?.onboarded_at) {
    redirect("/onboarding");
  }

  const { data: saved } = await supabase
    .from("saved_items")
    .select("content_slug, saved_at")
    .eq("user_id", user.id)
    .order("saved_at", { ascending: false })
    .limit(8);

  return (
    <Dashboard
      name={profile.name}
      role={profile.role}
      diseaseSlug={profile.disease}
      savedItems={(saved ?? []).map((s) => ({ slug: s.content_slug, savedAt: s.saved_at ?? "" }))}
    />
  );
}
