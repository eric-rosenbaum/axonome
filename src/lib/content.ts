import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type ContentType =
  | "diseases"
  | "mechanisms"
  | "genes"
  | "interventions"
  | "individual-genes"
  | "individual-interventions"
  | "individual-supplements"
  | "individual-lifestyle";

export interface ContentFrontmatter {
  title: string;
  slug: string;
  type: ContentType;
  /** Disease slugs this content is associated with. */
  diseases?: string[];
  /** Mechanism slugs referenced by this content. */
  mechanisms?: string[];
  /** Gene slugs referenced by this content. */
  genes?: string[];
  /** Intervention slugs referenced by this content. */
  interventions?: string[];
  /** SEO description. */
  description?: string;
  /** For disease pages, the sections to render in the sticky TOC. */
  sections?: { id: string; title: string }[];
  /** For individual sub-pages: slug of the parent hub page. */
  parentSlug?: string;
  /** For individual sub-pages: display title of the parent hub page. */
  parentTitle?: string;
}

export interface ContentEntry extends ContentFrontmatter {
  /** Absolute path on disk (server only). */
  filePath: string;
}

const CONTENT_ROOT = path.join(process.cwd(), "src", "content");
const CONTENT_TYPES: ContentType[] = [
  "diseases",
  "mechanisms",
  "genes",
  "interventions",
  "individual-genes",
  "individual-interventions",
  "individual-supplements",
  "individual-lifestyle",
];

let cache: ContentEntry[] | null = null;

function readEntriesFromDisk(): ContentEntry[] {
  const entries: ContentEntry[] = [];
  for (const type of CONTENT_TYPES) {
    const dir = path.join(CONTENT_ROOT, type);
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
    for (const file of files) {
      const filePath = path.join(dir, file);
      const raw = fs.readFileSync(filePath, "utf8");
      const { data } = matter(raw);
      const slug = (data.slug as string) ?? file.replace(/\.mdx?$/, "");
      entries.push({
        title: data.title as string,
        slug,
        type,
        diseases: data.diseases ?? [],
        mechanisms: data.mechanisms ?? [],
        genes: data.genes ?? [],
        interventions: data.interventions ?? [],
        description: data.description,
        sections: data.sections,
        parentSlug: data.parentSlug,
        parentTitle: data.parentTitle,
        filePath,
      });
    }
  }
  return entries;
}

export function getAllContent(): ContentEntry[] {
  if (!cache) cache = readEntriesFromDisk();
  return cache;
}

export function getContentBySlug(slug: string): ContentEntry | null {
  return getAllContent().find((e) => e.slug === slug) ?? null;
}

export function getContentByType(type: ContentType): ContentEntry[] {
  return getAllContent().filter((e) => e.type === type);
}

export function getContentForDisease(diseaseSlug: string) {
  const all = getAllContent();
  return {
    diseasePage: all.find((e) => e.type === "diseases" && e.slug === diseaseSlug) ?? null,
    mechanisms: all.filter(
      (e) => e.type === "mechanisms" && e.diseases?.includes(diseaseSlug),
    ),
    genes: all.filter((e) => e.type === "genes" && e.diseases?.includes(diseaseSlug)),
    interventions: all.filter((e) => e.type === "interventions"),
  };
}
