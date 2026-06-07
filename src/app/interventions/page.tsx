import Link from "next/link";
import { Container } from "@/components/container";

export const metadata = {
  title: "Interventions",
  description:
    "Discover medical interventions, lifestyle approaches, and supplements relevant to neurodegenerative disease management.",
};

const INTERVENTION_BUTTONS = [
  { label: "Medical Interventions", href: "/medical-interventions" },
  { label: "Lifestyle", href: "/lifestyle" },
  { label: "Supplements", href: "/supplements" },
];

export default function InterventionsPage() {
  return (
    <>
      <section className="bg-ink text-fg-inverse">
        <Container className="py-14 md:py-16">
          <h1 className="display-lg text-fg-inverse-strong">Understanding Interventions</h1>
          <p className="text-fg-inverse/70 mt-4 max-w-2xl text-lg">
            Discover medical interventions and lifestyle changes relevant to neurodegenerative
            disease management and progression.
          </p>
        </Container>
      </section>
      <Container className="py-16">
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
          {INTERVENTION_BUTTONS.map((btn) => (
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
