import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { MedicalDisclaimer } from "@/components/medical-disclaimer";
import { SaveButton } from "@/components/save-button";
import type { ContentEntry } from "@/lib/content";

const CATEGORY_LABELS: Record<string, string> = {
  "individual-genes": "Gene",
  "individual-interventions": "Medical Intervention",
  "individual-supplements": "Supplement",
  "individual-lifestyle": "Lifestyle",
};

/** Images downloaded for individual sub-pages. */
const PAGE_IMAGES: Record<string, { src: string; alt: string; w: number; h: number }[]> = {
  // Genes — all have 2 images (normal + mutant biology diagrams)
  "pink-1": [
    { src: "/images/pink-1-1.png", alt: "PINK1 normal function", w: 822, h: 616 },
    { src: "/images/pink-1-2.png", alt: "PINK1 mutant function", w: 822, h: 616 },
  ],
  "parkin": [
    { src: "/images/parkin-1.png", alt: "Parkin normal function", w: 709, h: 532 },
    { src: "/images/parkin-2.png", alt: "Parkin mutant function", w: 709, h: 532 },
  ],
  "lrrk-2": [
    { src: "/images/lrrk-2-1.png", alt: "LRRK2 mutant biology", w: 810, h: 608 },
    { src: "/images/lrrk-2-2.png", alt: "LRRK2 normal biology", w: 810, h: 608 },
  ],
  "gba-1": [
    { src: "/images/gba-1-1.png", alt: "GBA1 normal function", w: 810, h: 608 },
    { src: "/images/gba-1-2.png", alt: "GBA1 mutant function", w: 810, h: 608 },
  ],
  "snca": [
    { src: "/images/snca-1.png", alt: "Normal SNCA", w: 810, h: 608 },
    { src: "/images/snca-2.png", alt: "Mutant SNCA", w: 810, h: 608 },
  ],
  "apoe": [
    { src: "/images/apoe-1.png", alt: "APOE4 illustration", w: 818, h: 614 },
    { src: "/images/apoe-2.png", alt: "Normal APOE illustration", w: 818, h: 614 },
  ],
  "psen-1-2": [
    { src: "/images/psen-1-2-1.png", alt: "PSEN1/2 normal biology", w: 810, h: 608 },
    { src: "/images/psen-1-2-2.png", alt: "PSEN1/2 mutant biology", w: 810, h: 608 },
  ],
  "trem-2": [
    { src: "/images/trem-2-1.png", alt: "TREM2 normal function", w: 810, h: 608 },
    { src: "/images/trem-2-2.png", alt: "TREM2 mutant function", w: 810, h: 608 },
  ],
  "c-9-orf-72": [
    { src: "/images/c-9-orf-72-1.png", alt: "C9orf72 mutation effect", w: 816, h: 612 },
    { src: "/images/c-9-orf-72-2.png", alt: "C9orf72 normal function", w: 816, h: 612 },
  ],
  "sod-1": [
    { src: "/images/sod-1-1.png", alt: "SOD1 protein structure", w: 810, h: 608 },
    { src: "/images/sod-1-2.png", alt: "SOD1 cellular distribution", w: 810, h: 608 },
  ],
  "fus": [
    { src: "/images/fus-1.png", alt: "FUS mutant function biology", w: 810, h: 608 },
    { src: "/images/fus-2.png", alt: "FUS normal function biology", w: 810, h: 608 },
  ],
  "tardbp-tdp-43": [
    { src: "/images/tardbp-tdp-43-1.png", alt: "TARDBP / TDP-43 illustration 1", w: 908, h: 682 },
    { src: "/images/tardbp-tdp-43-2.png", alt: "TARDBP / TDP-43 illustration 2", w: 908, h: 682 },
  ],
};

export function SubpageTemplate({
  entry,
  isSaved,
  isAuthed,
  children,
}: {
  entry: ContentEntry;
  isSaved: boolean;
  isAuthed: boolean;
  userDiseaseSlug?: string | null;
  children: React.ReactNode;
}) {
  const label = CATEGORY_LABELS[entry.type] ?? "Article";
  const img = PAGE_IMAGES[entry.slug] ?? null;

  return (
    <>
      <section className="bg-ink text-fg-inverse relative overflow-hidden">
        <div className="absolute -top-32 right-0 w-[600px] h-[500px] rounded-full pointer-events-none" aria-hidden style={{ background: "radial-gradient(ellipse, rgba(46,91,255,0.11) 0%, transparent 70%)" }} />
        <div className="hero-noise absolute inset-0 pointer-events-none" aria-hidden />
        <Container className="py-16 md:py-20 relative z-10">
          <div className="space-y-4 max-w-3xl">
            <p className="text-sm font-medium text-brand uppercase tracking-wider">{label}</p>
            <h1 className="display-xl hero-gradient-text">{entry.title}</h1>
            {entry.description && (
              <p className="text-lg text-fg-inverse/80 max-w-2xl">{entry.description}</p>
            )}
            <div className="pt-2">
              <SaveButton slug={entry.slug} initial={isSaved} disabled={!isAuthed} variant="dark" />
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-12 max-w-3xl space-y-8">
        {img && (
          <div className="space-y-6">
            {img.map((i, idx) => (
              <div key={idx} className="flex justify-center">
                <Image src={i.src} alt={i.alt} width={i.w / 2} height={i.h / 2} className="rounded-lg" />
              </div>
            ))}
          </div>
        )}

        <div className="prose-axonome">{children}</div>

        {entry.parentSlug && entry.parentTitle && (
          <div className="pt-4">
            <Link
              href={`/${entry.parentSlug}`}
              className="inline-flex items-center gap-2 text-brand hover:underline font-medium"
            >
              &larr; Back to {entry.parentTitle}
            </Link>
          </div>
        )}

        <MedicalDisclaimer />
      </Container>
    </>
  );
}
