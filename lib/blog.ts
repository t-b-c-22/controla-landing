import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  tag: string;
  date: string;
  image?: string;
  content: string;
}

export function getAllPosts(locale: string): BlogPost[] {
  if (!fs.existsSync(contentDir)) return [];

  const slugs = fs.readdirSync(contentDir).filter((name) => {
    const fullPath = path.join(contentDir, name);
    return fs.statSync(fullPath).isDirectory();
  });

  const posts: BlogPost[] = [];

  for (const slug of slugs) {
    const post = getPost(slug, locale);
    if (post) posts.push(post);
  }

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPost(slug: string, locale: string): BlogPost | null {
  // Try exact locale, then fall back to default (es)
  const candidates = [
    path.join(contentDir, slug, `${locale}.md`),
    path.join(contentDir, slug, "es.md"),
  ];

  let filePath: string | null = null;
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      filePath = candidate;
      break;
    }
  }

  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    tag: data.tag || "",
    date: data.date || "",
    image: data.image || undefined,
    content,
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(contentDir)) return [];

  return fs.readdirSync(contentDir).filter((name) => {
    const fullPath = path.join(contentDir, name);
    return fs.statSync(fullPath).isDirectory();
  });
}
