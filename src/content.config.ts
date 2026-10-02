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

const skills = defineCollection({
  loader: file("./src/content/skills.yaml"),
  schema: z.object({
    label: z.string(),
    order: z.number(),
    items: z.array(z.string()),
  }),
});

const education = defineCollection({
  loader: file("./src/content/education.yaml"),
  schema: z.object({
    degree: z.string(),
    school: z.string(),
    period: z.string(),
    order: z.number(),
    coursework: z.array(z.string()).default([]),
  }),
});

export const collections = { blog, authors, categories, tags, skills }