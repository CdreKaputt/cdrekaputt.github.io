import { getCollection, getEntry, getEntries, type CollectionEntry } from "astro:content";
import type Post from "../types/post";

export async function toPost(entry: CollectionEntry<"blog">): Promise<Post> {
  const categoryId = entry.id.split("/")[0];

  const [author, category, tags] = await Promise.all([
    getEntry(entry.data.author),
    getEntry("categories", categoryId),
    getEntries(entry.data.tags),
  ]);

  if (!author) throw new Error(`Unknown author "${entry.data.author.id}" in ${entry.id}`);
  if (!category) throw new Error(`Unknown category "${categoryId}" in ${entry.id}`);

  return {
    title: entry.data.title,
    excerpt: entry.data.excerpt,
    date: entry.data.date,
    href: `/blog/${entry.id}`,
    author: author.data,
    category: { label: category.data.label, url: `blog/${category.id}` },
    tags: tags.map((tag) => ({ label: tag.data.label, url: `/tags/${tag.id}` })),
  };
}

export async function getRecentPosts(limit: number): Promise<Post[]> {
  const entries = await getCollection("blog", ({ data }) => !data.draft);
  entries.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  return Promise.all(entries.slice(0, limit).map(toPost));
}
