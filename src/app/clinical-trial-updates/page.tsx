import Link from "next/link";
import { Container } from "@/components/container";
import { getResearchItems } from "@/lib/research";

export const metadata = {
  title: "Clinical Trial Updates",
  description:
    "The latest clinical trial updates for neurodegenerative disease therapies.",
};

/** Parse inline [text](url) markdown links into React nodes. */
function InlineMarkdown({ text }: { text: string }) {
  const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = LINK_RE.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    nodes.push(
      <a
        key={m.index}
        href={m[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand underline underline-offset-2 hover:text-brand-hover"
      >
        {m[1]}
      </a>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return <>{nodes}</>;
}

export default function ClinicalTrialUpdatesPage() {
  const items = getResearchItems("trials");

  return (
    <>
      <section className="bg-ink text-fg-inverse">
        <Container className="py-14 md:py-16">
          <h2 className="display-lg text-fg-inverse-strong">Clinical Trial Updates</h2>
        </Container>
      </section>

      <Container className="py-12 max-w-4xl space-y-12">
        {items.map((item) => {
          const dateLabel = new Date(item.date).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
            timeZone: "UTC",
          });

          const lines = item.content.split("\n").filter((l) => l.trim() !== "");

          return (
            <article key={item.slug} className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-fg-muted uppercase tracking-wider">
                  {dateLabel}
                </span>
              </div>
              <h5 className="font-display font-semibold text-2xl">{item.title}</h5>
              <div className="space-y-3 text-fg-muted leading-relaxed">
                {lines.map((line, i) => {
                  if (line.startsWith("- [")) {
                    const match = line.match(/^- \[([^\]]+)\]\(([^)]+)\)$/);
                    if (match) {
                      return (
                        <p key={i} className="text-sm">
                          <a
                            href={match[2]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand underline underline-offset-2 break-all hover:text-brand-hover"
                          >
                            {match[1]}
                          </a>
                        </p>
                      );
                    }
                  }
                  return (
                    <p key={i}>
                      <InlineMarkdown text={line} />
                    </p>
                  );
                })}
              </div>
            </article>
          );
        })}

        {items.length === 0 && (
          <p className="text-fg-muted">No clinical trial updates yet. Check back soon.</p>
        )}
      </Container>
    </>
  );
}
