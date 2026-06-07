import { Container } from "@/components/container";
import { getResearchItems } from "@/lib/research";

export const metadata = {
  title: "Research Summaries & Highlights",
  description:
    "Plain-language summaries of recent peer-reviewed research in neuroscience and neurodegeneration.",
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

export default function ResearchSummariesPage() {
  const items = getResearchItems("summaries");

  return (
    <>
      <section className="bg-ink text-fg-inverse">
        <Container className="py-14 md:py-16">
          <h2 className="display-lg text-fg-inverse-strong">
            Research Summaries &amp; Highlights
          </h2>
        </Container>
      </section>

      <Container className="py-12 max-w-4xl space-y-12">
        {items.map((item) => {
          const lines = item.content.split("\n").filter((l) => l.trim() !== "");

          return (
            <article key={item.slug} className="space-y-4">
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
          <p className="text-fg-muted">No research summaries yet. Check back soon.</p>
        )}
      </Container>
    </>
  );
}
