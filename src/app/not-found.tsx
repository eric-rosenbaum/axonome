import Link from "next/link";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <Container className="py-32 text-center space-y-4">
      <h1 className="display-md">Page not found</h1>
      <p className="text-fg-muted max-w-md mx-auto">
        We couldn&apos;t find that page. It may have moved, or never existed.
      </p>
      <div className="pt-4 flex justify-center gap-3">
        <Link
          href="/"
          className="inline-flex h-11 items-center justify-center rounded-md bg-brand hover:bg-brand-hover text-white font-medium px-5"
        >
          Go home
        </Link>
        <Link
          href="/explore"
          className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-surface hover:bg-card text-fg px-5"
        >
          Explore
        </Link>
      </div>
    </Container>
  );
}
