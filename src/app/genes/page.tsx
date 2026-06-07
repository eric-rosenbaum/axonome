import Link from "next/link";
import { Container } from "@/components/container";

export const metadata = {
  title: "Disease Genes",
  description:
    "Explore the genetic architecture and specific risk variants associated with neurodegenerative disease onset.",
};

const GENE_BUTTONS = [
  { label: "Parkinson's Genes", href: "/parkinsons-genes" },
  { label: "Alzheimer's Genes", href: "/alzheimers-genes" },
  { label: "ALS/FTD Genes", href: "/als-ftd-genes" },
  { label: "HTT (Huntington's)", href: "/huntingtons-genes" },
];

export default function GenesPage() {
  return (
    <>
      <section className="bg-ink text-fg-inverse">
        <Container className="py-14 md:py-16">
          <h1 className="display-lg text-fg-inverse-strong">Understanding Disease Genetics</h1>
          <p className="text-fg-inverse/70 mt-4 max-w-2xl text-lg">
            Mapping the genetic architecture and specific risk variants associated with
            neurodegenerative disease onset and progression.
          </p>
        </Container>
      </section>
      <Container className="py-16">
        <div className="grid md:grid-cols-2 gap-4">
          {GENE_BUTTONS.map((btn) => (
            <Link
              key={btn.href}
              href={btn.href}
              className="flex items-center justify-center px-6 py-6 rounded-lg bg-brand hover:bg-brand-hover text-white font-semibold text-lg text-center transition-colors"
            >
              {btn.label}
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
