import Link from "next/link";
import { Container } from "@/components/container";

export const metadata = {
  title: "Diseases",
  description:
    "Neurodegenerative diseases are a group of conditions that affect neurons throughout the body. Explore our coverage.",
};

const DISEASE_BUTTONS = [
  { label: "Alzheimer's", href: "/alzheimers" },
  { label: "Parkinson's", href: "/parkinsons" },
  { label: "ALS / FTD", href: "/als-ftd" },
  { label: "Multiple Sclerosis", href: "/multiple-sclerosis" },
  { label: "Huntington's", href: "/huntingtons" },
  { label: "CIPN", href: "/cipn" },
  { label: "Ischemic Stroke", href: "/ischemic-stroke" },
  { label: "TBI/CTE", href: "/tbi-cte" },
];

export default function DiseasesPage() {
  return (
    <Container className="py-16 md:py-20">
      <h2 className="display-lg mb-4">Understanding Neurodegenerative Diseases</h2>
      <p className="text-fg-muted max-w-2xl mb-12 text-lg">
        Neurodegenerative diseases are a group of conditions that affect neurons, the functional
        building blocks of nerves, throughout the body. Neurodegeneration represents one of the
        most significant challenges in modern medicine, with diseases often becoming progressively
        debilitating over time as cells lose function or die.
      </p>
      <div className="grid md:grid-cols-2 gap-4">
        {DISEASE_BUTTONS.map((btn) => (
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
  );
}
