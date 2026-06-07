import Link from "next/link";
import { Container } from "@/components/container";
import { MedicalDisclaimer } from "@/components/medical-disclaimer";
import { SaveButton } from "@/components/save-button";
import type { ContentEntry } from "@/lib/content";

const INTERVENTION_LINKS: Record<string, { name: string; slug: string; desc: string }[]> = {
  "medical-interventions": [
    { name: "Levodopa", slug: "levodopa", desc: "Core symptomatic treatment for Parkinson's motor symptoms." },
    { name: "Deep Brain Stimulation", slug: "deep-brain-stimulation", desc: "Neurosurgical circuit therapy for advanced Parkinson's disease." },
    { name: "Cholinesterase Inhibitors", slug: "cholinesterase-inhibitors", desc: "Symptomatic cognitive treatment for Alzheimer's disease." },
    { name: "NMDA Receptor Antagonists", slug: "nmda-receptor-antagonists", desc: "Memantine for moderate-to-severe Alzheimer's symptoms." },
    { name: "Immune Modulation", slug: "immune-modulation", desc: "Disease-modifying immune therapies; strongest evidence in MS." },
    { name: "SARM1 Inhibitors", slug: "sarm-1-inhibitors", desc: "Emerging class targeting programmed axon degeneration." },
  ],
  "supplements": [
    { name: "Omega-3 Fatty Acids", slug: "omega-3", desc: "EPA and DHA; plausible but mixed clinical evidence." },
    { name: "Vitamin D", slug: "vitamin-d", desc: "Important to correct deficiency; limited disease-modifying evidence." },
    { name: "Creatine", slug: "creatine", desc: "Cellular energy buffer; promising but still clinically early." },
    { name: "CoQ10", slug: "co-q-1", desc: "Mitochondrial antioxidant; strong theory but disappointing trials." },
    { name: "B Vitamins", slug: "b-vitamins", desc: "Homocysteine lowering; may benefit selected subgroups." },
    { name: "Curcumin", slug: "curcumin", desc: "Strong preclinical data; poor human bioavailability." },
    { name: "NAD+ Boosters", slug: "nad-boosters", desc: "NR/NMN; mechanistically attractive but clinically early." },
    { name: "Resveratrol", slug: "resveratrol", desc: "Polyphenol with biologic activity; limited clinical evidence." },
    { name: "Magnesium", slug: "magnesium", desc: "Essential mineral; correct deficiency but weak dementia evidence." },
    { name: "EGCG (Green Tea)", slug: "egcg-green-tea", desc: "Catechin antioxidant; good preclinical, limited human trials." },
    { name: "Misleading Supplements", slug: "misleading-supplements", desc: "Common supplements with weak or no neurodegeneration evidence." },
  ],
  "lifestyle": [
    { name: "Exercise", slug: "exercise", desc: "One of the most important lifestyle interventions for brain health." },
    { name: "Diet", slug: "diet", desc: "Long-term dietary patterns that shape vascular and metabolic health." },
    { name: "Sleep", slug: "sleep", desc: "Sleep quality, duration, and circadian rhythm for brain resilience." },
    { name: "Hearing Optimization", slug: "hearing-optimization", desc: "Treating hearing loss — one of the clearest modifiable risk factors." },
    { name: "Cognitive Reserve", slug: "cognitive-reserve", desc: "Lifelong mental engagement and purpose to build brain resilience." },
    { name: "Stress Reduction", slug: "stress-reduction", desc: "Managing chronic stress to support other protective behaviors." },
    { name: "Social Engagement", slug: "social-engagement", desc: "Social connection as a recognized modifiable dementia risk factor." },
  ],
};

export function InterventionTemplate({
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
  const subLinks = INTERVENTION_LINKS[entry.slug];

  return (
    <>
      <section className="bg-ink text-fg-inverse relative overflow-hidden">
        <div className="absolute -top-32 right-0 w-[600px] h-[500px] rounded-full pointer-events-none" aria-hidden style={{ background: "radial-gradient(ellipse, rgba(46,91,255,0.11) 0%, transparent 70%)" }} />
        <div className="hero-noise absolute inset-0 pointer-events-none" aria-hidden />
        <Container className="py-16 md:py-20 relative z-10">
          <div className="space-y-4 max-w-3xl">
            <p className="text-sm font-medium text-brand uppercase tracking-wider">Intervention</p>
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
        <div className="prose-axonome">{children}</div>

        {subLinks && (
          <section className="space-y-4">
            <ul className="grid sm:grid-cols-2 gap-3">
              {subLinks.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/${item.slug}`}
                    className="block p-5 rounded-lg bg-white border border-border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 space-y-1"
                  >
                    <span className="font-display font-semibold text-lg">{item.name}</span>
                    <p className="text-sm text-fg/70">{item.desc}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <MedicalDisclaimer />
      </Container>
    </>
  );
}
