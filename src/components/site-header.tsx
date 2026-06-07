"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { getDisease } from "@/lib/diseases";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  {
    label: "Diseases",
    href: "/diseases",
    children: [
      { label: "Parkinson's", href: "/parkinsons" },
      { label: "Alzheimer's", href: "/alzheimers" },
      { label: "ALS / FTD", href: "/als-ftd" },
      { label: "Huntington's", href: "/huntingtons" },
      { label: "Multiple Sclerosis", href: "/multiple-sclerosis" },
      { label: "CIPN", href: "/cipn" },
      { label: "Ischemic Stroke", href: "/ischemic-stroke" },
      { label: "TBI/CTE", href: "/tbi-cte" },
    ],
  },
  {
    label: "Genes",
    href: "/genes",
    children: [
      { label: "Parkinson's Genes", href: "/parkinsons-genes" },
      { label: "Alzheimer's Genes", href: "/alzheimers-genes" },
      { label: "ALS/FTD Genes", href: "/als-ftd-genes" },
      { label: "HTT (Huntington's)", href: "/huntingtons-genes" },
    ],
  },
  {
    label: "Mechanisms",
    href: "/mechanisms",
    children: [
      { label: "Mitochondrial Dysfunction", href: "/mitochondrial-dysfunction" },
      { label: "Oxidative Stress", href: "/oxidative-stress" },
      { label: "Protein Aggregation", href: "/protein-aggregation" },
      { label: "Inflammation", href: "/inflammation" },
      { label: "SARMopathy", href: "/sar-mopathy" },
      { label: "Senescence", href: "/senescence" },
      { label: "Autophagy and Lysosome", href: "/autophagy-and-lysosome" },
      { label: "Golgi Fragmentation", href: "/golgi-fragmentation" },
    ],
  },
  {
    label: "Interventions",
    href: "/interventions",
    children: [
      { label: "Medical Interventions", href: "/medical-interventions" },
      { label: "Lifestyle", href: "/lifestyle" },
      { label: "Supplements", href: "/supplements" },
    ],
  },
  {
    label: "Research",
    href: "/research",
    children: [
      { label: "Clinical Trial Updates", href: "/clinical-trial-updates" },
      { label: "Research Summaries", href: "/research-summaries" },
    ],
  },
  { label: "About", href: "/about" },
];

export function SiteHeader({
  isAuthed,
  userName,
  diseaseSlug,
}: {
  isAuthed: boolean;
  userName: string | null;
  diseaseSlug: string | null;
}) {
  const disease = getDisease(diseaseSlug);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 text-fg-inverse border-b print:hidden transition-all duration-300 ${
        scrolled
          ? "bg-ink/80 backdrop-blur-md border-white/10 shadow-lg shadow-black/20"
          : "bg-ink border-border-inverse"
      }`}
    >
      <div className="mx-auto max-w-[var(--container-max)] px-6 h-16 flex items-center gap-6">
        <Link href="/" aria-label="Axonome — home" className="flex items-center gap-2 shrink-0">
          <Logo className="size-7" />
          <span className="font-display font-semibold text-fg-inverse-strong tracking-tight">Axonome</span>
        </Link>

        <nav className="hidden md:flex items-center gap-0 text-sm">
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <div key={item.label} className="relative group">
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-3 py-2 rounded-md text-fg-inverse/80 hover:text-fg-inverse-strong hover:bg-white/8 transition-colors"
                >
                  {item.label}
                  <span className="text-xs opacity-50">▾</span>
                </Link>
                <div className="absolute top-full left-0 hidden group-hover:block pt-1 z-50">
                  <div className="bg-ink-strong/95 backdrop-blur-md border border-white/10 rounded-xl shadow-xl shadow-black/30 py-2 min-w-[200px]">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-fg-inverse/80 hover:text-fg-inverse-strong hover:bg-white/8 transition-colors whitespace-nowrap"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="px-3 py-2 rounded-md text-fg-inverse/80 hover:text-fg-inverse-strong hover:bg-white/8 transition-colors"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {isAuthed ? (
            <>
              {disease && (
                <Link
                  href={`/${disease.slug}`}
                  className="hidden md:block px-3 py-1.5 rounded-md text-sm text-brand font-medium hover:bg-white/8 transition-colors"
                >
                  {disease.shortName}
                </Link>
              )}
              <Link href="/saved" className="px-3 py-1.5 rounded-md text-sm text-fg-inverse/80 hover:text-fg-inverse-strong hover:bg-white/8 transition-colors">
                Saved
              </Link>
              <Link href="/account" className="px-3 py-1.5 rounded-md text-sm text-fg-inverse/80 hover:text-fg-inverse-strong hover:bg-white/8 transition-colors">
                {userName ?? "Account"}
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="px-3 py-1.5 rounded-md text-sm text-fg-inverse/80 hover:text-fg-inverse-strong transition-colors">
                Sign in
              </Link>
              <Link
                href="/signup"
                className="px-3 py-1.5 rounded-md text-sm bg-brand hover:bg-brand-hover text-white font-medium transition-colors"
              >
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
