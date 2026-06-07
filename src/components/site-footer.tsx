import Link from "next/link";
import { Logo } from "@/components/logo";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-fg-inverse mt-24 print:hidden">
      <div className="mx-auto max-w-[var(--container-max)] px-6 py-12 grid gap-10 md:grid-cols-3">
        {/* Left: Logo + Contact */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Logo className="size-7" />
            <span className="font-display font-semibold text-fg-inverse-strong">Axonome</span>
          </div>
          <p className="text-sm text-fg-inverse/70">Contact</p>
          <a
            href="mailto:ben@axonome.org"
            className="text-sm text-fg-inverse underline underline-offset-2 hover:text-fg-inverse-strong"
          >
            ben@axonome.org
          </a>
        </div>

        {/* Middle: Legal links + disclaimer */}
        <div className="space-y-3 text-sm">
          <div className="flex gap-4">
            <Link
              href="/privacy-statement"
              className="text-fg-inverse/80 hover:text-fg-inverse-strong underline underline-offset-2"
            >
              Privacy Policy
            </Link>
            <span className="text-fg-inverse/40">|</span>
            <Link
              href="/terms-and-conditions"
              className="text-fg-inverse/80 hover:text-fg-inverse-strong underline underline-offset-2"
            >
              Terms of Use
            </Link>
          </div>
          <p className="text-xs text-fg-inverse/60 max-w-xs">
            Axonome is an independent educational project. Content is for informational purposes
            only and does not provide medical advice or diagnosis.
          </p>
        </div>

        {/* Right: Copyright */}
        <div className="text-sm text-fg-inverse/70">
          <p>© {new Date().getFullYear()} Axonome. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
