import Link from "next/link";
import { Container } from "@/components/container";
import { MedicalDisclaimer } from "@/components/medical-disclaimer";
import { SaveButton } from "@/components/save-button";
import type { ContentEntry } from "@/lib/content";
import { getDisease } from "@/lib/diseases";
import { getContentBySlug } from "@/lib/content";

export function DiseaseTemplate({
  entry,
  isSaved,
  isAuthed,
  children,
}: {
  entry: ContentEntry;
  isSaved: boolean;
  isAuthed: boolean;
  children: React.ReactNode;
}) {
  const disease = getDisease(entry.slug);

  const relatedMechanisms = (disease?.relatedMechanisms ?? [])
    .map((s) => getContentBySlug(s))
    .filter((e): e is ContentEntry => Boolean(e));
  const relatedGenes = (disease?.relatedGenes ?? [])
    .map((s) => getContentBySlug(s))
    .filter((e): e is ContentEntry => Boolean(e));
  const relatedInterventions = (disease?.relatedInterventions ?? [])
    .map((s) => getContentBySlug(s))
    .filter((e): e is ContentEntry => Boolean(e));

  return (
    <>
      {/* Dark hero */}
      <section className="bg-ink text-fg-inverse relative overflow-hidden">
        <div className="absolute -top-32 right-0 w-[600px] h-[500px] rounded-full pointer-events-none" aria-hidden style={{ background: "radial-gradient(ellipse, rgba(46,91,255,0.11) 0%, transparent 70%)" }} />
        <div className="hero-noise absolute inset-0 pointer-events-none" aria-hidden />
        <Container className="py-16 md:py-20 relative z-10">
          <div className="space-y-4 max-w-3xl">
            <p className="text-sm font-medium text-brand uppercase tracking-wider">Disease</p>
            <h1 className="display-xl hero-gradient-text">{entry.title}</h1>
            {entry.description && (
              <p className="text-lg text-fg-inverse/80 max-w-2xl">{entry.description}</p>
            )}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <SaveButton slug={entry.slug} initial={isSaved} disabled={!isAuthed} variant="dark" />
              {!isAuthed && (
                <Link
                  href={`/signup?next=/${entry.slug}`}
                  className="text-sm underline underline-offset-2 text-fg-inverse/80 hover:text-fg-inverse-strong"
                >
                  Sign up to save and personalize
                </Link>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Body — content + sticky TOC */}

      <Container className="py-16 grid lg:grid-cols-[1fr_240px] gap-12">
        <article className="min-w-0">
          <div className="prose-axonome">{children}</div>

          <div className="mt-16 space-y-12">
            {relatedMechanisms.length > 0 && (
              <RelatedList title="Mechanisms involved" items={relatedMechanisms} />
            )}
            {relatedGenes.length > 0 && (
              <RelatedList title="Genetics" items={relatedGenes} />
            )}
            {relatedInterventions.length > 0 && (
              <RelatedList title="Interventions" items={relatedInterventions} />
            )}
          </div>

          <div className="mt-16">
            <MedicalDisclaimer />
          </div>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-3">
            <p className="text-xs font-medium text-fg-subtle uppercase tracking-wider">
              On this page
            </p>
            <nav className="space-y-1 text-sm border-l border-border">
              {(entry.sections ?? []).map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="block pl-3 -ml-px border-l border-transparent hover:border-brand hover:text-brand py-1"
                >
                  {s.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      </Container>
    </>
  );
}

function RelatedList({ title, items }: { title: string; items: ContentEntry[] }) {
  return (
    <section className="space-y-3">
      <h2 className="font-display font-semibold text-2xl">{title}</h2>
      <ul className="grid sm:grid-cols-2 gap-2">
        {items.map((m) => (
          <li key={m.slug}>
            <Link
              href={`/${m.slug}`}
              className="block p-4 rounded-lg bg-white border border-border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <span className="font-medium">{m.title}</span>
              {m.description && (
                <span className="block text-sm text-fg-muted mt-1">{m.description}</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
