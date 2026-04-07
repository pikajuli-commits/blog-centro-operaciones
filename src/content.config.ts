import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob } from 'astro/loaders';

const baseSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  heroImage: z.string().optional(),
  videoUrl: z.string().url().optional(),
  latex: z.boolean().default(false),
});

export const collections = {
  'blog': defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
    schema: baseSchema.extend({
      readingTime: z.number().optional(),
    }),
  }),
  'what-if': defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/what-if' }),
    schema: baseSchema.extend({
      scenario: z.string(),
      region: z.string().optional(),
    }),
  }),
  'economia': defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/economia' }),
    schema: baseSchema.extend({
      level: z.enum(['intro', 'intermedio', 'avanzado']),
      requires: z.array(z.string()).default([]),
    }),
  }),
};
