import { defineCollection, reference } from "astro:content";
import { glob, file } from "astro/loaders";
import { z } from "astro/zod";

const authors = defineCollection({
  loader: glob({ base: "./src/content/authors", pattern: "*.{json,yaml}"}),
  schema: ({ image }) => 
    z.object({
      name: z.string(),
      avatar: image().optional(),
    }),
});

const categories = defineCollection({
  loader: file("./src/content/categories.yaml"),
  schema: z.object({
    label: z.string(),
    description: z.string().optional(),
  }),
});

const tags = defineCollection({
  loader: file("./src/content/tags.yaml"),
  schema: z.object({
    label: z.string(),
  }),
});

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "*/*.md" }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.coerce.date(),
    author: reference("authors"),
    tags: z.array(reference("tags")).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, authors, categories, tags }