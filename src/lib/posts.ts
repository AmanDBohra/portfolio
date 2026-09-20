export interface Post {
  slug: string;
  title: string;
  date: string; // ISO
  dateLabel: string;
  tags: string[];
  readingTime: string;
  excerpt: string;
  /** Raw Markdown body. Rendered to HTML lazily via renderPostHtml(). */
  body: string;
}

/**
 * Renders a post's Markdown to HTML, loading the `marked` parser on demand.
 * Keeping this dynamic import out of the eager module graph means `marked`
 * ships in its own chunk that only downloads when a reader opens an article.
 */
export async function renderPostHtml(body: string): Promise<string> {
  const { marked } = await import("marked");
  marked.setOptions({ gfm: true, breaks: false });
  return marked.parse(body) as string;
}

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

const files = import.meta.glob("../content/blog/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

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
      body,
    };
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
