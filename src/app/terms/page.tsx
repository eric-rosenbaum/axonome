import { Container } from "@/components/container";
import Terms from "@/content/pages/terms.mdx";

export const metadata = { title: "Terms of Use" };

export default function TermsPage() {
  return (
    <>
      <section className="bg-ink text-fg-inverse">
        <Container className="py-14">
          <h1 className="display-lg text-fg-inverse-strong">Terms of Use</h1>
        </Container>
      </section>
      <Container className="py-12 max-w-3xl">
        <article className="prose-axonome">
          <Terms />
        </article>
      </Container>
    </>
  );
}
