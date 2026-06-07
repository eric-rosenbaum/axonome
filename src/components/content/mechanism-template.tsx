import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { MedicalDisclaimer } from "@/components/medical-disclaimer";
import { SaveButton } from "@/components/save-button";
import type { ContentEntry } from "@/lib/content";
import { DISEASES, getDisease } from "@/lib/diseases";

const PAGE_IMAGES: Record<string, { src: string; alt: string; w: number; h: number }> = {
  "mitochondrial-dysfunction": { src: "/images/mitochondrial-dysfunction.png", alt: "Mitochondria detail", w: 675, h: 844 },
  "oxidative-stress": { src: "/images/oxidative-stress.png", alt: "Oxidative stress illustration", w: 516, h: 730 },
  "protein-aggregation": { src: "/images/protein-aggregation.png", alt: "Protein aggregation illustration", w: 738, h: 880 },
  "inflammation": { src: "/images/inflammation.png", alt: "Neuroinflammation illustration", w: 960, h: 1200 },
  "senescence": { src: "/images/senescence.png", alt: "Cellular senescence illustration", w: 1055, h: 1322 },
  "autophagy-and-lysosome": { src: "/images/autophagy-and-lysosome.png", alt: "Autophagy and lysosome illustration", w: 1122, h: 1237 },
  "golgi-fragmentation": { src: "/images/golgi-fragmentation.png", alt: "Golgi fragmentation illustration", w: 1122, h: 1214 },
  "sar-mopathy": { src: "/images/sar-mopathy.png", alt: "SARMopathy illustration", w: 854, h: 714 },
};

export function MechanismTemplate({
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
    d.relatedMechanisms.includes(entry.slug),
  );
  const userDisease = getDisease(userDiseaseSlug);
  const isRelevant = userDisease != null && relatedDiseases.some((d) => d.slug === userDisease.slug);

  return (
    <>
      <section className="bg-ink text-fg-inverse relative overflow-hidden">
        <div className="absolute -top-32 right-0 w-[600px] h-[500px] rounded-full pointer-events-none" aria-hidden style={{ background: "radial-gradient(ellipse, rgba(46,91,255,0.11) 0%, transparent 70%)" }} />
        <div className="hero-noise absolute inset-0 pointer-events-none" aria-hidden />
        <Container className="py-16 md:py-20 relative z-10">
          <div className="space-y-4 max-w-3xl">
            <p className="text-sm font-medium text-brand uppercase tracking-wider">Mechanism</p>
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

        {PAGE_IMAGES[entry.slug] && (
          <div className="flex justify-center mb-10">
            <Image
              src={PAGE_IMAGES[entry.slug].src}
              alt={PAGE_IMAGES[entry.slug].alt}
              width={PAGE_IMAGES[entry.slug].w / 2}
              height={PAGE_IMAGES[entry.slug].h / 2}
              className="rounded-lg"
            />
          </div>
        )}

        <div className="prose-axonome">{children}</div>

        {relatedDiseases.length > 0 && (
          <section className="mt-16 space-y-3">
            <h2 className="font-display font-semibold text-2xl">
              Diseases where this matters
            </h2>
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
