import Link from "next/link";
import { Container } from "@/components/container";
import { getContentByType } from "@/lib/content";

export const metadata = {
  title: "Explore",
  description:
    "Browse every disease, mechanism, gene page, and intervention covered on Axonome.",
};

const CATEGORIES = [
  { id: "diseases", title: "Diseases", description: "Neurodegenerative conditions covered in v1." },
  {
    id: "mechanisms",
    title: "Mechanisms",
    description: "Cellular processes that go wrong across multiple diseases.",
  },
  {
    id: "genes",
    title: "Genetics",
    description: "Inherited and acquired variants associated with disease.",
  },
  {
    id: "interventions",
    title: "Interventions",
    description: "Approaches discussed in current research and care.",
  },
] as const;

export default async function ExplorePage({ searchParams }: PageProps<"/explore">) {
  const sp = await searchParams;
  const initialCat = typeof sp.cat === "string" ? sp.cat : "diseases";

  const groups = CATEGORIES.map((c) => ({
    ...c,
    items: getContentByType(c.id),
  }));

  return (
    <>
      <section className="bg-ink text-fg-inverse">
        <Container className="py-14 md:py-16">
          <div className="space-y-3 max-w-3xl">
            <h1 className="display-lg text-fg-inverse-strong">Explore Axonome</h1>
            <p className="text-fg-inverse/80 max-w-2xl">
              The full catalog. If you&apos;ve signed up, your dashboard surfaces only what&apos;s
              relevant to your disease. This page shows everything.
            </p>
          </div>
        </Container>
      </section>

      <Container className="py-12">
        <nav
          aria-label="Categories"
          className="flex flex-wrap gap-1 border-b border-border mb-10"
        >
          {CATEGORIES.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className={`px-4 py-3 -mb-px border-b-2 ${
                c.id === initialCat
                  ? "border-brand text-fg font-medium"
                  : "border-transparent text-fg-muted hover:text-fg"
              }`}
            >
              {c.title}
            </a>
          ))}
        </nav>

        <div className="space-y-16">
          {groups.map((g) => (
            <section key={g.id} id={g.id} className="scroll-mt-24 space-y-4">
              <div>
                <h2 className="display-md">{g.title}</h2>
                <p className="text-fg-muted mt-1">{g.description}</p>
              </div>
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {g.items.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/${item.slug}`}
                      className="block p-4 rounded-lg bg-card hover:bg-border transition-colors h-full"
                    >
                      <span className="font-display font-semibold text-lg">{item.title}</span>
                      {item.description && (
                        <span className="block text-sm text-fg-muted mt-1 line-clamp-2">
                          {item.description}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
                {g.items.length === 0 && (
                  <li className="text-fg-subtle text-sm">
                    No {g.title.toLowerCase()} added yet.
                  </li>
                )}
              </ul>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
