"use client";

import Link from "next/link";
import { Search } from "lucide-react";

export function SearchTrigger() {
  return (
    <Link
      href="/search"
      aria-label="Search"
      className="size-9 inline-flex items-center justify-center rounded-md text-fg-inverse hover:bg-ink-soft transition-colors"
    >
      <Search className="size-4" />
    </Link>
  );
}
