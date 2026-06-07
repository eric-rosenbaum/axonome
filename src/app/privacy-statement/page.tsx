import { Container } from "@/components/container";
import Privacy from "@/content/pages/privacy.mdx";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyStatementPage() {
  return (
    <>
      <section className="bg-ink text-fg-inverse">
        <Container className="py-14">
          <h1 className="display-lg text-fg-inverse-strong">Privacy Policy</h1>
        </Container>
      </section>
      <Container className="py-12 max-w-3xl">
        <article className="prose-axonome">
          <Privacy />
        </article>
      </Container>
    </>
  );
}
