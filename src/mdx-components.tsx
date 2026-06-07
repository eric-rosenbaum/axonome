import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

function toSlug(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function extractText(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  // @ts-expect-error props on element-like nodes
  if (node && typeof node === "object" && node.props?.children) {
    // @ts-expect-error props on element-like nodes
    return extractText(node.props.children);
  }
  return "";
}

function Heading2({ children, ...rest }: ComponentPropsWithoutRef<"h2">) {
  const id = toSlug(extractText(children));
  return (
    <h2 id={id} {...rest}>
      {children}
    </h2>
  );
}

function Heading3({ children, ...rest }: ComponentPropsWithoutRef<"h3">) {
  const id = toSlug(extractText(children));
  return (
    <h3 id={id} {...rest}>
      {children}
    </h3>
  );
}

const components: MDXComponents = {
  h2: Heading2,
  h3: Heading3,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
