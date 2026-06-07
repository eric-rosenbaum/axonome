import Image from "next/image";
import { Container } from "@/components/container";
import About from "@/content/pages/about.mdx";

export const metadata = {
  title: "About",
  description: "What Axonome is, who it's for, and how we work.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-ink text-fg-inverse">
        <Container className="py-14 md:py-16">
          <h3 className="display-lg text-fg-inverse-strong">The Vision Behind Axonome</h3>
        </Container>
      </section>
      <Container className="py-12 max-w-3xl">
        <div className="flex justify-center mb-10">
          <Image
            src="/images/about-image.png"
            alt="Axonome illustration"
            width={280}
            height={280}
            className="rounded-full"
          />
        </div>
        <article className="prose-axonome">
          <About />
        </article>
      </Container>
    </>
  );
}
