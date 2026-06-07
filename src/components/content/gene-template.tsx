import Link from "next/link";
import { Container } from "@/components/container";
import { MedicalDisclaimer } from "@/components/medical-disclaimer";
import { SaveButton } from "@/components/save-button";
import type { ContentEntry } from "@/lib/content";
import { DISEASES, getDisease } from "@/lib/diseases";

const GENE_LINKS: Record<string, { name: string; slug: string; desc: string }[]> = {
  "parkinsons-genes": [
    { name: "PINK1", slug: "pink-1", desc: "Mitochondrial kinase; mutations cause early-onset Parkinson's." },
    { name: "PRKN", slug: "parkin", desc: "E3 ubiquitin ligase; most common cause of early-onset Parkinson's." },
    { name: "LRRK2", slug: "lrrk-2", desc: "Most common cause of inherited Parkinson's disease." },
    { name: "GBA1", slug: "gba-1", desc: "Strongest known genetic risk factor for Parkinson's." },
    { name: "SNCA", slug: "snca", desc: "Encodes alpha-synuclein; key player in Lewy body formation." },
  ],
  "alzheimers-genes": [
    { name: "APOE", slug: "apoe", desc: "Strongest genetic risk factor for late-onset Alzheimer's." },
    { name: "APP", slug: "app", desc: "Amyloid precursor protein; mutations drive early-onset familial Alzheimer's." },
    { name: "PSEN1/2", slug: "psen-1-2", desc: "Most commonly mutated gene in familial Alzheimer's." },
    { name: "TREM2", slug: "trem-2", desc: "Influences brain immune response to amyloid-beta plaques." },
  ],
  "als-ftd-genes": [
    { name: "C9orf72", slug: "c-9-orf-72", desc: "Most common genetic cause of both ALS and FTD." },
    { name: "SOD1", slug: "sod-1", desc: "First ALS gene discovered; causes ~20% of familial ALS." },
    { name: "FUS", slug: "fus", desc: "RNA-binding protein; mutations cause aggressive early-onset ALS." },
    { name: "TARDBP (TDP-43)", slug: "tardbp-tdp-43", desc: "TDP-43 aggregation is a hallmark of most ALS and FTD cases." },
  ],
};

export function GeneTemplate({
  entry,
  isSaved,
  isAuthed,
  userDiseaseSlug,
  children,
}: {
  entry: ContentEntry;
  isSaved: boolean;
  isAuthed: boolean;
  userDiseaseSlug?: string | null;
  children: React.ReactNode;
}) {
  const relatedDiseases = DISEASES.filter((d) =>
    d.relatedGenes.includes(entry.slug),
  );
  const userDisease = getDisease(userDiseaseSlug);
  const isRelevant = userDisease != null && relatedDiseases.some((d) => d.slug === userDisease.slug);

  const geneLinks = GENE_LINKS[entry.slug];

  return (
    <>
      <section className="bg-ink text-fg-inverse relative overflow-hidden">
        <div className="absolute -top-32 right-0 w-[600px] h-[500px] rounded-full pointer-events-none" aria-hidden style={{ background: "radial-gradient(ellipse, rgba(46,91,255,0.11) 0%, transparent 70%)" }} />
        <div className="hero-noise absolute inset-0 pointer-events-none" aria-hidden />
        <Container className="py-16 md:py-20 relative z-10">
          <div className="space-y-4 max-w-3xl">
            <p className="text-sm font-medium text-brand uppercase tracking-wider">Genetics</p>
            <h1 className="display-xl hero-gradient-text">{entry.title}</h1>
            {entry.description && (
              <p className="text-lg text-fg-inverse/80 max-w-2xl">{entry.description}</p>
            )}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <SaveButton slug={entry.slug} initial={isSaved} disabled={!isAuthed} variant="dark" />
              {isRelevant && (
                <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-brand/20 text-fg-inverse-strong font-medium">
                  <span className="size-1.5 rounded-full bg-brand inline-block" />
                  Part of your {userDisease!.shortName} focus
                </span>
              )}
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-16 max-w-3xl">
        <div className="prose-axonome">{children}</div>

        {geneLinks && (
          <section className="mt-10 space-y-4">
            <ul className="grid sm:grid-cols-2 gap-3">
              {geneLinks.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/${g.slug}`}
                    className="block p-5 rounded-lg bg-white border border-border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 space-y-1"
                  >
                    <span className="font-display font-semibold text-lg">{g.name}</span>
                    <p className="text-sm text-fg/70">{g.desc}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {relatedDiseases.length > 0 && (
          <section className="mt-16 space-y-3">
            <h2 className="font-display font-semibold text-2xl">Related disease</h2>
            <ul className="grid sm:grid-cols-2 gap-2">
              {relatedDiseases.map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/${d.slug}`}
                    className="block p-4 rounded-lg bg-white border border-border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <span className="font-medium">{d.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-16">
          <MedicalDisclaimer />
        </div>
      </Container>
    </>
  );
}
