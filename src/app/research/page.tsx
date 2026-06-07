import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";

export const metadata = {
  title: "Research",
  description:
    "A centralized scientific hub dedicated to mapping mechanisms and connecting clinicians with the latest evidentiary research through a data-driven approach.",
};

export default function ResearchPage() {
  return (
    <>
      {/* Dark hero */}
      <section className="bg-ink text-fg-inverse">
        <Container className="py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-5">
              <p className="text-sm font-medium text-brand uppercase tracking-widest">
                Axonome Research Hub
              </p>
              <h1 className="display-xl text-fg-inverse-strong">
                Advancing Evidence-Based Neurobiology
              </h1>
              <p className="text-lg text-fg-inverse/70 max-w-xl">
                A centralized scientific hub dedicated to mapping mechanisms and connecting
                clinicians with the latest evidentiary research through a data-driven approach.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/clinical-trial-updates"
                  className="inline-flex h-11 items-center justify-center rounded-md bg-brand hover:bg-brand-hover text-white font-medium px-6 text-sm transition-colors"
                >
                  Research Summaries
                </Link>
                <Link
                  href="/research-summaries"
                  className="inline-flex h-11 items-center justify-center rounded-md border border-border-inverse text-fg-inverse-strong hover:bg-ink-soft px-6 text-sm transition-colors"
                >
                  Clinical Trials
                </Link>
              </div>
            </div>
            <div className="hidden md:block shrink-0">
              <Image
                src="/images/research-image-1.jpg"
                alt="Research illustration"
                width={420}
                height={280}
                className="rounded-lg object-cover"
                priority
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Two feature blocks */}
      <section>
        <Container className="py-20">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Clinical Trial Updates */}
            <div className="space-y-5">
              <div className="overflow-hidden rounded-lg">
                <Image
                  src="/images/research-image-1.jpg"
                  alt="Clinical trials"
                  width={560}
                  height={340}
                  className="w-full object-cover"
                />
              </div>
              <h3 className="display-md">Clinical Trial Updates</h3>
              <p className="text-fg-muted">
                Stay current with the latest clinical trials investigating disease-modifying
                therapies for neurodegenerative conditions. We summarize trial design, current
                status, and key findings as they emerge.
              </p>
              <Link
                href="/clinical-trial-updates"
                className="inline-flex h-11 items-center justify-center rounded-md bg-brand hover:bg-brand-hover text-white font-medium px-6 text-sm uppercase tracking-wide transition-colors"
              >
                View Trial Updates
              </Link>
            </div>

            {/* Research Summaries */}
            <div className="space-y-5">
              <div className="overflow-hidden rounded-lg">
                <Image
                  src="/images/research-image-2.jpg"
                  alt="Research summaries"
                  width={560}
                  height={340}
                  className="w-full object-cover"
                />
              </div>
              <h3 className="display-md">Research Summaries</h3>
              <p className="text-fg-muted">
                Plain-language summaries of recent findings from peer-reviewed research in
                neuroscience and neurodegeneration — organized by disease, mechanism, and
                therapeutic target.
              </p>
              <Link
                href="/research-summaries"
                className="inline-flex h-11 items-center justify-center rounded-md bg-brand hover:bg-brand-hover text-white font-medium px-6 text-sm uppercase tracking-wide transition-colors"
              >
                Explore Summaries
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
