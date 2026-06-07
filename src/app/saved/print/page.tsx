import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";
import { Container } from "@/components/container";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAllContent } from "@/lib/content";
import { getDisease } from "@/lib/diseases";
import { MedicalDisclaimer } from "@/components/medical-disclaimer";
import { PrintButton } from "./print-button";

export const metadata = { title: "Print saved pages" };

const TYPE_LABELS: Record<string, string> = {
  diseases: "Disease", mechanisms: "Mechanism", genes: "Genetics",
  interventions: "Intervention", "individual-genes": "Gene",
  "individual-interventions": "Medical Intervention", "individual-supplements": "Supplement",
  "individual-lifestyle": "Lifestyle",
};

export default async function SavedPrintPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/saved/print");

  const [savedResult, profileResult] = await Promise.all([
    supabase.from("saved_items").select("content_slug, saved_at").eq("user_id", user.id).order("saved_at", { ascending: false }),
    supabase.from("profiles").select("name, disease").eq("id", user.id).maybeSingle(),
  ]);

  const profile = profileResult.data;
  const disease = getDisease(profile?.disease ?? null);
  const all = getAllContent();
  const items = (savedResult.data ?? []).map((row) => {
    const entry = all.find((c) => c.slug === row.content_slug);
    if (!entry) return null;
    return { slug: entry.slug, title: entry.title, type: entry.type, description: entry.description };
  }).filter((x): x is NonNullable<typeof x> => x !== null);

  const today = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  return (
    <Container className="py-12 max-w-2xl space-y-10">
      <div className="print-hide flex items-center gap-4">
        <Link href="/saved" className="inline-flex items-center gap-2 text-sm text-fg-muted hover:text-fg transition-colors">
          <ArrowLeft className="size-4" />Back to saved
        </Link>
        <PrintButton />
      </div>
      <div className="space-y-8">
        <div>
          <p className="font-display font-bold text-2xl">My Axonome Research</p>
          <p className="text-fg-muted mt-1">
            Prepared {today}{disease ? ` · Focused on: ${disease.name}` : ""}
          </p>
          <p className="text-sm text-fg-muted">axonome.org</p>
        </div>
        {items.length > 0 ? (
          <ol className="space-y-0">
            {items.map((item, i) => (
              <li key={item.slug} className="flex gap-4 py-4 border-b border-border">
                <span className="text-fg-subtle font-mono text-sm shrink-0 pt-0.5 w-6">{i + 1}.</span>
                <div className="space-y-1">
                  <p className="font-display font-semibold">{item.title}</p>
                  <p className="text-sm text-fg-subtle">{TYPE_LABELS[item.type] ?? item.type} · axonome.org/{item.slug}</p>
                  {item.description && <p className="text-sm text-fg-muted">{item.description}</p>}
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-fg-muted">No saved pages yet.</p>
        )}
        <MedicalDisclaimer />
      </div>
    </Container>
  );
}
