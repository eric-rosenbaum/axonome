import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { AnimateIn } from "@/components/animate-in";
import { DISEASES } from "@/lib/diseases";

export function LandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-ink text-fg-inverse relative overflow-hidden">
        {/* Radial glow */}
        <div
          className="absolute -top-40 right-0 w-[700px] h-[600px] rounded-full pointer-events-none"
          aria-hidden
          style={{ background: "radial-gradient(ellipse, rgba(46,91,255,0.12) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 -left-20 w-[400px] h-[300px] rounded-full pointer-events-none"
          aria-hidden
          style={{ background: "radial-gradient(ellipse, rgba(46,91,255,0.07) 0%, transparent 70%)" }}
        />
        {/* Noise overlay */}
        <div className="hero-noise absolute inset-0 pointer-events-none" aria-hidden />

        <Container className="py-20 md:py-28 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <p className="text-sm font-medium text-brand uppercase tracking-wider">Axonome</p>
              <h1 className="display-xl hero-gradient-text">Neurodegeneration Explained</h1>
              <div className="space-y-4 text-base md:text-lg text-fg-inverse/75 max-w-2xl">
                <p>
                  Axonome comes from two words: axon and tome. An axon is the long arm of a neuron
                  that carries signals to other cells, allowing the nervous system to communicate.
                  A tome is a substantial book or body of knowledge. Together, Axonome reflects the
                  goal of this site: to serve as a clear, organized, and scientifically grounded
                  resource on neurodegenerative disease. It is designed for patients, families,
                  students, trainees, clinicians, and researchers by making the core ideas
                  understandable without a scientific background while still providing enough depth
                  for readers with medical or scientific training.
                </p>
                <p>
                  This project was motivated by my grandfather&apos;s struggle with
                  neurodegenerative disease and by a desire to make the science behind these
                  conditions more accessible, organized, and useful.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/signup"
                  className="inline-flex h-12 items-center justify-center rounded-md bg-brand hover:bg-brand-hover text-white font-medium px-6 transition-colors shadow-lg shadow-brand/25"
                >
                  Get Started
                </Link>
                <Link
                  href="/explore"
                  className="inline-flex h-12 items-center justify-center rounded-md border border-white/15 text-fg-inverse-strong hover:bg-white/8 px-6 transition-colors backdrop-blur-sm"
                >
                  Browse without signing up
                </Link>
              </div>
            </div>
            <div className="hidden md:block shrink-0">
              <Image
                src="/images/home-hero.png"
                alt="Neuron illustration"
                width={340}
                height={338}
                className="opacity-90"
                priority
              />
            </div>
          </div>
        </Container>
      </section>

      {/* What is it */}
      <section>
        <Container className="py-20">
          <AnimateIn>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <h2 className="display-md">What is Axonome?</h2>
              </div>
              <div className="md:col-span-2 space-y-4 max-w-2xl text-lg text-fg-muted">
                <p>
                  Parkinson&apos;s, Alzheimer&apos;s, ALS, and Huntington&apos;s are complicated
                  diseases. Axonome pulls together what&apos;s known about the biology, genetics, and
                  treatment landscape for each condition. Clear, organized, and kept up to date.
                </p>
                <p>
                  Each disease page covers the underlying mechanisms, relevant genetics, current
                  treatment approaches, and what&apos;s coming out of research and clinical trials.
                </p>
              </div>
            </div>
          </AnimateIn>
        </Container>
      </section>

      {/* Diseases covered */}
      <section className="bg-surface border-y border-border">
        <Container className="py-16">
          <AnimateIn>
            <h2 className="display-md mb-2">Diseases covered</h2>
            <p className="text-fg-muted mb-8 max-w-2xl">
              Nine neurodegenerative conditions, with more being added. Browse freely or sign up
              to get a view organized around the one that matters to you.
            </p>
          </AnimateIn>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {DISEASES.map((d, i) => (
              <AnimateIn key={d.slug} delay={i * 40}>
                <Link
                  href={`/${d.slug}`}
                  className="block p-4 rounded-xl bg-white border border-border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <span className="font-display font-semibold text-lg">{d.shortName}</span>
                </Link>
              </AnimateIn>
            ))}
          </div>
        </Container>
      </section>

      {/* What you get when signed in */}
      <section>
        <Container className="py-20">
          <AnimateIn>
            <h2 className="display-md mb-10">What you get when you sign up</h2>
          </AnimateIn>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "A personal index",
                body: "Pick your disease and your dashboard shows the relevant mechanisms, genetics, and interventions first. No wading through the whole site.",
              },
              {
                title: "Save what matters",
                body: "Bookmark any page to come back to later, share with family, or bring to your next doctor's appointment.",
              },
              {
                title: "Research updates",
                body: "Clinical trial updates and research summaries, filtered to the disease you're following.",
              },
            ].map((card, i) => (
              <AnimateIn key={card.title} delay={i * 80}>
                <div className="space-y-2 p-6 rounded-xl border border-border bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                  <h3 className="font-display font-semibold text-xl">{card.title}</h3>
                  <p className="text-fg-muted">{card.body}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="bg-ink text-fg-inverse relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{ background: "radial-gradient(ellipse at 60% 50%, rgba(46,91,255,0.1) 0%, transparent 65%)" }}
        />
        <div className="hero-noise absolute inset-0 pointer-events-none" aria-hidden />
        <Container className="py-16 relative z-10">
          <AnimateIn>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <h2 className="display-md hero-gradient-text">Create an account.</h2>
                <p className="text-fg-inverse/70">
                  Free to use. Takes about a minute to set up.
                </p>
              </div>
              <Link
                href="/signup"
                className="inline-flex h-12 items-center justify-center rounded-md bg-brand hover:bg-brand-hover text-white font-medium px-6 shrink-0 transition-colors shadow-lg shadow-brand/25"
              >
                Create your account
              </Link>
            </div>
          </AnimateIn>
        </Container>
      </section>
    </>
  );
}
