import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Each Markdown file in src/content/projects/ becomes a card on the home page
// and its own page at /projects/<filename>/. Add a file, get both.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    stack: z.array(z.string()),
    // Shown on the home page. The Markdown body below the frontmatter is the
    // full writeup, shown only on the project's own page.
    summary: z.string(),
    order: z.number(),
    year: z.string().optional(),
    // Featured projects also appear on the home page. Everything appears
    // on /projects/ regardless.
    featured: z.boolean().default(false),
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    // Optional. Give these only to a project whose numbers are the argument —
    // stamping figures on every project flattens the point.
    metrics: z
      .array(
        z.object({
          value: z.string(),
          unit: z.string().optional(),
          label: z.string(),
          note: z.string().optional(),
        })
      )
      .optional(),
  }),
});

export const collections = { projects };
