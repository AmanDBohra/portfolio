import { marked } from "marked";

export interface Post {
  slug: string;
  title: string;
  date: string; // ISO
  dateLabel: string;
  tags: string[];
  readingTime: string;
  excerpt: string;
  html: string;
}

marked.setOptions({ gfm: true, breaks: false });

/** Very small YAML-frontmatter parser (title/date/tags/readingTime/excerpt). */
function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const match = /^---\s*\n([\s\S]*?)\n---\s*\n?/.exec(raw);
  if (!match) return { data: {}, body: raw };
  const data: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    data[key] = val;
  }
  return { data, body: raw.slice(match[0].length) };
}

const files = import.meta.glob("../content/blog/*.md", { eager: true, as: "raw" }) as Record<
  string,
  string
>;

export const posts: Post[] = Object.entries(files)
  .map(([path, raw]) => {
    const slug = path.split("/").pop()!.replace(/\.md$/, "");
    const { data, body } = parseFrontmatter(raw);
    const date = data.date ?? "";
    const dateLabel = date
      ? new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
      : "";
    return {
      slug,
      title: data.title ?? slug,
      date,
      dateLabel,
      tags: (data.tags ?? "").split(",").map((t) => t.trim()).filter(Boolean),
      readingTime: data.readingTime ?? "",
      excerpt: data.excerpt ?? "",
      html: marked.parse(body) as string,
    };
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
