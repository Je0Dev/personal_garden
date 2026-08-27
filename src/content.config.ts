import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content', pattern: '*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    illustration: z.string().optional(),
    color: z.string().optional(),
    author: z.object({
      name: z.string(),
      avatar: z.string(),
      bio: z.string(),
    }).optional(),
    relatedPosts: z.array(z.object({
      id: z.string(),
      title: z.string(),
      slug: z.string(),
    })).optional(),
    downloads: z.array(z.object({
      name: z.string(),
      file: z.string(),
      description: z.string(),
    })).optional(),
    draft: z.boolean().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = { blog, pages };