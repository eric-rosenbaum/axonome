import Link from "next/link";
import { Container } from "@/components/container";

export const metadata = {
  title: "Mechanisms",
  description:
    "Understand the cellular mechanisms that drive neurodegeneration, from mitochondrial dysfunction to protein aggregation.",
};

const MECHANISM_BUTTONS = [
  { label: "Mitochondrial Dysfunction", href: "/mitochondrial-dysfunction" },
  { label: "Oxidative Stress", href: "/oxidative-stress" },
  { label: "Protein Aggregation", href: "/protein-aggregation" },
  { label: "Inflammation", href: "/inflammation" },
  { label: "SARMopathy", href: "/sar-mopathy" },
  { label: "Senescence", href: "/senescence" },
  { label: "Autophagy and Lysosome", href: "/autophagy-and-lysosome" },
  { label: "Golgi Fragmentation", href: "/golgi-fragmentation" },
];

export default function MechanismsPage() {
  return (
    <>
      <section className="bg-ink text-fg-inverse">
        <Container className="py-14 md:py-16">
          <h1 className="display-lg text-fg-inverse-strong">Understanding Mechanisms</h1>
          <p className="text-fg-inverse/70 mt-4 max-w-2xl text-lg">
            Explore the cellular drivers of neurodegeneration including protein aggregation,
            mitochondrial stress, and inflammation.
          </p>
        </Container>
      </section>
      <Container className="py-16">
        <div className="grid md:grid-cols-2 gap-4">
          {MECHANISM_BUTTONS.map((btn) => (
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
