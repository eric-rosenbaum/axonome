import Link from "next/link";
import { Bookmark, Printer } from "lucide-react";
import { Container } from "@/components/container";
import { getDisease } from "@/lib/diseases";
import { getAllContent, getContentForDisease, type ContentEntry } from "@/lib/content";
import { getAllResearchItems, type ResearchItem } from "@/lib/research";
import { MedicalDisclaimer } from "@/components/medical-disclaimer";

type SavedItem = { slug: string; savedAt: string };

type ResolvedSavedItem = {
  slug: string;
  title: string;
  type: string;
  description?: string;
  savedAt: string;
};

function resolveItems(savedItems: SavedItem[], all: ContentEntry[]): ResolvedSavedItem[] {
  const result: ResolvedSavedItem[] = [];
  for (const { slug, savedAt } of savedItems) {
    const entry = all.find((c) => c.slug === slug);
    if (!entry) continue;
    result.push({ slug: entry.slug, title: entry.title, type: entry.type as string, description: entry.description, savedAt });
  }
  return result;
}

function formatDate(iso: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
}

export function Dashboard({
  name,
  role: _role,
  diseaseSlug,
  savedItems,
}: {
  name: string | null;
  role: string | null;
  diseaseSlug: string | null;
  savedItems: SavedItem[];
}) {
  const disease = getDisease(diseaseSlug);
  const all = getAllContent();
  const resolved = resolveItems(savedItems, all);

  if (!disease) {
    return (
      <>
        <section className="bg-ink text-fg-inverse">
          <Container className="py-14 md:py-20">
            <h1 className="display-lg text-fg-inverse-strong">
              {name ? `Welcome back, ${name}.` : "Welcome back."}
            </h1>
            <p className="text-fg-inverse/70 mt-3 max-w-xl text-lg">
              You haven&apos;t set a disease focus yet.{" "}
              <Link href="/account" className="underline underline-offset-2 text-fg-inverse hover:text-fg-inverse-strong">
                Choose one in your account
              </Link>{" "}
              for a personalized index, or{" "}
              <Link href="/explore" className="underline underline-offset-2 text-fg-inverse hover:text-fg-inverse-strong">
                explore everything
              </Link>.
            </p>
          </Container>
        </section>
        {resolved.length > 0 && (
          <Container className="py-14 space-y-6">
            <SavedSection items={resolved} />
          </Container>
        )}
      </>
    );
  }

  const { mechanisms, genes, interventions, diseasePage } = getContentForDisease(disease.slug);
  const sections = diseasePage?.sections ?? [];

  const researchItems = getAllResearchItems()
    .filter((item) => item.diseases.length === 0 || item.diseases.includes(disease.slug))
    .slice(0, 3);

  return (
    <>
      <section className="bg-ink text-fg-inverse">
        <Container className="py-14 md:py-20">
          <p className="text-sm font-medium text-brand uppercase tracking-wider">
            Your focus · {disease.name}
          </p>
          <h1 className="display-lg text-fg-inverse-strong mt-2">
            {name ? `Welcome back, ${name}.` : "Welcome back."}
          </h1>
          <p className="text-fg-inverse/70 mt-3 max-w-xl text-lg">
            Your personalized guide to {disease.shortName}, organized around the science.
          </p>
          <p className="mt-2 text-sm text-fg-inverse/50">
            Not the right focus?{" "}
            <Link href="/account" className="text-fg-inverse/70 underline underline-offset-2 hover:text-fg-inverse-strong">
              Change in account settings
            </Link>
          </p>
        </Container>
      </section>

      <Container className="py-14 space-y-16">
        {/* Disease overview */}
        <section className="space-y-4">
          <h2 className="font-display font-semibold text-2xl">Disease overview</h2>
          <Link
            href={`/${disease.slug}`}
            className="block p-6 rounded-xl bg-card hover:bg-border transition-colors group border border-border"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <h3 className="font-display font-semibold text-xl group-hover:text-brand transition-colors">{disease.name}</h3>
                {diseasePage?.description && <p className="text-fg-muted">{diseasePage.description}</p>}
              </div>
              <span className="text-fg-subtle shrink-0 mt-1 group-hover:text-brand transition-colors">→</span>
            </div>
            {sections.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {sections.map((s) => (
                  <span key={s.id} className="text-xs px-2.5 py-1 rounded-full bg-border text-fg-muted">{s.title}</span>
                ))}
              </div>
            )}
          </Link>
        </section>

        {/* Mechanisms */}
        {mechanisms.length > 0 && (
          <section className="space-y-4">
            <div>
              <h2 className="font-display font-semibold text-2xl">Biological mechanisms</h2>
              <p className="text-fg-muted mt-1">The underlying cellular processes that drive {disease.shortName}.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {mechanisms.map((m) => (
                <Link key={m.slug} href={`/${m.slug}`} className="block p-4 rounded-lg bg-card hover:bg-border transition-colors border border-border space-y-1">
                  <span className="font-display font-semibold">{m.title}</span>
                  {m.description && <span className="block text-sm text-fg-muted">{m.description}</span>}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Genetics */}
        {genes.length > 0 && (
          <section className="space-y-4">
            <h2 className="font-display font-semibold text-2xl">Genetics</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {genes.map((g) => (
                <Link key={g.slug} href={`/${g.slug}`} className="block p-4 rounded-lg bg-card hover:bg-border transition-colors border border-border">
                  <span className="font-display font-semibold">{g.title}</span>
                  {g.description && <span className="block text-sm text-fg-muted mt-1">{g.description}</span>}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Interventions */}
        {interventions.length > 0 && (
          <section className="space-y-4">
            <div>
              <h2 className="font-display font-semibold text-2xl">Interventions</h2>
              <p className="text-fg-muted mt-1 max-w-2xl">{disease.interventionNote}</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              {interventions.map((i) => (
                <Link key={i.slug} href={`/${i.slug}`} className="block p-4 rounded-lg bg-card hover:bg-border transition-colors border border-border space-y-1">
                  <span className="font-display font-semibold">{i.title}</span>
                  {i.description && <span className="block text-sm text-fg-muted">{i.description}</span>}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Research preview */}
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display font-semibold text-2xl">Latest research for {disease.shortName}</h2>
            <Link href="/research" className="text-sm text-brand hover:text-brand-hover shrink-0 font-medium">See all →</Link>
          </div>
          {researchItems.length > 0 ? (
            <ul className="space-y-3">
              {researchItems.map((item) => <ResearchRow key={item.slug} item={item} />)}
            </ul>
          ) : (
            <p className="text-sm text-fg-muted p-5 rounded-lg bg-card border border-border">
              No research updates yet for {disease.shortName}.{" "}
              <Link href="/research" className="text-brand underline underline-offset-2">Browse all research</Link>.
            </p>
          )}
        </section>

        {/* Saved pages */}
        <SavedSection items={resolved} />

        <MedicalDisclaimer />
      </Container>
    </>
  );
}

function ResearchRow({ item }: { item: ResearchItem }) {
  return (
    <li className="flex gap-3 p-4 rounded-lg bg-card border border-border">
      <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium self-start mt-0.5 ${item.type === "trials" ? "bg-brand/10 text-brand" : "bg-success/10 text-success"}`}>
        {item.type === "trials" ? "Trial" : "Research"}
      </span>
      <div className="min-w-0 space-y-1">
        <p className="font-medium text-sm leading-snug">{item.title}</p>
        <p className="text-sm text-fg-muted">{item.summary}</p>
        <p className="text-xs text-fg-subtle">
          {new Date(item.date).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" })}
        </p>
      </div>
    </li>
  );
}

function SavedSection({ items }: { items: ResolvedSavedItem[] }) {
  const preview = items.slice(0, 5);
  const hasMore = items.length > 5;
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-display font-semibold text-2xl flex items-center gap-2">
          <Bookmark className="size-5 text-brand" />
          Your saved pages
        </h2>
        {items.length > 0 && (
          <Link href="/saved" className="text-sm text-brand hover:text-brand-hover shrink-0 font-medium">
            {hasMore ? `See all ${items.length} →` : "Manage →"}
          </Link>
        )}
      </div>
      {items.length > 0 ? (
        <>
          <ul className="divide-y divide-border rounded-lg border border-border overflow-hidden">
            {preview.map((s) => (
              <li key={s.slug}>
                <Link href={`/${s.slug}`} className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-card transition-colors group">
                  <div className="min-w-0">
                    <span className="font-medium group-hover:text-brand transition-colors">{s.title}</span>
                    <span className="block text-xs text-fg-subtle mt-0.5 capitalize">{s.type.replace(/-/g, " ")}</span>
                  </div>
                  <span className="text-xs text-fg-subtle shrink-0">{formatDate(s.savedAt)}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/saved/print" className="inline-flex items-center gap-2 text-sm text-fg-muted hover:text-fg transition-colors">
            <Printer className="size-4" />
            Print saved list for your doctor
          </Link>
        </>
      ) : (
        <div className="p-5 rounded-lg bg-card border border-dashed border-border-strong text-sm text-fg-muted">
          Save any page using the bookmark button in the article header — pages you want to revisit, share with family, or bring to your doctor&apos;s appointment.
        </div>
      )}
    </section>
  );
}
