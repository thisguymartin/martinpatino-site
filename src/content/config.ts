import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    seo: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
    }).optional(),
    date: z.coerce.date(),
    image: z.string().optional(),
    minRead: z.union([z.string(), z.number()]).optional(),
    author: z.union([
      z.string(),
      z.object({
        name: z.string(),
        avatar: z.object({
          src: z.string(),
          alt: z.string().optional(),
        }).optional(),
      }),
    ]).default('Martin Patino'),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    external: z.boolean().default(false),
    externalUrl: z.string().optional(),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tech: z.array(z.string()).default([]),
    link: z.string().optional(),
    github: z.string().optional(),
    image: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(999),
  }),
});

export const collections = { blog, projects };
