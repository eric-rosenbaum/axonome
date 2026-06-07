"use client";

import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";

interface PagefindResult {
  id: string;
  url: string;
  data: () => Promise<{
    url: string;
    meta?: Record<string, string>;
    excerpt: string;
  }>;
}

interface PagefindAPI {
  search: (term: string) => Promise<{ results: PagefindResult[] }>;
}

declare global {
  interface Window {
    pagefind?: PagefindAPI;
  }
}

export function SearchClient() {
  const [q, setQ] = useState("");
  const [items, setItems] = useState<
    { url: string; title: string; excerpt: string }[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    (async () => {
      try {
        // Pagefind is generated at build time into /public/pagefind/pagefind.js
        // @ts-expect-error — dynamic ESM import resolved at runtime
        const mod = await import(/* webpackIgnore: true */ "/pagefind/pagefind.js");
        window.pagefind = mod as PagefindAPI;
      } catch (e) {
        setError(
          "Search index isn't built yet. Run `npm run build` to generate it.",
        );
        console.error(e);
      }
    })();
  }, []);

  useEffect(() => {
    if (!q.trim() || !window.pagefind) {
      setItems([]);
      return;
    }
    setPending(true);
    let cancelled = false;
    (async () => {
      try {
        const res = await window.pagefind!.search(q);
        const data = await Promise.all(res.results.slice(0, 20).map((r) => r.data()));
        if (cancelled) return;
        setItems(
          data.map((d) => ({
            url: d.url.replace(/\.html$/, "").replace(/\/$/, "") || "/",
            title: d.meta?.title ?? d.url,
            excerpt: d.excerpt,
          })),
        );
      } finally {
        if (!cancelled) setPending(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [q]);

  return (
    <div className="space-y-6">
      <label className="relative block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-fg-subtle" />
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search diseases, mechanisms, interventions…"
          className="block w-full h-12 rounded-md border border-border bg-surface pl-10 pr-3 text-base focus:outline-none focus:ring-2 focus:ring-brand"
        />
      </label>

      {error && <p className="text-sm text-fg-muted">{error}</p>}

      {!error && q.trim() && items.length === 0 && !pending && (
        <p className="text-sm text-fg-muted">No matches.</p>
      )}

      <ul className="space-y-2">
        {items.map((it) => (
          <li key={it.url}>
            <a
              href={it.url}
              className="block p-4 rounded-lg bg-card hover:bg-border transition-colors"
            >
              <span className="font-display font-semibold text-lg block">{it.title}</span>
              <span
                className="block text-sm text-fg-muted mt-1 [&_mark]:bg-brand-tint [&_mark]:text-fg"
                dangerouslySetInnerHTML={{ __html: it.excerpt }}
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
