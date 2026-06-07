import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export interface ResearchItem {
  slug: string;
  title: string;
  type: "trials" | "summaries";
  date: string;
  diseases: string[];
  summary: string;
  content: string;
}

const RESEARCH_DIR = path.join(process.cwd(), "src", "content", "research");

let cache: ResearchItem[] | null = null;

function readResearchFromDisk(): ResearchItem[] {
  if (!fs.existsSync(RESEARCH_DIR)) return [];
  const files = fs.readdirSync(RESEARCH_DIR).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
  const items: ResearchItem[] = [];
  for (const file of files) {
    const filePath = path.join(RESEARCH_DIR, file);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    items.push({
      slug: (data.slug as string) ?? file.replace(/\.mdx?$/, ""),
      title: data.title as string,
      type: data.type as "trials" | "summaries",
      date: (data.date as string) ?? "2026-01-01",
      diseases: (data.diseases as string[]) ?? [],
      summary: (data.summary as string) ?? "",
      content: content.trim(),
    });
  }
  // Sort by date descending
  items.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  return items;
}

export function getAllResearchItems(): ResearchItem[] {
  if (!cache) cache = readResearchFromDisk();
  return cache;
}

export function getResearchItems(
  type: "trials" | "summaries",
  diseaseSlug?: string | null,
): ResearchItem[] {
  const all = getAllResearchItems().filter((item) => item.type === type);
  if (!diseaseSlug) return all;
  return all.filter(
    (item) => !item.diseases || item.diseases.length === 0 || item.diseases.includes(diseaseSlug),
  );
}
