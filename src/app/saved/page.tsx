import Link from "next/link";
import { Printer } from "lucide-react";
import { redirect } from "next/navigation";
import { Container } from "@/components/container";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAllContent } from "@/lib/content";
import { RemoveButton } from "./remove-button";

export const metadata = { title: "Saved Pages" };

const TYPE_LABELS: Record<string, string> = {
  diseases: "Disease", mechanisms: "Mechanism", genes: "Genetics",
  interventions: "Intervention", "individual-genes": "Gene",
  "individual-interventions": "Medical Intervention", "individual-supplements": "Supplement",
  "individual-lifestyle": "Lifestyle",
};

export default async function SavedPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/saved");

  const { data: rows } = await supabase
    .from("saved_items").select("content_slug, saved_at").eq("user_id", user.id).order("saved_at", { ascending: false });

  const all = getAllContent();
  const items = (rows ?? []).map((row) => {
    const entry = all.find((c) => c.slug === row.content_slug);
    if (!entry) return null;
    return { slug: entry.slug, title: entry.title, type: entry.type, description: entry.description, savedAt: row.saved_at ?? "" };
  }).filter((x): x is NonNullable<typeof x> => x !== null);

  return (
    <>
      <section className="bg-ink text-fg-inverse">
        <Container className="py-14 md:py-18">
          <p className="text-sm font-medium text-brand uppercase tracking-wider">Your account</p>
          <h1 className="display-lg text-fg-inverse-strong mt-2">Saved pages</h1>
          <p className="text-fg-inverse/70 mt-3 max-w-xl">Pages you&apos;ve bookmarked using the Save button in article headers.</p>
        </Container>
      </section>
      <Container className="py-12 max-w-3xl space-y-8">
        {items.length > 0 ? (
          <>
            <div className="flex items-center justify-between gap-4">
              <p className="text-fg-muted text-sm">{items.length} {items.length === 1 ? "page" : "pages"} saved</p>
              <Link href="/saved/print" className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:text-brand-hover transition-colors">
                <Printer className="size-4" />Print / bring to doctor
              </Link>
            </div>
            <ul className="divide-y divide-border rounded-xl border border-border overflow-hidden">
              {items.map((item) => (
                <li key={item.slug} className="flex items-center gap-4 px-5 py-4 hover:bg-card transition-colors">
                  <div className="flex-1 min-w-0">
                    <Link href={`/${item.slug}`} className="font-medium hover:text-brand transition-colors">{item.title}</Link>
                    {item.description && <p className="text-sm text-fg-muted mt-0.5 line-clamp-1">{item.description}</p>}
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-card border border-border text-fg-subtle">{TYPE_LABELS[item.type] ?? item.type}</span>
                      <span className="text-xs text-fg-subtle">
                        Saved {item.savedAt ? new Date(item.savedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }) : ""}
                      </span>
                    </div>
                  </div>
                  <RemoveButton slug={item.slug} />
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="py-16 text-center space-y-3">
            <p className="font-display font-semibold text-xl">No saved pages yet</p>
            <p className="text-fg-muted max-w-md mx-auto">While reading any article, click the <strong>Save</strong> button in the page header to bookmark it here.</p>
            <Link href="/explore" className="inline-flex mt-4 h-10 items-center rounded-md bg-brand hover:bg-brand-hover text-white text-sm font-medium px-5">Browse articles</Link>
          </div>
        )}
      </Container>
    </>
  );
}
